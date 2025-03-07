import { configureOpenAPI } from "@recharge/api/lib/configure-open-api"
import { appointment } from "@recharge/api/routes/index"
import createApp from "@recharge/api/lib/create-app"
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
