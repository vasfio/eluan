---
name: theming
---

# Theming

## Overview

Eluan's look comes from CSS custom properties in three layers: primitives (raw values), modes (light, dim, dark aliases) and themes (the semantic tokens components read). `EluanProvider` activates them with attributes on `<html>`:

| Attribute | Values | Set with | Controls |
| --- | --- | --- | --- |
| `data-theme` | `minimal` or a custom theme name | `defaultTheme`, `setTheme` | every semantic colour and the font families |
| `data-mode` | `light`, `dim`, `dark` | `defaultMode`, `setMode` | which mode aliases the theme resolves against |
| `data-spacing` | `compact`, `standard`, `wide` | `defaultSpacing`, `setSpacing` | every `--spacing-*` and `--size-*`, and which type step each `--font-size-*` alias picks |
| `data-curves` | `sharp`, `slight`, `sweeping` | `defaultCurves`, `setCurves` | every `--curves-*` corner radius |
| `data-typeset` | `small`, `medium`, `large`, or absent | `defaultTypeset`, `setTypeset` | absent keeps type fluid; a value pins the type scale |

`minimal` is the only built-in theme. Brand looks are custom themes made with `createTheme()`, usually from `@eluan/theme-generator` output.

The theme generator controls colour only: one to three accent colours, the neutral tint (how much accent bleeds into the greys) and a minimum contrast ratio (default 4.5). Corner style, density and type scale are Provider axes, not generator output.

Contrast is checked when the theme is generated. The generator auto-corrects any foreground and background pair that falls below the minimum and lists the corrections in its report. That's why you never override colour pairs by hand.

## Rules

1. Change the look through the theme or a Provider axis. Never restyle a single component.
2. Get brand colours from the theme generator. Never hand-pick hex values for semantic tokens.
3. Never override one token of a foreground and background pair. Regenerate the theme instead, so contrast stays checked.
4. Use `defaultCurves` for corner style and `defaultSpacing` for density. Don't override `--curves-*` or `--spacing-*` values.
5. Let `EluanProvider` own the `data-*` attributes. Never set them in your own effects.
6. Use `useEluanTheme()` to read or change theme, mode, spacing, curves and typeset at runtime.
7. Never add a second built-in theme to the library. Custom themes live in the app.
8. Give custom themes a unique name that starts with a letter. `minimal` is taken.

## Tokens

These are the theme-level tokens a custom theme most often changes. The full semantic colour set is in [colour.md](./colour.md).

<!-- tokens:start -->
| Token | Value (default theme) | Use for |
| --- | --- | --- |
| `--color-neutral-0` | `--color-mono-0` → oklch(1.0000 0.0000 0.00) | Theme's neutral ramp; modes derive backgrounds and foregrounds from it |
| `--color-neutral-50` | `--color-mono-50` → oklch(0.9851 0.0000 0.00) | Theme's neutral ramp; modes derive backgrounds and foregrounds from it |
| `--color-neutral-100` | `--color-mono-100` → oklch(0.9702 0.0000 0.00) | Theme's neutral ramp; modes derive backgrounds and foregrounds from it |
| `--color-neutral-200` | `--color-mono-200` → oklch(0.9219 0.0000 0.00) | Theme's neutral ramp; modes derive backgrounds and foregrounds from it |
| `--color-neutral-300` | `--color-mono-300` → oklch(0.8699 0.0000 0.00) | Theme's neutral ramp; modes derive backgrounds and foregrounds from it |
| `--color-neutral-400` | `--color-mono-400` → oklch(0.7090 0.0000 0.00) | Theme's neutral ramp; modes derive backgrounds and foregrounds from it |
| `--color-neutral-500` | `--color-mono-500` → oklch(0.5555 0.0000 0.00) | Theme's neutral ramp; modes derive backgrounds and foregrounds from it |
| `--color-neutral-600` | `--color-mono-600` → oklch(0.4386 0.0000 0.00) | Theme's neutral ramp; modes derive backgrounds and foregrounds from it |
| `--color-neutral-700` | `--color-mono-700` → oklch(0.3715 0.0000 0.00) | Theme's neutral ramp; modes derive backgrounds and foregrounds from it |
| `--color-neutral-800` | `--color-mono-800` → oklch(0.2686 0.0000 0.00) | Theme's neutral ramp; modes derive backgrounds and foregrounds from it |
| `--color-neutral-900` | `--color-mono-900` → oklch(0.2046 0.0000 0.00) | Theme's neutral ramp; modes derive backgrounds and foregrounds from it |
| `--color-neutral-950` | `--color-mono-950` → oklch(0.1448 0.0000 0.00) | Theme's neutral ramp; modes derive backgrounds and foregrounds from it |
| `--font-heading` | "Inter Variable" | Headings |
| `--font-body` | "Inter Variable" | Body text and UI |
| `--font-mono` | "Paper Mono" | Code and tabular figures |
<!-- tokens:end -->

## Generating a theme

From the CLI (writes `custom-theme.css` and `create-theme.json` for applying the theme, plus `primitives.json`, `semantic.json`, `theme.css`, `preview.html` and `report.md`, to the output directory):

```bash
pnpm dlx @eluan/theme-generator generate --accent "#2F6F5E" --name forest --out ./src/theme
```

From code (pure colour maths, runs in Node and the browser):

```ts
import { generateTheme } from "@eluan/theme-generator";

const result = generateTheme({
  accents: ["#2F6F5E"],
  themeName: "forest",
  minContrast: 4.5,
  neutralTintRatio: 0.04,
});

result.customTheme; // ready for EluanProvider's customThemes: light and dark, layered on minimal
result.createThemeOptions; // { tokens, modes: { dark } } for createTheme()
result.report; // markdown: warnings and contrast corrections
```

Dark-mode colours come out brighter than light-mode ones: the generator lifts the colour ramps dark mode uses (`darkLift`, 0.08 by default) and still checks contrast for every pair. Don't brighten dark colours by hand. Dim mode uses the light values.

The accent hex is the one place a raw colour belongs: it's generator input, not a token value. Keep the generator call or its output in the app's source, next to the code that registers the theme. <!-- REVIEW: the repo has no convention for where a generated theme lives in a consumer app; ./src/theme is a suggestion. -->

## Applying and switching a theme

```tsx
import "@eluan/core/styles.css";
import { EluanProvider, useEluanTheme } from "@eluan/core";
import { generateTheme } from "@eluan/theme-generator";

const { customTheme: forest } = generateTheme({ accents: ["#2F6F5E"], themeName: "forest", minContrast: 4.5, neutralTintRatio: 0.04 });

export function App({ children }: { children: React.ReactNode }) {
  return (
    <EluanProvider customThemes={[forest]} defaultTheme="forest" defaultCurves="sweeping">
      {children}
    </EluanProvider>
  );
}

export function ThemeSwitch() {
  const { theme, setTheme } = useEluanTheme();
  return (
    <button type="button" onClick={() => setTheme(theme === "forest" ? "minimal" : "forest")}>
      Switch theme
    </button>
  );
}
```

The Provider sets `data-theme="minimal"` plus `data-theme-custom="forest"`, injects the theme's CSS once, and applies its dark values whenever `data-mode="dark"`.

To mix generated colours with tokens of your own (fonts, say), use `createTheme`, which extends `minimal` and takes per-mode overrides under `modes`:

```tsx
import { createTheme } from "@eluan/core";
import { generateTheme } from "@eluan/theme-generator";

const { createThemeOptions } = generateTheme({ accents: ["#2F6F5E"], themeName: "forest", minContrast: 4.5, neutralTintRatio: 0.04 });

export const forest = createTheme({
  name: "forest",
  ...createThemeOptions,
  tokens: { ...createThemeOptions.tokens, "--font-heading": '"Fraunces", serif' },
});
```

Don't apply `result.css.theme` or `createThemeTokens` alone: the first drops `minimal`'s fonts and neutral ramp, the second has no dark values.

Dark mode, density and corner style are separate axes:

```tsx
const { setMode, setSpacing, setCurves } = useEluanTheme();
setMode("dark"); // light | dim | dark
setSpacing("compact"); // compact | standard | wide
setCurves("sharp"); // sharp | slight | sweeping
```

The Provider persists these choices to `localStorage` and follows the OS colour scheme until the user picks a mode.

## Scoped themes

To theme one region, point an `EluanProvider` at that element with `target`, and pass the same element to `portalContainer` so its overlays (Dialog, Popover, Select, menus, Tooltip) render inside the scope. Without `portalContainer`, overlays mount in `document.body` and show the default theme.

## Choosing a value

| If you need… | Use |
| --- | --- |
| a brand colour | the theme generator's `customTheme`, registered with `customThemes` |
| rounder or sharper corners everywhere | `defaultCurves="sweeping"` or `"sharp"` |
| a denser or roomier UI | `defaultSpacing="compact"` or `"wide"` |
| a dark mode toggle | a Switch that calls `setMode` from `useEluanTheme()` |
| a different font | override `--font-heading` and `--font-body` in `createTheme` |
| one region in another theme | a scoped `EluanProvider` with `target` and `portalContainer` |
| one-off change to a single region | wrap it in an element with an inline token override, as a last resort |

## Dos and don'ts

**Do:** change the look at the theme level.

```tsx
const { customTheme: brand } = generateTheme({ accents: ["#2F6F5E"], themeName: "brand", minContrast: 4.5, neutralTintRatio: 0.04 });

<EluanProvider customThemes={[brand]} defaultTheme="brand" defaultCurves="sweeping">
  <App />
</EluanProvider>;
```

**Don't:** restyle components one by one or hardcode a brand colour.

```tsx
<div style={{ "--action-primary-bg": "#2F6F5E", borderRadius: 16 } as React.CSSProperties}>
  <Button>Save</Button>
</div>
```

**Do:** toggle dark mode through the Provider.

```tsx
const { mode, setMode } = useEluanTheme();
<Switch checked={mode === "dark"} onCheckedChange={(on) => setMode(on ? "dark" : "light")} aria-label="Dark mode" />;
```

**Don't:** set the attribute yourself.

```tsx
useEffect(() => document.documentElement.setAttribute("data-mode", "dark"), []);
```

## Common agent mistakes

_Filled from evals._
