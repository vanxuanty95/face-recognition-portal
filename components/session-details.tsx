"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { QrCode, Calendar, Clock, MapPin } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { QRCodeSVG } from "qrcode.react"

// Mock session data
const sessionData = {
  "1": {
    id: "1",
    title: "Mathematics 101",
    date: "2023-05-15",
    time: "09:00 - 10:30",
    room: "Room 201",
    students: [
      { id: "1", name: "Alice Johnson", checkedIn: true, checkedInTime: "08:55 AM" },
      { id: "2", name: "Bob Smith", checkedIn: true, checkedInTime: "08:58 AM" },
      { id: "3", name: "Charlie Brown", checkedIn: false, checkedInTime: null },
      { id: "4", name: "Diana Prince", checkedIn: true, checkedInTime: "09:02 AM" },
      { id: "5", name: "Edward Cullen", checkedIn: false, checkedInTime: null },
      { id: "6", name: "Fiona Gallagher", checkedIn: true, checkedInTime: "08:50 AM" },
    ],
  },
  "2": {
    id: "2",
    title: "Physics Fundamentals",
    date: "2023-05-15",
    time: "11:00 - 12:30",
    room: "Lab 101",
    students: [
      { id: "1", name: "Alice Johnson", checkedIn: false, checkedInTime: null },
      { id: "7", name: "George Lucas", checkedIn: true, checkedInTime: "10:55 AM" },
      { id: "8", name: "Hannah Montana", checkedIn: false, checkedInTime: null },
      { id: "9", name: "Ian Malcolm", checkedIn: true, checkedInTime: "10:58 AM" },
      { id: "10", name: "Julia Roberts", checkedIn: false, checkedInTime: null },
    ],
  },
  "3": {
    id: "3",
    title: "Computer Science Basics",
    date: "2023-05-16",
    time: "14:00 - 15:30",
    room: "Computer Lab",
    students: [
      { id: "3", name: "Charlie Brown", checkedIn: true, checkedInTime: "13:55 PM" },
      { id: "11", name: "Kevin Hart", checkedIn: false, checkedInTime: null },
      { id: "12", name: "Laura Palmer", checkedIn: true, checkedInTime: "13:50 PM" },
      { id: "13", name: "Michael Scott", checkedIn: false, checkedInTime: null },
      { id: "14", name: "Nancy Wheeler", checkedIn: true, checkedInTime: "13:58 PM" },
    ],
  },
  "4": {
    id: "4",
    title: "English Literature",
    date: "2023-05-17",
    time: "10:00 - 11:30",
    room: "Room 105",
    students: [
      { id: "2", name: "Bob Smith", checkedIn: false, checkedInTime: null },
      { id: "4", name: "Diana Prince", checkedIn: false, checkedInTime: null },
      { id: "15", name: "Oliver Queen", checkedIn: true, checkedInTime: "09:55 AM" },
      { id: "16", name: "Penny Lane", checkedIn: false, checkedInTime: null },
      { id: "17", name: "Quincy Jones", checkedIn: true, checkedInTime: "09:58 AM" },
      { id: "18", name: "Rachel Green", checkedIn: false, checkedInTime: null },
    ],
  },
}

export function SessionDetails() {
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [qrDialogOpen, setQrDialogOpen] = useState(false)
  const searchParams = useSearchParams()

  useEffect(() => {
    const sessionId = searchParams.get("id") // Retrieve sessionId inside useEffect
    console.log("Session ID from URL:", sessionId)
    // if (!sessionId) return

    const storedSession = localStorage.getItem("selectedSession")
    console.log("Stored session:", storedSession)
    if (storedSession) {
      console.log("Stored session:", JSON.parse(storedSession))
      setSession(JSON.parse(storedSession))
    }
  }, [searchParams]) // Use searchParams as a stable dependency

  if (!session) {
    return <div className="text-center py-10">Loading session details...</div>
  }

  const checkedInCount = Array.isArray(session.listStudent)
    ? session.listStudent.filter((student: any) => student.checkedIn).length
    : 0

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{session.title}</CardTitle>
          <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-6">
            <CardDescription className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              {session.date}
            </CardDescription>
            <CardDescription className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              {session.time}
            </CardDescription>
            <CardDescription className="flex items-center">
              <MapPin className="mr-2 h-4 w-4" />
              {session.room}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-medium">Attendance</h3>
              <p className="text-sm text-gray-500">
                {checkedInCount} of {Array.isArray(session.listStudent) ? session.listStudent.length : 0} students checked in
              </p>
            </div>
            <Button onClick={() => setQrDialogOpen(true)}>
              <QrCode className="mr-2 h-4 w-4" />
              Show QR Code
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.isArray(session.listStudent) &&
                session.listStudent.map((student: any) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          student.checkedIn ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {student.checkedIn ? "Present" : "Absent"}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={qrDialogOpen} onOpenChange={setQrDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Session QR Code</DialogTitle>
            <DialogDescription>
              {session.title} - {session.date}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center p-6">
            <QRCodeSVG
              value={[session.id, session.date]}
              size={250}
              level="H"
              includeMargin={true}
            />
            <p className="mt-4 text-sm text-gray-500">Students can scan this QR code to check in to this session</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
