import { createTable } from "../utils"

export const user = createTable("user", (t) => ({
  id: t.text().primaryKey(),
  name: t.text().notNull(),
  email: t.text().notNull().unique(),
  emailVerified: t.boolean().notNull(),
  image: t.text(),
  createdAt: t.timestamp().notNull(),
  updatedAt: t.timestamp().notNull(),
}))

export const session = createTable("session", (t) => ({
  id: t.text().primaryKey(),
  expiresAt: t.timestamp().notNull(),
  token: t.text().notNull().unique(),
  createdAt: t.timestamp().notNull(),
  updatedAt: t.timestamp().notNull(),
  ipAddress: t.text(),
  userAgent: t.text(),
  userId: t
    .text()
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  activeOrganizationId: t.text(),
}))

export const account = createTable("account", (t) => ({
  id: t.text().primaryKey(),
  accountId: t.text().notNull(),
  providerId: t.text().notNull(),
  userId: t
    .text()
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: t.text(),
  refreshToken: t.text(),
  idToken: t.text(),
  accessTokenExpiresAt: t.timestamp(),
  refreshTokenExpiresAt: t.timestamp(),
  scope: t.text(),
  password: t.text(),
  createdAt: t.timestamp().notNull(),
  updatedAt: t.timestamp().notNull(),
}))

export const verification = createTable("verification", (t) => ({
  id: t.text().primaryKey(),
  identifier: t.text().notNull(),
  value: t.text().notNull(),
  expiresAt: t.timestamp().notNull(),
  createdAt: t.timestamp().notNull(),
  updatedAt: t.timestamp().notNull(),
}))

export const organization = createTable("organization", (t) => ({
  id: t.text().primaryKey(),
  name: t.text().notNull(),
  slug: t.text().notNull().unique(),
  logo: t.text(),
  createdAt: t.timestamp().notNull(),
  metadata: t.text(),
}))

export const member = createTable("member", (t) => ({
  id: t.text().primaryKey(),
  organizationId: t
    .text()
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),
  userId: t
    .text()
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  role: t.text().notNull(),
  teamId: t.text(),
  createdAt: t.timestamp().notNull(),
}))

export const invitation = createTable("invitation", (t) => ({
  id: t.text().primaryKey(),
  organizationId: t
    .text()
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),
  email: t.text().notNull(),
  role: t.text(),
  teamId: t.text(),
  status: t.text().notNull(),
  expiresAt: t.timestamp().notNull(),
  inviterId: t
    .text()
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
}))

export const team = createTable("team", (t) => ({
  id: t.text().primaryKey(),
  name: t.text().notNull(),
  organizationId: t
    .text()
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),
  createdAt: t.timestamp().notNull(),
  updatedAt: t.timestamp(),
}))
