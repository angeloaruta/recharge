import { config as baseConfig } from "@recharge/eslint-config/base"

/** @type {import("eslint").Linter.Config} */
export default [
  ...baseConfig,
  {
    rules: {
      // Add any API-specific rules here
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_|^e$|^t$|^r$|^x$|^err$|^error$",
          varsIgnorePattern: "^_|^e$|^t$|^r$|^x$|^err$|^error$",
          caughtErrorsIgnorePattern: "^_|^e$|^t$|^r$|^x$|^err$|^error$",
        },
      ],
    },
  },
]
