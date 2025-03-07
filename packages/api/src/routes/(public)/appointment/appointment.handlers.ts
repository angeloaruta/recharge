import {
  CancelAppointmentRoute,
  CreateAppointmentRoute,
  GetAppointmentRoute,
  ModifyAppointmentRoute,
} from "@recharge/api/routes/(public)/appointment/appointment.routes"
import {
  appointmentSchema,
  modifyAppointmentSchema,
} from "@recharge/api/routes/(public)/appointment/appointment.schemas"
import { checkIfNoValidFields } from "@recharge/api/lib/utils"
import * as HttpStatusCodes from "stoker/http-status-codes"
import { AppRouteHandler } from "@recharge/api/lib/types"
import { getUpdateData } from "@recharge/api/lib/utils"

export const getAppointment: AppRouteHandler<GetAppointmentRoute> = async (c) => {
  const params = await c.req.valid("param")
  const { id, confirmationCode } = params
  const requestId = c.get("requestId")

  console.log("id", id)
  console.log("confirmationCode", confirmationCode)
  console.log("requestId", requestId)

  return c.json(appointmentSchema.parse({}), HttpStatusCodes.OK)
}

export const createAppointment: AppRouteHandler<CreateAppointmentRoute> = async (c) => {
  const body = await c.req.valid("json")
  const requestId = c.get("requestId")

  // Check if appointment time is in the future
  if (new Date(`${body.date}T${body.time}`) < new Date()) {
    return c.json(
      { message: "Appointment time must be in the future", requestId },
      HttpStatusCodes.BAD_REQUEST,
    )
  }

  return c.json(appointmentSchema.parse({}), HttpStatusCodes.CREATED)
}

export const modifyAppointment: AppRouteHandler<ModifyAppointmentRoute> = async (c) => {
  const body = await c.req.valid("json")
  const params = await c.req.valid("param")
  const { id, confirmationCode } = params
  const requestId = c.get("requestId")

  console.log("id", id)
  console.log("confirmationCode", confirmationCode)
  console.log("requestId", requestId)

  const updateData = getUpdateData(modifyAppointmentSchema, body)
  const noValidFields = checkIfNoValidFields(updateData)

  if (noValidFields) {
    return c.json({ message: "No valid fields to update", requestId }, HttpStatusCodes.BAD_REQUEST)
  }

  return c.json(appointmentSchema.parse({}), HttpStatusCodes.OK)
}

export const cancelAppointment: AppRouteHandler<CancelAppointmentRoute> = async (c) => {
  const params = await c.req.valid("param")
  const { id, confirmationCode } = params
  const requestId = c.get("requestId")

  console.log("id", id)
  console.log("confirmationCode", confirmationCode)
  console.log("requestId", requestId)

  return c.json(appointmentSchema.parse({}), HttpStatusCodes.OK)
}
