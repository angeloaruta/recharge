import defaultHook from "stoker/openapi/default-hook"
import { OpenAPIHono } from "@hono/zod-openapi"
import { notFound } from "stoker/middlewares"
import { prettyJSON } from "hono/pretty-json"
import { requestId } from "hono/request-id"
import type { AppBindings } from "./types"
import { logger } from "hono/logger"
import onError from "./on-error"

export const platformPath = "/api/platform"
export const publicPath = "/api/public"

export default function createApp() {
  const app = createRouter().basePath("/api")

  app.use(requestId())
  app.use(logger())

  // Generic middleware
  app.use(prettyJSON())

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
