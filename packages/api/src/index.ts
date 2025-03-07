import { configureOpenAPI } from "@/lib/configure-open-api"
import createApp from "@/lib/create-app"
import { env } from "@recharge/env"
const app = createApp()

configureOpenAPI(app)

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
