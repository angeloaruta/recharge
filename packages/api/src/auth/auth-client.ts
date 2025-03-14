import { organizationClient, magicLinkClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/client"
import { accessControllerConfig } from "./org-config"

const client = createAuthClient({
  plugins: [
    organizationClient({
      ...accessControllerConfig,
    }),
    magicLinkClient(),
  ],
})

export default client
