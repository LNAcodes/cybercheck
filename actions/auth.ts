"use server"

import { z } from "zod"
import bcrypt from "bcryptjs"
import { AuthError } from "next-auth"
import { headers } from "next/headers"
import { signIn } from "@/lib/auth"
import { dbConnect } from "@/lib/db"
import { User } from "@/lib/models/User"
import { remainingAttempts } from "@/lib/rate-limiter"

/** Mirrors the IP-extraction logic in lib/auth.ts so both use the same key. */
function getClientIpFromHeaders(): string {
  const headersList = headers()
  const forwarded = headersList.get("x-forwarded-for")?.split(",")[0].trim()
  const realIp = headersList.get("x-real-ip")
  const raw = forwarded ?? realIp ?? "unknown"
  if (raw === "::1" || raw === "unknown") return "127.0.0.1"
  return raw
}

const signupSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be at most 30 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export async function signupAction(data: {
  username: string
  email: string
  password: string
}): Promise<{ success?: boolean; error?: string }> {
  const result = signupSchema.safeParse(data)

  if (!result.success) {
    return { error: result.error.issues[0].message }
  }

  await dbConnect()

  const emailExists = await User.findOne({ email: data.email.toLowerCase() }).lean()
  if (emailExists) {
    return { error: "An account with this email already exists" }
  }

  const usernameExists = await User.findOne({ username: data.username }).lean()
  if (usernameExists) {
    return { error: "This username is already taken" }
  }

  const passwordHash = await bcrypt.hash(data.password, 12)

  await User.create({
    username: data.username,
    email: data.email.toLowerCase(),
    passwordHash,
  })

  return { success: true }
}

export async function loginAction(data: {
  email: string
  password: string
}): Promise<{ error?: string; rateLimited?: boolean; attemptsRemaining?: number; success?: boolean }> {
  try {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirectTo: "/auth/callback",
    })
  } catch (error) {
    if (error instanceof AuthError) {
      const code = (error as AuthError & { code?: string }).code
      if (code === "rate_limited") {
        return {
          rateLimited: true,
          error: "Too many failed attempts. Please wait 15 minutes.",
        }
      }
      const ip = getClientIpFromHeaders()
      return {
        error: "Invalid email or password",
        attemptsRemaining: remainingAttempts(ip),
      }
    }
    // NEXT_REDIRECT means sign-in succeeded and the session cookie is now set.
    if ((error as { digest?: string }).digest?.startsWith("NEXT_REDIRECT")) {
      return { success: true }
    }
    throw error
  }
  return { success: true }
}
