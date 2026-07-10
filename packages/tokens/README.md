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
<html data-theme="industrial-retro" data-mode="light" data-spacing="standard" data-curves="slight">
```

## Subpath exports

```ts
import "@eluan/tokens/css"                        // all tokens
import "@eluan/tokens/fonts/all"                  // every theme's fonts
import "@eluan/tokens/fonts/industrial-retro"     // single theme's fonts
import "@eluan/tokens/fonts/minimal"
import { themes, modes, type Theme } from "@eluan/tokens"
```

## Built-in themes

`industrial-retro`, `minimal`. Define your own via `createTheme()` from `@eluan/core`. See the [theming guide](https://github.com/vasfio/eluan/blob/main/docs/theming.md).

## License

MIT
