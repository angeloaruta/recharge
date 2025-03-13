import { z } from "@hono/zod-openapi"

export const responseSchema = <T extends z.ZodSchema>(schema: T) => {
  return z.object({
    data: schema,
    requestId: z.string().uuid(),
  })
}

export type ResponseSchema<T extends z.ZodSchema> = z.infer<ReturnType<typeof responseSchema<T>>>
