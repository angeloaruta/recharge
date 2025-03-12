import {
  CreateAppointmentRoute,
  GetAppointmentRoute,
  UpdateAppointmentRoute,
} from "./appointment.routes"
import { appointmentSchema } from "@recharge/utilities/schema"
import { errorHandler } from "../../../utils/error-handler"
import * as HttpStatusCodes from "stoker/http-status-codes"
import AppointmentService from "./appointment.service"
import { AppRouteHandler } from "../../../lib/types"

export const getAppointment: AppRouteHandler<GetAppointmentRoute> = async (c) => {
  const params = await c.req.valid("param")
  const requestId = c.get("requestId")
  const { id, confirmationCode } = params
  const appointmentService = new AppointmentService()

  try {
    const appointment = await appointmentService.getAppointment(id, confirmationCode)

    return c.json(
      {
        data: appointmentSchema.parse(appointment),
        requestId,
      },
      HttpStatusCodes.OK,
    )
  } catch (error) {
    console.error(error)
    return errorHandler(c, error, requestId)
  }
}

export const createAppointment: AppRouteHandler<CreateAppointmentRoute> = async (c) => {
  const params = await c.req.valid("json")
  const requestId = c.get("requestId")
  const appointmentService = new AppointmentService()

  try {
    const appointment = await appointmentService.createAppointment(params)

    return c.json(
      {
        data: appointmentSchema.parse(appointment),
        requestId,
      },
      HttpStatusCodes.CREATED,
    )
  } catch (error) {
    console.error(error)
    return errorHandler(c, error, requestId)
  }
}

export const updateAppointment: AppRouteHandler<UpdateAppointmentRoute> = async (c) => {
  const params = await c.req.valid("param")
  const body = await c.req.valid("json")
  const requestId = c.get("requestId")
  const appointmentService = new AppointmentService()

  try {
    const appointment = await appointmentService.updateAppointment(params, body)

    return c.json(
      {
        data: appointmentSchema.parse(appointment),
        requestId,
      },
      HttpStatusCodes.OK,
    )
  } catch (error) {
    console.error(error)
    return errorHandler(c, error, requestId)
  }
}
