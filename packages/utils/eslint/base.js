import eslintConfigPrettier from "eslint-config-prettier"
import turboConfig from "eslint-config-turbo/flat"
import onlyWarn from "eslint-plugin-only-warn"
import turboPlugin from "eslint-plugin-turbo"
import tseslint from "typescript-eslint"
import js from "@eslint/js"
/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  ...turboConfig,
  {
    plugins: {
      turbo: turboPlugin,
    },
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/.next/**",
      "**/out/**",
      "**/build/**",
      "**/.turbo/**",
      "**/.vercel/**",
    ],
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
    },
  },
  {
    plugins: {
      onlyWarn,
    },
  },
  {
    ignores: ["dist/**"],
  },
]

export default config
