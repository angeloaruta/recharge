import { z } from "@hono/zod-openapi"

const appointmentStatusEnum = z.enum(["pending", "confirmed", "cancelled", "completed"])

export type AppointmentStatus = z.infer<typeof appointmentStatusEnum>

export const workerSchema = z.object({
  name: z.string(),
})

export const appointmentSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    date: z.string(),
    time: z.string(),
    street: z.string(),
    city: z.string(),
    province: z.string(),
    postalCode: z.string(),
    notes: z.string().optional(),
    status: appointmentStatusEnum.default("pending"),
    createdAt: z.string(),
    updatedAt: z.string(),
    worker: workerSchema.nullable().optional(),
    confirmationCode: z.string(),
  })
  .openapi("Appointment", {
    description: "Appointment",
    example: {
      id: "123",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "1234567890",
      date: "2021-01-01",
      time: "10:00",
      street: "123 Main St",
      city: "Anytown",
      province: "CA",
      postalCode: "12345",
      notes: "Some notes",
      status: "pending",
      createdAt: "2021-01-01T10:00:00Z",
      updatedAt: "2021-01-01T10:00:00Z",
      worker: null,
      confirmationCode: "123456",
    },
  })

export const createAppointmentSchema = appointmentSchema
  .omit({
    id: true,
    status: true,
    createdAt: true,
    updatedAt: true,
    worker: true,
    confirmationCode: true,
  })
  .openapi("CreateAppointment", {
    description: "Create an appointment",
    example: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "1234567890",
      date: "2021-01-01",
      time: "10:00",
      street: "123 Main St",
      city: "Anytown",
      province: "CA",
      postalCode: "12345",
      notes: "notes example",
    },
  })

export const modifyAppointmentSchema = appointmentSchema
  .omit({
    id: true,
    status: true,
    createdAt: true,
    updatedAt: true,
    worker: true,
    confirmationCode: true,
  })
  .openapi("ModifyAppointment", {
    description: "Modify an appointment",
    example: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "1234567890",
      date: "2021-01-01",
      time: "10:00",
      street: "123 Main St",
      city: "Anytown",
      province: "CA",
      postalCode: "12345",
      notes: "notes example",
    },
  })
