import baseConfig from "@recharge/eslint-config/base.js"

/** @type {import("eslint").Linter.FlatConfig[]} */
const config = [
  ...baseConfig,
  {
    ignores: ["*.d.ts"],
  },
]

export default config
