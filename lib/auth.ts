import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { dbConnect } from "./db"
import { User } from "./models/User"
import { authConfig } from "./auth.config"
import {
  isRateLimited,
  recordFailure,
  resetFailures,
  remainingAttempts,
} from "./rate-limiter"

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getClientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  )
}

/** Partially mask an email for safe console output: john@example.com → j***n@example.com */
function maskEmail(email: string): string {
  const atIndex = email.indexOf("@")
  if (atIndex < 0) return "***"
  const local = email.slice(0, atIndex)
  const domain = email.slice(atIndex)
  if (local.length <= 2) return `***${domain}`
  return `${local[0]}***${local[local.length - 1]}${domain}`
}

type LogEvent = "FAILED" | "RATE_LIMITED" | "SUCCESS"

function logAttempt(event: LogEvent, email: string, ip: string, reason?: string): void {
  const timestamp = new Date().toISOString()
  const masked = maskEmail(email)
  const reasonNote = reason ? ` (${reason})` : ""

  if (event === "SUCCESS") {
    console.info(`[AUTH] ${timestamp} SUCCESS  ip=${ip} email=${masked}`)
  } else if (event === "RATE_LIMITED") {
    console.warn(`[AUTH] ${timestamp} RATE_LIMITED  ip=${ip} email=${masked}`)
  } else {
    const remaining = remainingAttempts(ip)
    console.warn(
      `[AUTH] ${timestamp} FAILED  ip=${ip} email=${masked}${reasonNote} attempts_remaining=${remaining}`
    )
  }
}

// ---------------------------------------------------------------------------
// NextAuth config
// ---------------------------------------------------------------------------

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, request) {
        const email = (credentials?.email as string | undefined)?.toLowerCase().trim() ?? ""
        const password = (credentials?.password as string | undefined) ?? ""
        const ip = getClientIp(request)

        if (!email || !password) return null

        // --- rate limit check ---
        if (isRateLimited(ip)) {
          logAttempt("RATE_LIMITED", email, ip)
          return null
        }

        await dbConnect()

        const user = await User.findOne({ email }).lean()

        if (!user) {
          recordFailure(ip)
          logAttempt("FAILED", email, ip, "no account")
          return null
        }

        const passwordMatch = await bcrypt.compare(password, user.passwordHash)

        if (!passwordMatch) {
          recordFailure(ip)
          logAttempt("FAILED", email, ip, "wrong password")
          return null
        }

        resetFailures(ip)
        logAttempt("SUCCESS", email, ip)

        return {
          id: user._id.toString(),
          email: user.email,
          username: user.username,
        }
      },
    }),
  ],
})
