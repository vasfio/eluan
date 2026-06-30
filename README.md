# Ragnar Design System

A multi-package design system monorepo built with React, StyleX, and Radix UI primitives. Ragnar provides a complete three-layer token architecture, core UI components, marketing patterns, and React Native components.

## Packages

| Package | Description | Version |
|---------|-------------|---------|
| [`@vasf/ragnar-tokens`](#vasfragnar-tokens) | Design tokens (colors, spacing, themes, fonts) | 0.1.2 |
| [`@vasf/ragnar-core`](#vasfragnar-core) | UI components and marketing patterns | 0.1.13 |
| [`@vasf/ragnar-web`](#vasfragnar-web) | Compatibility exports for Header, HeaderNavigation, and Footer | 0.1.1 |
| [`@vasf/ragnar-native`](#vasfragnar-native) | React Native components | 0.1.1 |

## Quick Start

```bash
npm install @vasf/ragnar-core @vasf/ragnar-tokens
yarn add @vasf/ragnar-core @vasf/ragnar-tokens
pnpm add @vasf/ragnar-core @vasf/ragnar-tokens
bun add @vasf/ragnar-core @vasf/ragnar-tokens
```

```tsx
import "@vasf/ragnar-core/styles.css"
import "@vasf/ragnar-tokens/css"

import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  RagnarProvider,
} from "@vasf/ragnar-core"

function App() {
  return (
    <RagnarProvider defaultTheme="industrial-retro" defaultMode="light">
      <Card>
        <CardHeader>
          <CardTitle>Hello Ragnar</CardTitle>
        </CardHeader>
        <CardContent>
          <Button>Click me</Button>
        </CardContent>
      </Card>
    </RagnarProvider>
  )
}
```

---

## Monorepo Setup

**Package manager:** pnpm (v10.32+) with workspaces

```bash
# Install all dependencies
pnpm install

# Build all packages (tokens -> core -> web)
pnpm build

# Run core Storybook (port 6006)
pnpm storybook

# Run web Storybook (port 6007)
pnpm storybook:web

# Run all tests
pnpm test

# Lint all packages
pnpm lint
```

### Dependency Graph

```
@vasf/ragnar-tokens          (foundational - no internal deps)
    |
    +---> @vasf/ragnar-core   (depends on tokens)
    |         |
    |         +---> @vasf/ragnar-web  (compatibility facade)
    |
    +---> @vasf/ragnar-native (depends on tokens)
```

Build order matters: always build `tokens` first, then `core`, then compatibility packages such as `web`.

### Project Structure

```
ragnar/
  packages/
    tokens/      @vasf/ragnar-tokens   Design tokens, CSS variables, fonts
    core/        @vasf/ragnar-core     UI and marketing components
    web/         @vasf/ragnar-web      Header/Footer compatibility facade
    native/      @vasf/ragnar-native   22 React Native component categories
  package.json   Root workspace config, scripts
```

---

## `@vasf/ragnar-tokens`

The token foundation of the design system. Provides CSS variables, TypeScript constants, self-hosted fonts, and a Tailwind CSS preset.

### Installation

```bash
npm install @vasf/ragnar-tokens
yarn add @vasf/ragnar-tokens
pnpm add @vasf/ragnar-tokens
bun add @vasf/ragnar-tokens
```

### Three-Layer Token Architecture

```
Layer 1: Primitives   Raw values (20 color palettes, spacing, radius, sizing, viewports)
Layer 2: Modes        Semantic aliases that adapt to Light / Dim / Dark
Layer 3: Themes       Component-level tokens for built-in and custom visual identities
```

Activated via HTML data attributes:

```html
<html
  data-mode="light"           <!-- light | dim | dark -->
  data-theme="industrial-retro"  <!-- industrial-retro | minimal | custom theme name -->
  data-spacing="standard"     <!-- compact | standard | wide -->
  data-curves="slight"        <!-- sharp | slight | sweeping -->
>
```

### Exports

#### CSS Tokens (`@vasf/ragnar-tokens/css`)

The main CSS entry point. Imports all token layers (primitives, modes, themes, spacing, curves) and sets base styles. Only loads the shared Geist Mono font; theme-specific fonts are loaded separately.

```css
/* In your app's CSS or globals.css */
@import "@vasf/ragnar-tokens/css";
```

This provides all CSS variables across all three layers:

```css
/* Layer 1: Primitives (always on :root) */
var(--color-blazeorange-500)       /* 20 palettes x 11 shades (50-950) */
var(--color-mono-0)                /* Mono has 12 shades (0-950) */
var(--spacing-space-16)            /* 24 spacing values (0-320) */
var(--radius-radius-8)             /* 13 radius values (none-full) */
var(--sizing-size-m)               /* 9 sizing values (none-xxxl) */
var(--viewports-screen-l)          /* 9 viewport breakpoints (xxs-4xl) */

/* Layer 2: Modes (adapt to data-mode) */
var(--backgrounds-primary)         /* 5 background levels: primary-quinary */
var(--foregrounds-primary)         /* 5 foreground levels: primary-quinary */
var(--crimson-main)                /* Per palette: main, background, tint, foreground, shade */

/* Layer 3: Themes (adapt to data-theme) */
var(--container-bg)                /* Container: bg, bg-alt, bg-inverse, border, border-alt, border-inverse, fg, fg-alt, fg-inverse */
var(--interactive-fg)              /* Interactive: 18 state variants */
var(--action-primary-bg)           /* Action Primary: 11 variants */
var(--action-secondary-fg)         /* Action Secondary: 15 variants */
var(--action-tertiary-bg)          /* Action Tertiary: 17 variants */
var(--destructive-fg)              /* Destructive: 15 variants */
var(--cautionary-fg)               /* Cautionary: 9 variants */
var(--informative-fg)              /* Informative: 9 variants */
var(--positive-fg)                 /* Positive: 9 variants */
var(--important-fg)                /* Important: 9 variants */
var(--dataviz-1-main)              /* Data Viz: 8 color series x 3 variants each */

/* Semantic spacing (adapt to data-spacing) */
var(--spacing-xxs)                 /* 9 levels: xxs, xs, sm, md, lg, xl, 2xl, 3xl, 4xl */

/* Semantic curves (adapt to data-curves) */
var(--curves-sm)                   /* 6 levels: xxs, xs, sm, md, lg, xl */

/* Fonts (set per theme) */
var(--font-heading)
var(--font-body)
var(--font-mono)
```

#### Per-Theme Font CSS

Fonts are split per theme so you only ship the fonts your app actually uses. Only Geist Mono (the universal monospace font) is included in the base CSS.

```css
/* Static import: pick the one matching your theme */
@import "@vasf/ragnar-tokens/fonts/industrial-retro";   /* Geist (heading + body) */
@import "@vasf/ragnar-tokens/fonts/minimal";   /* Inter (heading + body) */

/* Special imports */
@import "@vasf/ragnar-tokens/fonts/base";            /* Geist Mono only (already in /css) */
@import "@vasf/ragnar-tokens/fonts/all";             /* All fonts (for Storybook / development) */
```

**Theme Font Mapping:**

| Theme | Heading Font | Body Font | Mono Font |
|-------|-------------|-----------|-----------|
| `industrial-retro` | Geist | Geist | Geist Mono |
| `minimal` | Inter | Inter | Geist Mono |

All fonts are self-hosted via `@fontsource` -- no CDN dependency.

#### Dynamic Font Loading (JavaScript)

For apps that support runtime theme switching:

```tsx
import { loadThemeFonts, type Theme } from "@vasf/ragnar-tokens"

// In a React component or theme provider:
useEffect(() => {
  loadThemeFonts(theme as Theme)
}, [theme])
```

`loadThemeFonts()` uses dynamic `import()` so your bundler (Vite, webpack) code-splits each theme's fonts into a separate chunk. Fonts are cached after first load -- switching back to a previously loaded theme is instant.

#### TypeScript API (`@vasf/ragnar-tokens`)

The default export provides all tokens as typed JavaScript constants, useful for React Native, server-side logic, or any non-CSS context.

```ts
import {
  // -- Enums & Types --
  modes,                // ["light", "dim", "dark"] as const
  themes,               // ["industrial-retro", "minimal"] as const
  spacingScales,        // ["compact", "standard", "wide"] as const
  curveScales,          // ["sharp", "slight", "sweeping"] as const
  colorPalettes,        // ["blazeorange", "bluechill", ...20 total] as const
  colorShades,          // ["50", "100", "200", ... "950"] as const
  monoShades,           // ["0", "50", "100", ... "950"] as const
  type Mode,
  type Theme,
  type SpacingScale,
  type CurveScale,
  type ColorPalette,
  type ColorShade,
  type MonoShade,

  // -- Raw Values (cross-platform) --
  primitiveColors,      // Record<palette, Record<shade, hex>>  -- all 20 palettes, 11+ shades each
  radius,               // { none: "0rem", 1: "0.0625rem", 2: "0.125rem", ..., full: "62.4375rem" }
  sizing,               // { none: "0rem", xxs: "0.5rem", xs: "1rem", ..., xxxl: "10rem" }
  spacing,              // { 0: "0rem", 2: "0.125rem", 4: "0.25rem", ..., 320: "20rem" }
  viewports,            // { xxs: "20rem", xs: "25.875rem", ..., "4xl": "161.25rem" }
  breakpoints,          // { xxs: 320, xs: 414, s: 480, ..., "4xl": 2580 }  (px numbers)

  // -- Typography --
  fontSizes,            // { xs: 12, sm: 14, base: 16, lg: 18, ..., "9xl": 128 }
  fontWeights,          // { thin: "100", extralight: "200", ..., black: "900" }
  lineHeights,          // { none: 1, tight: 1.25, snug: 1.375, normal: 1.5, relaxed: 1.625, loose: 2 }
  letterSpacing,        // { tighter: -0.8, tight: -0.4, normal: 0, wide: 0.4, wider: 0.8, widest: 1.6 }
  fontFamilies,         // { heading: "var(--font-heading)", body: "var(--font-body)", mono: "var(--font-mono)" }
  themeFonts,           // Record<Theme, { heading: string; body: string }>

  // -- Visual --
  shadows,              // { sm, default, md, lg, xl, "2xl", inner, none }
  zIndices,             // { hide: -1, base: 0, docked: 10, dropdown: 1000, ..., tooltip: 1800 }

  // -- Animation --
  durations,            // { fastest: 50, faster: 100, fast: 150, ..., slowest: 500 } (ms)
  easings,              // { linear, easeIn, easeOut, easeInOut } (cubic-bezier strings)

  // -- Dynamic Font Loader --
  loadThemeFonts,       // (theme: Theme) => Promise<void>

  // -- All Types --
  type PrimitiveColor,
  type RadiusToken,
  type SizingToken,
  type SpacingToken,
  type ViewportToken,
  type FontSizeToken,
  type FontWeightToken,
  type ShadowToken,
  type BreakpointToken,
} from "@vasf/ragnar-tokens"
```

## `@vasf/ragnar-core`

60+ UI components built on Radix UI primitives, styled with StyleX and Ragnar tokens.

### Installation

```bash
npm install @vasf/ragnar-core @vasf/ragnar-tokens
yarn add @vasf/ragnar-core @vasf/ragnar-tokens
pnpm add @vasf/ragnar-core @vasf/ragnar-tokens
bun add @vasf/ragnar-core @vasf/ragnar-tokens
```

### Setup

```tsx
// 1. Import styles (includes token CSS and component CSS)
import "@vasf/ragnar-core/styles.css"

// 2. Import fonts for your theme
import "@vasf/ragnar-tokens/fonts/industrial-retro"

// 3. Set data attributes on your root element
// <html data-mode="light" data-theme="industrial-retro" data-spacing="standard" data-curves="slight">
```

### Peer Dependencies

```json
{
  "react": "^18.0.0",
  "react-dom": "^18.0.0"
}
```

### All Component Imports

```tsx
import {
  Accordion,
  Avatar,
  Badge,
  Button,
  Calendar,
  Card,
  Checkbox,
  Command,
  DatePicker,
  Dialog,
  Drawer,
  DropdownMenu,
  Input,
  NavigationDrawer,
  Popover,
  Select,
  Sheet,
  Table,
  Tabs,
  Tooltip,
  TreeView,
  cn,
} from "@vasf/ragnar-core"
```

### Individual Component Imports

Every core component also has a package subpath entry so consumers can import only the module they need:

```tsx
import { Button } from "@vasf/ragnar-core/button"
import { Header } from "@vasf/ragnar-core/header"
```

### Using CSS Variables

Components reference design tokens directly through CSS variables. Use plain CSS, inline styles, or StyleX objects:

```tsx
<div
  style={{
    backgroundColor: "var(--container-bg)",
    color: "var(--container-fg)",
    padding: "var(--spacing-md)",
    borderRadius: "var(--curves-lg)",
  }}
/>
```

### Key Dependencies

| Dependency | Purpose |
|-----------|---------|
| Radix UI | Headless accessible primitives (accordion, dialog, popover, select, etc.) |
| CVA (class-variance-authority) | Component variant definitions |
| Lucide React | Icon library |
| react-day-picker v9 | Calendar component |
| cmdk | Command palette |
| embla-carousel-react | Carousel |
| Tiptap | Rich text editor |
| Sonner | Toast notifications |
| date-fns | Date utilities |

### Storybook

```bash
# From monorepo root
pnpm storybook

# From packages/core directly
pnpm storybook    # port 6006
```

The Storybook toolbar lets you switch between all modes, themes, spacing scales, and curve scales in real time. Theme fonts are loaded on demand as you switch.

---

## `@vasf/ragnar-web`

Compatibility package for web layout components. Marketing sections, media, visual effects, and other web patterns now live in `@vasf/ragnar-core`.

### Installation

```bash
npm install @vasf/ragnar-web @vasf/ragnar-core @vasf/ragnar-tokens
yarn add @vasf/ragnar-web @vasf/ragnar-core @vasf/ragnar-tokens
pnpm add @vasf/ragnar-web @vasf/ragnar-core @vasf/ragnar-tokens
bun add @vasf/ragnar-web @vasf/ragnar-core @vasf/ragnar-tokens
```

### Use

```tsx
import "@vasf/ragnar-core/styles.css"
import "@vasf/ragnar-tokens/css"
import "@vasf/ragnar-web/styles.css"

import { Header, HeaderNavigation, Footer } from "@vasf/ragnar-web"
```

For new code, prefer importing these directly from core:

```tsx
import { Header } from "@vasf/ragnar-core/header"
import { HeaderNavigation } from "@vasf/ragnar-core/header-navigation"
import { Footer } from "@vasf/ragnar-core/footer"
```

---

## `@vasf/ragnar-native`

React Native components that share the same token system as the web packages.

### Installation

```bash
npm install @vasf/ragnar-native @vasf/ragnar-tokens
yarn add @vasf/ragnar-native @vasf/ragnar-tokens
pnpm add @vasf/ragnar-native @vasf/ragnar-tokens
bun add @vasf/ragnar-native @vasf/ragnar-tokens
```

### Peer Dependencies

```json
{
  "react": "^18.0.0",
  "react-native": ">=0.70.0 <0.80.0"
}
```

### All Imports

```tsx
import {
  // All @vasf/ragnar-tokens exports are re-exported
  primitiveColors, themes, modes, spacing, radius,
  type Theme, type Mode,

  // -- Core Components --
  Button,
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,

  // -- Navigation --
  BackButton,
  BottomTabBar,                // + TabItem type
  BottomSheet,

  // -- Layout --
  SafeAreaView, SafeAreaProvider, SafeAreaInsetsConsumer, useSafeAreaInsets,
  ScrollView, KeyboardAwareScrollView, ScrollViewWithHeader,
  HorizontalScrollView, EmptyScrollView,

  // -- Lists --
  ListItem, SectionHeader, NativeList, NativeSectionList,
  SwipeableListItem,           // + SwipeAction type
  usePullToRefresh,
  RefreshableScrollView, RefreshableFlatList, RefreshableSectionList,

  // -- Forms & Inputs --
  Input, PasswordInput, SearchInput,
  TextArea,
  Checkbox, CheckboxGroup,
  Switch, LabeledSwitch,
  Radio, RadioGroup,           // + RadioOption type
  Slider, RangeSlider,
  NativePicker,                // + PickerOption type
  MediaPicker,                 // + MediaItem type
  VoiceInput, VoiceInputInline,

  // -- Display --
  Avatar, AvatarGroup,
  Badge, NotificationBadge,
  Progress, CircularProgress, IndeterminateProgress,
  Spinner, DotsLoader, PulseLoader,
  Skeleton, SkeletonText, SkeletonAvatar, SkeletonCard, SkeletonListItem, SkeletonGroup,
  Separator, LabeledSeparator, Divider, Spacer,

  // -- Feedback --
  Alert, InlineAlert, AlertBanner,
  Toast, ToastProvider, useToast, useToastActions,
  ActionSheet, useActionSheet,  // + ActionSheetOption type

  // -- Utilities --
  createThemedStyles,           // Factory for themed StyleSheets
  hslToRgb,                     // HSL to rgb() for RN compatibility
} from "@vasf/ragnar-native"
```

### Themed Styles

React Native doesn't support CSS variables. Use `createThemedStyles` to create color-scheme-aware StyleSheets using the token primitives:

```tsx
import { createThemedStyles } from "@vasf/ragnar-native"

const useStyles = createThemedStyles((tokens, colorScheme) => ({
  container: {
    backgroundColor: colorScheme === "dark"
      ? tokens.colors.mono[900]
      : tokens.colors.mono[0],
    padding: tokens.spacing[16],
    borderRadius: tokens.radii[8],
  },
  title: {
    fontSize: tokens.fontSizes.lg,
    fontWeight: tokens.fontWeights.medium,
  },
}))

function MyComponent() {
  const styles = useStyles("light")  // or "dark"
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello</Text>
    </View>
  )
}
```

---

## Token Reference

### Modes

Control the color scheme. Set via `data-mode` on the root element.

| Mode | Description |
|------|-------------|
| `light` | Bright backgrounds (white/mono-0), dark foregrounds (mono-950). Default. |
| `dim` | Warm beige tones (teak palette). Reduced contrast, earthy feel. |
| `dark` | Dark backgrounds (mono-800+), light foregrounds (mono-0+). |

### Themes

Control the visual identity. Set via `data-theme` on the root element.

| Theme | Character | Heading Font | Body Font |
|-------|-----------|-------------|-----------|
| `industrial-retro` | Clean, modern | Geist | Geist |
| `minimal` | Minimal, typographic | Inter | Inter |

### Spacing Scales

Control information density. Set via `data-spacing` on the root element.

| Scale | Character | Semantic range (xxs - 4xl) |
|-------|-----------|---------------------------|
| `compact` | Tight, dense | 0px - 32px |
| `standard` | Balanced | 2px - 80px |
| `wide` | Spacious, breathable | 4px - 160px |

### Curve Scales

Control border radius. Set via `data-curves` on the root element.

| Scale | Character | Semantic range (xxs - xl) |
|-------|-----------|--------------------------|
| `sharp` | All square corners | 0 everywhere |
| `slight` | Subtle rounding | 1px - 16px |
| `sweeping` | Moderate rounding | 4px - 40px |
| `rounded` | Pill-shaped, soft | 16px - full |

### Color Palettes (Layer 1)

20 primitive palettes, each with 11 shades (50-950). Mono has an additional `0` shade (pure white).

`blazeorange` `bluechill` `blueribbon` `bostonblue` `cerise` `crimson` `electriclime` `electricviolet` `forestgreen` `gossamer` `lochmara` `maitai` `mono` `purpleheart` `redviolet` `rockspray` `seagreen` `teak` `torchred` `violeteggplant`

### Component Token Categories (Layer 3)

These are the semantic token groups that each theme maps to its own color palette. State variants include combinations of bg, border, fg with hover, active, selected, disabled, alt, inverse suffixes.

| Category | Purpose | Variable Count |
|----------|---------|---------------|
| `container-*` | Card, panel, surface backgrounds | 9 |
| `interactive-*` | Inputs, selects, form controls | 18 |
| `action-primary-*` | Primary buttons, CTAs | 11 |
| `action-secondary-*` | Secondary/outline buttons | 15 |
| `action-tertiary-*` | Ghost/subtle actions | 17 |
| `destructive-*` | Delete, remove, error | 15 |
| `cautionary-*` | Warnings | 9 |
| `informative-*` | Info, help | 9 |
| `positive-*` | Success, confirmation | 9 |
| `important-*` | Critical, high-priority | 9 |
| `dataviz-*` | Charts (8 color series) | 24 |

---

## Publishing

Packages are published to npm under the `@vasf` scope.

```bash
# Version packages (via changesets)
pnpm version-packages

# Publish to npm
pnpm release
```

Ensure you build before publishing: `pnpm build` (handles correct build order).

---

## Development Tips

### Adding a New Component to Core

1. Create `packages/core/src/components/my-component.tsx`
2. Export from `packages/core/src/index.ts`: `export * from "./components/my-component"`
3. Create stories: `packages/core/src/components/my-component.stories.tsx`
4. Use `cn()` for class merging, CSS variables for all token references
5. Pattern: Radix UI primitive + CVA variants + Tailwind classes with `var()` tokens

### Token Variable Rules

Always check `packages/tokens/src/themes.css` for actual variable names. Never assume a variable exists.

```tsx
// CORRECT: use the actual variable name from themes.css
className="text-[var(--interactive-fg-alt)]"
className="bg-[var(--container-bg)]"
className="border-[color:var(--container-border-alt)]"  // use color: hint for borders

// WRONG: guessing variable names
className="text-[var(--interactive-text)]"        // doesn't exist
className="bg-[var(--container-background)]"      // it's --container-bg
```

---

## License

MIT
