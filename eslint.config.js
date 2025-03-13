import baseConfig from "@recharge/eslint-config/base.js"

/** @type {import("eslint").Linter.FlatConfig[]} */
const config = [
  ...baseConfig,
  {
    ignores: ["packages/*/eslint.config.js", "apps/*/eslint.config.mjs"],
  },
]

export default config
