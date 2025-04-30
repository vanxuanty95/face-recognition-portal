import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard-header"
import { SessionDetails } from "@/components/session-details"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function SessionPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 container mx-auto p-4 md:p-6">
        <div className="mb-6">
          <Link href="/dashboard">
            <Button variant="ghost" className="pl-0">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
        <SessionDetails sessionId={params.id} />
      </main>
    </div>
  )
}
