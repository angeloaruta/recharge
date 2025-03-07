import { apiReference } from "@scalar/hono-api-reference"

import type { AppOpenAPI } from "@recharge/api/lib/types"

export const docsPath = "docs"
export const apiReferencePath = "reference"

export function configureOpenAPI(app: AppOpenAPI) {
  app.doc(docsPath, {
    openapi: "3.1.0",
    info: {
      version: "0.0.1",
      title: "Recharge Platform API",
    },
  })
  app.get(
    apiReferencePath,
    apiReference({
      theme: "kepler",
      spec: {
        url: docsPath,
      },
    }),
  )
}
