import { PageContainer } from "@/components/layout/page-container"
import { BookingForm } from "@/components/forms/booking-form"

export default function BookingPage() {
  return (
    <PageContainer useMutedGradient containerClassName="max-w-xl">
      <BookingForm />
    </PageContainer>
  )
}
