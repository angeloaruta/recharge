# Recharge Platform

A modern monorepo for the Recharge platform, built with Turborepo, Next.js, and Bun.

## What's inside?

This Turborepo includes the following apps and packages:

### Apps

- `admin`: Admin dashboard for managing the Recharge platform
- `web`: Customer-facing website for the Recharge platform

### Packages

- `@recharge/db`: Database client and schema definitions
- `@recharge/utils`: Shared utilities and environment variable validation
- `@recharge/ui`: Shared UI components used across applications
- `@recharge/eslint-config`: ESLint configurations for the monorepo
- `@recharge/tsconfig`: TypeScript configurations for the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

## Development

### Prerequisites

- [Bun](https://bun.sh/) (>= 1.0.0)
- [Node.js](https://nodejs.org/) (>= 18)

### Setup

1. Clone the repository
2. Install dependencies:

```bash
bun install
```

### Development

To develop all apps and packages:

```bash
bun dev
```

To develop a specific app or package:

```bash
bun dev --filter=<app_or_package_name>
```

### Build

To build all apps and packages:

```bash
bun run build
```

### Lint

To lint all apps and packages:

```bash
bun run lint
```

## Architecture

The Recharge platform follows a monorepo architecture with shared packages:

- Frontend apps are built with Next.js
- Database access is managed through the `@recharge/db` package
- UI components are shared through the `@recharge/ui` package
- Utilities and environment variables are managed through the `@recharge/utils` package

## Deployment

The apps can be deployed to Vercel or any other hosting platform that supports Next.js and Node.js.

## Environment Variables

This monorepo uses a centralized environment variable system. All environment variables are defined in a single `.env` file at the root of the monorepo.

### Setup

1. Copy the example environment file:

```bash
cp .env.example .env
```

2. Edit the `.env` file with your actual values.

### How It Works

- The `@recharge/utils/env` package automatically loads the root `.env` file
- It validates environment variables using Zod
- All apps and packages use this centralized system
- You only need to maintain a single `.env` file

### Adding New Environment Variables

When adding new environment variables:

1. Add them to the root `.env` file
2. Update the schema in `packages/utils/env/index.ts`
3. Update `.env.example` with the new variables (without real values)

## License

MIT
