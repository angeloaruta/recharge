import { z } from "zod"

export const getAllowedFields = <T extends z.ZodTypeAny>(schema: T) => {
  // Handle ZodEffects by getting the inner type
  const actualSchema = schema instanceof z.ZodEffects ? schema.innerType() : schema

  // Ensure we're working with a ZodObject
  if (!(actualSchema instanceof z.ZodObject)) {
    throw new Error("Schema must be a ZodObject or ZodEffects wrapping a ZodObject")
  }

  return Object.keys(actualSchema.shape) as (keyof z.infer<typeof actualSchema>)[]
}

export const getUpdateData = <T extends z.ZodTypeAny>(schema: T, data: z.infer<T>) => {
  const allowedFields = getAllowedFields(schema)
  return Object.fromEntries(
    Object.entries(data).filter(
      ([key, value]) =>
        allowedFields.includes(key as string) &&
        value !== "" &&
        value !== null &&
        value !== undefined,
    ),
  )
}

export const checkIfNoValidFields = (updateData: Record<string, unknown>) => {
  return Object.keys(updateData).length === 0
}
