"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { QrCode, Users, Calendar, Clock, ArrowRight } from "lucide-react"
import { QRCodeSVG } from "qrcode.react"
import axiosInstance from "@/axios/axiosInstance"

export function SessionList() {
  // Define initialSessions with a sample structure
    const initialSessions = [
      {
        id: "1",
        title: "Sample Session",
        date: "2023-01-01",
        startTime: "10:00 AM",
        endTime: "11:00 AM",
        checkedIn: 0, 
        students: 30,
        listStudent:[]
      },
    ]
    const [sessions, setSessions] = useState<(typeof initialSessions)[0][]>([])
  const [selectedSession, setSelectedSession] = useState<(typeof sessions)[0] | null>(null)
  const [qrDialogOpen, setQrDialogOpen] = useState(false)

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axiosInstance.post("/api/professors/classes/details", {
          // Replace with your actual API request body
          teacherId: localStorage.getItem("userId"),
          date: new Date().toISOString().split("T")[0], // Current date
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }) // Replace with your API endpoint
        console.log("Fetched sessions:", response.data)
        setSessions(response.data)
      } catch (error) {
        console.error("Error fetching sessions:", error)
      }
    }

    fetchSessions()
  }, [])

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
              {session.startTime} - {session.endTime}
            </CardDescription>
            <CardDescription className="flex items-center gap-1">
              <Users className="h-4 w-4 text-gray-500" />
              {session.checkedIn}/{session.students} students checked in
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-between border-t bg-gray-50 p-3">
            <Button variant="outline" size="sm" onClick={() => handleShowQR(session)}>
              <QrCode className="mr-2 h-4 w-4" />
              Show QR
            </Button>
            <Link
              href={`/sessions/${session.id}`}
              onClick={() => localStorage.setItem("selectedSession", JSON.stringify(session))}
            >
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
                value={[selectedSession.id,selectedSession.date].join(",")}
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
