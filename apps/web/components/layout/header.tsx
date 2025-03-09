"use client"

import { ModeToggle } from "@recharge/ui/components/mode-toggle"
import { cn } from "@recharge/ui/lib/utils"
import Link from "next/link"

import { useScroll } from "@recharge/ui/hooks/use-scroll"
import { HeroButton } from "../hero-button"

export function Header() {
  const scrolled = useScroll()
  return (
    <header
      className={cn(
        "inset fixed top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-black/10 bg-white/40 backdrop-blur-xl dark:border-white/10 dark:bg-black/40"
          : "bg-transparent",
      )}
    >
      <div
        className={cn(
          "container mx-auto flex items-center justify-between px-4 transition-all duration-300",
          scrolled ? "h-14" : "h-16",
        )}
      >
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-semibold">recharge.</span>
        </Link>
        <div className="flex items-center gap-4">
          {scrolled && (
            <div className="animate-in fade-in slide-in-from-right-5 duration-300">
              <HeroButton text="Book Now" href="/booking" />
            </div>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
