import { configureOpenAPI } from "@/lib/configure-open-api"
import createApp from "@/lib/create-app"
import { appointment } from "@/routes"
import { env } from "@recharge/env"

const app = createApp()

const routes = [appointment]

configureOpenAPI(app)

routes.forEach((route) => {
  app.route("/", route)
})

app.get("/health", (c) => {
  return c.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    requestId: c.get("requestId"),
    environment: env.NODE_ENV,
  })
})

// Export the app as default
export default app
