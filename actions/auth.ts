"use server"

import { z } from "zod"
import bcrypt from "bcryptjs"
import { dbConnect } from "@/lib/db"
import { User } from "@/lib/models/User"

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
