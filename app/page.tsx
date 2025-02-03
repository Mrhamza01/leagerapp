import { LoginForm } from "@/components/auth/login-form"

export default function HomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Log In</h2>
          <p className="mt-2 text-sm text-gray-600">Welcome back! Please log in to your account</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}

