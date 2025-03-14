import appointment from "./src/modules/public/appointment/appointment.index"
import { configureOpenAPI } from "./src/lib/configure-open-api"
import createApp from "./src/lib/create-app"
import { auth } from "./src/lib/auth"
import { handle } from "hono/vercel"

const app = createApp().basePath("/api")
const routes = [appointment]

if (process.env.NODE_ENV === "development") {
  configureOpenAPI(app)
}

routes.forEach((route) => {
  app.route("/", route)
})

app.on(["POST", "GET"], "/auth/*", (c) => {
  return auth.handler(c.req.raw)
})

app.get("health", (c) => {
  return c.json({ message: "Hello Hono!", environment: process.env.NODE_ENV })
})

export default handle(app)
