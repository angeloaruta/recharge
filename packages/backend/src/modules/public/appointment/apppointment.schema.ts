import { z } from "@hono/zod-openapi"

const appointmentStatusEnum = z.enum(["pending", "confirmed", "cancelled", "completed"])

export const appointmentSchema = z
  .object({
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
    date: z.string().min(1, {
      message: "Please select a date.",
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
    status: appointmentStatusEnum.default("pending"),
    confirmationCode: z.string(),
  })
  .openapi({
    description: "Appointment",
    example: {
      id: "123e4567-e89b-12d3-a456-426614174000",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "1234567890",
      date: "2025-01-01",
      time: "10:00",
      street: "123 Main St",
      city: "Anytown",
      province: "ON",
      postalCode: "12345",
      notes: "This is a note",
      createdAt: new Date("2025-01-01"),
      updatedAt: new Date("2025-01-01"),
      status: "pending",
      confirmationCode: "123456",
    },
  })

export const createAppointmentSchema = appointmentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  status: true,
  confirmationCode: true,
})

export const updateAppointmentSchema = appointmentSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    confirmationCode: true,
  })
  .partial()

export type Appointment = z.infer<typeof appointmentSchema>
export type CreateAppointment = z.infer<typeof createAppointmentSchema>
export type UpdateAppointment = z.infer<typeof updateAppointmentSchema>
