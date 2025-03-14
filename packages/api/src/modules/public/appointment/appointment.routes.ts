import {
  appointmentSelectSchema,
  appointmentInsertSchema,
  appointmentUpdateSchema,
  appointmentCancelSchema,
} from "@recharge/db/schema"
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
    params: appointmentSelectSchema.pick({ id: true, confirmationCode: true }),
  },
  responses: routeResponse(HttpStatusCodes.OK, appointmentSelectSchema),
})

export type GetAppointmentRoute = typeof getAppointment

export const createAppointment = createRoute({
  tags,
  method: "post",
  path: "/",
  description: "Create Appointment",
  request: {
    body: jsonContentRequired(appointmentInsertSchema, "Create Appointment"),
  },
  responses: routeResponse(HttpStatusCodes.CREATED, appointmentSelectSchema),
})

export type CreateAppointmentRoute = typeof createAppointment

export const updateAppointment = createRoute({
  tags,
  method: "put",
  path: "/:id/confirmation/:confirmationCode",
  description: "Update Appointment",
  request: {
    params: appointmentSelectSchema.pick({ id: true, confirmationCode: true }),
    body: jsonContent(appointmentUpdateSchema, "Update Appointment"),
  },
  responses: routeResponse(HttpStatusCodes.OK, appointmentSelectSchema),
})

export type UpdateAppointmentRoute = typeof updateAppointment

export const cancelAppointment = createRoute({
  tags,
  method: "put",
  path: "/:id/confirmation/:confirmationCode/cancel",
  description: "Cancel Appointment",
  request: {
    params: appointmentSelectSchema.pick({ id: true, confirmationCode: true }),
    body: jsonContent(appointmentCancelSchema, "Cancel Appointment"),
  },
  responses: routeResponse(HttpStatusCodes.OK, appointmentSelectSchema),
})

export type CancelAppointmentRoute = typeof cancelAppointment
