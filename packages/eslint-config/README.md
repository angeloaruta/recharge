# @recharge/eslint-config

ESLint configurations for the Recharge application.

## Usage

### Base Config

```js
// eslint.config.js
import { baseConfig } from "@recharge/eslint-config/base.js"

export default [
  ...baseConfig,
  // Your additional configurations
]
```

### Next.js Config

```js
// eslint.config.js
import { nextConfig } from "@recharge/eslint-config/next.js"

export default [
  ...nextConfig,
  // Your additional configurations
]
```

### React Internal Config

```js
// eslint.config.js
import { reactInternalConfig } from "@recharge/eslint-config/react-internal.js"

export default [
  ...reactInternalConfig,
  // Your additional configurations
]
```
