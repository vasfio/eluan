---
name: elevation
---

# Elevation

## Overview

Eluan has no elevation or shadow tokens yet. Depth comes from components: Card has an `elevation` prop (`none`, `sm`, `md`, `lg`), and floating surfaces (Popover, DropdownMenu, Select, Tooltip, HoverCard, Dialog, Sheet) draw their own shadow. Until tokens exist, layering is something you choose a component for, not something you style.

## Rules

1. Never write `box-shadow` in app code.
2. For a raised surface, use Card with `elevation`. For a floating surface, use the overlay component that fits.
3. Use `elevation="none"` (with the card's border) for flat layouts, and a raised level only to separate a surface from a busy background.
4. Never stack z-index values to layer things yourself. Overlay components portal and layer correctly; for scoped themes pass `portalContainer` (see [theming.md](./theming.md)).

## Tokens

<!-- tokens:start -->
| Token | Value (default theme) | Use for |
| --- | --- | --- |
| _No tokens yet_ | | Follow the rules above |
<!-- tokens:end -->

<!-- REVIEW: token plan, not yet implemented. Matches W8 (fix/shadow-tokens) in the main checkout's .claude/design-system-fix-plan.md.
Source: card.tsx hardcodes four shadows, and about 20 overlay components repeat them as literals (md 8 times, lg 5 times). Proposed custom properties (names shown without the leading dashes):
  1. Add to themes.css under [data-theme="minimal"]:
     elevation-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05)
     elevation-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)
     elevation-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)
     elevation-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)
  2. Give dim and dark their own values in modes.css (black at 10% is invisible on a dark ground).
  3. Let the theme generator emit them so custom themes can tint shadows.
  4. Replace the literals in card.tsx and the overlay components; Menubar's sub-content currently gets no shadow at all.
  5. Map component levels: popovers and menus md, dialogs and sheets lg, Card elevation sm/md/lg.
Then add the token table here and drop rule 1's absolute ban in favour of "use elevation-* tokens".
-->

## Choosing a value

| If you need… | Use |
| --- | --- |
| a flat grouped surface | Card with `elevation="none"` |
| a surface lifted off the page | Card with `elevation="sm"` or `"md"` |
| a clickable card | Card with `clickable` (adds hover elevation) |
| content floating over the page | Popover, HoverCard, DropdownMenu or Tooltip |
| a blocking layer | Dialog; a side layer: Sheet |

## Dos and don'ts

**Do:** choose a component for depth.

```tsx
<Card elevation="md">
  <CardHeader>
    <CardTitle>Quarterly revenue</CardTitle>
  </CardHeader>
  <CardContent>Up 12% on last quarter.</CardContent>
</Card>
```

**Don't:** add your own shadow.

```tsx
<div style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)" }}>Quarterly revenue</div>
```

## Common agent mistakes

_Filled from evals._
