# @recharge/ui

This package contains the UI components for the Recharge application.

## Adding Components

To add a new shadcn UI component, run the following command from the root of the project:

```bash
bun run ui:add [component-name]
```

For example, to add the button component:

```bash
bun run ui:add button
```

To add multiple components at once:

```bash
bun run ui:add button card input
```

## Available Components

For a list of available components, visit the [shadcn UI website](https://ui.shadcn.com/docs/components).

## Usage

Import components from the UI package:

```tsx
import { Button } from "@recharge/ui/components/button"

export default function MyComponent() {
  return <Button variant="default">Click me</Button>
}
```

## Customizing Components

After adding a component, you can customize it by editing the file in the `packages/ui/src/components` directory.
