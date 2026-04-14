"use client"

import { useTheme } from "next-themes"
import { useSession, signOut } from "next-auth/react"
import { Moon, Sun, User, LogOut, LogIn, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Header() {
  const { theme, setTheme } = useTheme()
  const { data: session } = useSession()

  function handleThemeToggle() {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-primary text-primary-foreground flex items-center justify-between px-4 md:px-6">
      <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
        <h1 className="font-mono text-xl md:text-2xl font-bold tracking-tight">
          <span aria-hidden="true" className="opacity-70">{">"} </span>
          CyberCheck
          <span aria-hidden="true" className="animate-blink ml-0.5">_</span>
        </h1>
      </Link>

      <div className="flex items-center gap-1">
        {session?.user ? (
          <>
            <span className="text-sm hidden sm:block opacity-80 mr-1">
              {session.user.username}
            </span>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground"
            >
              <Link href="/profile" aria-label="Profile">
                <User className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => signOut({ callbackUrl: "/" })}
              aria-label="Sign out"
              className="text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground"
            >
              <Link href="/auth/login">
                <LogIn className="h-4 w-4 mr-1" />
                Sign In
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground"
            >
              <Link href="/auth/signup">
                <UserPlus className="h-4 w-4 mr-1" />
                Sign Up
              </Link>
            </Button>
          </>
        )}

        <Button
          variant="ghost"
          size="icon"
          onClick={handleThemeToggle}
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          className="text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
      </div>
    </header>
  )
}
