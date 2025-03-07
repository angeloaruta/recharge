import { z } from "zod"

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NODE_ENV: z.enum(["development", "staging", "production"]).default("development"),
})

export type Env = z.infer<typeof envSchema>

function getEnv(): Env {
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
