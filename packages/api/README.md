# @recharge/api

API client and server utilities for the Recharge platform. This package provides a unified interface for API access across all applications and services.

## Features

- **Type-safe API client**: Fully typed API client for frontend applications
- **API route handlers**: Modular and reusable route handlers for backend services
- **Request validation**: Automatic request validation using Zod schemas
- **OpenAPI integration**: Automatic OpenAPI documentation generation
- **Error handling**: Standardized error handling and response formatting
- **Middleware support**: Extensible middleware system for cross-cutting concerns
- **Vercel integration**: Seamless deployment to Vercel serverless functions

## Tech Stack

- [Hono](https://hono.dev) - Lightweight, ultrafast web framework
- [Zod](https://zod.dev) - TypeScript-first schema validation
- [OpenAPI](https://www.openapis.org) - API specification and documentation
- [Scalar](https://scalar.com) - Beautiful API documentation UI

## Architecture

The API package follows a modular architecture:

```
src/
├── config/       # Configuration settings
├── lib/          # Core library code
├── middleware/   # Request/response middleware
├── modules/      # API modules (endpoints)
│   ├── platform/ # Internal platform APIs
│   └── public/   # Public-facing APIs
└── utils/        # Utility functions
```

Each API module is organized into:

- **Controller**: Request handling and response formatting
- **Service**: Business logic and data access
- **Routes**: Route definitions and OpenAPI specifications
- **Index**: Module exports and route registration

## Getting Started

### Usage

#### Client-side

```typescript
import { api } from "@recharge/api/client"

// Fetch data with type safety
const { data } = await api.appointments.getAll()

// Create a new resource
const newAppointment = await api.appointments.create({
  date: "2023-10-15",
  time: "14:00",
  service: "haircut",
  customer: {
    name: "John Doe",
    email: "john@example.com",
  },
})
```

#### Server-side

```typescript
import { createRoute } from "@hono/zod-openapi"
import { z } from "zod"

// Define input schema
const appointmentSchema = z.object({
  date: z.string(),
  time: z.string(),
  service: z.string(),
  customer: z.object({
    name: z.string(),
    email: z.string().email(),
  }),
})

// Create API route
export const createAppointment = createRoute({
  method: "post",
  path: "/appointments",
  request: {
    body: {
      content: {
        "application/json": {
          schema: appointmentSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: appointmentSchema,
        },
      },
      description: "Appointment created successfully",
    },
  },
})
```

## Development

```bash
# Build the package
bun run build

# Watch mode during development
bun run dev

# View API documentation (in development mode)
# Navigate to http://localhost:3000/api/reference
```

## API Documentation

When running in development mode, the API documentation is available at:

- OpenAPI Spec: `/api/docs`
- API Reference UI: `/api/reference`
