import { SessionList } from "@/components/session-list"
import { DashboardHeader } from "@/components/dashboard-header"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 container mx-auto p-4 md:p-6">
        <h1 className="text-2xl font-bold mb-6">Your Teaching Sessions</h1>
        <SessionList />
      </main>
    </div>
  )
}
