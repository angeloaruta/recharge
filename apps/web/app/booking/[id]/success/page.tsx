"use client"
import { GradientBackground } from "@/components/layout/gradient-background"
import { AppointmentCreatedCard } from "../../appointment-created-card"
import { AppointmentLoading } from "../../appointment-loading"
import { AppointmentMissing } from "../../appointment-missing"
import { useGetAppointment } from "@/queries/appointment"
import Link from "next/link"

export default function SuccessPage() {
  const { data: appointment, isLoading } = useGetAppointment()

  if (isLoading) {
    return <AppointmentLoading />
  }

  if (!appointment) {
    return <AppointmentMissing />
  }

  return (
    <section className="relative isolate flex min-h-screen flex-col items-center justify-center bg-gradient-to-b px-6 py-12 lg:px-8">
      <GradientBackground type="top" />
      <div className="mx-auto max-w-md">
        <AppointmentCreatedCard appointment={appointment} />

        <div className="text-muted-foreground mt-6 text-center text-sm">
          <p>
            Need help?{" "}
            <Link href="/support" className="text-primary font-medium hover:underline">
              Contact support
            </Link>
          </p>
        </div>
      </div>
      <GradientBackground type="bottom" />
    </section>
  )
}
