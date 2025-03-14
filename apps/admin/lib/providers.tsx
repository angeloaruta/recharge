import { ThemeProvider } from "@recharge/ui/providers/theme-provider"

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider>{children}</ThemeProvider>
}
