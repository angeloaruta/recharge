import type { BetterAuthOptions } from "better-auth"
import { organization } from "better-auth/plugins"
import { magicLink } from "better-auth/plugins"
import { orgConfig } from "../auth/org-config"
import { defaultConfig } from "../auth/config"
import { openAPI } from "better-auth/plugins"
import { betterAuth } from "better-auth"

export const auth = betterAuth<BetterAuthOptions>({
  ...defaultConfig,
  plugins: [
    openAPI(),
    organization(orgConfig),
    magicLink({
      //   disableSignUp: true,
      sendMagicLink: async ({ email, token, url }) => {
        console.log("Sending magic link to", email, token, url)
      },
    }),
  ],
})
