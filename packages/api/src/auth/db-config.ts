import { drizzleAdapter } from "better-auth/adapters/drizzle"
import * as schema from "@recharge/db/schema"
import { db } from "@recharge/db"

export const dbConfig = drizzleAdapter(db, {
  provider: "pg",
  schema,
})
