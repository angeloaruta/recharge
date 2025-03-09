import baseConfig from "@recharge/utils/src/eslint/base.js"

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  ...baseConfig,
  {
    ignores: ["packages/*/eslint.config.js", "apps/*/eslint.config.mjs"],
  },
]
