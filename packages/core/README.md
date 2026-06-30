# @vasf/ragnar-core

> Accessible, themeable React UI components and marketing patterns — built on Radix UI primitives, StyleX, and Ragnar tokens.

Part of the [Ragnar](https://github.com/frolda/ragnar) design system.

## Install

```bash
npm install @vasf/ragnar-core @vasf/ragnar-tokens
yarn add @vasf/ragnar-core @vasf/ragnar-tokens
pnpm add @vasf/ragnar-core @vasf/ragnar-tokens
bun add @vasf/ragnar-core @vasf/ragnar-tokens
```

## Use

```tsx
// Import once at the entry of your app
import "@vasf/ragnar-core/styles.css"
import "@vasf/ragnar-tokens/css"

import { Button, RagnarProvider } from "@vasf/ragnar-core"

export default function App() {
  return (
    <RagnarProvider defaultTheme="industrial-retro">
      <Button>Hello</Button>
    </RagnarProvider>
  )
}
```

Import an individual component entry when you want a narrower module:

```tsx
import { Button } from "@vasf/ragnar-core/button"
```

## Theming

See the [theming guide](https://github.com/frolda/ragnar/blob/main/docs/theming.md) for `RagnarProvider` setup, `useRagnarTheme()`, and how to define a custom theme via `createTheme()`.

## What's included

Components span layout (`Card`, `Sheet`, `Drawer`), forms (`Input`, `Select`, `Checkbox`, `RadioGroup`, `Switch`, `Slider`, etc.), data display (`Table`, `Tree View`, `Timeline`, `Calendar`), navigation (`Tabs`, `Breadcrumb`, `Command`, `NavigationDrawer`), feedback (`Toast`, `Banner`, `Progress`), and overlays (`Dialog`, `AlertDialog`, `Popover`, `Tooltip`, `ContextMenu`).

Full component list: see [Storybook](https://github.com/frolda/ragnar) or the source under `src/components/`.

## License

MIT
