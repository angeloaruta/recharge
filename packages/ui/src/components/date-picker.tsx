import { isValidBookingDate } from "@recharge/ui/lib/date"

import { Popover, PopoverContent, PopoverTrigger } from "@recharge/ui/components/popover"
import { Calendar } from "@recharge/ui/components/calendar"

interface DatePickerProps {
  trigger: React.ReactNode
  value: Date
  onChange: (date: Date) => void
}

export default function DatePicker({ trigger, value, onChange }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => date && onChange(date)}
          disabled={isValidBookingDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
