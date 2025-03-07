import reactHooksPlugin from "eslint-plugin-react-hooks"
import reactPlugin from "eslint-plugin-react"
import globals from "globals"

import typescriptConfig from "./typescript.js"
import baseConfig from "./base.js"

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  ...baseConfig,
  ...typescriptConfig,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        React: "readonly",
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
    },
  },
]
