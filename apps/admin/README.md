# Recharge Admin Dashboard

The admin dashboard for the Recharge platform, built with Next.js. This application provides administrative tools for managing users, appointments, and other platform resources.

## Features

- User management
- Appointment scheduling and management
- Analytics and reporting
- System configuration

## Tech Stack

- [Next.js](https://nextjs.org) - React framework
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [@recharge/ui](../packages/ui) - Shared UI components
- [@recharge/api](../packages/api) - API client

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (>= 1.0.0)
- [Node.js](https://nodejs.org/) (>= 18)

### Development

```bash
# From the root of the monorepo
bun dev --filter=admin

# Or from the admin directory
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Create a `.env.local` file in the admin directory with the following variables:

```
NEXT_PUBLIC_API_URL=http://localhost:3002/api
```

## Deployment

The admin dashboard can be deployed to Vercel or any other hosting platform that supports Next.js.

```bash
bun run build
```
