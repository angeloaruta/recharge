import { Hono } from "hono"

// Create a new Hono app
const app = new Hono().basePath("/api")

app.get("/hello", (c) => {
  return c.json({
    message: "Hello Hono!",
  })
})

// Export the app as default
export default app
