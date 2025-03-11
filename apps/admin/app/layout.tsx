import { ThemeProvider } from "@recharge/ui/providers/theme-provider"
import { cn } from "@recharge/ui/lib/utils"
import "@recharge/ui/globals.css"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Recharge Admin",
  description: "Recharge Admin",
  icons: {
    icon: "/favicon.ico",
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
        <div className="bg-background-200 min-h-vh relative">
          <main>
            <ThemeProvider>{children}</ThemeProvider>
          </main>
        </div>
      </body>
    </html>
  )
}
