import { z } from "zod"

// Base environment schema (strict validation for production)
const baseEnvSchema = z.object({
  DATABASE_URL: z.string().url(),
  NEXT_PUBLIC_API_URL: z.string().url(),
  NODE_ENV: z.enum(["development", "staging", "production"]).default("development"),
})

// Development environment schema (lenient validation)
const devEnvSchema = z.object({
  DATABASE_URL: z.string().default("postgresql://postgres:postgres@localhost:5432/recharge"),
  NEXT_PUBLIC_API_URL: z.string().default("http://localhost:3000"),
  NODE_ENV: z.enum(["development", "staging", "production"]).default("development"),
})

// Select schema based on environment
const envSchema = process.env.NODE_ENV === "production" ? baseEnvSchema : devEnvSchema

export type Env = z.infer<typeof envSchema>

function getEnv(): Env {
  try {
    const result = envSchema.parse({
      ...process.env,
    })
    return result
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

export const env = getEnv()

export function isProduction(): boolean {
  return env.NODE_ENV === "production"
}

export function isDevelopment(): boolean {
  return env.NODE_ENV === "development"
}

export function isStaging(): boolean {
  return env.NODE_ENV === "staging"
}
