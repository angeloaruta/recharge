import type { AppBindings } from "@recharge/api/lib/types"
import defaultHook from "stoker/openapi/default-hook"
import onError from "@recharge/api/lib/on-error"
import { OpenAPIHono } from "@hono/zod-openapi"
import { notFound } from "stoker/middlewares"
import { prettyJSON } from "hono/pretty-json"
import { requestId } from "hono/request-id"
import { logger } from "hono/logger"

export const platformPath = "/platform"
export const publicPath = "/public"

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
