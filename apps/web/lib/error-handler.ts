import { NextResponse } from "next/server"
import { z } from "zod"

export const apiErrorHandler = (error: unknown, data: { message?: string; requestId: string }) => {
  const { message = "Server Error", requestId } = data
  if (error instanceof z.ZodError) {
    console.error("Request ID: ", requestId, "Zod error issues", error.issues)
    return NextResponse.json(
      { message: `${message}: Validation error`, requestId },
      { status: 500 },
    )
  } else {
    const message = (error as Error).message
    return NextResponse.json({ message: `${message}: ${error}`, requestId }, { status: 500 })
  }
}
