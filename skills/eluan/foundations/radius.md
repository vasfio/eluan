---
name: radius
---

# Radius

## Overview

Corner radius comes from `--curves-*`, which the `data-curves` axis sets globally: `sharp` (square), `slight` (default) or `sweeping` (round). One Provider setting changes every corner in the product, so components and your own elements must read the tokens rather than fixed values. See [theming.md](./theming.md).

## Rules

1. Use `--curves-*` for every corner. Never write a radius in px, rem or %.
2. To make the whole product rounder or sharper, change `defaultCurves` on `EluanProvider`. Never override `--curves-*` values.
3. Use `--radius-radius-full` only for pills and circles (avatars, status dots, switches).
4. Nest smaller inside larger: an element inside a `--curves-lg` card uses `--curves-md` or smaller.
5. Don't restyle a component's corners. Components already use the right step.

## Tokens

<!-- tokens:start -->
| Token | Value (default theme) | Use for |
| --- | --- | --- |
| `--curves-xxs` | 1px (sharp 0px, sweeping 2px) | Corner radius |
| `--curves-xs` | 2px (sharp 0px, sweeping 4px) | Corner radius |
| `--curves-sm` | 4px (sharp 0px, sweeping 8px) | Corner radius |
| `--curves-md` | 8px (sharp 0px, sweeping 12px) | Corner radius |
| `--curves-lg` | 12px (sharp 0px, sweeping 16px) | Corner radius |
| `--curves-xl` | 16px (sharp 0px, sweeping 24px) | Corner radius |
| `--radius-radius-full` | 999px | Pills and circles only |
<!-- tokens:end -->

## Choosing a value

| If you need… | Use |
| --- | --- |
| a card, panel or fieldset you compose | `--curves-lg`, as Card and Fieldset use |
| a popover-sized surface or an input-sized element | `--curves-md`, as Popover and Button use |
| a small inner element (tag, close button, inline code) | `--curves-sm` |
| a pill or a circle | `--radius-radius-full` |
| rounder corners everywhere | `defaultCurves="sweeping"` |

## Dos and don'ts

**Do:** use the curves tokens and nest down a step.

```tsx
<div style={{ borderRadius: "var(--curves-lg)", padding: "var(--spacing-lg)" }}>
  <img src="/cover.png" alt="" style={{ borderRadius: "var(--curves-md)", width: "100%" }} />
</div>
```

**Don't:** hardcode a radius or override the axis.

```tsx
<div style={{ borderRadius: 12, "--curves-md": "20px" } as React.CSSProperties} />
```

## Common agent mistakes

_Filled from evals._
