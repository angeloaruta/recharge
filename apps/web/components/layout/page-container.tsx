import { GradientBackground } from "./gradient-background"
import { cn } from "@recharge/ui/lib/utils"
import { ReactNode } from "react"

interface PageContainerProps {
  children: ReactNode
  /** Whether to show gradient background at top */
  showTopGradient?: boolean
  /** Whether to show gradient background at bottom */
  showBottomGradient?: boolean
  /** Whether to use the muted gradient background */
  useMutedGradient?: boolean
  /** Additional classes for the section element */
  className?: string
  /** Additional classes for the container div */
  containerClassName?: string
}

export function PageContainer({
  children,
  showTopGradient = true,
  showBottomGradient = true,
  useMutedGradient = false,
  className,
  containerClassName,
}: PageContainerProps) {
  const gradientClass = useMutedGradient ? "from-background to-muted/30" : ""

  return (
    <section
      className={cn(
        "relative isolate flex min-h-screen flex-col justify-center bg-gradient-to-b",
        gradientClass,
        "px-6 pt-14 lg:px-8",
        className,
      )}
    >
      {showTopGradient && <GradientBackground type="top" />}
      <div className={cn("container mx-auto w-full max-w-7xl px-4", containerClassName)}>
        {children}
      </div>
      {showBottomGradient && <GradientBackground type="bottom" />}
    </section>
  )
}
