import Link from "next/link"

export default function GuestBanner() {
  return (
    <div className="bg-muted border-b px-4 py-3 text-center text-sm">
      <span className="text-muted-foreground">You&apos;re browsing as a guest. </span>
      <Link href="/auth/signup" className="font-semibold underline underline-offset-2">
        Create an account
      </Link>
      <span className="text-muted-foreground"> or </span>
      <Link href="/auth/login" className="font-semibold underline underline-offset-2">
        sign in
      </Link>
      <span className="text-muted-foreground"> to bookmark questions and build collections.</span>
    </div>
  )
}
