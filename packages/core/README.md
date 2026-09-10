# @eluan/core

> Accessible, themeable React UI components and marketing patterns — built on Radix UI primitives, StyleX, and Eluan tokens.

Part of the [Eluan](https://github.com/vasfio/eluan) design system.

## Install

```bash
npm install @eluan/core @eluan/tokens
yarn add @eluan/core @eluan/tokens
pnpm add @eluan/core @eluan/tokens
bun add @eluan/core @eluan/tokens
```

## Use

```tsx
// Import once at the entry of your app.
// styles.css bundles every token layer — no separate @eluan/tokens/css import needed.
import "@eluan/core/styles.css"

import { Button, EluanProvider } from "@eluan/core"

export default function App() {
  return (
    <EluanProvider defaultTheme="minimal">
      <Button>Hello</Button>
    </EluanProvider>
  )
}
```

Import an individual component entry when you want a narrower module:

```tsx
import { Button } from "@eluan/core/button"
```

## Theming

See the [theming guide](https://github.com/vasfio/eluan/blob/main/docs/theming.md) for `EluanProvider` setup, `useEluanTheme()`, and how to define a custom theme via `createTheme()`.

The provider drives five independent axes — `theme`, `mode`, `spacing`, `curves`, and `typeset` — and re-exports the token helpers so you don't need a second import:

```tsx
import { useEluanTheme, typeset, resolveTypesetSize } from "@eluan/core"

const { mode, setMode, typeset: pin, setTypeset } = useEluanTheme()
```

## Typography

Type sizes come from a fluid 10-step scale that resizes with the viewport. `Typography` applies a step's size, line height, and letter spacing together:

```tsx
import { Typography } from "@eluan/core"

<Typography variant="display">Ships fast</Typography>
<Typography variant="body">Body copy, fluid between 480px and 1024px.</Typography>
<Typography variant="caption" tone="muted">Footnote</Typography>
```

See [the typeset axis](https://github.com/vasfio/eluan/blob/main/docs/theming.md#the-typeset-axis) for the step table and the `data-typeset` pinning attribute.

## What's included

Components span layout (`Card`, `Sheet`, `Drawer`), typography (`Typography`), forms (`Input`, `Select`, `Checkbox`, `RadioGroup`, `Switch`, `Slider`, etc.), data display (`Table`, `Tree View`, `Calendar`), navigation (`Tabs`, `Breadcrumb`, `Command`, `NavigationDrawer`), feedback (`Toast`, `Banner`, `Progress`), and overlays (`Dialog`, `Popover`, `Tooltip`, `ContextMenu`).

Full component list: see [Storybook](https://github.com/vasfio/eluan) or the source under `src/components/`.

## Security

`RichText` emits raw, unsanitized HTML through its `onValueChange` callback
(`editor.getHTML()`). Before persisting that HTML or rendering it back into the
DOM (for example via `dangerouslySetInnerHTML`), sanitize it with a library such
as [DOMPurify](https://github.com/cure53/DOMPurify). Only pass trusted/sanitized
HTML into the `value` prop.

## License

MIT
