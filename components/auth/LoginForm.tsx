"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Link from "next/link"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { loginAction } from "@/actions/auth"

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
})

type LoginValues = z.infer<typeof loginSchema>

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null)
  const [attemptsRemaining, setAttemptsRemaining] = useState<number | null>(null)
  const [isPending, setIsPending] = useState(false)

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  })

  async function onSubmit(values: LoginValues) {
    setIsPending(true)
    setError(null)
    setAttemptsRemaining(null)

    const result = await loginAction({ email: values.email, password: values.password })

    if (result.success) {
      window.location.href = "/auth/callback"
      return
    }

    setError(result.error ?? "Something went wrong")
    setAttemptsRemaining(result.attemptsRemaining ?? null)
    setIsPending(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <div className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-md space-y-0.5">
            <p>{error}</p>
            {attemptsRemaining !== null && attemptsRemaining > 0 && (
              <p className="text-xs opacity-80">
                {attemptsRemaining} attempt{attemptsRemaining !== 1 ? "s" : ""} remaining before your account is locked for 15 minutes.
              </p>
            )}
          </div>
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Signing in…" : "Sign In"}
        </Button>

        <p className="text-sm text-center text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="underline underline-offset-2 text-foreground">
            Create one
          </Link>
        </p>
      </form>
    </Form>
  )
}
