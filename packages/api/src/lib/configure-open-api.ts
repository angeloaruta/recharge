import { apiReference } from "@scalar/hono-api-reference"

import packageJson from "../../package.json"

import type { AppOpenAPI } from "./types"

export const docsPath = "docs"
export const apiReferencePath = "reference"

export function configureOpenAPI(app: AppOpenAPI) {
  app.doc(docsPath, {
    openapi: "3.1.0",
    info: {
      version: packageJson.version,
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
