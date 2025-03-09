import { createTable } from "../utils.ts"
import { sql } from "drizzle-orm"
import { nanoid } from "nanoid"

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
  status: t.text().notNull().default("pending"),
  createdAt: t
    .timestamp()
    .notNull()
    .default(sql`now()`),
  updatedAt: t
    .timestamp()
    .notNull()
    .default(sql`now()`),
}))
