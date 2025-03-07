import baseConfig from "./packages/eslint-config/base.js"

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  ...baseConfig,
  {
    // Root-level specific rules
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/.next/**",
      "**/out/**",
      "**/build/**",
      "**/.turbo/**",
      "**/.vercel/**",
      // Ignore package-specific ESLint configurations
      "packages/*/eslint.config.js",
      "apps/*/eslint.config.mjs",
    ],
  },
]
