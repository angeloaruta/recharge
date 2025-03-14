import { cn } from "@recharge/ui/lib/utils"
import { Providers } from "@/lib/providers"
import "@recharge/ui/globals.css"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Recharge Admin",
  description: "Recharge Admin",
  icons: {
    icon: "./favicon.ico",
  },
  applicationName: "Recharge Admin",
  creator: "Recharge Admin",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("antialiased")}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
