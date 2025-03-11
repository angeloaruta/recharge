import type { OpenAPIHono, RouteConfig, RouteHandler } from "@hono/zod-openapi"
import type { Input, MiddlewareHandler } from "hono"

export type AppBindings = {
  Variables: {
    requestId: string
  }
}

export type AppOpenAPI = OpenAPIHono<AppBindings>

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<R, AppBindings>

export type AppMiddlewareHandler = MiddlewareHandler<AppBindings, string, Input>
