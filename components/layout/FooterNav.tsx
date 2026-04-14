"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import { Home, Bookmark, FolderOpen, PlusCircle, User } from "lucide-react"
import { cn } from "@/lib/utils"

const guestNavItems = [
  { href: "/", icon: Home, label: "Home" },
] as const

const authNavItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/bookmarks", icon: Bookmark, label: "Bookmarks" },
  { href: "/collections", icon: FolderOpen, label: "Collections" },
  { href: "/add-question", icon: PlusCircle, label: "Add Question" },
  { href: "/profile", icon: User, label: "Profile" },
] as const

export default function FooterNav() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const navItems = session?.user ? authNavItems : guestNavItems

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 h-16 bg-primary border-t border-primary/20">
      <nav aria-label="Main navigation">
        <ul className="flex h-full items-center justify-around max-w-md mx-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-label={item.label}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors",
                    "text-primary-foreground/70 hover:text-primary-foreground",
                    isActive && "text-primary-foreground border-b-2 border-accent"
                  )}
                >
                  <Icon className="h-6 w-6" aria-hidden="true" />
                  <span className="text-xs sr-only md:not-sr-only">{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </footer>
  )
}
