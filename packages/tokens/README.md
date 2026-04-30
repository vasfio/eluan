# @vasf/ragnar-tokens

> Design tokens, CSS variables, themes, and fonts for the [Ragnar](https://github.com/frolda/ragnar) design system.

A three-layer token architecture (primitives → modes → themes) exposed as CSS custom properties scoped to `[data-theme]`, `[data-mode]`, `[data-spacing]`, and `[data-curves]` attributes.

## Install

```bash
pnpm add @vasf/ragnar-tokens
```

## Use

Import the full token CSS once at the root of your app:

```ts
import "@vasf/ragnar-tokens/css"
```

Then activate a theme by setting attributes on `<html>` (or use `<RagnarProvider>` from `@vasf/ragnar-core`, which wires this up automatically):

```html
<html data-theme="industrial-retro" data-mode="light" data-spacing="standard" data-curves="slight">
```

## Subpath exports

```ts
import "@vasf/ragnar-tokens/css"                        // all tokens
import "@vasf/ragnar-tokens/fonts/all"                  // every theme's fonts
import "@vasf/ragnar-tokens/fonts/industrial-retro"     // single theme's fonts
import "@vasf/ragnar-tokens/fonts/minimal"
import { themes, modes, type Theme } from "@vasf/ragnar-tokens"
```

## Tailwind preset

```ts
// tailwind.config.ts
import preset from "@vasf/ragnar-tokens/tailwind"
export default { presets: [preset] }
```

## Built-in themes

`industrial-retro`, `minimal`. Define your own via `createTheme()` from `@vasf/ragnar-core`. See the [theming guide](https://github.com/frolda/ragnar/blob/main/docs/theming.md).

## License

MIT
