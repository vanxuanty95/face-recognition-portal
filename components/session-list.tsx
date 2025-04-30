"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { QrCode, Users, Calendar, Clock, ArrowRight } from "lucide-react"
import {QRCodeSVG} from "qrcode.react"

// Mock data for sessions
const sessions = [
  {
    id: "1",
    title: "Mathematics 101",
    date: "2023-05-15",
    time: "09:00 - 10:30",
    room: "Room 201",
    students: 28,
    checkedIn: 0,
  },
  {
    id: "2",
    title: "Physics Fundamentals",
    date: "2023-05-15",
    time: "11:00 - 12:30",
    room: "Lab 101",
    students: 24,
    checkedIn: 0,
  },
  {
    id: "3",
    title: "Computer Science Basics",
    date: "2023-05-16",
    time: "14:00 - 15:30",
    room: "Computer Lab",
    students: 20,
    checkedIn: 0,
  },
  {
    id: "4",
    title: "English Literature",
    date: "2023-05-17",
    time: "10:00 - 11:30",
    room: "Room 105",
    students: 30,
    checkedIn: 0,
  },
]

export function SessionList() {
  const [selectedSession, setSelectedSession] = useState<(typeof sessions)[0] | null>(null)
  const [qrDialogOpen, setQrDialogOpen] = useState(false)

  const handleShowQR = (session: (typeof sessions)[0]) => {
    setSelectedSession(session)
    setQrDialogOpen(true)
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {sessions.map((session) => (
        <Card key={session.id} className="overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle>{session.title}</CardTitle>
            <CardDescription className="flex items-center gap-1">
              <Calendar className="h-4 w-4 text-gray-500" />
              {session.date}
            </CardDescription>
            <CardDescription className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-gray-500" />
              {session.time}
            </CardDescription>
            <CardDescription className="flex items-center gap-1">
              <Users className="h-4 w-4 text-gray-500" />
              {session.checkedIn}/{session.students} students checked in
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            <p>Location: {session.room}</p>
          </CardContent>
          <CardFooter className="flex justify-between border-t bg-gray-50 p-3">
            <Button variant="outline" size="sm" onClick={() => handleShowQR(session)}>
              <QrCode className="mr-2 h-4 w-4" />
              Show QR
            </Button>
            <Link href={`/sessions/${session.id}`}>
              <Button variant="ghost" size="sm">
                Details
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}

      <Dialog open={qrDialogOpen} onOpenChange={setQrDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Session QR Code</DialogTitle>
            <DialogDescription>
              {selectedSession && (
                <span>
                  {selectedSession.title} - {selectedSession.date}
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center p-6">
            {selectedSession && (
              <QRCodeSVG
                value={`https://teacher-checkin.example.com/check-in/${selectedSession.id}`}
                size={250}
                level="H"
                includeMargin={true}
              />
            )}
            <p className="mt-4 text-sm text-gray-500">Students can scan this QR code to check in to this session</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
