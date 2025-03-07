# Recharge API

The backend API service for the Recharge platform, built with Hono. This package provides the core API endpoints for the platform, handling authentication, data access, and business logic.

## Features

- RESTful API endpoints
- OpenAPI documentation
- Authentication and authorization
- Integration with the database

## Tech Stack

- [Hono](https://hono.dev) - Lightweight web framework
- [Zod](https://zod.dev) - TypeScript-first schema validation
- [OpenAPI](https://www.openapis.org) - API documentation
- [@recharge/db](../db) - Database client

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (>= 1.0.0)
- [Node.js](https://nodejs.org/) (>= 18)

### Development

```bash
# From the root of the monorepo
bun dev --filter=api

# Or from the api directory
bun run dev
```

The API will be available at [http://localhost:3002/api](http://localhost:3002/api).

API documentation is available at:

- OpenAPI Spec: [http://localhost:3002/api/docs](http://localhost:3002/api/docs)
- API Reference: [http://localhost:3002/api/reference](http://localhost:3002/api/reference)

## Environment Variables

Create a `.env` file in the api directory with the following variables:

```
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/recharge

# API Keys
API_KEY=your-api-key

# App Settings
NODE_ENV=development
```

## Deployment

The API can be deployed to any hosting platform that supports Node.js or Bun.
