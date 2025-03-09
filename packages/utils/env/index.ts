import dotenv from "dotenv"
import path from "path"
import { z } from "zod"
import fs from "fs"

// Load the root .env file
function loadRootEnv() {
  try {
    // Find the monorepo root by looking for turbo.json
    const currentDir = process.cwd()
    let rootDir = currentDir

    // Try to find the monorepo root by looking for turbo.json
    while (!fs.existsSync(path.join(rootDir, "turbo.json"))) {
      const parentDir = path.dirname(rootDir)
      // If we've reached the filesystem root, stop searching
      if (parentDir === rootDir) {
        // Fallback to current directory if we can't find turbo.json
        rootDir = currentDir
        break
      }
      rootDir = parentDir
    }

    const envPath = path.join(rootDir, ".env")

    if (fs.existsSync(envPath)) {
      const envConfig = dotenv.parse(fs.readFileSync(envPath))

      // Set environment variables that aren't already defined
      for (const key in envConfig) {
        if (!process.env[key]) {
          process.env[key] = envConfig[key]
        }
      }

      console.log(`✅ Loaded environment variables from ${envPath}`)
    } else {
      console.warn(`⚠️ No .env file found at ${envPath}`)
    }
  } catch (error) {
    console.error("❌ Error loading .env file:", error)
  }
}

// Load the root .env file before parsing environment variables
loadRootEnv()

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
