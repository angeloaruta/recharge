# @recharge/eslint-config

ESLint configurations for the Recharge application.

## Features

- Shared ESLint configurations for all packages and apps
- TypeScript support
- React and Next.js specific rules
- Prettier integration

## Usage

### Base Config

```js
// eslint.config.js
import baseConfig from "@recharge/eslint-config/base.js"

/** @type {import("eslint").Linter.FlatConfig[]} */
const config = [
  ...baseConfig,
  // Your additional configurations
]

export default config
```

### Next.js Config

```js
// eslint.config.mjs
import { nextJsConfig as nextConfig } from "@recharge/eslint-config/next.js"

/** @type {import("eslint").Linter.FlatConfig[]} */
const config = [
  ...nextConfig,
  // Your additional configurations
]

export default config
```

### React Internal Config

```js
// eslint.config.js
import { config as reactInternalConfig } from "@recharge/eslint-config/react-internal.js"

/** @type {import("eslint").Linter.FlatConfig[]} */
const config = [
  ...reactInternalConfig,
  // Your additional configurations
]

export default config
```

## Development

This package uses the new [ESLint flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new) format.
