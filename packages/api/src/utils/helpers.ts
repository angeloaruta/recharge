import { createMessageObjectSchema } from "stoker/openapi/schemas"
import { responseSchema } from "@recharge/utilities/schema"
import * as HttpStatusCodes from "stoker/http-status-codes"
import { jsonContent } from "stoker/openapi/helpers"
import { ZodSchema } from "zod"

export const commonResponses = {
  [HttpStatusCodes.BAD_REQUEST]: jsonContent(
    createMessageObjectSchema("Bad request"),
    "Bad request",
  ),
  [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
    createMessageObjectSchema("Internal server error"),
    "Internal server error",
  ),
  [HttpStatusCodes.NOT_FOUND]: jsonContent(createMessageObjectSchema("Not found"), "Not found"),
  [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
    createMessageObjectSchema("Unauthorized"),
    "Unauthorized",
  ),
  [HttpStatusCodes.FORBIDDEN]: jsonContent(createMessageObjectSchema("Forbidden"), "Forbidden"),
}

export const successResponse = (status: number, schema: ZodSchema) => {
  return {
    [status]: jsonContent(responseSchema(schema), "Success"),
  }
}

export const routeResponse = (status: number, schema: ZodSchema) => {
  return {
    ...successResponse(status, schema),
    ...commonResponses,
  }
}
