import Link from "next/link"

export default function GuestBanner() {
  return (
    <div className="bg-muted/60 border rounded-xl px-5 py-4 text-center text-sm mb-6">
      <p className="text-foreground font-medium mb-1">
        Create a free account to bookmark questions, build collections, and track your progress.
      </p>
      <p className="text-muted-foreground">
        <Link href="/auth/signup" className="font-semibold underline underline-offset-2 text-foreground">
          Create account
        </Link>
        {" · "}
        <Link href="/auth/login" className="underline underline-offset-2">
          Sign in
        </Link>
      </p>
    </div>
  )
}
