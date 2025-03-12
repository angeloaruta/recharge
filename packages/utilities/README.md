# @recharge/utilities

A collection of utility functions for the Recharge application.

## Installation

```bash
# From the root of the monorepo
bun add @recharge/utilities@workspace:*
```

## Usage

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

## Development

```bash
# Build the package
bun run build

# Watch mode during development
bun run dev
```
