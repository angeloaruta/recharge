import {
  appointmentSchema,
  createAppointmentSchema,
  updateAppointmentSchema,
} from "./apppointment.schema"
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers"
import { createMessageObjectSchema } from "stoker/openapi/schemas"
import { responseSchema } from "../../../utils/common-schema"
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
    [HttpStatusCodes.OK]: jsonContent(responseSchema(appointmentSchema), "Appointment"),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      createMessageObjectSchema("Appointment not found"),
      "Appointment not found",
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      createMessageObjectSchema("Bad request"),
      "Bad request",
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      createMessageObjectSchema("Internal server error"),
      "Internal server error",
    ),
  },
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
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(responseSchema(appointmentSchema), "Appointment"),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      createMessageObjectSchema("Bad request"),
      "Bad request",
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      createMessageObjectSchema("Internal server error"),
      "Internal server error",
    ),
  },
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
  responses: {
    [HttpStatusCodes.OK]: jsonContent(responseSchema(appointmentSchema), "Appointment"),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      createMessageObjectSchema("Bad request"),
      "Bad request",
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      createMessageObjectSchema("Internal server error"),
      "Internal server error",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      createMessageObjectSchema("Appointment not found"),
      "Appointment not found",
    ),
  },
})

export type UpdateAppointmentRoute = typeof updateAppointment
