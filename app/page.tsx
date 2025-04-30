import { LoginForm } from "@/components/login-form"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Who&#39;s Here Portal</h1>
          <p className="mt-2 text-gray-600">Sign in to manage your sessions and track student attendance</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
