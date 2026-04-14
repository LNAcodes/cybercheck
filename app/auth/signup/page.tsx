import SignupForm from "@/components/auth/SignupForm"

export default function SignupPage() {
  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Create Account</h2>
        <p className="text-muted-foreground mt-1">
          Join CyberCheck to bookmark questions and build collections.
        </p>
      </div>
      <SignupForm />
    </div>
  )
}
