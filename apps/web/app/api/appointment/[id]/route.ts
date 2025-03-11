import {
  appointmentCreateSchema,
  appointmentSchema,
  appointmentUpdateSchema,
} from "@/schemas/appointment"
import { checkIfNoValidFields, getUpdateData } from "@/lib/update-handler"
import { appointment as appointmentTable } from "@recharge/db/schema"
import { NextRequest, NextResponse } from "next/server"
import { apiErrorHandler } from "@/lib/error-handler"
import { eq, and } from "drizzle-orm"
import { db } from "@recharge/db"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const searchParams = request.nextUrl.searchParams
  const confirmationCode = searchParams.get("confirmation_code")
  const requestId = request.headers.get("x-request-id")

  if (!confirmationCode) {
    return NextResponse.json(
      { message: "Confirmation code is required", requestId },
      { status: 400 },
    )
  }

  try {
    const appointment = await db.query.appointment.findFirst({
      where: and(
        eq(appointmentTable.id, id),
        eq(appointmentTable.confirmationCode, confirmationCode),
      ),
    })

    if (!appointment) {
      return NextResponse.json(
        {
          message: "Appointment not found",
          requestId,
        },
        { status: 404 },
      )
    }

    return NextResponse.json({
      data: appointmentSchema.parse({
        ...appointment,
        date: new Date(appointment.date),
      }),
      requestId,
    })
  } catch (error) {
    return apiErrorHandler(error, { message: "Failed to get appointment", requestId: requestId! })
  }
}

export const PUT = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params
  const searchParams = request.nextUrl.searchParams
  const confirmationCode = searchParams.get("confirmation_code")
  const requestId = request.headers.get("x-request-id")
  const body = await request.json()

  if (!confirmationCode) {
    return NextResponse.json(
      { message: "Confirmation code is required", requestId },
      { status: 400 },
    )
  }

  const updateData = getUpdateData(appointmentUpdateSchema, body)
  const noValidFields = checkIfNoValidFields(updateData)

  if (noValidFields) {
    return NextResponse.json({ message: "No valid fields to update", requestId }, { status: 400 })
  }

  try {
    const appointment = await db.query.appointment.findFirst({
      where: and(
        eq(appointmentTable.id, id),
        eq(appointmentTable.confirmationCode, confirmationCode),
      ),
    })

    if (!appointment) {
      return NextResponse.json({ message: "Appointment not found", requestId }, { status: 404 })
    }
  } catch (error) {
    return apiErrorHandler(error, { message: "Failed to get appointment", requestId: requestId! })
  }
}
