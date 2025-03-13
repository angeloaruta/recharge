import * as HttpStatusCodes from "stoker/http-status-codes"
import { z } from "@hono/zod-openapi"
import { Context } from "hono"

export const errorHandler = (
  c: Context,
  error: unknown,
  requestId: string | undefined = crypto.randomUUID(),
) => {
  console.log(error)
  if (error instanceof z.ZodError) {
    return c.json(
      {
        message: "Validation Error",
        requestId,
      },
      HttpStatusCodes.BAD_REQUEST,
    )
  }
  const message = error instanceof Error ? error.message : "Internal server error"
  return c.json(
    {
      message,
      requestId,
    },
    HttpStatusCodes.INTERNAL_SERVER_ERROR,
  )
}
