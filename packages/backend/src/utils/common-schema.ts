import { ZodSchema } from "zod"
import { z } from "zod"

export const responseSchema = <T extends ZodSchema>(schema: T) => {
  return z.object({
    data: schema,
    requestId: z.string(),
  })
}
