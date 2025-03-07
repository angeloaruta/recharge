import path from "path"
import fs from "fs"

import dotenv from "dotenv"
import { z } from "zod"

// Load environment variables from the root .env file
const rootEnvPath = path.resolve(process.cwd(), ".env")
if (fs.existsSync(rootEnvPath)) {
  dotenv.config({ path: rootEnvPath })
}

// Define environment variable schema with Zod
const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url(),

  // App Settings
  NODE_ENV: z.enum(["development", "staging", "production"]).default("development"),
})

// Create a type from the schema
export type Env = z.infer<typeof envSchema>

// Parse and validate environment variables
function getEnv(): Env {
  // For client-side code, only include NEXT_PUBLIC_ variables
  if (typeof window !== "undefined") {
    const clientEnv = Object.keys(process.env)
      .filter((key) => key.startsWith("NEXT_PUBLIC_"))
      .reduce<Record<string, string | undefined>>((obj, key) => {
        return {
          ...obj,
          [key]: process.env[key],
        }
      }, {})

    return envSchema.parse({
      ...clientEnv,
      NODE_ENV: process.env.NODE_ENV,
    })
  }

  // For server-side code, include all variables
  try {
    return envSchema.parse(process.env)
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map((err) => err.path.join(".")).join(", ")

      throw new Error(
        `❌ Missing or invalid environment variables: ${missingVars}. Please check your .env file.`,
      )
    }
    throw error
  }
}

// Export the validated environment variables
export const env = getEnv()

// Export utility functions
export function isProduction(): boolean {
  return env.NODE_ENV === "production"
}

export function isDevelopment(): boolean {
  return env.NODE_ENV === "development"
}

export function isStaging(): boolean {
  return env.NODE_ENV === "staging"
}
