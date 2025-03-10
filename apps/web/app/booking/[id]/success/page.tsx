import { Card, CardContent, CardFooter, CardHeader } from "@recharge/ui/components/card"
import { AddToCalendarButton } from "@recharge/ui/components/add-to-calendar-button"
import { GradientBackground } from "@/components/layout/gradient-background"
import { Button } from "@recharge/ui/components/button"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function SuccessPage() {
  // Example appointment data - in a real app, this would come from your booking data
  const appointmentDate = "2023-05-15"
  const appointmentTime = "10:00"
  const appointmentEndTime = "11:00"
  const appointmentLocation = "123 Main St, Anytown, USA"

  return (
    <section className="relative isolate flex min-h-screen flex-col items-center justify-center bg-gradient-to-b px-6 py-12 lg:px-8">
      <GradientBackground type="top" />
      <div className="mx-auto max-w-md">
        <Card className="border-muted/40 bg-background ring-muted/30 before:from-muted/80 before:to-muted/20 rounded-none shadow-none ring-1 before:absolute before:inset-0 before:-z-10 before:translate-y-2 before:scale-[0.98] before:bg-gradient-to-b before:blur-xl before:content-['']">
          <CardHeader className="flex flex-col items-center space-y-2 pb-2 text-center">
            <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/30">
              <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-500" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Booking Requested!</h1>
            <p className="text-muted-foreground">
              Your appointment has been successfully requested. We will review your request and send
              you a confirmation email once it is approved.
            </p>
          </CardHeader>

          <CardContent className="space-y-4 px-6 py-4">
            <div className="bg-muted/50 p-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Date & Time</p>
                  <p className="font-medium">May 15, 2023 • 10:00 AM</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Location</p>
                  <p className="font-medium">{appointmentLocation}</p>
                </div>
              </div>
            </div>

            <div className="border-muted-foreground/30 border border-dashed p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Confirmation Code</p>
                  <p className="font-mono text-lg font-semibold">BKNG-12345</p>
                </div>
                <AddToCalendarButton
                  name="Your Appointment"
                  description="Appointment booking from our service"
                  location={appointmentLocation}
                  startDate={appointmentDate}
                  startTime={appointmentTime}
                  endTime={appointmentEndTime}
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
