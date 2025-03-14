import {
  createTable,
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "@recharge/db/utils"
import { pgEnum } from "drizzle-orm/pg-core"
import { z } from "@hono/zod-openapi"
import { sql } from "drizzle-orm"
import { nanoid } from "nanoid"
import { user } from "./auth"

export const appointmentStatusEnum = pgEnum("appointment_status", [
  "pending",
  "confirmed",
  "cancelled",
  "completed",
])

export const appointment = createTable("appointment", (t) => ({
  id: t
    .uuid()
    .unique()
    .notNull()
    .$defaultFn(() => crypto.randomUUID())
    .primaryKey(),
  name: t.text().notNull(),
  email: t.text().notNull(),
  phone: t.text().notNull(),
  date: t.date().notNull(),
  time: t.time().notNull(),
  street: t.text().notNull(),
  city: t.text().notNull(),
  province: t.text().notNull(),
  postalCode: t.text().notNull(),
  confirmationCode: t
    .text()
    .unique()
    .notNull()
    .$defaultFn(() => nanoid(12)),
  notes: t.text(),
  status: appointmentStatusEnum("status").notNull().default("pending"),
  userId: t.text().references(() => user.id, { onDelete: "cascade" }),
  createdAt: t
    .timestamp()
    .notNull()
    .default(sql`now()`),
  updatedAt: t
    .timestamp()
    .notNull()
    .default(sql`now()`),
}))

export const appointmentSelectSchema = createSelectSchema(appointment, {
  date: z.coerce.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Please enter a valid date in ISO format (YYYY-MM-DD).",
  }),
  updatedAt: z.coerce.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Please enter a valid date in ISO format (YYYY-MM-DD).",
  }),
  createdAt: z.coerce.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Please enter a valid date in ISO format (YYYY-MM-DD).",
  }),
}).openapi("Appointment", {
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
    status: "pending",
    confirmationCode: "123456",
    userId: "user_123456789",
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
  },
})

export const appointmentInsertSchema = createInsertSchema(appointment).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  status: true,
  confirmationCode: true,
  userId: true,
})

export const appointmentUpdateSchema = createUpdateSchema(appointment).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  confirmationCode: true,
})

export const appointmentCancelSchema = createUpdateSchema(appointment).pick({
  status: true,
})

export const appointmentStatusEnumSchema = createSelectSchema(appointmentStatusEnum)

export type Appointment = z.infer<typeof appointmentSelectSchema>
export type CreateAppointment = z.infer<typeof appointmentInsertSchema>
export type UpdateAppointment = z.infer<typeof appointmentUpdateSchema>
export type CancelAppointment = z.infer<typeof appointmentCancelSchema>
export type AppointmentStatus = z.infer<typeof appointmentStatusEnumSchema>
