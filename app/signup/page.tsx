import Link from "next/link"
import { SignUpForm } from "@/components/auth/signup-form"

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Sign Up</h2>
          <p className="mt-2 text-sm text-gray-600">Create your account to get started</p>
        </div>
        <SignUpForm />
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Log in
          </Link>
        </div>
      </div>
    </div>
  )
}

