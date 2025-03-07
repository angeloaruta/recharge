import { type Config } from "drizzle-kit"

export default {
  schema: "./src/schema.ts",
  dialect: "postgresql",
  casing: "snake_case",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  out: "./migrations",
  tablesFilter: ["recharge_*"],
} satisfies Config
