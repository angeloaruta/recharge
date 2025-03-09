import { isTimeInFuture } from "@recharge/ui/lib/date"
import { z } from "zod"

export const bookingSchema = z
  .object({
    name: z
      .string()
      .min(2, {
        message: "Name must be at least 2 characters.",
      })
      .max(50, {
        message: "Name must not exceed 50 characters.",
      }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    phone: z.string().min(1, {
      message: "Please enter a phone number.",
    }),
    date: z.date(),
    time: z.string().min(1, {
      message: "Please select a time.",
    }),
    street: z.string().min(1, {
      message: "Please enter a street address.",
    }),
    city: z.string().min(1, {
      message: "Please enter a city.",
    }),
    province: z.string().min(1, {
      message: "Please enter a province.",
    }),
    postalCode: z.string().min(1, {
      message: "Please enter a postal code.",
    }),
    notes: z.string().optional(),
  })
  .refine((data) => isTimeInFuture(data.time, data.date), {
    message: "Selected time has already passed. Please choose a future time.",
    path: ["time"],
  })

export type BookingSchema = z.infer<typeof bookingSchema>
