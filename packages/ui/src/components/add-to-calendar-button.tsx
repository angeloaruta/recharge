"use client"

import { Button } from "@recharge/ui/components/button"
import { atcb_action } from "add-to-calendar-button"
import { CalendarPlus } from "lucide-react"
import { useEffect, useState } from "react"
import "add-to-calendar-button"

type CalendarOption =
  | "Apple"
  | "Google"
  | "iCal"
  | "Microsoft365"
  | "Outlook.com"
  | "Yahoo"
  | "MicrosoftTeams"

interface AddToCalendarButtonProps {
  name: string
  description?: string
  location?: string
  startDate: string // Format: YYYY-MM-DD
  startTime?: string // Format: HH:MM
  endDate?: string // Format: YYYY-MM-DD
  endTime?: string // Format: HH:MM
  timeZone?: string
  size?: "default" | "sm" | "lg" | "icon"
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
}

export function AddToCalendarButton({
  name,
  description = "",
  location = "",
  startDate,
  startTime = "09:00",
  endDate,
  endTime = "10:00",
  timeZone = "America/New_York",
  size = "sm",
  variant = "outline",
}: AddToCalendarButtonProps) {
  const [mounted, setMounted] = useState(false)

  // Only render on client side to avoid hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const handleClick = () => {
    const config = {
      name,
      description,
      location,
      startDate,
      startTime,
      endDate: endDate || startDate,
      endTime,
      timeZone,
      options: [
        "Apple",
        "Google",
        "iCal",
        "Microsoft365",
        "Outlook.com",
        "Yahoo",
      ] as CalendarOption[],
      trigger: "click",
      iCalFileName: "appointment-reminder",
    }

    atcb_action(config)
  }

  return (
    <Button onClick={handleClick} size={size} variant={variant}>
      <CalendarPlus className="mr-1 h-4 w-4" />
      Add to Calendar
    </Button>
  )
}
