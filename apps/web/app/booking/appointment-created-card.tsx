import { Card, CardContent, CardFooter, CardHeader } from "@recharge/ui/components/card"
import { AddToCalendarButton } from "@recharge/ui/components/add-to-calendar-button"
import { convertTo12HourFormat, formatDateToISO } from "@recharge/ui/lib/date"
import type { Apppointment } from "@/schemas/appointment"
import { Button } from "@recharge/ui/components/button"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"

interface AppointmentCreatedCardProps {
  appointment: Apppointment
}
export function AppointmentCreatedCard({ appointment }: AppointmentCreatedCardProps) {
  const location =
    appointment?.street +
    ", " +
    appointment?.city +
    ", " +
    appointment?.province +
    " " +
    appointment?.postalCode

  const date = appointment?.date ? formatDateToISO(new Date(appointment.date)) : ""

  return (
    <Card className="border-muted/40 bg-background ring-muted/30 before:from-muted/80 before:to-muted/20 rounded-none shadow-none ring-1 before:absolute before:inset-0 before:-z-10 before:translate-y-2 before:scale-[0.98] before:bg-gradient-to-b before:blur-xl before:content-['']">
      <CardHeader className="flex flex-col items-center space-y-2 pb-2 text-center">
        <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/30">
          <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-500" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Booking Requested!</h1>
        <p className="text-muted-foreground">
          Your appointment has been successfully requested. We will review your request and send you
          a confirmation email once it is approved.
        </p>
      </CardHeader>

      <CardContent className="space-y-4 px-6 py-4">
        <div className="bg-muted/50 p-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <p className="text-muted-foreground text-sm font-medium">Date & Time</p>
              <p className="font-medium">
                {convertTo12HourFormat(appointment?.time)} {date}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm font-medium">Location</p>
              <p className="font-medium">{location}</p>
            </div>
          </div>
        </div>

        <div className="border-muted-foreground/30 border border-dashed p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm font-medium">Confirmation Code</p>
              <p className="font-mono text-lg font-semibold">{appointment.confirmationCode}</p>
            </div>
            <AddToCalendarButton
              name="Your Appointment"
              description="Appointment booking from our service"
              location={location}
              startDate={date}
              startTime={appointment.time}
              size="sm"
              variant="outline"
            />
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col space-y-3 px-6 pb-6">
        <Button className="w-full" asChild>
          <Link href="/">Go to Homepage</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
