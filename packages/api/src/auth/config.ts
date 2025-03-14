import { dbConfig } from "./db-config"

export const defaultConfig = {
  appName: "Recharge Auth",
  secret: process.env.BETTER_AUTH_SECRET,
  baseUrl: process.env.BETTER_AUTH_URL,
  trustedOrigins: [process.env.BETTER_AUTH_URL!],
  debug: process.env.NODE_ENV === "development",
  database: dbConfig,
  cookies: {
    session: {
      name: "recharge_session",
    },
  },
}
