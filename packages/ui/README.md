# Recharge UI

Shared UI components for the Recharge platform. This package provides a consistent design system and component library used across all Recharge applications.

## Features

- Accessible UI components
- Consistent design system
- Theming support
- Form components and validation

## Tech Stack

- [React](https://react.dev) - UI library
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [Radix UI](https://www.radix-ui.com) - Unstyled, accessible components
- [Framer Motion](https://www.framer.com/motion) - Animation library

## Getting Started

### Installation

The package is installed automatically as a workspace dependency.

### Usage

```tsx
import { Button, Card, Input } from "@recharge/ui"

function MyComponent() {
  return (
    <Card>
      <Card.Header>
        <Card.Title>My Card</Card.Title>
      </Card.Header>
      <Card.Content>
        <Input placeholder="Enter your name" />
        <Button>Submit</Button>
      </Card.Content>
    </Card>
  )
}
```

## Development

### Adding New Components

1. Create a new component file in the appropriate directory
2. Export the component from the index file
3. Add documentation and examples

### Building

```bash
bun run build
```

## Documentation

Component documentation is available in the Storybook:

```bash
bun run storybook
```

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

## Customizing Components

After adding a component, you can customize it by editing the file in the `packages/ui/src/components` directory.
