import { appointmentCreateSchema, appointmentSchema } from "@/schemas/appointment"
import { appointment as appointmentTable } from "@recharge/db/schema"
import { formatDateToISO } from "@recharge/ui/lib/date"
import { apiErrorHandler } from "@/lib/error-handler"
import { NextResponse } from "next/server"
import { db } from "@recharge/db"

export async function POST(request: Request) {
  const requestId = request.headers.get("x-request-id")
  try {
    const body = await request.json()
    const parsedBody = appointmentCreateSchema.parse({
      ...body,
      date: new Date(body.date),
    })

    const appointment = {
      ...parsedBody,
      date: formatDateToISO(parsedBody.date),
    } as typeof appointmentTable.$inferInsert

    const [insertedAppointment] = await db.insert(appointmentTable).values(appointment).returning()

    if (!insertedAppointment) {
      return NextResponse.json(
        {
          message: "Failed to create appointment",
          requestId,
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      data: appointmentSchema.parse({
        ...insertedAppointment,
        date: new Date(insertedAppointment.date),
      }),
      requestId,
    })
  } catch (error) {
    return apiErrorHandler(error, {
      message: "Failed to create appointment",
      requestId: requestId!,
    })
  }
}
