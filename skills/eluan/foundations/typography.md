---
name: typography
---

# Typography

## Overview

Eluan's type scale is fluid: ten steps (`step-6` down to `step-neg3`) that interpolate with the viewport between 480px and 1024px, so text resizes with no media queries in app code. Each step has a size, a line height and a letter spacing, and they always travel together. `data-typeset` on any element pins the scale to its small, medium or large column; leave it off to stay fluid.

The `Typography` component is the front door to the scale. Its `variant` picks a step, a family, a weight and a default element in one prop:

| Variant | Step | Family | Default element |
| --- | --- | --- | --- |
| `display` | 5 | heading | `h1` |
| `title` | 4 | heading | `h2` |
| `heading` | 3 | heading | `h3` |
| `subheading` | 2 | heading | `h4` |
| `lead` | 1 | body | `p` |
| `body` | 0 | body | `p` |
| `label` | neg1 | body | `span` |
| `caption` | neg2 | body | `span` |

`tone` is `default`, `muted` (`--container-fg-alt`) or `inverse`.

The `--font-size-xs` to `--font-size-5xl` aliases map onto steps and shift one step with density (compact one down, wide one up). Components use these; app text should use `Typography`.

## Rules

1. Set text with `Typography`. Pick the `variant` for the role of the text, not its size.
2. Use `as` to fix the heading level for the document outline; keep the variant for the look.
3. If you style text yourself, apply all three tokens of one step together, for example `--font-size-step-1`, `--line-height-step-1` and `--letter-spacing-step-1`.
4. Never write a font size, line height or letter spacing in px, rem or em.
5. Use `--font-heading`, `--font-body` and `--font-mono` for families. Change fonts only in the theme.
6. Use one `title` or `display` per page.
7. Don't pin `data-typeset` unless a region must not resize (for example a fixed-size canvas).

## Tokens

<!-- tokens:start -->
| Token | Value (default theme) | Use for |
| --- | --- | --- |
| `--font-heading` | "Inter Variable" | Headings |
| `--font-body` | "Inter Variable" | Body text and UI |
| `--font-mono` | "Paper Mono" | Code and tabular figures |
| `--font-size-xs` | `--font-size-step-neg2` (density shifts one step) | Density-aware type size alias |
| `--font-size-sm` | `--font-size-step-neg1` (density shifts one step) | Density-aware type size alias |
| `--font-size-base` | `--font-size-step-0` (density shifts one step) | Density-aware type size alias |
| `--font-size-lg` | `--font-size-step-1` (density shifts one step) | Density-aware type size alias |
| `--font-size-xl` | `--font-size-step-2` (density shifts one step) | Density-aware type size alias |
| `--font-size-2xl` | `--font-size-step-3` (density shifts one step) | Density-aware type size alias |
| `--font-size-3xl` | `--font-size-step-4` (density shifts one step) | Density-aware type size alias |
| `--font-size-4xl` | `--font-size-step-5` (density shifts one step) | Density-aware type size alias |
| `--font-size-5xl` | `--font-size-step-6` (density shifts one step) | Density-aware type size alias |
| `--font-size-step-6` | 41.81px → 68.66px, fluid | Type step; apply with its line-height and letter-spacing |
| `--font-size-step-5` | 34.84px → 54.93px, fluid | Type step; apply with its line-height and letter-spacing |
| `--font-size-step-4` | 29.03px → 43.95px, fluid | Type step; apply with its line-height and letter-spacing |
| `--font-size-step-3` | 24.19px → 35.16px, fluid | Type step; apply with its line-height and letter-spacing |
| `--font-size-step-2` | 20.16px → 28.13px, fluid | Type step; apply with its line-height and letter-spacing |
| `--font-size-step-1` | 16.8px → 22.5px, fluid | Type step; apply with its line-height and letter-spacing |
| `--font-size-step-0` | 14px → 18px, fluid | Type step; apply with its line-height and letter-spacing |
| `--font-size-step-neg1` | 11.67px → 14.4px, fluid | Type step; apply with its line-height and letter-spacing |
| `--font-size-step-neg2` | 9.72px → 11.52px, fluid | Type step; apply with its line-height and letter-spacing |
| `--font-size-step-neg3` | 8.1px → 9.22px, fluid | Type step; apply with its line-height and letter-spacing |
| `--line-height-step-6` | 1.2 | Line height paired with the same step |
| `--line-height-step-5` | 1.2 | Line height paired with the same step |
| `--line-height-step-4` | 1.2 | Line height paired with the same step |
| `--line-height-step-3` | 1.2 | Line height paired with the same step |
| `--line-height-step-2` | 1.375 | Line height paired with the same step |
| `--line-height-step-1` | 1.375 | Line height paired with the same step |
| `--line-height-step-0` | 1.5 | Line height paired with the same step |
| `--line-height-step-neg1` | 1.5 | Line height paired with the same step |
| `--line-height-step-neg2` | 1.5 | Line height paired with the same step |
| `--line-height-step-neg3` | 1.5 | Line height paired with the same step |
| `--letter-spacing-step-6` | -0.03em | Tracking paired with the same step |
| `--letter-spacing-step-5` | -0.025em | Tracking paired with the same step |
| `--letter-spacing-step-4` | -0.02em | Tracking paired with the same step |
| `--letter-spacing-step-3` | -0.015em | Tracking paired with the same step |
| `--letter-spacing-step-2` | -0.01em | Tracking paired with the same step |
| `--letter-spacing-step-1` | 0em | Tracking paired with the same step |
| `--letter-spacing-step-0` | 0em | Tracking paired with the same step |
| `--letter-spacing-step-neg1` | 0em | Tracking paired with the same step |
| `--letter-spacing-step-neg2` | 0em | Tracking paired with the same step |
| `--letter-spacing-step-neg3` | 0em | Tracking paired with the same step |
<!-- tokens:end -->

## Choosing a value

| If you need… | Use |
| --- | --- |
| a page title | `<Typography variant="title" as="h1">` |
| a section heading | `<Typography variant="heading" as="h2">` |
| a card or group heading | `<Typography variant="subheading" as="h3">`, or CardTitle inside a Card |
| an intro paragraph | `<Typography variant="lead">` |
| body copy | `<Typography variant="body">` |
| helper or meta text | `<Typography variant="caption" tone="muted">` |
| a form label | Label (from `components/form-label.md`), not Typography |
| code | CodeBlock or Kbd; `--font-mono` if composing |

## Dos and don'ts

**Do:** pick variants by role.

```tsx
import { Typography } from "@eluan/core";

<Typography variant="title" as="h1">Account settings</Typography>
<Typography variant="lead">Manage your profile, notifications and billing.</Typography>
```

**Don't:** size text by hand.

```tsx
<h1 style={{ fontSize: "32px", lineHeight: 1.1 }}>Account settings</h1>
```

**Do:** keep a step's three tokens together when you must compose.

```tsx
<span
  style={{
    fontSize: "var(--font-size-step-neg1)",
    lineHeight: "var(--line-height-step-neg1)",
    letterSpacing: "var(--letter-spacing-step-neg1)",
  }}
>
  3 items
</span>
```

**Don't:** mix a step's size with another step's line height.

```tsx
<span style={{ fontSize: "var(--font-size-step-3)", lineHeight: "var(--line-height-step-0)" }}>3 items</span>
```

## Common agent mistakes

_Filled from evals._
