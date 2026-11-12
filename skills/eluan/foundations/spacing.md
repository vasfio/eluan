---
name: spacing
---

# Spacing

## Overview

Two density-aware scales control space and size. `--spacing-*` is for gaps, padding and margins. `--size-*` is for fixed dimensions: control heights, icon boxes, avatars. Both change with the `data-spacing` axis (`compact`, `standard`, `wide`), so a layout built on them re-densifies with one Provider setting. See [theming.md](./theming.md).

Steps run `xxs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl`.

## Rules

1. Use `--spacing-*` for every margin, padding and gap.
2. Use `--size-*` for fixed widths and heights of small things: icons, avatars, control heights.
3. Never write px, rem or em for space or size.
4. Prefer `gap` on a parent over margins on children. [Stack](../components/stack.md), [Row](../components/row.md) and [Grid](../components/grid.md) take these steps by name: `gap="md"`, `pad="xl"`.
5. Never use `--spacing-xxs` for a border or line: it is 0 in compact density. Use a border token or the Separator component.
6. Never divide or multiply spacing tokens with `calc()` to invent a new step. Pick the nearest step.
7. Don't pad inside components. Card, Dialog, Fieldset and Popover already pad their content.

## Tokens

<!-- tokens:start -->
| Token | Value (default theme) | Use for |
| --- | --- | --- |
| `--spacing-xxs` | 2px (compact 0px, wide 4px) | Gap, padding, margin |
| `--spacing-xs` | 4px (compact 2px, wide 8px) | Gap, padding, margin |
| `--spacing-sm` | 6px (compact 4px, wide 12px) | Gap, padding, margin |
| `--spacing-md` | 10px (compact 8px, wide 16px) | Gap, padding, margin |
| `--spacing-lg` | 14px (compact 12px, wide 20px) | Gap, padding, margin |
| `--spacing-xl` | 18px (compact 16px, wide 24px) | Gap, padding, margin |
| `--spacing-2xl` | 20px (compact 20px, wide 32px) | Gap, padding, margin |
| `--spacing-3xl` | 32px (compact 24px, wide 80px) | Gap, padding, margin |
| `--spacing-4xl` | 64px (compact 32px, wide 160px) | Gap, padding, margin |
| `--size-xxs` | 14px (compact 12px, wide 20px) | Control height, icon size |
| `--size-xs` | 18px (compact 16px, wide 24px) | Control height, icon size |
| `--size-sm` | 22px (compact 20px, wide 32px) | Control height, icon size |
| `--size-md` | 28px (compact 24px, wide 40px) | Control height, icon size |
| `--size-lg` | 36px (compact 32px, wide 48px) | Control height, icon size |
| `--size-xl` | 44px (compact 40px, wide 56px) | Control height, icon size |
| `--size-2xl` | 56px (compact 48px, wide 80px) | Control height, icon size |
| `--size-3xl` | 80px (compact 64px, wide 120px) | Control height, icon size |
| `--size-4xl` | 120px (compact 96px, wide 240px) | Control height, icon size |
<!-- tokens:end -->

## Choosing a value

Component values come from the component source; page-level values are drafts.

| If you need… | Use |
| --- | --- |
| space between a label, its input and its message | `--spacing-sm` on your field stack <!-- REVIEW: no component sets this gap; Label's own --spacing-sm is between the label text and its (optional)/hint text. --> |
| space between fields in a group | `--spacing-lg`, as Fieldset uses |
| padding inside a card | Card handles it (`--spacing-2xl`) |
| padding inside a dialog or sheet | Dialog and Sheet handle it (`--spacing-lg`) |
| space between inline items (icon and text, buttons in a row) | `--spacing-xs` to `--spacing-sm` |
| space between sections of a page | `--spacing-3xl` <!-- REVIEW: no page-level spacing convention in source; drafted from the scale. --> |
| page gutter | `--spacing-xl` <!-- REVIEW: no page gutter convention in source; drafted from the scale. --> |
| an icon box inside a control | `--size-xxs` |
| a standard control height | the component sets it (`--size-lg` default, `--size-md` small, `--size-xl` large) |

## Dos and don'ts

**Do:** space with gap and tokens.

```tsx
<div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-lg)" }}>
  <Input aria-label="Email" type="email" />
  <Input aria-label="Password" type="password" />
</div>
```

**Don't:** use raw values or margins on each child.

```tsx
<div>
  <div style={{ marginBottom: 16 }}><Input aria-label="Email" type="email" /></div>
  <div style={{ marginBottom: "1rem" }}><Input aria-label="Password" type="password" /></div>
</div>
```

**Do:** draw a divider with the Separator component.

```tsx
<Separator />
```

**Don't:** make a line out of a spacing token.

```tsx
<div style={{ height: "var(--spacing-xxs)", backgroundColor: "var(--container-border)" }} />
```

## Common agent mistakes

_Filled from evals._
