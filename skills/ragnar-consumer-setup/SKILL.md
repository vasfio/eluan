---
name: ragnar-consumer-setup
description: Set up or debug consumer applications that use @vasf/ragnar-core, @vasf/ragnar-tokens, @vasf/ragnar-web, or RagnarProvider. Use when wiring Ragnar into React, Vite, Next.js, or Storybook apps; adding global CSS imports; configuring SSR-safe theme attributes; using useRagnarTheme; creating custom themes; or fixing flash-of-wrong-theme, missing token styles, missing fonts, or invalid data-theme/data-mode/data-spacing/data-curves setup.
---

# Ragnar Consumer Setup

## Install

Consumer apps can use any npm-compatible package manager:

```bash
npm install @vasf/ragnar-core @vasf/ragnar-tokens
yarn add @vasf/ragnar-core @vasf/ragnar-tokens
pnpm add @vasf/ragnar-core @vasf/ragnar-tokens
bun add @vasf/ragnar-core @vasf/ragnar-tokens
```

For legacy web layout compatibility exports:

```bash
npm install @vasf/ragnar-web @vasf/ragnar-core @vasf/ragnar-tokens
yarn add @vasf/ragnar-web @vasf/ragnar-core @vasf/ragnar-tokens
pnpm add @vasf/ragnar-web @vasf/ragnar-core @vasf/ragnar-tokens
bun add @vasf/ragnar-web @vasf/ragnar-core @vasf/ragnar-tokens
```

Do not imply that consumer apps must use pnpm. The Ragnar monorepo uses pnpm internally, but published packages should install through npm, yarn, pnpm, or bun.

## Standard Setup

In the app entry:

```tsx
import "@vasf/ragnar-core/styles.css"
import "@vasf/ragnar-tokens/css"

import { RagnarProvider } from "@vasf/ragnar-core"

export function App() {
  return (
    <RagnarProvider
      defaultTheme="industrial-retro"
      defaultMode="light"
      defaultSpacing="standard"
      defaultCurves="slight"
    >
      <Routes />
    </RagnarProvider>
  )
}
```

Use `@vasf/ragnar-web/styles.css` only when the app intentionally imports the legacy `@vasf/ragnar-web` Header/Footer compatibility exports. For new code, prefer `@vasf/ragnar-core` subpath imports such as `@vasf/ragnar-core/header`.

## Valid Values

- `defaultTheme`: `industrial-retro`, `minimal`, or a custom theme name
- `defaultMode`: `light`, `dim`, `dark`
- `defaultSpacing`: `compact`, `standard`, `wide`
- `defaultCurves`: `sharp`, `slight`, `sweeping`

Do not suggest removed themes: `lime`, `bold`, `beige`, `funky`.

## Theme Hook

Use:

```tsx
import { useRagnarTheme } from "@vasf/ragnar-core"

const { theme, mode, spacing, curves, setTheme, setMode, setSpacing, setCurves } =
  useRagnarTheme()
```

Do not manually manage the four root attributes inside random React effects unless intentionally integrating with a non-React shell.

## SSR Preload

For SSR apps, set attributes before hydration to avoid flash-of-wrong-theme:

```html
<script>
(function () {
  try {
    var html = document.documentElement
    var t = localStorage.getItem("ragnar:theme")
    var m = localStorage.getItem("ragnar:mode")
    var s = localStorage.getItem("ragnar:spacing")
    var c = localStorage.getItem("ragnar:curves")
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
import { createTheme, RagnarProvider } from "@vasf/ragnar-core"

const acme = createTheme({
  name: "acme",
  extends: "industrial-retro",
  tokens: {
    "--action-primary-bg": "#4f46e5",
    "--action-primary-bg-hover": "#4338ca",
  },
})

<RagnarProvider customThemes={[acme]} defaultTheme="acme" />
```

Always provide `extends` unless there is a deliberate reason to own every token.

## Troubleshooting

- Missing styles: confirm CSS imports are in the app root and package CSS is bundled.
- White-on-white UI: confirm `data-theme`, `data-mode`, and token CSS are present.
- Fonts not changing: confirm `RagnarProvider` is mounted and not blocked from accessing `document`.
- Invalid theme: check `themes` export and custom theme name. Built-ins are only `industrial-retro` and `minimal`.
- Tailwind ambiguity: use hints such as `text-[color:var(--container-fg)]` and `text-[length:var(--font-size-sm)]`.
