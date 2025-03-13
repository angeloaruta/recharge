import {
  AppointmentStatus,
  CreateAppointment,
  UpdateAppointment,
  appointmentSchema,
  updateAppointmentSchema,
} from "@recharge/utilities/schema"
import { checkIfNoValidFields, getUpdateData, safeParse } from "../../../utils/validation"
import { appointment as appointmentTable } from "@recharge/db/schema"
import * as HttpStatusCodes from "stoker/http-status-codes"
import { and, eq } from "drizzle-orm"
import { db } from "@recharge/db"

class AppointmentService {
  async getAppointment(id: string, confirmationCode: string) {
    const appointment = await db.query.appointment.findFirst({
      where: and(
        eq(appointmentTable.id, id),
        eq(appointmentTable.confirmationCode, confirmationCode),
      ),
    })

    if (!appointment) {
      throw Object.assign(new Error("Appointment not found"), {
        status: HttpStatusCodes.NOT_FOUND,
      })
    }

    const parsedAppointment = safeParse(appointmentSchema, appointment)

    return parsedAppointment
  }

  async createAppointment(body: CreateAppointment) {
    const [appointment] = await db.insert(appointmentTable).values(body).returning()

    if (!appointment) {
      throw Object.assign(new Error("Appointment not found"), {
        status: HttpStatusCodes.NOT_FOUND,
      })
    }

    const parsedAppointment = safeParse(appointmentSchema, appointment)

    return parsedAppointment
  }

  async updateAppointment(
    data: {
      id: string
      confirmationCode: string
    },
    body: UpdateAppointment,
  ) {
    const updateData = getUpdateData(updateAppointmentSchema, body)
    const noValidFields = checkIfNoValidFields(updateData)

    if (noValidFields) {
      throw Object.assign(new Error("No valid fields to update"), {
        status: HttpStatusCodes.BAD_REQUEST,
      })
    }

    const updatedAt = new Date()

    const [appointment] = await db
      .update(appointmentTable)
      .set({ ...updateData, updatedAt })
      .where(
        and(
          eq(appointmentTable.id, data.id),
          eq(appointmentTable.confirmationCode, data.confirmationCode),
        ),
      )
      .returning()

    if (!appointment) {
      throw Object.assign(new Error("Appointment not found"), {
        status: HttpStatusCodes.NOT_FOUND,
      })
    }

    const parsedAppointment = safeParse(appointmentSchema, appointment)

    return parsedAppointment
  }

  async cancelAppointment(
    data: {
      id: string
      confirmationCode: string
    },
    status: AppointmentStatus,
  ) {
    const { id, confirmationCode } = data

    const [appointment] = await db
      .update(appointmentTable)
      .set({ status })
      .where(
        and(eq(appointmentTable.id, id), eq(appointmentTable.confirmationCode, confirmationCode)),
      )
      .returning()

    if (!appointment) {
      throw Object.assign(new Error("Appointment not found"), {
        status: HttpStatusCodes.NOT_FOUND,
      })
    }

    const parsedAppointment = safeParse(appointmentSchema, appointment)

    return parsedAppointment
  }
}

export default AppointmentService
