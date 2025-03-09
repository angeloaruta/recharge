import { GradientBackground } from "@/components/layout/gradient-background"
import { BookingForm } from "@/components/forms/booking-form"
export default function BookingPage() {
  return (
    <section className="relative isolate flex min-h-screen flex-col justify-center px-6 pt-14 lg:px-8">
      <GradientBackground type="top" />
      <div className="mx-auto flex flex-1 flex-col justify-center">
        <BookingForm />
      </div>
    </section>
  )
}
