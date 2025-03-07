# Recharge Database

The database client and schema definitions for the Recharge platform. This package provides a unified interface for database access across all applications and services.

## Features

- Type-safe database client
- Schema definitions and migrations
- Seeding utilities
- Query helpers

## Tech Stack

- [Drizzle ORM](https://orm.drizzle.team) - TypeScript ORM
- [PostgreSQL](https://www.postgresql.org) - Database
- [Zod](https://zod.dev) - TypeScript-first schema validation

## Getting Started

### Prerequisites

- [PostgreSQL](https://www.postgresql.org) (>= 14)
- [Bun](https://bun.sh/) (>= 1.0.0)

### Usage

```typescript
import { db } from "@recharge/db"

// Query example
const users = await db.query.users.findMany({
  where: { status: "active" },
  with: { profile: true },
})
```

### Database Setup

1. Create a PostgreSQL database
2. Set the `DATABASE_URL` environment variable
3. Run migrations:

```bash
bun db:migrate
```

4. (Optional) Seed the database:

```bash
bun db:seed
```

## Environment Variables

```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/recharge
```

## Development

To generate migrations after schema changes:

```bash
bun db:generate
```
