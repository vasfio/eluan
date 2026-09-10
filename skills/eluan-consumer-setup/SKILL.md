---
name: eluan-consumer-setup
description: Set up or debug consumer applications that use @eluan/core, @eluan/tokens, or EluanProvider. Use when wiring Eluan into React, Vite, Next.js, or Storybook apps; adding global CSS imports; configuring SSR-safe theme attributes; using useEluanTheme; creating custom themes; or fixing flash-of-wrong-theme, missing token styles, missing fonts, or invalid data-theme/data-mode/data-spacing/data-curves setup.
---

# Eluan Consumer Setup

## Install

Consumer apps can use any npm-compatible package manager:

```bash
npm install @eluan/core @eluan/tokens
yarn add @eluan/core @eluan/tokens
pnpm add @eluan/core @eluan/tokens
bun add @eluan/core @eluan/tokens
```

`Header`, `HeaderNavigation`, and `Footer` are `@eluan/core` components — no separate package to install.

Do not imply that consumer apps must use pnpm. The Eluan monorepo uses pnpm internally, but published packages should install through npm, yarn, pnpm, or bun.

## Standard Setup

In the app entry:

```tsx
import "@eluan/core/styles.css"
import "@eluan/tokens/css"

import { EluanProvider } from "@eluan/core"

export function App() {
  return (
    <EluanProvider
      defaultTheme="minimal"
      defaultMode="light"
      defaultSpacing="standard"
      defaultCurves="slight"
    >
      <Routes />
    </EluanProvider>
  )
}
```

Import `Header`, `HeaderNavigation`, and `Footer` from `@eluan/core` — either the barrel (`@eluan/core`) or subpaths such as `@eluan/core/header`. Their styles are already covered by `@eluan/core/styles.css`.

## Valid Values

- `defaultTheme`: `minimal` (the only built-in) or a custom theme name
- `defaultMode`: `light`, `dim`, `dark`
- `defaultSpacing`: `compact`, `standard`, `wide`
- `defaultCurves`: `sharp`, `slight`, `sweeping`

Do not suggest removed themes: `industrial-retro`, `lime`, `bold`, `beige`, `funky`.

## Theme Hook

Use:

```tsx
import { useEluanTheme } from "@eluan/core"

const { theme, mode, spacing, curves, setTheme, setMode, setSpacing, setCurves } =
  useEluanTheme()
```

Do not manually manage the four root attributes inside random React effects unless intentionally integrating with a non-React shell.

## SSR Preload

For SSR apps, set attributes before hydration to avoid flash-of-wrong-theme:

```html
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

For Next.js, render the script with `next/script` and `strategy="beforeInteractive"`.

## Custom Themes

Use:

```tsx
import { createTheme, EluanProvider } from "@eluan/core"

const acme = createTheme({
  name: "acme",
  extends: "minimal", // optional — the only built-in, and the default
  tokens: {
    "--action-primary-bg": "#4f46e5",
    "--action-primary-bg-hover": "#4338ca",
  },
})

<EluanProvider customThemes={[acme]} defaultTheme="acme" />
```

`extends` defaults to `"minimal"`; only set it explicitly for clarity. Overriding every token by hand is almost never the right call — reach for `@eluan/theme-generator` when you want a full brand palette.

## Scoped Themes and Overlays

When the theme attributes are scoped to a subtree (`EluanProvider target={el}`, or hand-written `data-*` on a wrapper), portalled overlays — DropdownMenu, Popover, Select, ContextMenu, Dialog, Sheet, Menubar — still mount into `document.body` and therefore render with the page-level theme, not the scope.

Give the overlays a portal target inside the scope:

```tsx
const [scope, setScope] = useState<HTMLElement | null>(null)

<div ref={setScope}>
  {scope && (
    <EluanProvider target={scope} portalContainer={scope} defaultMode="dark">
      <App />
    </EluanProvider>
  )}
</div>
```

Without `EluanProvider`, wrap the region in `PortalContainerProvider` (exported from `@eluan/core`) with the same element; `usePortalContainer()` reads it. A single overlay can override with an explicit `container` prop on its Content.

Caveat: Radix positions popovers with `position: fixed`, so any container in normal flow works — but a `transform`, `filter`, `perspective`, `backdrop-filter`, or `contain` on the container or an ancestor becomes the containing block and offsets (or clips) the overlay.

## Troubleshooting

- Missing styles: confirm CSS imports are in the app root and package CSS is bundled.
- White-on-white UI: confirm `data-theme`, `data-mode`, and token CSS are present.
- Fonts not changing: confirm `EluanProvider` is mounted and not blocked from accessing `document`.
- Invalid theme: check the `themes` export and the custom theme name. `minimal` is the only built-in; every other name must be registered via `customThemes`.
- Overlay ignores a scoped theme (dropdown renders light inside a dark region): the portal escapes the scope — pass `portalContainer` to `EluanProvider` or wrap in `PortalContainerProvider`.
- Consuming tokens in your own app CSS: reference them as plain CSS custom properties, e.g. `color: var(--container-fg);` and `font-size: var(--font-size-sm);`. Tokens are available anywhere below the element carrying the `data-theme`/`data-mode` attributes.
