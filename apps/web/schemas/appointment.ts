import { isTimeInFuture } from "@recharge/ui/lib/date"
import { addMonths } from "date-fns"
import { z } from "zod"

export const appointmentSchema = z.object({
  id: z.string().uuid(),
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
  date: z.date().max(addMonths(new Date(), 3), {
    message: "Please select a date within the next 3 months.",
  }),
  time: z.string().min(1, {
    message: "Please select a time.",
  }),
  street: z.string().min(1, {
    message: "Please enter a street address.",
  }),
  city: z.string().min(1, {
    message: "Please enter a city.",
  }),
  province: z
    .string({
      message: "Please enter a province.",
    })
    .min(1, {
      message: "Please enter a province.",
    }),
  postalCode: z.string().min(4, {
    message: "Please enter a postal code.",
  }),
  notes: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  status: z.enum(["pending", "confirmed", "cancelled", "completed"]),
  confirmCode: z.string(),
})

// Create the base schema first, then apply refinements
export const appointmentCreateSchema = appointmentSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    status: true,
    confirmCode: true,
  })
  .refine((data) => isTimeInFuture(data.time, data.date), {
    message: "Selected time has already passed. Please choose a future time.",
    path: ["time"],
  })

export type ApppointmentCreateSchema = z.infer<typeof appointmentCreateSchema>
