"use client"

import { GradientBackground } from "@/components/layout/gradient-background"
import { AppointmentDetailsCard } from "../../appointment-details-card"
import { AppointmentLoading } from "../../appointment-loading"
import { AppointmentMissing } from "../../appointment-missing"
import { useGetAppointment } from "@/queries/appointment"

export default function ModifyBookingPage() {
  const { data: appointment, isLoading } = useGetAppointment()

  if (isLoading) {
    return <AppointmentLoading />
  }

  if (!appointment) {
    return <AppointmentMissing />
  }

  return (
    <section className="from-background to-muted/30 relative isolate flex min-h-screen flex-col bg-gradient-to-b px-4 pt-24 pb-8 sm:pt-28 md:items-center md:justify-center md:py-16">
      <GradientBackground type="top" />
      <div className="mx-auto w-full max-w-xl">
        <AppointmentDetailsCard appointment={appointment} />
      </div>
      <GradientBackground type="bottom" />
    </section>
  )
}
