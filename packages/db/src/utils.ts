import { pgTableCreator } from "drizzle-orm/pg-core"
import { createSchemaFactory } from "drizzle-zod"
import { z } from "@hono/zod-openapi"

export const createTable = pgTableCreator((name) => `recharge_${name}`)

export const { createSelectSchema, createInsertSchema, createUpdateSchema } = createSchemaFactory({
  zodInstance: z,
})
