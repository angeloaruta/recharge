import baseConfig from "@recharge/eslint-config/base"

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  ...baseConfig,
  {
    // Ignore all JSON files since they don't need linting
    ignores: ["**/*.json"],
  },
]
