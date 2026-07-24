---
name: eluan
description: Use when building, theming, or extending UI in apps that depend on @eluan/core, @eluan/tokens, @eluan/web, or @eluan/native. Covers component imports, theming via EluanProvider/createTheme, the three-layer token architecture (CSS variables scoped to data-theme/data-mode/data-spacing/data-curves), TypeScript types, and the conventions consumers should follow when adding new components or tokens. Trigger when the user mentions Eluan, @eluan, EluanProvider, useEluanTheme, createTheme, design tokens with --container-bg / --interactive-bg-selected / --action-primary-bg etc., the data-theme="industrial-retro|minimal" attribute, or any of the components listed below.
---

# Eluan Design System

Eluan is a React design system distributed as a pnpm-workspace monorepo. Consumers install `@eluan/core` (UI and marketing components) and `@eluan/tokens` (tokens/CSS). `@eluan/web` is a compatibility facade for `Header` and `Footer`, and native-only components live in `@eluan/native`.

This skill is the source of truth for: component inventory, the token architecture, the consumer setup pattern (`EluanProvider`), how to define a custom theme (`createTheme`), and the conventions to follow when modifying or extending the library.

## When this skill applies

Trigger on any of:
- Imports from `@eluan/*` packages
- Mentions of `EluanProvider`, `useEluanTheme`, `createTheme`, `loadThemeFonts`
- Component names from the inventory below (e.g. "the Calendar component", "Sonner toaster", "Tree View")
- CSS-variable names like `--container-bg`, `--interactive-fg-selected`, `--action-primary-bg-hover`, etc.
- The `data-theme="industrial-retro" | "minimal"` attribute or `data-mode`, `data-spacing`, `data-curves`
- Tasks involving Tailwind classes that reference the tokens (e.g. `bg-[var(--interactive-bg-selected)]`)

## When this skill does NOT apply

- Generic React/Tailwind questions unrelated to Eluan
- shadcn/ui questions — Eluan **was** shadcn-derived but has diverged: do NOT assume class names like `bg-primary`, `text-foreground`, etc. exist. Use the token variables.

---

## Architecture in 60 seconds

Three layers of CSS custom properties, activated by attributes on `<html>`:

```
primitives.css   → --color-mono-200, --color-teak-300 …  (raw values)
   ↑ referenced by
modes.css        → --backgrounds-tertiary, --foregrounds-primary …  (light/dark)
   ↑ referenced by
themes.css       → --container-bg, --interactive-bg-selected, --action-primary-bg-hover … (semantic — what components use)
```

Active scope is set via attribute selectors — components don't have to know about the layers, they only use the **semantic** tokens:

```html
<html
  data-theme="industrial-retro"   <!-- "industrial-retro" | "minimal" | <custom> -->
  data-mode="light"               <!-- "light" | "dark" -->
  data-spacing="standard"         <!-- "compact" | "standard" | "wide" -->
  data-curves="slight"            <!-- "sharp" | "slight" | "sweeping" -->
>
```

Spacing density adjusts every `--size-*` and `--spacing-*` token. Curves adjusts every `--curves-*`.

There are **only two built-in themes**: `industrial-retro` and `minimal`. The previous `lime`, `bold`, `beige`, `funky` themes were removed. Don't reference them.

---

## Consumer setup (the standard pattern)

```tsx
// app entry (e.g. main.tsx, _app.tsx, layout.tsx)
import "@eluan/core/styles.css"
import "@eluan/tokens/css"

import { EluanProvider } from "@eluan/core"

export default function App() {
  return (
    <EluanProvider
      defaultTheme="industrial-retro"
      defaultMode="light"
      defaultSpacing="standard"
      defaultCurves="slight"
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

const { theme, mode, spacing, curves, setTheme, setMode, setSpacing, setCurves } = useEluanTheme()
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
    if (t) html.setAttribute("data-theme", t)
    if (m) html.setAttribute("data-mode", m)
    if (s) html.setAttribute("data-spacing", s)
    if (c) html.setAttribute("data-curves", c)
  } catch (e) {}
})()
</script>
```

For Next.js: render via `next/script` with `strategy="beforeInteractive"`.

---

## Custom themes (`createTheme`)

CSS doesn't support selector-level inheritance, so a custom theme can't simply override a few tokens and inherit the rest by name. Eluan solves this with a two-attribute trick: when a custom theme is active, the Provider sets BOTH `data-theme=<base>` AND `data-theme-custom=<name>`. The base activates ~150 base tokens; the custom selector overrides only what you provide.

```tsx
import { createTheme, EluanProvider } from "@eluan/core"

const acme = createTheme({
  name: "acme",                  // unique, alphanumeric + hyphen
  extends: "industrial-retro",   // optional, default
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

`setTheme("acme")` then works exactly like a built-in theme.

---

## Component inventory (`@eluan/core`)

Import any of these from `@eluan/core`:

**Forms / inputs**
`Button` · `Input` (auto-icon by `type="search|email|password|tel|url"`, plus `icon` and `trailing` props for custom leading/trailing) · `Textarea` · `Select` (Radix-based, with a 32px left padding to clear the check indicator) · `MultiSelect` · `Combobox` (via `Command`) · `Checkbox` · `CheckboxGroup` (with `CheckboxGroupItem`) · `RadioGroup` (with `RadioGroupItem`) · `Switch` · `Slider` · `Toggle` · `ToggleGroup` (with `ToggleGroupItem`) · `Fieldset` · `Label` (re-exported as `FormLabel`, also exports `FormDescription` and `FormMessage`) · `EmailInput` · `PasswordInput` · `PhoneInput` (uses the `countries-list` package — full country list, common short names, `+1`/`+44`/etc dial codes) · `NumberInput` · `DecimalInput` · `SearchInput` (with `CommandSearch` and `AutocompleteSearch` variants — uses `Delete` lucide icon for clear, not `X`) · `FileInput` · `CreditCardInput` (sub-components `CreditCardNumberInput`, `CreditCardExpiryInput`, `CreditCardCVVInput` — all card logos use `currentColor` + `fillRule="evenodd"` for transparent internal cutouts) · `InputOTP` · `RichText` (TipTap v3 — uses `useEditorState` for reactive toolbar, the toolbar bg is `var(--container-bg-alt)`)

**Date / time**
`Calendar` (react-day-picker v9 with custom Month/Year selects in the caption, external prev/next buttons, `data-range-complete` attribute trick for range mode rounding) · `DatePicker` · `DatetimePicker` · `TimeInput`

**Display / data**
`Table` · `Card` · `Badge` (`microdot` size variant exists for status dots) · `Avatar` (with `AvatarBadge`, `AvatarStatus`, `AvatarWithStatus`) · `Progress` · `Skeleton` · `Spinner` · `Kbd` · `Banner` · `CodeBlock` · `Media` (with `Image`)

**Navigation / structure**
`Accordion` · `Breadcrumb` · `Carousel` · `Pagination` · `Tabs` · `NavigationDrawer` (requires `NavigationDrawerProvider` wrapper · uses `NavigationDrawerLayout` helper for a sidebar+content shell · animates with `transition-[width]` to avoid layout shift) · `Stepper` · `Timeline` (with `TimelineItem`, `TimelineLine`, `TimelineDot`, `TimelineHeader`, `TimelineTitle`, `TimelineDescription`, `TimelineContent`, `TimelineHorizontal` etc. · spacing scales via `--size-sm` / `--spacing-xl`) · `TreeView` · `Menubar` · `Command` (cmdk-based · group headings use `px-[var(--spacing-xs)]` to align with options · `CommandShortcut` uses `--container-fg-alt`, switches to `--container-fg-inverse` on `data-selected=true` parent · `CommandSeparator` renders the design system `Separator` via cmdk's `asChild`)

**Overlays / popovers**
`Dialog` · `AlertDialog` · `Sheet` · `Drawer` (vaul-based) · `Popover` · `ActionPopover` · `Tooltip` · `HoverCard` · `DropdownMenu` · `ContextMenu` · `Sonner` (toast — needs explicit `!font-[var(--font-body)]` and `!p-[var(--spacing-md)]` overrides because Sonner ships its own opinionated CSS that hardcodes system font + 16px padding)

**Layout / utilities**
`Separator` (defaults to `decorative={true}` — pass `decorative={false}` to render with `role="separator"`) · `ScrollArea` · `AspectRatio` · `Collapsible` · `Resizable` (deleted — do not reference)

**Provider & helpers**
`EluanProvider` · `useEluanTheme()` · `createTheme()` · `cn()` (className merge utility from `lib/utils`)

### Re-exported from `@eluan/tokens`

`themes`, `modes`, `spacingScales`, `curveScales`, `themeFonts`, `loadThemeFonts`, and the types `Theme`, `Mode`, `SpacingScale`, `CurveScale`. Consumers should import these from `@eluan/core` to avoid a separate dep.

---

## Token reference (the names you'll actually use)

All tokens live as CSS custom properties. Use them in Tailwind via the arbitrary-value syntax:

```tsx
className="bg-[var(--container-bg)] text-[color:var(--container-fg)]"
```

For `font-size`: `text-[length:var(--font-size-sm)]`. For `color`: `text-[color:var(--container-fg-alt)]`. The bracket helper is required so Tailwind doesn't treat the var as a fixed value.

### Containers (cards, popovers, table rows, etc.)
`--container-bg` · `--container-bg-alt` (subtle alternate) · `--container-fg` · `--container-fg-alt` (muted text) · `--container-fg-inverse` · `--container-border` · `--container-border-alt`

### Interactive surfaces (inputs, selectable rows, hoverable items)
`--interactive-bg` · `--interactive-bg-hover` · `--interactive-bg-active` · `--interactive-bg-selected` · `--interactive-bg-disabled` · `--interactive-bg-alt` · `--interactive-bg-alt2` · `--interactive-fg` · `--interactive-fg-hover` · `--interactive-fg-alt` (muted/icon color — also the leading-icon color in the `Input` component) · `--interactive-fg-active` · `--interactive-fg-selected` · `--interactive-fg-disabled` · `--interactive-border` (default ring/focus color, see below) · `--interactive-border-alt`

### Action-primary (CTA buttons)
`--action-primary-bg` · `--action-primary-bg-hover` · `--action-primary-bg-active` · `--action-primary-bg-selected` · `--action-primary-bg-disabled` · `--action-primary-bg-inverse` · `--action-primary-fg` · `--action-primary-fg-hover` · `--action-primary-fg-active` · `--action-primary-fg-selected` · `--action-primary-fg-disabled` · `--action-primary-fg-inverse`

### Action-secondary (outline buttons)
`--action-secondary-bg`, `-hover`, `-active`, `-selected`, `-disabled` · `--action-secondary-border`, `-alt`, `-disabled`, `-inverse` · `--action-secondary-fg`, `-alt`, `-active`, `-selected`, `-disabled`, `-inverse`

### Action-tertiary (ghost buttons)
Same pattern as secondary: `bg`, `bg-hover`, `bg-active`, `bg-selected`, `bg-disabled`, `bg-alt`, `bg-inverse`, plus matching border / fg variants.

### Status colors
`--positive-bg` / `-bg-alt` / `-bg-inverse` / `-border` / `-border-alt` / `-border-inverse` / `-fg` / `-fg-alt` / `-fg-strong`
`--cautionary-*` (same pattern)
`--destructive-*` (same pattern)
`--informative-*` (same pattern)
`--important-*` (same pattern, used by `Badge` `variant="important"`)

### Data-viz palette
`--dataviz-1-main` · `--dataviz-1-tint` · `--dataviz-1-shade` (and `-2-` through `-8-`)

### Typography / spacing / sizing / curves
- Fonts: `--font-heading`, `--font-body`, `--font-mono` (theme-driven)
- Font sizes: `--font-size-xs|sm|base|lg|xl|2xl|3xl` (density-driven)
- Spacing: `--spacing-xxs|xs|sm|md|lg|xl|2xl` (density-driven)
- Sizes (component heights/icon dimensions): `--size-xxs|xs|sm|md|lg|xl` (density-driven)
- Curves (border-radius): `--curves-xxs|xs|sm|md|lg|xl` (curves-axis-driven)

### Focus color (the system-wide focus ring)
`var(--interactive-border)` is used in 19 components as the `focus-visible:ring-...` color. Standard pattern:

```css
focus-visible:outline-none
focus-visible:ring-1
focus-visible:ring-[var(--interactive-border)]
focus-visible:ring-offset-1
```

It's theme- and mode-aware. Only deviate (e.g. for validation states) when there's a real semantic reason.

---

## Conventions for adding / modifying components

These are the patterns the codebase already follows. Match them when extending Eluan:

1. **Use semantic tokens, never hex / shadcn classes.** No `bg-primary`, `text-foreground`, `bg-destructive`, `h-9`, `rounded-lg` — they were removed during the token migration. Always: `bg-[var(--container-bg)]`, `text-[color:var(--container-fg-alt)]`, `h-[var(--size-lg)]`, `rounded-[var(--curves-md)]`.

2. **Tailwind v4 type hints**: `text-[length:var(--font-size-sm)]` for font-size, `text-[color:var(--container-fg)]` for color. The `length:` and `color:` prefixes are required.

3. **Composition over duplication.** When adding a new specialized input (e.g. `EmailInput`, `NumberInput`), build it on top of the base `Input` component using its `icon` and `trailing` props. Don't reimplement the input chrome. If a component needs to show a leading icon, the `Input` component auto-resolves icons from `type="search|email|password|tel|url"`; pass `icon={null}` to suppress.

4. **Radix `asChild` for class-of-Slot patterns.** When you want a Eluan component to render its children as the actual element (e.g. `<Button asChild><a href="…">…</a></Button>`), forward `asChild` through to the underlying primitive.

5. **CVA for variants.** All variant-bearing components use `cva` (class-variance-authority). Variants live in a `<componentName>Variants` const, exported when consumers need the keys.

6. **`forwardRef` for every public component.** Refs flow through to the underlying DOM node.

7. **`displayName` on every component.** Either `Component.displayName = "Component"` or `Component.displayName = Primitive.displayName` for Radix-wrapped components.

8. **Density scaling**: when adding spacing/sizing, use the scale tokens. Example: padding-bottom on a list item should be `pb-[var(--spacing-md)]`, not `pb-3`. The token automatically adjusts for compact/standard/wide.

9. **Curves**: rounded corners should use `--curves-*` tokens, not Tailwind's `rounded-md`. The `--curves-*` axis lets users choose `sharp` (0px), `slight`, or `sweeping` globally.

10. **Don't put themes/modes/spacing/curves logic inside components.** Components only consume tokens. The Provider owns all attribute toggling.

11. **CSS-in-SVG**: when inlining brand SVGs, use `fill="currentColor"` for the main shape and `fillRule="evenodd"` to make compound paths render internal cutouts as transparent. This is how `CreditCardInput`'s logos work — they inherit the parent's text color (matched to the leading icon's `var(--interactive-fg-alt)`).

12. **Hardcoded ESM peer-dep tip**: when adding a third-party library that ships ESM-only code (like `country-list-with-dial-code-and-flag` — which exposed politically contentious country names anyway), prefer alternatives without those issues. `countries-list` (Annexare) is the package used for phone codes — Taiwan is just "Taiwan", not "Taiwan, Province of China".

---

## Theming "do this not that"

| Do | Don't |
|---|---|
| `bg-[var(--container-bg)]` | `bg-white` or `bg-background` |
| `text-[color:var(--container-fg-alt)]` | `text-muted` or `text-gray-500` |
| `rounded-[var(--curves-md)]` | `rounded-md` (breaks the curves axis) |
| `h-[var(--size-lg)]` | `h-10` (breaks density) |
| `text-[length:var(--font-size-sm)]` | `text-sm` (works in some contexts but breaks density-scaled font sizing) |
| Use `<EluanProvider>` + `useEluanTheme()` | Manually manage the `data-*` attributes |
| `createTheme({ extends, tokens })` | Write a full 150-token CSS block |
| `customThemes` prop on Provider | Inject a `<style>` tag yourself |
| Override per-component via `className` | Edit the component source for one-off colors |
| One-off region: inline `style={{ "--token": "value" }}` | Add a new theme for a single page |

---

## Build / test / lint (for contributors)

The monorepo uses pnpm workspaces. The currently-published package is `@eluan/core`. The other packages are buildable but not all are on npm.

```bash
pnpm -r build        # build every package
pnpm --filter @eluan/core test   # 192 tests via vitest + happy-dom
pnpm --filter @eluan/core lint   # eslint v9, flat config at repo root
```

**Why happy-dom not jsdom**: `jsdom@28` ships `html-encoding-sniffer@6` which requires the ESM-only `@exodus/bytes` via `require()` — fails under Node 20.x's strict ESM. happy-dom is a drop-in replacement.

**ESLint**: root flat config at `eslint.config.js`. Stories, tests, and `.storybook/` are excluded. The `core` lint script is `eslint src --report-unused-disable-directives`.

### Common test patterns

- Don't assert on Tailwind classes — they're brittle. Assert on text content, role, or `data-state` (Radix exposes open/closed via this attribute).
- For Radix open/close: `expect(trigger).toHaveAttribute("data-state", "open")`. `toBeVisible()` doesn't reliably reflect Radix's animated transitions in happy-dom.
- For toggle items in `ToggleGroup`: query by visible text (`getByText("A")`), not role — Radix maps to `radio` for `type="single"` and plain `button` for `type="multiple"`.
- For the `Separator` role, pass `decorative={false}` — the default `true` value strips the role.
- For the `Slider`: it's `data-disabled`, not the native `disabled` attribute (the thumb is a span).

### Common build pitfalls

- Calendar uses `react-day-picker` v9, which has a discriminated union for `props.selected` based on `mode`. Read it via `(props as { selected?: ... }).selected` — TS won't narrow without help.
- Adding a new component? Export it from `packages/core/src/index.ts` (alphabetical inside the components block).

---

## Anti-patterns to flag if a user proposes them

- **Re-introducing removed themes** (`lime`, `bold`, `beige`, `funky`) — they were intentionally removed.
- **Hardcoding hex colors in components** — should be tokens.
- **Adding a new token without a fallback in both built-in themes** — will break for whichever theme is missing it.
- **Bypassing `EluanProvider`** by setting `data-*` attributes manually inside React effects — works but loses persistence + font lazy-loading + system mode sync.
- **Importing from `@eluan/tokens` directly in app code** when `@eluan/core` re-exports the same things.
- **Custom themes without `extends`** — you'll inherit nothing and end up with white-on-white because most tokens won't resolve.
- **Custom theme names that collide with built-ins** (`industrial-retro`, `minimal`) — Provider throws at mount.

---

## Quick API reference

```tsx
// Provider
<EluanProvider
  defaultTheme?:    "industrial-retro" | "minimal" | string  // default "industrial-retro"
  defaultMode?:     "light" | "dark"                         // default OS preference
  defaultSpacing?:  "compact" | "standard" | "wide"          // default "standard"
  defaultCurves?:   "sharp" | "slight" | "sweeping"          // default "slight"
  customThemes?:    CustomTheme[]                            // from createTheme()
  persist?:         boolean                                  // default true
  followSystemMode?: boolean                                 // default true
  target?:          "html" | "body" | HTMLElement | null     // default "html"
/>

// Hook
const {
  theme, mode, spacing, curves,
  setTheme, setMode, setSpacing, setCurves,
} = useEluanTheme()

// Custom theme factory
createTheme({
  name:     "acme",                         // required, alphanumeric + hyphen
  extends?: "industrial-retro" | "minimal", // default "industrial-retro"
  tokens:   { "--container-bg": "...", … }, // partial map of token overrides
}): CustomTheme

// Font preloader (rarely needed — Provider calls this automatically)
loadThemeFonts(theme: Theme): Promise<void>
```
