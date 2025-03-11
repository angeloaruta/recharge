"use client"

import { AppointmentDetailsCard } from "../../appointment-details-card"
import { PageContainer } from "@/components/layout/page-container"
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
    <PageContainer useMutedGradient className="md:py-16" containerClassName="max-w-xl">
      <AppointmentDetailsCard appointment={appointment} />
    </PageContainer>
  )
}
