import { createRouter, publicPath } from "@/lib/create-app"
import * as handlers from "./appointment.handlers"
import * as routes from "./appointment.routes"

const router = createRouter()
  .basePath(`${publicPath}/v1/appointment`)
  .openapi(routes.createAppointment, handlers.createAppointment)
  .openapi(routes.getAppointment, handlers.getAppointment)
  .openapi(routes.modifyAppointment, handlers.modifyAppointment)
  .openapi(routes.cancelAppointment, handlers.cancelAppointment)

export default router
