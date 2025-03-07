import reactConfig from "./react.js"

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  ...reactConfig,
  {
    files: [
      "app/**/*.{js,ts,jsx,tsx}",
      "pages/**/*.{js,ts,jsx,tsx}",
      "components/**/*.{js,ts,jsx,tsx}",
      "lib/**/*.{js,ts,jsx,tsx}",
      "src/**/*.{js,ts,jsx,tsx}",
    ],
    rules: {
      // Add Next.js specific rules here
      "import/no-default-export": "off",
    },
  },
]
