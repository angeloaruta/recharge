"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Toaster } from "sonner"
import * as React from "react"

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      {children}
      <SpeedInsights />
      <Toaster richColors position="top-right" />
    </NextThemesProvider>
  )
}
