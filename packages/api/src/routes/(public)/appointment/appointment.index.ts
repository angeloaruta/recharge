import * as handlers from "@recharge/api/routes/(public)/appointment/appointment.handlers"
import * as routes from "@recharge/api/routes/(public)/appointment/appointment.routes"
import { createRouter, publicPath } from "@recharge/api/lib/create-app"

const router = createRouter()
  .basePath(`${publicPath}/v1/appointment`)
  .openapi(routes.createAppointment, handlers.createAppointment)
  .openapi(routes.getAppointment, handlers.getAppointment)
  .openapi(routes.modifyAppointment, handlers.modifyAppointment)
  .openapi(routes.cancelAppointment, handlers.cancelAppointment)

export default router
