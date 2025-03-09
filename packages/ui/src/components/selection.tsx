import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@recharge/ui/components/select"

export interface SelectionProps {
  value: string
  placeholder: string
  onChange: (value: string) => void
  options: { label: string; value: string }[]
}

export function Selection({ value, placeholder, onChange, options }: SelectionProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
