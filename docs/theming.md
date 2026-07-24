# Theming Eluan in your app

Eluan ships with two built-in themes (`industrial-retro`, `minimal`) and a CSS-variable architecture you can extend without forking the package. This guide covers:

1. [Setup — drop-in provider](#setup)
2. [Switching themes at runtime](#switching-themes-at-runtime)
3. [Creating a custom theme with `createTheme`](#creating-a-custom-theme)
4. [What tokens can I override?](#what-tokens-can-i-override)
5. [Targeting a sub-tree only](#targeting-a-sub-tree-only)
6. [SSR, persistence, and OS preference](#ssr-persistence-and-os-preference)

---

## Setup

Install both packages:

```bash
pnpm add @eluan/core @eluan/tokens
```

In your app entry point, import the token CSS once and wrap your app in `EluanProvider`:

```tsx
// app.tsx
// core's styles.css bundles every token layer, so a separate
// @eluan/tokens/css import is not required when you use @eluan/core.
import "@eluan/core/styles.css"

import { EluanProvider } from "@eluan/core"

export default function App() {
  return (
    <EluanProvider
      defaultTheme="industrial-retro"
      defaultMode="light"
      defaultSpacing="standard"
      defaultCurves="slight"
    >
      <YourApp />
    </EluanProvider>
  )
}
```

The provider writes `data-theme`, `data-mode`, `data-spacing`, and `data-curves` to `<html>` (or any element you choose via the `target` prop). Every Eluan component reads from these tokens, so the theme is applied globally with no other configuration.

---

## Switching themes at runtime

Use the `useEluanTheme()` hook from anywhere inside the tree:

```tsx
import { useEluanTheme } from "@eluan/core"

function ThemeSwitcher() {
  const { theme, setTheme, mode, setMode } = useEluanTheme()

  return (
    <>
      <button onClick={() => setTheme("minimal")}>Minimal</button>
      <button onClick={() => setMode(mode === "light" ? "dark" : "light")}>
        Toggle mode
      </button>
    </>
  )
}
```

The hook returns `{ theme, mode, spacing, curves, setTheme, setMode, setSpacing, setCurves }`.

---

## Creating a custom theme

Use `createTheme()` to define your own theme by overriding only the tokens you care about. Everything else is inherited from a built-in `extends` theme — you don't need to redeclare 150+ variables.

```tsx
// theme/acme.ts
import { createTheme } from "@eluan/core"

export const acmeTheme = createTheme({
  name: "acme",
  extends: "industrial-retro", // optional, defaults to "industrial-retro"
  tokens: {
    "--font-heading": '"Acme Display", serif',
    "--font-body": '"Acme Sans", sans-serif',
    "--action-primary-bg": "#4f46e5",
    "--action-primary-bg-hover": "#4338ca",
    "--action-primary-bg-active": "#3730a3",
    "--container-bg": "#fafafa",
    "--container-fg": "#0f172a",
  },
})
```

Register it on the provider via `customThemes` and activate it just like a built-in:

```tsx
// app.tsx
import { EluanProvider } from "@eluan/core"
import { acmeTheme } from "./theme/acme"

export default function App() {
  return (
    <EluanProvider customThemes={[acmeTheme]} defaultTheme="acme">
      <YourApp />
    </EluanProvider>
  )
}
```

`setTheme("acme")` from `useEluanTheme()` works the same way as for built-in themes.

### How inheritance works

CSS doesn't support selector-level inheritance, so a custom theme can't simply extend another theme by name. Behind the scenes the provider sets **two** attributes on the target element when a custom theme is active:

```html
<html data-theme="industrial-retro" data-theme-custom="acme">
```

- `data-theme="industrial-retro"` activates the **base** theme's full token set (~150 variables).
- `data-theme-custom="acme"` activates **only your overrides** on top.

Both selectors have equal CSS specificity, but the custom theme's `<style>` element is appended after the base CSS, so your overrides win on equal-specificity ties.

You can also load fonts that aren't bundled with Eluan — just `@import` them in your stylesheet and reference the family in `--font-heading` / `--font-body` / `--font-mono`.

---

## What tokens can I override?

The full list lives in `packages/tokens/src/themes.css`. The most commonly customized groups:

| Group | Examples |
|---|---|
| **Fonts** | `--font-heading`, `--font-body`, `--font-mono` |
| **Containers** (cards, popovers, tables, etc.) | `--container-bg`, `--container-fg`, `--container-bg-alt`, `--container-border`, `--container-border-alt` |
| **Interactive surfaces** (inputs, list rows) | `--interactive-bg`, `--interactive-bg-hover`, `--interactive-bg-selected`, `--interactive-fg`, `--interactive-fg-alt`, `--interactive-fg-selected`, `--interactive-border`, `--interactive-border-alt` |
| **Action — primary** (CTA buttons) | `--action-primary-bg`, `--action-primary-bg-hover`, `--action-primary-bg-active`, `--action-primary-fg` |
| **Action — secondary** (outline buttons) | `--action-secondary-bg`, `--action-secondary-border`, `--action-secondary-fg` |
| **Action — tertiary** (ghost buttons) | `--action-tertiary-bg`, `--action-tertiary-bg-hover`, `--action-tertiary-fg` |
| **Status colors** | `--positive-bg/fg`, `--cautionary-bg/fg`, `--destructive-bg/fg`, `--informative-bg/fg` |
| **Data viz palette** | `--dataviz-1-main`/`-tint`/`-shade` … `--dataviz-8-main`/`-tint`/`-shade` |

Tokens you don't override fall through to the `extends` theme.

---

## Targeting a sub-tree only

If you only want to theme a portion of the page (e.g. a settings drawer in a different palette), set `target` to a specific element and apply the data attributes there:

```tsx
import { useEffect, useRef } from "react"
import { EluanProvider } from "@eluan/core"

function ThemedRegion() {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div ref={ref}>
      {/* Once `ref.current` exists, point the provider at it */}
      {ref.current && (
        <EluanProvider target={ref.current} defaultTheme="minimal">
          {/* …components in this subtree get the alternate theme */}
        </EluanProvider>
      )}
    </div>
  )
}
```

For a simpler sub-tree override of a single token, set the CSS variable inline:

```tsx
<div style={{ "--action-primary-bg": "#ff6600" } as React.CSSProperties}>
  <Button>Branded button</Button>
</div>
```

---

## SSR, persistence, and OS preference

`<EluanProvider>` defaults to:

- **`persist={true}`** — stores the user's theme/mode/spacing/curves choices in `localStorage` under keys `eluan:theme`, `eluan:mode`, etc., so they survive reloads. Set `persist={false}` for stateless behaviour.
- **`followSystemMode={true}`** — when `defaultMode` isn't set and no stored preference exists, the provider reads `prefers-color-scheme` and reacts to OS-level changes. Set `followSystemMode={false}` to opt out.

### Avoiding flash of wrong theme on SSR

Server-rendered apps will briefly render with the default theme before hydration applies the persisted user choice. To avoid the flash, inject a small inline script in your `<head>` that reads `localStorage` and sets the attributes before React hydrates:

```html
<!-- in your HTML <head>, before the app script -->
<script>
(function () {
  try {
    var html = document.documentElement
    var t = localStorage.getItem("eluan:theme")
    var m = localStorage.getItem("eluan:mode")
    var s = localStorage.getItem("eluan:spacing")
    var c = localStorage.getItem("eluan:curves")
    if (t) html.setAttribute("data-theme", t)
    if (m) html.setAttribute("data-mode", m)
    if (s) html.setAttribute("data-spacing", s)
    if (c) html.setAttribute("data-curves", c)
  } catch (e) {}
})()
</script>
```

For Next.js you can render this via `next/script` with `strategy="beforeInteractive"`.

---

## Quick reference

| API | Purpose |
|---|---|
| `<EluanProvider>` | Sets data-attrs, manages persistence, syncs OS mode |
| `useEluanTheme()` | Hook returning the active theme + setters |
| `createTheme({ name, extends, tokens })` | Define a custom theme |
| `loadThemeFonts(name)` | Manually preload a built-in theme's fonts |
| `themes` | Array of built-in theme names |
| `Theme`, `Mode`, `SpacingScale`, `CurveScale` | TS types |
