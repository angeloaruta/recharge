import { appointmentCreateSchema, ApppointmentCreateSchema } from "@/schemas/appointment"
import { formatDateToISO } from "@recharge/ui/lib/date"
import { apiErrorHandler } from "@/lib/error-handler"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const requestId = request.headers.get("x-request-id")
  try {
    const body = await request.json()
    appointmentCreateSchema.parse({
      ...body,
      date: new Date(body.date),
    })
    return NextResponse.json({ message: "Appointment created", requestId })
  } catch (error) {
    return apiErrorHandler(error, {
      message: "Failed to create appointment",
      requestId: requestId!,
    })
  }
}
