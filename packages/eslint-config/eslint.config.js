import prettier from "eslint-config-prettier"
import { baseConfig } from "./base.js"
import js from "@eslint/js"

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  ...baseConfig,
  {
    ignores: ["*.d.ts"],
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
