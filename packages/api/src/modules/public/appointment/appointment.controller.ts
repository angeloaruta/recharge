import {
  CancelAppointmentRoute,
  CreateAppointmentRoute,
  GetAppointmentRoute,
  UpdateAppointmentRoute,
} from "./appointment.routes"
import { controllerHandler } from "../../../utils/controller-handler"
import * as HttpStatusCodes from "stoker/http-status-codes"
import AppointmentService from "./appointment.service"
import { AppRouteHandler } from "../../../lib/types"

export const getAppointment: AppRouteHandler<GetAppointmentRoute> = async (c) =>
  controllerHandler(
    async () => {
      const params = await c.req.valid("param")
      const { id, confirmationCode } = params
      const appointmentService = new AppointmentService()
      return await appointmentService.getAppointment(id, confirmationCode)
    },
    c,
    HttpStatusCodes.OK,
  )

export const createAppointment: AppRouteHandler<CreateAppointmentRoute> = async (c) =>
  controllerHandler(
    async () => {
      const params = await c.req.valid("json")
      const appointmentService = new AppointmentService()
      return await appointmentService.createAppointment(params)
    },
    c,
    HttpStatusCodes.CREATED,
  )

export const updateAppointment: AppRouteHandler<UpdateAppointmentRoute> = async (c) =>
  controllerHandler(
    async () => {
      const params = await c.req.valid("param")
      const body = await c.req.valid("json")
      const appointmentService = new AppointmentService()
      return await appointmentService.updateAppointment(params, body)
    },
    c,
    HttpStatusCodes.OK,
  )

export const cancelAppointment: AppRouteHandler<CancelAppointmentRoute> = async (c) =>
  controllerHandler(
    async () => {
      const params = await c.req.valid("param")
      const body = await c.req.valid("json")
      const appointmentService = new AppointmentService()
      return await appointmentService.cancelAppointment(params, body.status)
    },
    c,
    HttpStatusCodes.OK,
  )
