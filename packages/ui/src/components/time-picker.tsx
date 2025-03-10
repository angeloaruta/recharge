"use client"

import { Check, Clock } from "lucide-react"
import { useEffect, useState } from "react"
import * as React from "react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@recharge/ui/components/select"
import { Popover, PopoverContent, PopoverTrigger } from "@recharge/ui/components/popover"
import { Button } from "@recharge/ui/components/button"
import { Label } from "@recharge/ui/components/label"
import { Card } from "@recharge/ui/components/card"
import { presetTimes } from "@recharge/ui/lib/date"

export default function TimePicker({
  value,
  onChange,
}: {
  value?: string
  onChange?: (time: string) => void
}) {
  const [selectedTime, setSelectedTime] = useState<string>(value || "")
  const [hours, setHours] = useState<string>("")
  const [minutes, setMinutes] = useState<string>("")
  const [period, setPeriod] = useState<"AM" | "PM">("AM")
  const [open, setOpen] = useState(false)

  // Update internal state when value prop changes
  useEffect(() => {
    if (value) {
      setSelectedTime(value)
    }
  }, [value])

  // Generate hours (1-12)
  const hourOptions = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"))

  // Generate minutes (00-55, step 5)
  const minuteOptions = Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, "0"))

  const handleSelect = () => {
    if (hours && minutes) {
      let hour = Number.parseInt(hours)

      // Convert to 24-hour format for internal value
      if (period === "PM" && hour < 12) hour += 12
      if (period === "AM" && hour === 12) hour = 0

      const formattedHour = String(hour).padStart(2, "0")
      const formattedTime = `${formattedHour}:${minutes}`

      setSelectedTime(formattedTime)
      if (onChange) {
        onChange(formattedTime)
      }
      setOpen(false)
    }
  }

  const displayTime = React.useMemo(() => {
    if (!selectedTime) return ""

    const [hour, minute] = selectedTime.split(":")
    const hourNum = Number.parseInt(hour!)
    let displayHour = hourNum % 12
    if (displayHour === 0) displayHour = 12

    return `${displayHour}:${minute} ${hourNum >= 12 ? "PM" : "AM"}`
  }, [selectedTime])

  return (
    <div className="w-full space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select time"
            className="h-9 w-full justify-between rounded-none"
          >
            {displayTime || <span className="text-muted-foreground">Select time</span>}
            <Clock className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Card className="border-0 shadow-none">
            <div className="space-y-4 p-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Select time</h4>
                {hours && minutes && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 gap-1 rounded-none text-xs"
                    onClick={handleSelect}
                  >
                    <Check className="h-3.5 w-3.5" />
                    Apply
                  </Button>
                )}
              </div>

              <div className="flex gap-2">
                <div className="flex-1">
                  <Label htmlFor="hours" className="text-xs">
                    Hour
                  </Label>
                  <Select value={hours} onValueChange={setHours}>
                    <SelectTrigger id="hours" className="rounded-none">
                      <SelectValue placeholder="Hour" />
                    </SelectTrigger>
                    <SelectContent>
                      {hourOptions.map((hour) => (
                        <SelectItem key={hour} value={hour}>
                          {hour}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex-1">
                  <Label htmlFor="minutes" className="text-xs">
                    Minute
                  </Label>
                  <Select value={minutes} onValueChange={setMinutes}>
                    <SelectTrigger id="minutes" className="rounded-none">
                      <SelectValue placeholder="Minute" />
                    </SelectTrigger>
                    <SelectContent>
                      {minuteOptions.map((minute) => (
                        <SelectItem key={minute} value={minute}>
                          {minute}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex-1">
                  <Label htmlFor="period" className="text-xs">
                    Period
                  </Label>
                  <Select value={period} onValueChange={(value) => setPeriod(value as "AM" | "PM")}>
                    <SelectTrigger id="period" className="rounded-none">
                      <SelectValue placeholder="Period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AM">AM</SelectItem>
                      <SelectItem value="PM">PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {presetTimes().map((preset) => (
                  <Button
                    key={preset}
                    variant="outline"
                    size="sm"
                    className="h-8 rounded-none text-xs"
                    onClick={() => {
                      if (preset === "Current") {
                        const now = new Date()
                        const hours = String(now.getHours()).padStart(2, "0")
                        const minutes = String(Math.floor(now.getMinutes() / 5) * 5).padStart(
                          2,
                          "0",
                        )
                        const formattedTime = `${hours}:${minutes}`
                        setSelectedTime(formattedTime)
                        if (onChange) {
                          onChange(formattedTime)
                        }
                        setOpen(false)
                      } else {
                        const [time, period] = preset.split(" ")
                        const [hour, minute] = time!.split(":")
                        let hourNum = Number.parseInt(hour!)

                        if (period === "PM" && hourNum < 12) hourNum += 12
                        if (period === "AM" && hourNum === 12) hourNum = 0

                        const formattedTime = `${String(hourNum).padStart(2, "0")}:${minute}`
                        setSelectedTime(formattedTime)
                        if (onChange) {
                          onChange(formattedTime)
                        }
                        setOpen(false)
                      }
                    }}
                  >
                    {preset}
                  </Button>
                ))}
              </div>
            </div>
          </Card>
        </PopoverContent>
      </Popover>
    </div>
  )
}
