# @eluan/tokens

> Design tokens, CSS variables, themes, and fonts for the [Eluan](https://github.com/vasfio/eluan) design system.

A three-layer token architecture (primitives → modes → themes) exposed as CSS custom properties scoped to `[data-theme]`, `[data-mode]`, `[data-spacing]`, and `[data-curves]` attributes.

## Install

```bash
npm install @eluan/tokens
yarn add @eluan/tokens
pnpm add @eluan/tokens
bun add @eluan/tokens
```

## Use

Import the full token CSS once at the root of your app:

```ts
import "@eluan/tokens/css"
```

Then activate a theme by setting attributes on `<html>` (or use `<EluanProvider>` from `@eluan/core`, which wires this up automatically):

```html
<html data-theme="minimal" data-mode="light" data-spacing="standard" data-curves="slight">
```

## Subpath exports

```ts
import "@eluan/tokens/css"                        // all tokens
import "@eluan/tokens/fonts/all"                  // every built-in theme's fonts
import "@eluan/tokens/fonts/base"                 // shared mono face only
import "@eluan/tokens/fonts/minimal"              // a single theme's fonts
import { themes, modes, type Theme } from "@eluan/tokens"
```

## Built-in themes

`minimal` is the only built-in theme — it is the neutral, typographic baseline every other look starts from. Define your own via `createTheme()` from `@eluan/core`, or generate a full token set from your brand colors with [`@eluan/theme-generator`](https://github.com/vasfio/eluan/tree/main/packages/theme-generator). See the [theming guide](https://github.com/vasfio/eluan/blob/main/docs/theming.md).

## License

MIT
