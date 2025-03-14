import { createRouter, publicPath } from "../../../lib/create-app"
import * as controller from "./appointment.controller"
import * as routes from "./appointment.routes"

const router = createRouter()
  .basePath(`${publicPath}/v1/appointment`)
  .openapi(routes.getAppointment, controller.getAppointment)
  .openapi(routes.createAppointment, controller.createAppointment)
  .openapi(routes.updateAppointment, controller.updateAppointment)
  .openapi(routes.cancelAppointment, controller.cancelAppointment)

export default router
