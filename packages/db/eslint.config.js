import { config as reactInternalConfig } from "@recharge/eslint-config/react-internal.js"

/** @type {import("eslint").Linter.FlatConfig[]} */
const config = [
  ...reactInternalConfig,
  // ... existing code ...
]

export default config
