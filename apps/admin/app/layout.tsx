import { Geist, Geist_Mono } from "next/font/google"

import { ThemeProvider } from "@recharge/ui/providers/theme-provider"

import "@recharge/ui/globals.css"
import { Metadata } from "next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

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
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <div className="bg-background-200 min-h-vh relative">
          <main>
            <ThemeProvider>{children}</ThemeProvider>
          </main>
        </div>
      </body>
    </html>
  )
}
