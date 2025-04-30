import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LogOut, User } from "lucide-react"

export function DashboardHeader() {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/dashboard" className="font-bold text-xl">
          Teacher Portal
        </Link>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-gray-500" />
            <span className="text-sm font-medium">John Smith</span>
          </div>
          <Link href="/">
            <Button variant="ghost" size="icon">
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Log out</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
