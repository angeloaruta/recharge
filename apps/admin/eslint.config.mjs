import { nextJsConfig as nextConfig } from "@recharge/eslint-config/next.js"

/** @type {import("eslint").Linter.FlatConfig[]} */
const config = [
  ...nextConfig,
  // ... existing code ...
]

export default config
