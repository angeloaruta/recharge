import prettier from "eslint-config-prettier"
import js from "@eslint/js"

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  {
    ignores: ["**/node_modules/**", "**/dist/**", "**/.turbo/**"],
  },
  js.configs.recommended,
  {
    files: ["**/*.js"],
    rules: {
      "no-console": "warn",
    },
  },
  prettier,
]
