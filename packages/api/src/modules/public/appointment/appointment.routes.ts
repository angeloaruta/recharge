import {
  appointmentSchema,
  createAppointmentSchema,
  updateAppointmentSchema,
} from "@recharge/utilities/schema"
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers"
import * as HttpStatusCodes from "stoker/http-status-codes"
import { routeResponse } from "../../../utils/helpers"
import { createRoute } from "@hono/zod-openapi"

const tags = ["Appointment"]

export const getAppointment = createRoute({
  tags,
  method: "get",
  path: "/:id/confirmation/:confirmationCode",
  description: "Get Appointment",
  request: {
    params: appointmentSchema.pick({ id: true, confirmationCode: true }),
  },
  responses: routeResponse(HttpStatusCodes.OK, appointmentSchema),
})

export type GetAppointmentRoute = typeof getAppointment

export const createAppointment = createRoute({
  tags,
  method: "post",
  path: "/",
  description: "Create Appointment",
  request: {
    body: jsonContentRequired(createAppointmentSchema, "Create Appointment"),
  },
  responses: routeResponse(HttpStatusCodes.CREATED, appointmentSchema),
})

export type CreateAppointmentRoute = typeof createAppointment

export const updateAppointment = createRoute({
  tags,
  method: "put",
  path: "/:id",
  description: "Update Appointment",
  request: {
    params: appointmentSchema.pick({ id: true, confirmationCode: true }),
    body: jsonContent(updateAppointmentSchema, "Update Appointment"),
  },
  responses: routeResponse(HttpStatusCodes.OK, appointmentSchema),
})

export type UpdateAppointmentRoute = typeof updateAppointment

export const cancelAppointment = createRoute({
  tags,
  method: "post",
  path: "/:id/cancel",
  description: "Cancel Appointment",
  request: {
    params: appointmentSchema.pick({ id: true, confirmationCode: true }),
    body: jsonContent(appointmentSchema.pick({ status: true }), "Cancel Appointment"),
  },
  responses: routeResponse(HttpStatusCodes.OK, appointmentSchema),
})

export type CancelAppointmentRoute = typeof cancelAppointment
