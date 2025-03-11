import { NextResponse } from "next/server"
import postgres from "postgres"
import { z } from "zod"

export const apiErrorHandler = (error: unknown, data: { message?: string; requestId: string }) => {
  const { message = "Server Error", requestId } = data
  if (error instanceof postgres.PostgresError) {
    console.error("Request ID: ", requestId, "Postgres error", error.message)
    return NextResponse.json({ message: `${message}: Bad Request`, requestId }, { status: 400 })
  }

  if (error instanceof z.ZodError) {
    console.error("Request ID: ", requestId, "Zod error issues", error.issues)
    return NextResponse.json(
      { message: `${message}: Validation error`, requestId },
      { status: 400 },
    )
  }

  return NextResponse.json(
    { message: `${(error as Error).message}: ${error}`, requestId },
    { status: 500 },
  )
}
