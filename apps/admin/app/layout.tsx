import { SidebarProvider, SidebarTrigger } from "@recharge/ui/components/sidebar"
import { AppBreadcrumb } from "@/components/breadcrumb/app-breadcrumb"
import { SidebarInset } from "@recharge/ui/components/sidebar"
import { Separator } from "@recharge/ui/components/separator"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { navs, user, teams } from "@/lib/navigation"
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
        <Providers>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4">
                  <SidebarTrigger className="-ml-1" />
                  <Separator orientation="vertical" className="mr-2 h-4" />
                  <AppBreadcrumb />
                </div>
              </header>
              <main className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</main>
            </SidebarInset>
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  )
}
