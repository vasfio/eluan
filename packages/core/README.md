# @vasf/ragnar-core

> 60+ accessible, themeable React UI components — built on Radix UI primitives, Tailwind CSS v4, and CVA.

Part of the [Ragnar](https://github.com/frolda/ragnar) design system.

## Install

```bash
pnpm add @vasf/ragnar-core @vasf/ragnar-tokens
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

## Theming

See the [theming guide](https://github.com/frolda/ragnar/blob/main/docs/theming.md) for `RagnarProvider` setup, `useRagnarTheme()`, and how to define a custom theme via `createTheme()`.

## What's included

Components span layout (`Card`, `Sheet`, `Drawer`, `Resizable`), forms (`Input`, `Select`, `Combobox`, `Checkbox`, `RadioGroup`, `Switch`, `Slider`, etc.), data display (`Table`, `Tree View`, `Timeline`, `Calendar`), navigation (`Tabs`, `Breadcrumb`, `Command`, `NavigationDrawer`), feedback (`Toast`, `Alert`, `Banner`, `Progress`), and overlays (`Dialog`, `Popover`, `Tooltip`, `ContextMenu`).

Full component list: see [Storybook](https://github.com/frolda/ragnar) or the source under `src/components/`.

## License

MIT
