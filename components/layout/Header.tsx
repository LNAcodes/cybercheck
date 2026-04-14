"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const { theme, setTheme } = useTheme()

  function handleThemeToggle() {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-primary text-primary-foreground flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-2">
        <h1 className="font-mono text-xl md:text-2xl font-bold tracking-tight">
          <span aria-hidden="true" className="opacity-70">{">"} </span>
          CyberCheck
          <span aria-hidden="true" className="animate-blink ml-0.5">_</span>
        </h1>
      </div>

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
    </header>
  )
}
