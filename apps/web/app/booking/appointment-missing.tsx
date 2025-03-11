import { GradientBackground } from "@/components/layout/gradient-background"
import { Card, CardContent, CardHeader } from "@recharge/ui/components/card"
import { Button } from "@recharge/ui/components/button"
import Link from "next/link"

export function AppointmentMissing() {
  return (
    <section className="relative isolate flex min-h-screen flex-col items-center justify-center bg-gradient-to-b px-6 py-12 lg:px-8">
      <GradientBackground type="top" />
      <div className="mx-auto w-full max-w-md">
        <Card className="border-muted/40 bg-background ring-muted/30 before:from-muted/80 before:to-muted/20 rounded-none shadow-none ring-1 before:absolute before:inset-0 before:-z-10 before:translate-y-2 before:scale-[0.98] before:bg-gradient-to-b before:blur-xl before:content-['']">
          <CardHeader className="pb-4 text-center">
            <h1 className="text-2xl font-bold">Appointment Not Found</h1>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4 pb-6 text-center">
            <p className="text-muted-foreground">
              We couldn&apos;t find the appointment you&apos;re looking for. It may have been
              cancelled or the link is incorrect.
            </p>
            <Button asChild className="mt-4">
              <Link href="/">Return to Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
