import { GradientBackground } from "@/components/layout/gradient-background"
import { ModifyBookingForm } from "@/components/forms/modify-booking-form"

export default function ModifyBookingPage() {
  return (
    <section className="from-background to-muted/30 relative isolate flex min-h-screen flex-col bg-gradient-to-b px-4 pt-24 pb-8 sm:pt-28 md:items-center md:justify-center md:py-16">
      <GradientBackground type="top" />
      <div className="mx-auto w-full max-w-xl">
        <ModifyBookingForm />
      </div>
      <GradientBackground type="bottom" />
    </section>
  )
}
