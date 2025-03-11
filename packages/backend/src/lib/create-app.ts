import defaultHook from "stoker/openapi/default-hook"
import { OpenAPIHono } from "@hono/zod-openapi"
import { notFound } from "stoker/middlewares"
import { requestId } from "hono/request-id"

import { AppBindings } from "./types"
import onError from "./on-error"

export default function createApp() {
  const app = createRouter()

  // Add loggers
  app.use(requestId())

  // Error handling
  app.onError(onError)
  app.notFound(notFound)

  return app
}

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    defaultHook,
    strict: false,
  })
}
