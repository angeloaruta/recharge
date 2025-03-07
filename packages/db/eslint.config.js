import tseslint from "@typescript-eslint/eslint-plugin"
import baseConfig from "@recharge/eslint-config/base"
import tsParser from "@typescript-eslint/parser"
import importPlugin from "eslint-plugin-import"

// Create a custom TypeScript configuration that disables the version warning
const customTsConfig = [
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@typescript-eslint": tseslint,
      import: importPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        warnOnUnsupportedTypeScriptVersion: false,
      },
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
]

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  ...baseConfig,
  ...customTsConfig,
  {
    // Add db package specific rules here
    files: ["**/*.ts"],
    rules: {
      // Example: Enforce explicit return types for database functions
      "@typescript-eslint/explicit-function-return-type": [
        "error",
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
        },
      ],
    },
  },
]
