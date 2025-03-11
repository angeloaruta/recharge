import { configureOpenAPI } from "./src/lib/configure-open-api"
import createApp from "./src/lib/create-app"
import { env } from "@recharge/utils/env"
import { handle } from "hono/vercel"

const app = createApp().basePath("/api")

configureOpenAPI(app)

app.get("health", (c) => {
  return c.json({ message: "Hello Hono!", environment: env.NODE_ENV })
})

export default handle(app)
