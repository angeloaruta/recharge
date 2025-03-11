import {
  CreateAppointment,
  UpdateAppointment,
  updateAppointmentSchema,
} from "./apppointment.schema"
import { checkIfNoValidFields, getUpdateData } from "../../../utils/validation"
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

    return appointment
  }

  async createAppointment(body: CreateAppointment) {
    const [appointment] = await db.insert(appointmentTable).values(body).returning()

    if (!appointment) {
      throw Object.assign(new Error("Appointment not found"), {
        status: HttpStatusCodes.NOT_FOUND,
      })
    }

    return appointment
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

    const [appointment] = await db
      .update(appointmentTable)
      .set(updateData)
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

    return appointment
  }
}

export default AppointmentService
