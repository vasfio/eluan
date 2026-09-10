# @eluan/tokens

> Design tokens, CSS variables, themes, and fonts for the [Eluan](https://github.com/vasfio/eluan) design system.

A three-layer token architecture (primitives → modes → themes) exposed as CSS custom properties scoped to `[data-theme]`, `[data-mode]`, `[data-spacing]`, `[data-curves]`, and `[data-typeset]` attributes.

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

## Token families

| Family | Tokens | Driven by |
|---|---|---|
| Color | `--container-*`, `--interactive-*`, `--action-*-*`, `--positive-*`, `--cautionary-*`, `--destructive-*`, `--informative-*`, `--important-*`, `--dataviz-N-*` | `data-theme` + `data-mode` |
| Spacing | `--spacing-xxs` … `--spacing-4xl` | `data-spacing` |
| Sizing | `--size-xxs` … `--size-4xl` | `data-spacing` |
| Curves | `--curves-xxs` … `--curves-xl` | `data-curves` |
| Typeset | `--font-size-step-6` … `--font-size-step-neg3`, plus `--line-height-step-*` and `--letter-spacing-step-*` | viewport, or `data-typeset` |
| Font-size aliases | `--font-size-xs` … `--font-size-5xl` | `data-spacing` picks a typeset step |
| Fonts | `--font-heading`, `--font-body`, `--font-mono` | `data-theme` |

The typeset is a fluid 10-step scale: each step interpolates between anchors at 480px, 748px, and 1024px viewport widths, so type resizes without media queries. `data-typeset="small" \| "medium" \| "large"` pins the whole scale (or any subtree) to one column; omit the attribute for fluid behaviour. Spacing density shifts the `--font-size-*` aliases one step up or down. Full details in the [theming guide](https://github.com/vasfio/eluan/blob/main/docs/theming.md#the-typeset-axis).

## Fonts

Two faces ship with the package:

- **Paper Mono** — the monospace face for every theme. A variable font (weight axis 100–800) vendored as WOFF2 inside the package, so it works offline with no CDN or extra dependency. Licensed under the SIL Open Font License 1.1.
- **Inter Variable** — the `minimal` theme's heading and body face, self-hosted via `@fontsource-variable/inter` (weight axis 100–900, so every weight is a real face).

## Subpath exports

```ts
import "@eluan/tokens/css"                        // all tokens
import "@eluan/tokens/fonts/all"                  // every built-in theme's fonts
import "@eluan/tokens/fonts/base"                 // shared mono face only
import "@eluan/tokens/fonts/minimal"              // a single theme's fonts
import { themes, modes, type Theme } from "@eluan/tokens"
```

## JS exports

Alongside the CSS, the package exports the raw values for non-CSS consumers (React Native, canvas rendering, design-tool sync):

```ts
import {
  primitiveColors, radius, sizing, sizingSteps, spacing, viewports,
  typeset, typesetAnchors, typesetSteps, lineHeightSteps, letterSpacingSteps,
  resolveTypesetSize,
  fontWeights, fontFamilies, shadows, durations, easings, zIndices, breakpoints,
  themes, modes, spacingScales, curveScales, themeFonts, loadThemeFonts,
} from "@eluan/tokens"

resolveTypesetSize("0", 900) // the fluid step-0 size at a 900px viewport
```

`fontSizes` is deprecated — it predates the fluid typeset. Use `typeset` with `resolveTypesetSize()`.

## Built-in themes

`minimal` is the only built-in theme — it is the neutral, typographic baseline every other look starts from. Define your own via `createTheme()` from `@eluan/core`, or generate a full token set from your brand colors with [`@eluan/theme-generator`](https://github.com/vasfio/eluan/tree/main/packages/theme-generator). See the [theming guide](https://github.com/vasfio/eluan/blob/main/docs/theming.md).

## License

MIT
