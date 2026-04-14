"use client"

import { useEffect, useRef } from "react"
import { toast } from "sonner"

interface WelcomeToastProps {
  username: string
}

export default function WelcomeToast({ username }: WelcomeToastProps) {
  const hasShown = useRef(false)

  useEffect(() => {
    if (hasShown.current) return
    hasShown.current = true
    toast.success(`Welcome back, ${username}!`)
  }, [username])

  return null
}
