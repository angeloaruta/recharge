"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@recharge/ui/components/card"
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  PencilIcon,
  UserIcon,
  MessageSquareIcon,
} from "lucide-react"
import {
  appointmentStatusEnum,
  type AppointmentStatus,
  type Appointment,
} from "@recharge/utilities/schema"
import { convertTo12HourFormat, formatDateToISO, isPastDate } from "@recharge/ui/lib/date"
import { AddToCalendarButton } from "@recharge/ui/components/add-to-calendar-button"
import { Tooltip } from "@recharge/ui/components/tooltip"
import { Button } from "@recharge/ui/components/button"
import Link from "next/link"

const statusColorMap: Record<AppointmentStatus, string> = {
  confirmed: "bg-green-300",
  pending: "bg-orange-300",
  cancelled: "bg-red-300",
  completed: "bg-blue-300",
}

interface AppointmentDetailsCardProps {
  appointment: Appointment
}

export function AppointmentDetailsCard({ appointment }: AppointmentDetailsCardProps) {
  const location =
    appointment.street +
    ", " +
    appointment.city +
    ", " +
    appointment.province +
    " " +
    appointment.postalCode

  const date = appointment.date ? formatDateToISO(new Date(appointment.date)) : ""

  const isPast = isPastDate(date)

  return (
    <Card className="border-muted/40 bg-background ring-muted/30 before:from-muted/80 before:to-muted/20 shadow-sm ring-1 before:absolute before:inset-0 before:-z-10 before:translate-y-2 before:scale-[0.98] before:bg-gradient-to-b before:blur-xl before:content-['']">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl">Current Appointment</CardTitle>
          <Tooltip content={appointment.status}>
            <span className="relative flex size-1.5">
              <span
                className={`absolute inline-flex h-full w-full ${isPast ? "" : "animate-ping"} rounded-full ${statusColorMap[appointment.status]} opacity-75`}
              ></span>
              <span
                className={`relative inline-flex size-1.5 rounded-full ${statusColorMap[appointment.status]}`}
              ></span>
            </span>
          </Tooltip>
        </div>

        <CardDescription>
          {(isPast || appointment.status === appointmentStatusEnum.Enum.cancelled) && (
            <div className="ml-auto flex w-full gap-2 sm:w-auto">
              <p className="text-muted-foreground text-[10px]">
                This appointment has already {isPast ? "passed" : "been cancelled"}.
              </p>
            </div>
          )}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 px-6 py-4">
        <div className="space-y-3">
          <div className="flex items-start">
            <UserIcon className="text-muted-foreground mt-0.5 mr-3 h-5 w-5" />
            <div>
              <p className="text-muted-foreground text-sm font-medium">Contact Information</p>
              <p className="font-medium">{appointment.name}</p>
              <p className="text-sm">{appointment.email}</p>
              <p className="text-sm">{appointment.phone}</p>
            </div>
          </div>

          <div className="flex items-start">
            <CalendarIcon className="text-muted-foreground mt-0.5 mr-3 h-5 w-5" />
            <div>
              <p className="text-muted-foreground text-sm font-medium">Date</p>
              <p className="font-medium">{date}</p>
            </div>
          </div>

          <div className="flex items-start">
            <ClockIcon className="text-muted-foreground mt-0.5 mr-3 h-5 w-5" />
            <div>
              <p className="text-muted-foreground text-sm font-medium">Time</p>
              <p className="font-medium">{convertTo12HourFormat(appointment.time)}</p>
            </div>
          </div>

          <div className="flex items-start">
            <MapPinIcon className="text-muted-foreground mt-0.5 mr-3 h-5 w-5" />
            <div>
              <p className="text-muted-foreground text-sm font-medium">Location</p>
              <p className="font-medium">{location}</p>
            </div>
          </div>

          {appointment.notes && (
            <div className="flex items-start">
              <MessageSquareIcon className="text-muted-foreground mt-0.5 mr-3 h-5 w-5" />
              <div>
                <p className="text-muted-foreground text-sm font-medium">Additional Notes</p>
                <p className="font-medium">{appointment.notes}</p>
              </div>
            </div>
          )}
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
        {!isPast && appointment.status !== appointmentStatusEnum.Enum.cancelled && (
          <Button className="w-full" asChild>
            <Link
              href={`/booking/${appointment.id}/edit?confirmationCode=${appointment.confirmationCode}`}
            >
              <PencilIcon className="mr-2 h-4 w-4" />
              Modify Appointment
            </Link>
          </Button>
        )}
        <Button variant="outline" className="w-full" asChild>
          <Link href="/">Return to Homepage</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
