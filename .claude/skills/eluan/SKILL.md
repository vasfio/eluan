---
name: eluan
description: Use when building, theming, or extending UI in apps that depend on @eluan/core, @eluan/tokens, or @eluan/native. Covers component imports, theming via EluanProvider/createTheme, the three-layer token architecture (CSS variables scoped to data-theme/data-mode/data-spacing/data-curves/data-typeset), StyleX authoring, TypeScript types, and the conventions consumers should follow when adding new components or tokens. Trigger when the user mentions Eluan, @eluan, EluanProvider, useEluanTheme, createTheme, design tokens with --container-bg / --interactive-bg-selected / --action-primary-bg etc., the data-theme="minimal" attribute, or any of the components listed below.
---

# Eluan Design System

Eluan is a React design system distributed as a pnpm-workspace monorepo. Consumers install `@eluan/core` (UI and marketing components) and `@eluan/tokens` (tokens/CSS). `Header`, `HeaderNavigation`, and `Footer` are `@eluan/core` components; native-only components live in `@eluan/native`. Components are styled with **StyleX** and consume semantic **CSS custom properties** — there is no utility-class framework in this repo.

This skill is the source of truth for: the component inventory, the token architecture, the StyleX authoring pattern, the consumer setup pattern (`EluanProvider`), how to define a custom theme (`createTheme`), and the conventions to follow when modifying or extending the library.

## When this skill applies

Trigger on any of:
- Imports from `@eluan/*` packages
- Mentions of `EluanProvider`, `useEluanTheme`, `createTheme`, `loadThemeFonts`
- Component names from the inventory below (e.g. "the Calendar component", "the Toast toaster", "Tree View")
- CSS-variable names like `--container-bg`, `--interactive-fg-selected`, `--action-primary-bg-hover`, etc.
- The `data-theme="minimal"` (or custom theme) attribute or `data-mode`, `data-spacing`, `data-curves`, `data-typeset`
- Authoring or editing a StyleX component (`stylex.create`, `stylex.props`, `stylex.keyframes`) that references Eluan tokens

## When this skill does NOT apply

- Generic React questions unrelated to Eluan
- shadcn/ui questions — Eluan **was** shadcn-derived but has diverged completely: it no longer ships utility class names like `bg-primary` or `text-foreground`, and it no longer uses any className-composition or variant helper. Style with StyleX and the token variables.

---

## Architecture in 60 seconds

Three layers of CSS custom properties, activated by attributes on `<html>`:

```
primitives.css   → --color-mono-200, --color-teak-300 …  (raw values)
   ↑ referenced by
modes.css        → --backgrounds-tertiary, --foregrounds-primary …  (light/dim/dark)
   ↑ referenced by
themes.css       → --container-bg, --interactive-bg-selected, --action-primary-bg-hover … (semantic — what components use)
```

Active scope is set via attribute selectors — components don't have to know about the layers, they only read the **semantic** tokens through `var(--…)`:

```html
<html
  data-theme="minimal"            <!-- "minimal" | <custom theme name> -->
  data-mode="light"               <!-- "light" | "dim" | "dark" -->
  data-spacing="standard"         <!-- "compact" | "standard" | "wide" -->
  data-curves="slight"            <!-- "sharp" | "slight" | "sweeping" -->
  data-typeset="large"            <!-- "small" | "medium" | "large"; OMIT for fluid -->
>
```

Spacing density adjusts every `--size-*` and `--spacing-*` token, and shifts which typeset step each `--font-size-*` alias selects. Curves adjusts every `--curves-*`.

`data-typeset` is the odd one out: leave it **off** (the Provider's default `typeset="auto"`) and type sizes stay viewport-fluid via `clamp()`. Setting it pins the whole scale — or any subtree — to one static column.

There is **exactly one built-in theme**: `minimal`. Everything else is a consumer theme defined with `createTheme()` (or generated with `@eluan/theme-generator`) — that consumer themeability is the point of the system, so never propose adding a second built-in theme to the library. The previously shipped `industrial-retro`, `lime`, `bold`, `beige`, and `funky` themes were removed. Don't reference them.

---

## Consumer setup (the standard pattern)

A single stylesheet import pulls in everything — `@eluan/core/styles.css` already `@import`s `@eluan/tokens/css`, so consumers do **not** need a second tokens import.

```tsx
// app entry (e.g. main.tsx, _app.tsx, layout.tsx)
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
      <Routes />
    </EluanProvider>
  )
}
```

`EluanProvider` writes the four `data-*` attributes on `<html>` (configurable via `target` prop), lazy-loads the active theme's fonts via `loadThemeFonts()`, persists user choices to `localStorage` (`eluan:theme`, `eluan:mode`, `eluan:spacing`, `eluan:curves`), and follows OS `prefers-color-scheme` until the user picks a mode.

To read or change values from anywhere:

```tsx
import { useEluanTheme } from "@eluan/core"

const { theme, mode, spacing, curves, typeset, setTheme, setMode, setSpacing, setCurves, setTypeset } = useEluanTheme()
```

### Avoiding flash-of-wrong-theme on SSR

Inject this inline script in `<head>` before the app script so the data-attributes are set before hydration:

```html
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
    if (y && y !== "auto") html.setAttribute("data-typeset", y)
  } catch (e) {}
})()
</script>
```

For Next.js: render via `next/script` with `strategy="beforeInteractive"`.

---

## Custom themes (`createTheme`)

CSS doesn't support selector-level inheritance, so a custom theme can't simply override a few tokens and inherit the rest by name. Eluan solves this with a two-attribute trick: when a custom theme is active, the Provider sets BOTH `data-theme=<base>` AND `data-theme-custom=<name>`. The base activates all base tokens; the custom selector overrides only what you provide.

```tsx
import { createTheme, EluanProvider } from "@eluan/core"

const acme = createTheme({
  name: "acme",                  // must start with a letter; letters, digits, hyphens
  extends: "minimal",            // optional — the only built-in, and the default
  tokens: {
    "--font-heading": '"Acme Display", serif',
    "--font-body":    '"Acme Sans", sans-serif',
    "--action-primary-bg":       "#4f46e5",
    "--action-primary-bg-hover": "#4338ca",
    "--container-bg": "#fafafa",
    // …only the tokens you want to change
  },
})

<EluanProvider customThemes={[acme]} defaultTheme="acme">…</EluanProvider>
```

Behind the scenes: `createTheme` returns `{ name, extends, css }` where `css` is a `[data-theme-custom="<name>"] { ... }` block. The Provider injects all custom themes' CSS into a single `<style id="eluan-custom-themes">` element appended to `<head>`.

`setTheme("acme")` then works exactly like `setTheme("minimal")`.

---

## Component inventory (`@eluan/core`)

There are **68 component modules** in `packages/core/src/components`. Every module exports its `*Props` type(s) alongside the component, so `React.ComponentProps<typeof X>` is rarely needed. Import any of these from `@eluan/core` (or via the `@eluan/core/<name>` subpath):

**Forms / inputs**
`Button` · `Input` (auto-icon by `type="search|email|password|tel|url"`, plus `icon` and `trailing` props for custom leading/trailing; `validationTone="none|positive|destructive"`) · `Textarea` · `Select` (Radix-based) · `MultiSelect` · `Command` (cmdk-based — the Combobox / command-palette primitive) · `Checkbox` · `CheckboxGroup` (with `CheckboxGroupItem`) · `RadioGroup` (with `RadioGroupItem`) · `Switch` · `Slider` · `Toggle` · `ToggleGroup` (with `ToggleGroupItem`) · `SegmentedControl` (with `SegmentedControlItem`) · `Fieldset` · `FormLabel` (also exports `Label`, `FormDescription`, `FormMessage`) · `EmailInput` · `PasswordInput` · `PhoneInput` (uses the `countries-list` package — full country list, common short names, dial codes) · `NumberInput` · `DecimalInput` · `SearchInput` (with `CommandSearch` and `AutocompleteSearch` variants) · `FileInput` · `CreditCardInput` (sub-components `CreditCardNumberInput`, `CreditCardExpiryInput`, `CreditCardCVVInput` — card logos use `fill="currentColor"` + `fillRule="evenodd"` for transparent internal cutouts) · `InputOTP` · `RichText` (TipTap v3 — `useEditorState` for a reactive toolbar)

**Date / time**
`Calendar` (react-day-picker v9 with custom Month/Year selects, external prev/next buttons, and a `data-range-complete` attribute trick for range-mode rounding) · `DatePicker` · `DatetimePicker` · `TimeInput`

**Display / data**
`Table` · `Card` · `Badge` (`microdot` size variant for status dots) · `Avatar` (with `AvatarBadge`, `AvatarStatus`, `AvatarWithStatus`) · `Progress` · `Skeleton` · `Spinner` · `Kbd` · `Banner` · `CodeBlock` · `Media` (with `Image`)

**Typography**
`Typography` — the front door to the fluid typeset. `variant` (`display|title|heading|subheading|lead|body|label|caption`) picks a step plus a family/weight and a default element (`h1`–`h4`, `p`, `span`); `step` re-sizes any variant to any of the 10 rungs; also `as`, `asChild`, `weight` (`normal|medium` only — nothing heavier is loaded), `family`, `tone`, `align`, `truncate`. Every variant sets `font-size`, `line-height` and `letter-spacing` from the same step, so heading tracking always matches the size.

**Navigation / structure**
`Accordion` · `Breadcrumb` · `Carousel` · `Pagination` · `Tabs` · `NavigationMenu` (Radix navigation-menu wrapper) · `NavigationDrawer` (requires `NavigationDrawerProvider`; `NavigationDrawerLayout` gives a sidebar+content shell) · `Stepper` · `TreeView` · `Menubar`

**Overlays / popovers**
`Dialog` (with `layout="command"` for command-palette content) · `Sheet` · `Drawer` (vaul-based) · `Popover` · `ActionPopover` · `Tooltip` · `HoverCard` · `DropdownMenu` · `ContextMenu` · `Toast` (Sonner-based toaster; Eluan token styling is applied through global class hooks — `eluan-toaster`, `eluan-toast`, … — owned by the stylesheet, plus an inline `--border-radius: var(--curves-md)`)

**Layout / utilities**
`Separator` (defaults to `decorative={true}` — pass `decorative={false}` to render with `role="separator"`) · `ScrollArea` · `AspectRatio` · `Collapsible`

**Marketing / page**
`Header` (exports `NavItem`) · `Footer` (with `FooterLink`, `FooterSocialLink`, `FooterBrand`, `FooterStagger`)

**Provider & helpers**
`EluanProvider` · `useEluanTheme()` · `createTheme()`

> Removed components — do **not** reference them: `AlertDialog`, `Timeline`, `Resizable`, `Sidebar`. There is no separate `Combobox` component; use `Command`.

### Re-exported from `@eluan/tokens`

`themes`, `modes`, `spacingScales`, `curveScales`, `themeFonts`, `loadThemeFonts`, `typeset`, `typesetAnchors`, `typesetSteps`, `lineHeightSteps`, `letterSpacingSteps`, `resolveTypesetSize`, and the types `Theme`, `Mode`, `SpacingScale`, `CurveScale`, `TypesetStep`, `TypesetViewport`. Consumers should import these from `@eluan/core` to avoid a separate dep.

---

## StyleX authoring pattern (the shape every component follows)

Components are authored with `@stylexjs/stylex`. Styles are declared once with `stylex.create`, variant/size matrices are modeled as **lookup maps**, and styles are applied by spreading `stylex.props(...)`. `button.tsx` is the canonical reference. The shape:

```tsx
import * as React from "react"
import * as stylex from "@stylexjs/stylex"

export type ThingVariant = "default" | "destructive" | "outline"
export type ThingSize = "default" | "sm" | "lg"

export interface ThingProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "style"> {
  variant?: ThingVariant
  size?: ThingSize
  fullWidth?: boolean
}

const styles = stylex.create({
  base: {
    display: "inline-flex",
    alignItems: "center",
    borderRadius: "var(--curves-md)",
    fontSize: "var(--font-size-sm)",
    gap: "var(--spacing-xs)",
    ":focus-visible": {
      outlineColor: "var(--interactive-border)",
      outlineOffset: "1px",
      outlineStyle: "solid",
      outlineWidth: "1px",
    },
    ":disabled": { opacity: 0.5, pointerEvents: "none" },
  },
  variantDefault: {
    backgroundColor: "var(--action-primary-bg)",
    color: "var(--action-primary-fg)",
    ":hover": { backgroundColor: "var(--action-primary-bg-hover)" },
  },
  variantDestructive: {
    backgroundColor: "var(--destructive-bg)",
    color: "var(--destructive-fg)",
    ":hover": { backgroundColor: "var(--destructive-bg-hover)" },
  },
  variantOutline: {
    backgroundColor: "transparent",
    borderColor: "var(--action-secondary-border)",
    borderStyle: "solid",
    borderWidth: 1,
    color: "var(--action-secondary-fg)",
  },
  sizeDefault: { height: "var(--size-lg)", paddingInline: "var(--spacing-md)" },
  sizeSm: { height: "var(--size-md)", fontSize: "var(--font-size-xs)" },
  sizeLg: { height: "var(--size-xl)", paddingInline: "var(--spacing-xl)" },
  fullWidth: { width: "100%" },
})

// Variant / size lookup maps — typed with `satisfies` so every union key is covered.
const variantStyles = {
  default: styles.variantDefault,
  destructive: styles.variantDestructive,
  outline: styles.variantOutline,
} satisfies Record<ThingVariant, stylex.StyleXStyles>

const sizeStyles = {
  default: styles.sizeDefault,
  sm: styles.sizeSm,
  lg: styles.sizeLg,
} satisfies Record<ThingSize, stylex.StyleXStyles>

const Thing = React.forwardRef<HTMLButtonElement, ThingProps>(
  ({ variant = "default", size = "default", fullWidth = false, ...props }, ref) => (
    <button
      ref={ref}
      {...props}
      {...stylex.props(
        styles.base,
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && styles.fullWidth   // conditional styles pass a falsy value when off
      )}
    />
  )
)
Thing.displayName = "Thing"

export { Thing }
```

Key rules this pattern encodes:

- **`stylex.props(...)` is spread onto the element** (`{...stylex.props(a, b, cond && c)}`), never assigned to `className`/`style` by hand. Conditionals are passed inline; a falsy entry is ignored.
- **Variant/size maps use `satisfies Record<Union, stylex.StyleXStyles>`** so adding a union member without a matching style is a type error.
- **Tokens are referenced as plain `var(--…)` strings** inside StyleX property values — `backgroundColor: "var(--container-bg)"`, `height: "var(--size-lg)"`, `borderRadius: "var(--curves-md)"`.
- **Pseudo-classes and attribute/media selectors are nested objects**: `":hover"`, `":focus-visible"`, `":disabled"`, `"[data-state=open]"`, `"@media (min-width: 640px)"`.

### Reduced-motion gating

Animation uses `stylex.keyframes` for the frames and the **media-query object syntax** to neutralize motion under `prefers-reduced-motion` — no separate CSS file, no conditional class. From `spinner.tsx`:

```tsx
const spin = stylex.keyframes({
  to: { transform: "rotate(360deg)" },
})

const styles = stylex.create({
  root: {
    animationName: spin,
    animationTimingFunction: "linear",
    animationDuration: {
      default: "1s",
      "@media (prefers-reduced-motion: reduce)": "0.01ms",
    },
    animationIterationCount: {
      default: "infinite",
      "@media (prefers-reduced-motion: reduce)": 1,
    },
  },
})
```

### forwardRef / displayName / Props conventions

- **`React.forwardRef` for every public component** that renders an element; the ref reaches the underlying DOM node (or the Radix primitive).
- **`displayName` on every component** — either `Thing.displayName = "Thing"`, or `Thing.displayName = Primitive.displayName` for Radix-wrapped parts (see `dialog.tsx`).
- **Props interfaces/types are exported** (`export interface ThingProps`, `export type ThingVariant`) and **omit `className` and `style`** (`Omit<…, "className" | "style">`). Components are styling-closed: they do not accept or forward `className`/`style`, and tests assert those overrides are dropped. Consumers restyle through **tokens / themes**, not per-component class overrides.
- **Radix `asChild`** is forwarded when a component should render its child as the actual element (e.g. `<Button asChild><a href="…">…</a></Button>`).

---

## API vocabulary (post-unification)

The component APIs were unified in a breaking change. Use these vocabularies when adding or reviewing props:

- **Value callbacks are `onValueChange`.** Any control that emits its own value (CheckboxGroup, MultiSelect, InputOTP, PhoneInput, DatePicker, Calendar, FileInput, DecimalInput, CreditCardInput, DatetimePicker, …) exposes `onValueChange`. Native **event pass-throughs keep `onChange`** — e.g. `Input`, `Textarea`, and the specialized text inputs (`EmailInput`, `PasswordInput`) forward the raw `onChange` event and add their own `on*Change` where they compute something (e.g. `EmailInput`'s `onValidationChange`).
- **Tone variants are `informative | positive | caution | destructive`** (plus component-specific extras like `neutral`, `important`, `secondary`, `outline`, `default`). Note the token layer intentionally kept the longer name: the **`caution`** tone reads the **`--cautionary-*`** tokens (e.g. `Badge variant="caution"` → `backgroundColor: "var(--cautionary-bg)"`). Not every component carries every tone — `Button` has `destructive`/`caution`/`positive` but no `informative`; `Badge` and `Banner` add `informative`.
- **Sizes.** The component `size` prop is small and component-specific — typically `default` (the medium/base size) plus `sm` and `lg`, sometimes `xl` (`Spinner`), with icon-only sizes `icon | iconSm | iconXs | iconInline` on `Button` (and `iconSm` on `Toggle`). This is distinct from the **token scale steps** (`--size-*`, `--spacing-*`, `--font-size-*`) which use `xs / sm / md / lg / xl / 2xl …`. Don't assume a uniform `xs–xl` `size` prop across components — read the component's `*Size` union.

---

## Token reference (the names you'll actually use)

All tokens are CSS custom properties. In components, reference them as `var(--…)` string values inside StyleX property objects:

```tsx
const styles = stylex.create({
  panel: {
    backgroundColor: "var(--container-bg)",
    color: "var(--container-fg)",
    fontSize: "var(--font-size-sm)",
    borderRadius: "var(--curves-md)",
  },
})
```

### Containers (cards, popovers, table rows, etc.)
`--container-bg` · `--container-bg-alt` (subtle alternate) · `--container-fg` · `--container-fg-alt` (muted text) · `--container-fg-inverse` · `--container-border` · `--container-border-alt`

### Interactive surfaces (inputs, selectable rows, hoverable items)
`--interactive-bg` · `--interactive-bg-hover` · `--interactive-bg-active` · `--interactive-bg-selected` · `--interactive-bg-disabled` · `--interactive-bg-alt` · `--interactive-bg-alt2` · `--interactive-bg-inverse` · `--interactive-fg` · `--interactive-fg-hover` · `--interactive-fg-alt` (muted/icon color — also the leading-icon color in `Input`) · `--interactive-fg-active` · `--interactive-fg-selected` · `--interactive-fg-disabled` · `--interactive-fg-inverse` · `--interactive-border` (default focus color, see below) · `--interactive-border-alt` · `--interactive-border-disabled`

### Action-primary (CTA buttons)
`--action-primary-bg` · `-bg-hover` · `-bg-active` · `-bg-selected` · `-bg-disabled` · `-bg-inverse` · `--action-primary-fg` · `-fg-hover` · `-fg-active` · `-fg-selected` · `-fg-disabled` · `-fg-inverse`

### Action-secondary (outline buttons) / Action-tertiary (ghost buttons)
`--action-secondary-*` and `--action-tertiary-*` follow the same `bg / border / fg` families with `-hover`, `-active`, `-selected`, `-disabled`, `-alt`, `-inverse` suffixes.

### Status / tone colors
`--positive-*`, `--cautionary-*`, `--destructive-*`, `--informative-*`, `--important-*` (each with `bg` / `bg-alt` / `bg-inverse` / `border` / `border-alt` / `fg` / `fg-alt` / `fg-strong` where defined). Reminder: the `caution` tone → `--cautionary-*`.

### Base semantic aliases (mode layer)
`--backgrounds-primary|secondary|tertiary|quaternary|quinary` and `--foregrounds-primary|secondary|tertiary|quaternary|quinary` — used by neutral surfaces (e.g. `Button` `secondary`/`ghost`).

### Data-viz palette
`--dataviz-1-main` · `--dataviz-1-tint` · `--dataviz-1-shade` (and `-2-` through `-8-`)

### Typography / spacing / sizing / curves
- Fonts: `--font-heading`, `--font-body`, `--font-mono` (theme-driven). Mono is **Paper Mono**, a variable font (wght 100–800) vendored inside `@eluan/tokens`; `minimal` uses Inter for heading + body.
- Typeset (the fluid type scale): `--font-size-step-6` … `--font-size-step-0` … `--font-size-step-neg3`. Every step interpolates with the viewport via a two-segment `clamp()` anchored at 480px / 748px / 1024px, so type resizes with no media queries in app code. `data-typeset="small|medium|large"` pins the scale to one column; omitting the attribute keeps it fluid.
- Per-step companions: `--line-height-step-*` (1.5 for neg3–0, 1.375 for 1–2, 1.2 for 3–6) and `--letter-spacing-step-*` (0 up to step 1, then tightening to `-0.03em` at step 6). Always apply all three tokens of a step together — that's what `Typography` does.
- Font sizes: `--font-size-xs|sm|base|lg|xl|2xl|3xl|4xl|5xl`. These are **not** static values any more: each density selects a typeset *step* (compact = one step down, wide = one step up), and the step's value is itself viewport-fluid. The old numeric primitives (`--font-size-12` … `--font-size-60`) were removed.
- Spacing: `--spacing-xxs|xs|sm|md|lg|xl|2xl|3xl|4xl` (density-driven)
- Sizes (component heights / icon dimensions): `--size-xxs|xs|sm|md|lg|xl|2xl|3xl|4xl` (density-driven)
- Curves (border-radius): `--curves-xxs|xs|sm|md|lg|xl` (curves-axis-driven); full pill via `--radius-radius-full`

### Focus color (the system-wide focus indicator)
`var(--interactive-border)` is the standard focus color. The system uses an **outline** (not a ring), applied in a `":focus-visible"` block:

```tsx
":focus-visible": {
  outlineColor: "var(--interactive-border)",
  outlineOffset: "1px",
  outlineStyle: "solid",
  outlineWidth: "1px",
},
```

It's theme- and mode-aware. Only deviate (e.g. validation states → `--destructive-border`) when there's a real semantic reason.

---

## Conventions for adding / modifying components

These are the patterns the codebase already follows. Match them when extending Eluan:

1. **Use semantic tokens, never hex or legacy shadcn aliases.** No `bg-primary`, `text-foreground`, hardcoded `#hex`/`rgb()`, or raw pixel values in shipped components. Always reference tokens as `var(--…)` strings inside StyleX: `backgroundColor: "var(--container-bg)"`, `color: "var(--container-fg-alt)"`, `height: "var(--size-lg)"`, `borderRadius: "var(--curves-md)"`.

2. **Model variants as `stylex.create` entries plus a lookup map.** Each variant/size is a named rule in the `stylex.create({...})` object; a `satisfies Record<Union, stylex.StyleXStyles>` map resolves the active key. See `button.tsx`, `badge.tsx`, `banner.tsx`.

3. **Composition over duplication.** When adding a specialized input (`EmailInput`, `NumberInput`, `PasswordInput`), build it on top of the base `Input` using its `icon`, `trailing`, and `validationTone` props. Don't reimplement the input chrome. `Input` auto-resolves a leading icon from `type="search|email|password|tel|url"`; pass `icon={null}`/`icon={undefined}` to suppress.

4. **Radix `asChild` for Slot patterns.** Forward `asChild` through to the underlying primitive so consumers can render their own element.

5. **`forwardRef` + `displayName` on every public component**, and **export the `*Props` type(s)** and any variant unions. Props omit `className`/`style`.

6. **Density & curves come from tokens, not literals.** Spacing/sizing use `--spacing-*` / `--size-*` (they adjust for compact/standard/wide); rounded corners use `--curves-*` (the axis lets users pick `sharp` → `slight` → `sweeping` globally). Don't bake in fixed px.

7. **Gate animation on reduced motion** using the media-query object syntax shown above; use `stylex.keyframes` for frames.

8. **Keep theme/mode/spacing/curves logic out of components.** Components only consume tokens. The Provider owns all attribute toggling.

9. **Inline brand SVGs with `fill="currentColor"`** for the main shape and `fillRule="evenodd"` so compound paths render internal cutouts as transparent — this is how `CreditCardInput`'s logos inherit the surrounding text color.

10. **Prefer well-behaved dependencies.** When a third-party library is needed (e.g. phone dial codes), pick one without politically contentious data or ESM/`require` interop hazards. `countries-list` (Annexare) is the package used for phone codes — Taiwan is "Taiwan", not a longer politicized name.

---

## Theming "do this not that"

| Do (StyleX + tokens) | Don't |
|---|---|
| `backgroundColor: "var(--container-bg)"` | hardcode `"#fff"` or reach for a `background` alias |
| `color: "var(--container-fg-alt)"` | hardcode a gray, or invent a `muted` alias |
| `borderRadius: "var(--curves-md)"` | hardcode `"8px"` (breaks the curves axis) |
| `height: "var(--size-lg)"` | hardcode `"40px"` (breaks density) |
| `fontSize: "var(--font-size-sm)"`, or a typeset step via `Typography` | hardcode `"14px"` (breaks density re-indexing and fluid sizing) |
| Use `<EluanProvider>` + `useEluanTheme()` | Manually manage the `data-*` attributes |
| `createTheme({ extends, tokens })` | Hand-write a full token CSS block |
| `customThemes` prop on Provider | Inject a `<style>` tag yourself |
| Restyle via a custom theme or by wrapping in an element that sets `style={{ "--token": "value" }}` | Try to pass `className`/`style` to a component (they're stripped) |
| One-off region: wrap it in a `<div style={{ "--token": "value" }}>` so tokens cascade | Add a whole new theme for a single page |

---

## Build / test / lint (for contributors)

The monorepo uses pnpm workspaces. The published package is `@eluan/core`; the others are buildable but not all are on npm.

```bash
pnpm -r build                     # build every package
pnpm --filter @eluan/core test    # vitest + @testing-library/react on happy-dom
pnpm --filter @eluan/core lint    # eslint v9, flat config at repo root
```

**Why happy-dom not jsdom**: `jsdom@28` ships `html-encoding-sniffer@6`, which requires the ESM-only `@exodus/bytes` via `require()` — fails under Node 20.x's strict ESM. happy-dom is a drop-in replacement (configured in `packages/core/vitest.config.ts`, `setupFiles: ["./src/test/setup.ts"]`).

**ESLint**: root flat config at `eslint.config.js`. Stories, tests, and `.storybook/` are excluded. The `core` lint script is `eslint src --report-unused-disable-directives`.

### Common test patterns

There is one test suite per component (68 suites under `packages/core/src/components/__tests__/`). Tests use `vitest` + `@testing-library/react` and assert on stable semantics, not styling:

- **Don't assert on the generated StyleX class names** — they're hashed and change on refactor. Assert on text content, `role`, `data-state`, or attributes. (Because components strip `className`, several suites also assert an override class is *not* present.)
- For Radix open/close: `expect(trigger).toHaveAttribute("data-state", "open")`. `toBeVisible()` doesn't reliably reflect Radix's animated transitions under happy-dom.
- For toggle items in `ToggleGroup`: query by visible text (`getByText("A")`), not role — Radix maps to `radio` for `type="single"` and plain `button` for `type="multiple"`.
- For the `Separator` role, pass `decorative={false}` — the default `true` strips the role.
- For the `Slider`: it's `data-disabled`, not the native `disabled` attribute (the thumb is a span).

### Common build pitfalls

- `Calendar` uses `react-day-picker` v9, whose `props.selected` is a discriminated union keyed on `mode`. Read it via `(props as { selected?: … }).selected` — TS won't narrow without help.
- Adding a new component? Export it from `packages/core/src/index.ts` (alphabetical inside the components block) and give it a `.tsx`, a `.stories.tsx`, and a `__tests__/*.test.tsx`.

---

## Anti-patterns to flag if a user proposes them

- **Re-introducing removed themes** (`lime`, `bold`, `beige`, `funky`) or removed components (`AlertDialog`, `Timeline`, `Resizable`) — they were intentionally removed.
- **Hardcoding hex/rgb colors or raw px in components** — should be tokens.
- **Accepting/forwarding `className` or `style`** on a component — the system is styling-closed; restyle via tokens/themes.
- **Adding a new token without defining it in the `minimal` theme block** — custom themes inherit from `minimal`, so a token missing there is unresolved everywhere.
- **Bypassing `EluanProvider`** by setting `data-*` attributes manually inside React effects — works but loses persistence + font lazy-loading + system-mode sync.
- **Importing `@radix-ui/*` primitives directly in app code** when a wrapped Eluan component exists, or importing from `@eluan/tokens` directly when `@eluan/core` re-exports the same thing.
- **Redeclaring all ~150 tokens in a custom theme** — `extends` defaults to `"minimal"`, so override only what changes; use `@eluan/theme-generator` for a full brand palette.
- **Custom theme names that collide with the built-in** (`minimal`) — the Provider throws at mount.

---

## Quick API reference

```tsx
// Provider
<EluanProvider
  defaultTheme?:     "minimal" | string                   // default "minimal"
  defaultMode?:      "light" | "dim" | "dark"             // default OS preference (light/dark)
  defaultSpacing?:   "compact" | "standard" | "wide"      // default "standard"
  defaultCurves?:    "sharp" | "slight" | "sweeping"      // default "slight"
  defaultTypeset?:   "auto" | "small" | "medium" | "large" // default "auto" (no attribute → fluid)
  customThemes?:     CustomTheme[]                        // from createTheme()
  persist?:          boolean                              // default true
  followSystemMode?: boolean                              // default true
  target?:           "html" | "body" | HTMLElement | null // default "html"
/>

// Hook
const {
  theme, mode, spacing, curves, typeset,
  setTheme, setMode, setSpacing, setCurves, setTypeset,
} = useEluanTheme()
// setTypeset("large") pins + persists to "eluan:typeset";
// setTypeset("auto") removes data-typeset and clears the key.

// Custom theme factory
createTheme({
  name:     "acme",                         // starts with a letter; letters, digits, hyphens
  extends?: "minimal",                      // the only built-in; default "minimal"
  tokens:   { "--container-bg": "…", … },   // partial map of token overrides
}): CustomTheme   // → { name, extends, css }

// Font preloader (rarely needed — Provider calls this automatically)
loadThemeFonts(theme: Theme): Promise<void>
```
