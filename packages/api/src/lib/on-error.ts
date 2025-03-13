import type { ContentfulStatusCode, StatusCode } from "hono/utils/http-status"
import { INTERNAL_SERVER_ERROR, OK } from "stoker/http-status-codes"
import type { ErrorHandler } from "hono"

const onError: ErrorHandler = (err, c) => {
  const currentStatus = "status" in err ? err.status : c.newResponse(null).status
  const statusCode = currentStatus !== OK ? (currentStatus as StatusCode) : INTERNAL_SERVER_ERROR
  const env = c.env?.NODE_ENV || "development"
  const requestId = c.get("requestId")
  const errorResponse = {
    message: err.message,
    requestId,
    stack: env === "production" ? undefined : err.stack,
  }
  console.error({ ...errorResponse, stack: err.stack, requestId })
  return c.json(errorResponse, statusCode as ContentfulStatusCode)
}

export default onError
