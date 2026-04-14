import LoginForm from "@/components/auth/LoginForm"

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Sign In</h2>
        <p className="text-muted-foreground mt-1">Welcome back to CyberCheck.</p>
      </div>
      <LoginForm />
    </div>
  )
}
