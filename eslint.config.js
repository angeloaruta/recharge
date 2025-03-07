import baseConfig from "@recharge/eslint-config/base"

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  ...baseConfig,
  {
    ignores: ["packages/*/eslint.config.js", "apps/*/eslint.config.mjs"],
  },
]
