"use client"

import {
  appointmentStatusEnum,
  type AppointmentStatus,
  type Appointment,
  UpdateAppointment,
} from "@recharge/utilities/schema"
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  PencilIcon,
  UserIcon,
  MessageSquareIcon,
  Trash2,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@recharge/ui/components/card"
import { convertTo12HourFormat, formatDateToISO, isPastDate } from "@recharge/ui/lib/date"
import { AddToCalendarButton } from "@recharge/ui/components/add-to-calendar-button"
import { useCancelAppointment, useUpdateAppointment } from "@/queries/appointment"
import { ModifyBookingForm } from "@/components/forms/modify-booking-form"
import { useResponsiveModal } from "@recharge/ui/store/responsive-modal"
import { Tooltip } from "@recharge/ui/components/tooltip"
import { Button } from "@recharge/ui/components/button"
import { format } from "date-fns"
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
  const { setResponsiveModal, closeResponsiveModal } = useResponsiveModal()
  const { mutateAsync: cancelAppointment, isPending: isCancelling } = useCancelAppointment()
  const { mutateAsync: updateAppointment, isPending: isUpdating } = useUpdateAppointment()

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
  const isCancelled = appointment.status === appointmentStatusEnum.Enum.cancelled
  const isDisabled = isCancelling || isUpdating

  const handleCancelAppointment = () => {
    setResponsiveModal({
      title: "Cancel Appointment",
      content: "Are you sure you want to cancel this appointment?",
      isDestructive: true,
      onConfirm: async () => {
        await cancelAppointment({
          id: appointment.id,
          confirmationCode: appointment.confirmationCode,
        })
        closeResponsiveModal()
      },
    })
  }

  const onModifyAppointment = async (values: UpdateAppointment) => {
    await updateAppointment({
      id: appointment.id,
      confirmationCode: appointment.confirmationCode,
      payload: values,
    })
    closeResponsiveModal()
  }

  const handleModifyAppointment = () => {
    setResponsiveModal({
      title: "Modify Appointment",
      content: (
        <ModifyBookingForm
          defaultValues={appointment}
          onSubmit={onModifyAppointment}
          isLoading={isDisabled}
        />
      ),
      isDestructive: false,
      onConfirm: async () => {
        const form = document.querySelector("form")
        if (form) {
          form.requestSubmit()
        }
      },
    })
  }

  return (
    <Card className="border-muted/40 bg-background ring-muted/30 before:from-muted/80 before:to-muted/20 shadow-sm ring-1 before:absolute before:inset-0 before:-z-10 before:translate-y-2 before:scale-[0.98] before:bg-gradient-to-b before:blur-xl before:content-['']">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
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
          {(isPast || isCancelled) && (
            <div className="ml-auto flex w-full gap-2 sm:w-auto">
              <p className="text-muted-foreground text-[10px]">
                This appointment has already {isPast ? "passed" : "been cancelled"}.
              </p>
            </div>
          )}
          <div className="ml-auto flex w-full gap-2 sm:w-auto">
            <p className="text-muted-foreground text-[10px]">
              Last updated: {format(new Date(appointment.updatedAt), "PPPPppp")}
            </p>
          </div>
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
        {!isPast && !isCancelled && (
          <>
            <Button className="w-full" onClick={handleModifyAppointment} disabled={isDisabled}>
              <PencilIcon className="h-4 w-4" />
              Modify Appointment
            </Button>
            <Button
              className="w-full"
              variant="destructive"
              onClick={handleCancelAppointment}
              disabled={isDisabled}
            >
              <Trash2 className="h-4 w-4" />
              Cancel Appointment
            </Button>
          </>
        )}
        <Button variant="outline" className="w-full" disabled={isDisabled} asChild>
          <Link href="/">Return to Homepage</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
