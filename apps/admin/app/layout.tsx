import { ThemeProvider } from "@recharge/ui/providers/theme-provider"
import { cn } from "@recharge/ui/lib/utils"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"

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
      <body className={cn("antialiased", GeistSans.className, GeistMono.className)}>
        <div className="bg-background-200 min-h-vh relative">
          <main>
            <ThemeProvider>{children}</ThemeProvider>
          </main>
        </div>
      </body>
    </html>
  )
}
