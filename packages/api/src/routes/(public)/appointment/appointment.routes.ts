import {
  appointmentSchema,
  createAppointmentSchema,
  modifyAppointmentSchema,
} from "@recharge/api/routes/(public)/appointment/appointment.schemas"
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers"
import { createMessageObjectSchema } from "stoker/openapi/schemas"
import * as HttpStatusCodes from "stoker/http-status-codes"
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
  responses: {
    [HttpStatusCodes.OK]: jsonContent(appointmentSchema, "Appointment"),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      createMessageObjectSchema("Appointment not found"),
      "Appointment not found",
    ),
  },
})

export type GetAppointmentRoute = typeof getAppointment

export const createAppointment = createRoute({
  tags,
  method: "post",
  path: "/create",
  description: "Create Guest Appointment",
  request: {
    body: jsonContentRequired(createAppointmentSchema, "Create Appointment"),
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(appointmentSchema, "Appointment"),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      createMessageObjectSchema("Invalid Appointment"),
      "Invalid Appointment",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      createMessageObjectSchema("Appointment not found"),
      "Appointment not found",
    ),
  },
})

export type CreateAppointmentRoute = typeof createAppointment

export const modifyAppointment = createRoute({
  tags,
  method: "put",
  path: "/:id/confirmation/:confirmationCode/modify",
  description: "Modify Appointment",
  request: {
    params: appointmentSchema.pick({ id: true, confirmationCode: true }),
    body: jsonContentRequired(modifyAppointmentSchema, "Modify Appointment"),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(appointmentSchema, "Appointment"),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      createMessageObjectSchema("Invalid Appointment"),
      "Invalid Appointment",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      createMessageObjectSchema("Appointment not found"),
      "Appointment not found",
    ),
  },
})
export type ModifyAppointmentRoute = typeof modifyAppointment

export const cancelAppointment = createRoute({
  tags,
  method: "put",
  path: "/:id/confirmation/:confirmationCode/cancel",
  description: "Cancel Appointment",
  request: {
    params: appointmentSchema.pick({ id: true, confirmationCode: true }),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(appointmentSchema, "Appointment"),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      createMessageObjectSchema("Invalid Appointment"),
      "Invalid Appointment",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      createMessageObjectSchema("Appointment not found"),
      "Appointment not found",
    ),
  },
})

export type CancelAppointmentRoute = typeof cancelAppointment
