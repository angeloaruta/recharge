"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"

import { cn } from "@recharge/ui/lib/utils"

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string
    description: string
  }[]
  className?: string
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className={cn("grid grid-cols-1 py-2 md:grid-cols-2", className)}>
      {items.map((item, idx) => (
        <div
          key={item?.title}
          className="group relative block h-full w-full p-2"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 block h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8]"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15, ease: "easeInOut" },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, ease: "easeInOut" },
                }}
              />
            )}
          </AnimatePresence>
          <Card isHovered={hoveredIndex === idx}>
            <CardTitle isHovered={hoveredIndex === idx}>{item.title}</CardTitle>
            <CardDescription isHovered={hoveredIndex === idx}>{item.description}</CardDescription>
          </Card>
        </div>
      ))}
    </div>
  )
}

export const Card = ({
  className,
  children,
  isHovered = false,
}: {
  className?: string
  children: React.ReactNode
  isHovered?: boolean
}) => {
  return (
    <div
      className={cn(
        "relative z-20 h-full min-h-[50vh] w-full overflow-hidden border border-transparent bg-black p-4 transition-all duration-500",
        isHovered
          ? "border-slate-700 shadow-lg shadow-purple-500/10 dark:border-white/[0.2]"
          : "shadow-none",
        className,
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  )
}

export const CardTitle = ({
  className,
  children,
  isHovered = false,
}: {
  className?: string
  children: React.ReactNode
  isHovered?: boolean
}) => {
  return (
    <h3
      className={cn(
        "mt-4 font-bold tracking-wide transition-colors duration-300",
        isHovered ? "gradient-shimmer" : "text-zinc-100",
        className,
      )}
      style={{
        animation: isHovered
          ? "gradient-shimmer-once 5s cubic-bezier(0.25, 0.8, 0.25, 1) forwards"
          : "none",
      }}
    >
      {children}
    </h3>
  )
}

export const CardDescription = ({
  className,
  children,
  isHovered = false,
}: {
  className?: string
  children: React.ReactNode
  isHovered?: boolean
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-sm leading-relaxed tracking-wide transition-all duration-300",
        isHovered ? "text-zinc-200" : "text-zinc-400",
        className,
      )}
    >
      {children}
    </p>
  )
}
