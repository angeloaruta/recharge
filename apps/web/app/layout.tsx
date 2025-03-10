import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { cn } from "@recharge/ui/lib/utils"
import { Providers } from "@/providers"
import "@recharge/ui/globals.css"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Recharge App",
  description: "Recharge Your Health at Home",
  icons: {
    icon: "/favicon.ico",
  },
  applicationName: "Recharge App",
  creator: "Recharge App",
  category: "Healthcare",
  keywords: [
    "Recharge",
    "Physical Therapy",
    "Home Healthcare",
    "Rehabilitation",
    "Telehealth",
    "Exercise Programs",
    "Recovery",
    "Home Exercises",
    "PT Exercises",
    "Pain Management",
    "Injury Recovery",
    "Remote Physical Therapy",
    "Mobility",
    "Strength Training",
    "Flexibility",
    "Healthcare Technology",
    "Wellness",
    "Rehabilitation Services",
    "Home Rehabilitation",
    "Physical Health",
    "Movement Therapy",
    "Healthcare App",
    "Therapeutic Exercise",
    "Patient Care",
    "Digital Healthcare",
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("antialiased")}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <div className="bg-background flex-1">
              <main>{children}</main>
            </div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
