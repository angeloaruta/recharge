import { BAD_REQUEST } from "stoker/http-status-codes"
import type { z } from "@hono/zod-openapi"

export const getAllowedFields = <T extends z.ZodObject<z.ZodRawShape>>(schema: T) => {
  return Object.keys(schema.shape) as (keyof z.infer<T>)[]
}

export const getUpdateData = <T extends z.ZodObject<z.ZodRawShape>>(
  schema: T,
  data: z.infer<T>,
) => {
  const allowedFields = getAllowedFields(schema)
  return Object.fromEntries(
    Object.entries(data).filter(
      ([key, value]) =>
        allowedFields.includes(key as keyof z.infer<T>) &&
        value !== "" &&
        value !== null &&
        value !== undefined,
    ),
  )
}

export const checkIfNoValidFields = (updateData: Record<string, unknown>) => {
  return Object.keys(updateData).length === 0
}

export const safeParse = <T extends z.ZodObject<z.ZodRawShape>>(schema: T, data: unknown) => {
  const result = schema.safeParse(data)
  if (result.success) {
    return result.data as z.infer<T>
  } else {
    console.log(result.error)
    throw Object.assign(new Error("Validation failed"), {
      status: BAD_REQUEST,
    })
  }
}
