import eslintConfigPrettier from "eslint-config-prettier"
import js from "@eslint/js"

/** @type {import("eslint").Linter.Config} */
export default [
  js.configs.recommended,
  eslintConfigPrettier,
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/.next/**",
      "**/out/**",
      "**/build/**",
      "**/.turbo/**",
      "**/.vercel/**",
    ],
  },
]
