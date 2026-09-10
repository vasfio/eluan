# Theming Eluan in your app

Eluan ships with **one** built-in theme — `minimal`, a neutral typographic baseline — plus a CSS-variable architecture you can extend without forking the package. Themeability is the point: your brand's look is a custom theme you define, not one Eluan picked for you. This guide covers:

1. [Setup — drop-in provider](#setup)
2. [Switching themes at runtime](#switching-themes-at-runtime)
3. [Creating a custom theme with `createTheme`](#creating-a-custom-theme)
4. [What tokens can I override?](#what-tokens-can-i-override)
5. [The typeset axis](#the-typeset-axis)
6. [Targeting a sub-tree only](#targeting-a-sub-tree-only)
7. [SSR, persistence, and OS preference](#ssr-persistence-and-os-preference)

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
      defaultTheme="minimal"
      defaultMode="light"
      defaultSpacing="standard"
      defaultCurves="slight"
      defaultTypeset="auto"
    >
      <YourApp />
    </EluanProvider>
  )
}
```

The provider writes `data-theme`, `data-mode`, `data-spacing`, and `data-curves` to `<html>` (or any element you choose via the `target` prop). Every Eluan component reads from these tokens, so the theme is applied globally with no other configuration.

`data-typeset` is the exception: its default `"auto"` deliberately leaves the attribute **off** so type stays viewport-fluid. See [The typeset axis](#the-typeset-axis).

---

## Switching themes at runtime

Use the `useEluanTheme()` hook from anywhere inside the tree. `setTheme()` accepts `"minimal"` or the name of any custom theme registered on the provider — anything else is ignored with a dev-mode warning.

```tsx
import { useEluanTheme } from "@eluan/core"

function ThemeSwitcher() {
  const { theme, setTheme, mode, setMode } = useEluanTheme()

  return (
    <>
      <button onClick={() => setTheme("minimal")}>Minimal</button>
      <button onClick={() => setTheme("acme")}>Acme</button>
      <button onClick={() => setMode(mode === "light" ? "dark" : "light")}>
        Toggle mode
      </button>
    </>
  )
}
```

The hook returns `{ theme, mode, spacing, curves, typeset, setTheme, setMode, setSpacing, setCurves, setTypeset }`. The mode (`light` / `dim` / `dark`), spacing, curve, and typeset axes are independent of the theme and always available.

---

## Creating a custom theme

Use `createTheme()` to define your own theme by overriding only the tokens you care about. Everything else is inherited from the `extends` theme (`minimal` by default) — you don't need to redeclare 150+ variables.

> Starting from brand colors rather than individual tokens? [`@eluan/theme-generator`](../packages/theme-generator) turns one to three accent colors into a full, contrast-checked light + dark token set you can drop straight into `createTheme()`.

```tsx
// theme/acme.ts
import { createTheme } from "@eluan/core"

export const acmeTheme = createTheme({
  name: "acme",
  extends: "minimal", // optional — "minimal" is the only built-in and the default
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

`setTheme("acme")` from `useEluanTheme()` works the same way as it does for `minimal`.

### How inheritance works

CSS doesn't support selector-level inheritance, so a custom theme can't simply extend another theme by name. Behind the scenes the provider sets **two** attributes on the target element when a custom theme is active:

```html
<html data-theme="minimal" data-theme-custom="acme">
```

- `data-theme="minimal"` activates the **base** theme's full token set (~150 variables).
- `data-theme-custom="acme"` activates **only your overrides** on top.

Both selectors have equal CSS specificity, but the custom theme's `<style>` element is appended after the base CSS, so your overrides win on equal-specificity ties.

You can also load fonts that aren't bundled with Eluan — just `@import` them in your stylesheet and reference the family in `--font-heading` / `--font-body` / `--font-mono`.

---

## What tokens can I override?

The full list lives in `packages/tokens/src/themes.css`. The most commonly customized groups:

| Group | Examples |
|---|---|
| **Fonts** | `--font-heading`, `--font-body`, `--font-mono` (monospace is Paper Mono, a variable font vendored with `@eluan/tokens`) |
| **Containers** (cards, popovers, tables, etc.) | `--container-bg`, `--container-fg`, `--container-bg-alt`, `--container-border`, `--container-border-alt` |
| **Interactive surfaces** (inputs, list rows) | `--interactive-bg`, `--interactive-bg-hover`, `--interactive-bg-selected`, `--interactive-fg`, `--interactive-fg-alt`, `--interactive-fg-selected`, `--interactive-border`, `--interactive-border-alt` |
| **Action — primary** (CTA buttons) | `--action-primary-bg`, `--action-primary-bg-hover`, `--action-primary-bg-active`, `--action-primary-fg` |
| **Action — secondary** (outline buttons) | `--action-secondary-bg`, `--action-secondary-border`, `--action-secondary-fg` |
| **Action — tertiary** (ghost buttons) | `--action-tertiary-bg`, `--action-tertiary-bg-hover`, `--action-tertiary-fg` |
| **Status colors** | `--positive-bg/fg`, `--cautionary-bg/fg`, `--destructive-bg/fg`, `--informative-bg/fg` |
| **Data viz palette** | `--dataviz-1-main`/`-tint`/`-shade` … `--dataviz-8-main`/`-tint`/`-shade` |

Tokens you don't override fall through to the `extends` theme.

---

## The typeset axis

Type sizes are not static. Eluan ships a **10-step fluid typeset** (`--font-size-step-6` down to `--font-size-step-neg3`) where every step interpolates with the viewport, so a page reads well on a phone and on a desktop without a single media query in your app.

Each step is anchored at three viewport widths, matching the `s` / `m` / `l` viewport primitives:

| Step | 480px (`small`) | 748px (`medium`) | 1024px (`large`) |
|---|---|---|---|
| `step-6` | 41.81px | 53.62px | 68.66px |
| `step-5` | 34.84px | 43.68px | 54.93px |
| `step-4` | 29.03px | 35.59px | 43.95px |
| `step-3` | 24.19px | 29.02px | 35.16px |
| `step-2` | 20.16px | 23.66px | 28.13px |
| `step-1` | 16.8px | 19.31px | 22.5px |
| `step-0` | 14px | 15.76px | 18px |
| `step-neg1` | 11.67px | 12.87px | 14.4px |
| `step-neg2` | 9.72px | 10.51px | 11.52px |
| `step-neg3` | 8.1px | 8.59px | 9.22px |

The small column steps by a minor third (×1.2), the large column by a major third (×1.25) — bigger screens get more typographic contrast. Between the anchors the value is a two-segment `clamp()`: small→medium from 480px to 748px, medium→large from 748px to 1024px. Below 480px every step pins to its small value; above 1024px, to its large value.

Two companion tokens travel with every size and should always be applied together:

- `--line-height-step-*` — 1.5 for steps `neg3`–`0`, 1.375 for steps 1–2, 1.2 for steps 3–6.
- `--letter-spacing-step-*` — `0em` up to step 1, then tightening: `-0.01em` at step 2 through `-0.03em` at step 6. Display type needs that optical correction; using `em` means the tracking scales with the fluid size automatically, so there's no second "Tight" font to download.

### Pinning the scale

Setting `data-typeset` freezes every step to one column:

```html
<html data-typeset="large">
```

| Value | Behaviour |
|---|---|
| `auto` *(default)* | No attribute is written; steps follow the viewport |
| `small` / `medium` / `large` | Every step pinned to that column's static size |

```tsx
const { typeset, setTypeset } = useEluanTheme()

setTypeset("large")  // sets data-typeset="large", persists to localStorage
setTypeset("auto")   // removes the attribute and clears the stored key
```

Only explicit pins are persisted — `"auto"` is the absence of a preference, so it clears `eluan:typeset` rather than storing a value.

The attribute works on any element, not just `<html>`, so you can pin a subtree (a compact sidebar, a print view) while the rest of the page stays fluid:

```tsx
<aside data-typeset="small">…</aside>
```

### Density re-indexes the scale

The `--font-size-*` aliases (`xs` … `5xl`) select a *step*, and the spacing density shifts which one — exactly like `--size-*` and `--spacing-*` shift one primitive rung:

| Alias | compact | standard | wide |
|---|---|---|---|
| `--font-size-xs` | `step-neg3` | `step-neg2` | `step-neg1` |
| `--font-size-sm` | `step-neg2` | `step-neg1` | `step-0` |
| `--font-size-base` | `step-neg1` | `step-0` | `step-1` |
| `--font-size-lg` | `step-0` | `step-1` | `step-2` |
| `--font-size-xl` | `step-1` | `step-2` | `step-3` |
| `--font-size-2xl` | `step-2` | `step-3` | `step-4` |
| `--font-size-3xl` | `step-3` | `step-4` | `step-5` |
| `--font-size-4xl` | `step-4` | `step-5` | `step-6` |
| `--font-size-5xl` | `step-5` | `step-6` | `step-6` |

So density and typeset compose: density picks the rung, typeset (or the viewport) decides how big that rung is.

### The `Typography` component

`Typography` is the ergonomic front door to the scale — it always applies a step's size, line height, and letter spacing together:

```tsx
import { Typography } from "@eluan/core"

<Typography variant="display">Ships fast</Typography>
<Typography variant="body">Body copy on step-0.</Typography>
<Typography variant="caption" tone="muted">Footnote</Typography>

// Any variant can borrow another step without losing its font or weight:
<Typography variant="label" step="2">Oversized label</Typography>
```

Variants map to steps as `display` → 5, `title` → 4, `heading` → 3, `subheading` → 2, `lead` → 1, `body` → 0, `label` → neg1, `caption` → neg2, and each picks a sensible default element (`h1`–`h4` for the headings, `p` for `lead`/`body`, `span` for `label`/`caption`) that `as` or `asChild` can override.

### Outside React

For non-CSS consumers, `@eluan/tokens` exports the same data and the same interpolation:

```ts
import { typeset, resolveTypesetSize, lineHeightSteps, letterSpacingSteps } from "@eluan/tokens"

typeset["0"]                      // { small: 14, medium: 15.76, large: 18 }
resolveTypesetSize("0", 900)      // 16.9…px — matches the CSS clamp exactly
letterSpacingSteps["5"]           // -0.025 (an em multiplier)
```

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

## Overlays in a scoped theme

Overlay content (DropdownMenu, Popover, Select, ContextMenu, Dialog, Sheet, Menubar, Tooltip, HoverCard) is portalled. By default it mounts into `document.body`, which is **outside** any element carrying scoped `data-theme` / `data-mode` / `data-spacing` / `data-curves` / `data-typeset` attributes — so a scoped region shows a correctly themed trigger but a default-themed popover.

Point the overlays back at the scope. With `EluanProvider`, pass the same element to `portalContainer`:

```tsx
const [scope, setScope] = useState<HTMLElement | null>(null)

<div ref={setScope}>
  {scope && (
    <EluanProvider target={scope} portalContainer={scope} defaultMode="dark">
      <DropdownMenu>…</DropdownMenu>
    </EluanProvider>
  )}
</div>
```

Without `EluanProvider` (e.g. you set the attributes yourself, or you render a preview frame), wrap the region in `PortalContainerProvider`:

```tsx
import { PortalContainerProvider } from "@eluan/core"

const [scope, setScope] = useState<HTMLElement | null>(null)

<div ref={setScope} data-theme="minimal" data-mode="dark" data-spacing="compact">
  <PortalContainerProvider container={scope}>
    <DropdownMenu>…</DropdownMenu>
  </PortalContainerProvider>
</div>
```

`container` also accepts a ref object. A single overlay can opt out or redirect with an explicit `container` prop on its Content:

```tsx
<PopoverContent container={someOtherElement}>…</PopoverContent>
```

**Containing-block caveat.** Radix positions popovers with `position: fixed`, so a container anywhere in normal flow is fine. But if the container *or any ancestor* has `transform`, `filter`, `perspective`, `backdrop-filter`, `contain: paint | layout | strict | content`, or a `will-change` naming one of those, that element becomes the containing block for fixed positioning — the overlay is then offset relative to it (and clipped by `contain`). Pick a container without those properties, or move the transform onto an inner wrapper.

---

## SSR, persistence, and OS preference

`<EluanProvider>` defaults to:

- **`persist={true}`** — stores the user's theme/mode/spacing/curves/typeset choices in `localStorage` under keys `eluan:theme`, `eluan:mode`, etc., so they survive reloads. Set `persist={false}` for stateless behaviour. (`eluan:typeset` is only written for an explicit pin; `"auto"` clears it.)
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
    var y = localStorage.getItem("eluan:typeset")
    if (t) html.setAttribute("data-theme", t)
    if (m) html.setAttribute("data-mode", m)
    if (s) html.setAttribute("data-spacing", s)
    if (c) html.setAttribute("data-curves", c)
    // Absent (or "auto") means fluid type — leave the attribute off.
    if (y && y !== "auto") html.setAttribute("data-typeset", y)
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
| `<PortalContainerProvider container>` | Scope where overlays portal to, so they inherit a scoped theme |
| `usePortalContainer()` | Hook returning the active portal container (or `undefined`) |
| `themes` | Array of built-in theme names (`["minimal"]`) |
| `Typography` | Component that applies a typeset step's size + line height + tracking |
| `typeset`, `resolveTypesetSize()` | Fluid type scale data and its interpolation, for non-CSS consumers |
| `lineHeightSteps`, `letterSpacingSteps` | Per-step companions to `typeset` |
| `Theme`, `Mode`, `SpacingScale`, `CurveScale`, `TypesetStep`, `TypesetViewport` | TS types |
