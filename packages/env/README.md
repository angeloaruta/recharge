# Recharge Environment

Environment variable validation and typing for the Recharge platform. This package provides a type-safe way to access environment variables across all applications and services.

## Features

- Type-safe environment variables
- Runtime validation with Zod
- Environment-specific configurations
- Helpful error messages for missing variables

## Tech Stack

- [Zod](https://zod.dev) - TypeScript-first schema validation
- [dotenv](https://github.com/motdotla/dotenv) - Environment variable loading

## Getting Started

### Usage

```typescript
import { env } from "@recharge/env"

// Type-safe environment variables
const databaseUrl = env.DATABASE_URL
const nodeEnv = env.NODE_ENV

// Helper functions
if (env.isProduction()) {
  // Production-specific code
}
```

## Environment Variables

The package validates the following environment variables:

```
# Required
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/recharge

# Optional (with defaults)
NODE_ENV=development
```

## Development

### Adding New Environment Variables

1. Update the schema in `src/index.ts`
2. Add the variable to the appropriate `.env` files
3. Update this README with the new variable
