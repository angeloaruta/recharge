// packages/api/src/utils/controller-handler.ts
import { ContentfulStatusCode } from "hono/utils/http-status"
import * as HttpStatusCodes from "stoker/http-status-codes"
import { errorHandler } from "./error-handler"
import { AppBindings } from "../lib/types"
import { Context } from "hono"

/**
 * A generic controller handler that wraps route handlers with try-catch logic
 *
 * This utility function helps eliminate repetitive try-catch blocks in controllers
 * by providing a standard way to handle errors and format responses.
 *
 * Note: Due to type system limitations with OpenAPI route handlers, we need to use
 * type assertions. The actual response structure is correct at runtime and matches
 * the responseSchema defined in common-schema.ts.
 *
 * @example
 * export const getItem = async (c) => {
 *   return controllerHandler(async () => {
 *     const { id } = c.req.valid('param')
 *     const service = new ItemService()
 *     return await service.getItem(id)
 *   }, c)
 * }
 */
export const controllerHandler = async <T>(
  fn: () => Promise<T>,
  c: Context<AppBindings>,
  statusCode: ContentfulStatusCode = HttpStatusCodes.OK as ContentfulStatusCode,
) => {
  const requestId = c.get("requestId")

  try {
    const result = await fn()
    return c.json(
      {
        data: result,
        requestId,
      },
      statusCode,
    ) as any
  } catch (error) {
    return errorHandler(c, error, requestId)
  }
}
