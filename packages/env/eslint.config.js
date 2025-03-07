import typescriptConfig from "@recharge/eslint-config/typescript"
import baseConfig from "@recharge/eslint-config/base"

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  ...baseConfig,
  ...typescriptConfig,
  {
    files: ["**/*.ts"],
    rules: {
      // Add env package specific rules here if needed
    },
  },
]
