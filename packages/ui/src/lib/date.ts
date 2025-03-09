export const DATE_FORMAT = "yyyy-MM-dd"

export const isValidBookingDate = (date: Date) => {
  // Get today's date with time set to midnight
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Calculate date 3 months from today
  const threeMonthsFromNow = new Date(today)
  threeMonthsFromNow.setMonth(today.getMonth() + 3)

  // Disable dates before today or after 3 months from now
  return date < today || date > threeMonthsFromNow
}

export const presetTimes = () => {
  const times = []
  for (let hour = 9; hour <= 20; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const displayHour = hour > 12 ? hour - 12 : hour
      const period = hour >= 12 ? "PM" : "AM"
      times.push(`${displayHour}:${minute.toString().padStart(2, "0")} ${period}`)
    }
  }
  return times
}

export const isTimeInFuture = (time: string, date: Date) => {
  // If date is today, validate that the time hasn't passed
  const today = new Date()
  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()

  if (!isToday) return true // No validation needed for future dates

  // Parse the time string (format: "HH:MM")
  const [hours, minutes] = time.split(":").map(Number)

  // Get current time
  const currentHour = today.getHours()
  const currentMinute = today.getMinutes()

  // Check if selected time is in the future
  return hours! > currentHour || (hours === currentHour && minutes! > currentMinute)
}

// Transform date to DD/MM/YYYY ISO format
export const formatDateToISO = (date: Date) => {
  return date.toISOString().split("T")[0]
}

export const formatDateToLocaleString = (date: string) => {
  return new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export const isPastDate = (date: string) => {
  return new Date(date) < new Date()
}
