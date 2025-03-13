# @recharge/utilities

A collection of utility functions for the Recharge application.

## Features

- Common utility functions
- Schema validation helpers
- Type definitions

## Installation

```bash
# From the root of the monorepo
bun add @recharge/utilities@workspace:*
```

## Usage

### General Utilities

```typescript
import { sum, formatCurrency, delay } from "@recharge/utilities"

// Basic arithmetic
const result = sum(5, 3) // 8

// Format currency
const price = formatCurrency(19.99) // $19.99
const euroPrice = formatCurrency(19.99, "EUR") // €19.99

// Async delay
await delay(1000) // Wait for 1 second
```

### Schema Utilities

```typescript
import { createSchema } from "@recharge/utilities/schema"

// Create a validated schema
const userSchema = createSchema({
  name: "User",
  properties: {
    id: { type: "string", format: "uuid" },
    email: { type: "string", format: "email" },
    age: { type: "number", minimum: 18 },
  },
  required: ["id", "email"],
})

// Use the schema for validation
const validUser = userSchema.parse({
  id: "123e4567-e89b-12d3-a456-426614174000",
  email: "user@example.com",
  age: 25,
})
```

## Development

```bash
# Build the package
bun run build

# Watch mode during development
bun run dev
```
