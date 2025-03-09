import { ArrowRight, ArrowUpRight } from "lucide-react"
import { cn } from "@recharge/ui/lib/utils"
import Link from "next/link"

interface HeroButtonProps {
  className?: string
  arrowUp?: boolean
  text: string
  href: string
}

export function HeroButton({ className, arrowUp = true, text, href }: HeroButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group text-foreground relative inline-flex items-center gap-1 font-semibold transition-colors",
        "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-amber-500 after:transition-all after:duration-300",
        "hover:text-amber-500 hover:after:w-full",
        className,
      )}
    >
      {text}
      {arrowUp && (
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
      {!arrowUp && (
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      )}
    </Link>
  )
}
