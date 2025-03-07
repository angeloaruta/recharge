import type { ContentfulStatusCode, StatusCode } from "hono/utils/http-status"
import { INTERNAL_SERVER_ERROR, OK } from "stoker/http-status-codes"
import type { ErrorHandler } from "hono"
import { env } from "@recharge/env"
const onError: ErrorHandler = (err, c) => {
  const currentStatus = "status" in err ? err.status : c.newResponse(null).status
  const statusCode = currentStatus !== OK ? (currentStatus as StatusCode) : INTERNAL_SERVER_ERROR
  const environment = env.NODE_ENV || "development"
  const requestId = c.get("requestId")
  const errorResponse = {
    message: err.message,
    requestId,
    stack: environment === "production" ? undefined : err.stack,
  }
  console.error({ ...errorResponse, stack: err.stack, requestId })
  return c.json(errorResponse, statusCode as ContentfulStatusCode)
}

export default onError
