# Recharge Customer Website

The customer-facing website for the Recharge platform, built with Next.js. This application provides the public interface for customers to book appointments, manage their accounts, and interact with the platform.

## Features

- User registration and authentication
- Appointment booking and management
- User profile management
- Service browsing and discovery

## Tech Stack

- [Next.js](https://nextjs.org) - React framework
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [@recharge/ui](../packages/ui) - Shared UI components
- [@recharge/utilities](../packages/utilities) - Shared utilities
- [@recharge/db](../packages/db) - Database client

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (>= 1.0.0)
- [Node.js](https://nodejs.org/) (>= 18)

### Development

```bash
# From the root of the monorepo
bun dev --filter=web

# Or from the web directory
bun dev
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

## Environment Variables

Create a `.env.local` file in the web directory with the following variables:

```
# Add your environment variables here
```

## Deployment

The website can be deployed to Vercel or any other hosting platform that supports Next.js.

```bash
bun run build
```
