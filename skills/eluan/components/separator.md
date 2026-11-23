---
name: Separator
use_when: You need a visible line between sections, list rows or groups of inline items.
instead_of: A border or spacing-token line on your own element; the separator part of DropdownMenu, ContextMenu, Menubar, Select or Command inside those; BreadcrumbSeparator in a breadcrumb.
source: packages/core/src/components/separator.tsx
---

# Separator

## 1. Overview

Separator draws a 1px line in `--container-border-alt` between pieces of content. It wraps Radix Separator, runs horizontal or vertical, and is decorative by default, so assistive tech skips it. It's the system's shared divider: draw every line with it, never with a hand-made border or a spacing token.

## 2. When to use

- Dividing sections of a page, panel or card: a heading block from the content below it, one settings group from the next.
- Between rows of a simple list you compose yourself.
- Between inline items in a row, such as links in a bar (vertical).
- Between groups of buttons in a toolbar (vertical, `variant="toolbar"`).

### When not to use

- Inside a menu, Select or Command → use that component's separator part: [DropdownMenu](./dropdown-menu.md), [ContextMenu](./context-menu.md), [Menubar](./menubar.md), [Select](./select.md), [Command](./command.md).
- Between breadcrumb items → use `BreadcrumbSeparator` in [Breadcrumb](./breadcrumb.md).
- Between table rows → [Table](./table.md) draws its own row borders.
- To group form fields under a heading → use [Fieldset](./fieldset.md).
- To frame a block of content → use [Card](./card.md).
- To add space, not a line → use `gap` with a `--spacing-*` token; see [spacing](../foundations/spacing.md).

## 3. Anatomy

1. **Line**: a single `<div>` (the Radix Separator root), 1px thick, filled with `--container-border-alt`. It takes no children.

## 4. Variants

| Variant | Use for |
| --- | --- |
| `default` | Most dividers. Horizontal fills the container width; vertical stretches to the height of its flex row (at least `--size-xxs`). |
| `toolbar` | A vertical divider between button groups in a toolbar: `--size-sm` tall with `--spacing-xxs` side margins. RichText's toolbar uses it. |
| `inline` | A short vertical tick between inline text items: `--size-xxs` tall with `--spacing-xxs` side margins. |
| `command` | Internal to Command; bleeds into the list's padding. Use `CommandSeparator` instead of setting this yourself. |

<!-- REVIEW: "Use for" text drafted from each variant's styles. `toolbar` overrides height, so with the default horizontal orientation it renders a 22px-tall full-width block; `inline` always draws a vertical tick and has no consumer in source. -->

## 5. Sizes

Separator has no size prop. Thickness is fixed at 1px; `orientation` and `variant` set the length.

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Default | 1px line in `--container-border-alt` | Static. No hover, focus or disabled state. |

## 7. Content guidelines

- Separator has no content. Don't pass children; Radix renders them inside the 1px line.
- Add a line only where spacing or a heading doesn't already make the break clear. <!-- REVIEW: drafted; no source guidance on when a divider is warranted. -->
- Don't type pipes (`|`) or bullets between inline items; use a vertical Separator.
- For a labelled divider ("or" between sign-in options), compose a flex row: Separator, a `caption` Typography, Separator. <!-- REVIEW: composition drafted; no labelled divider in source. -->

## 8. Rules

1. Draw every divider with Separator. Never use a border on your own element or a `--spacing-xxs` strip; that token is 0 in compact density.
2. Leave `decorative` at its default (`true`) when the line is purely visual. Pass `decorative={false}` when the line itself separates content and no heading or landmark already marks the break.
3. Space around a Separator with `gap` on the parent. It has no margin of its own (apart from `toolbar` and `inline` side margins) and drops `className` and `style`.
4. Put a vertical Separator inside a flex row so it can stretch to the row height.
5. Use `toolbar` and `inline` only with `orientation="vertical"`.
6. Don't set `variant="command"` outside Command.
7. Never recolour it. The colour comes from `--container-border-alt`.
8. Inside menus, use the menu's own separator part, and don't copy its styling elsewhere: menu dividers currently use other tokens, some near-invisible. <!-- REVIEW: W4 divider convergence plans a `menu` variant on Separator and moves the menus onto it; until it lands, menu separators look different from this one. -->

## 9. Dos and don'ts

**Do:** draw the line with Separator and space it with `gap`.

```tsx
<div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-lg)" }}>
  <Typography variant="heading" as="h2">Billing</Typography>
  <Separator />
  <Typography>Your plan renews on 1 March.</Typography>
</div>
```

**Don't:** hand-draw lines or use a spacing token as a line.

```tsx
<div style={{ borderBottom: "1px solid #e5e5e5", marginBottom: 16 }}>Billing</div>
<div style={{ height: "var(--spacing-xxs)", backgroundColor: "var(--container-bg-alt)" }} />
```

**Do:** use vertical Separators between inline items.

```tsx
<div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-md)" }}>
  <Button asChild variant="link"><a href="/privacy">Privacy</a></Button>
  <Separator orientation="vertical" />
  <Button asChild variant="link"><a href="/terms">Terms</a></Button>
</div>
```

**Don't:** type pipe characters between them.

```tsx
<p>
  <a href="/privacy">Privacy</a> | <a href="/terms">Terms</a>
</p>
```

## 10. Accessibility

- Role: none by default. With `decorative={true}` Radix renders `role="none"`, so screen readers skip the line. With `decorative={false}` it renders `role="separator"`, plus `aria-orientation="vertical"` when vertical.
- Label: none needed.
- Keyboard: none. Separator isn't focusable.
- Focus: not focusable.
- Contrast: handled by the theme. Don't override colours. `--container-border-alt` is the most visible of the system's divider colours; don't swap it for a lighter token.

## 11. Behaviour

- Responsive: horizontal fills its container's width. Vertical stretches to its flex row's height, with a `--size-xxs` minimum. It never shrinks in a flex row.
- Density: the 1px thickness is fixed; `toolbar` and `inline` lengths and margins follow `--size-*` and `--spacing-*`, so they scale with density.
- Motion: none.
- `data-orientation` is always set to the orientation, whether decorative or not.

## 12. API

<!-- api:start -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Direction of the line. |
| `decorative` | `boolean` | `true` | `true`: visual only (`role="none"`). `false`: semantic (`role="separator"`). |
| `variant` | `"default" \| "toolbar" \| "inline" \| "command"` | `"default"` | Length and margins; see Variants. |
| `asChild` | `boolean` | `false` | Renders the child element as the separator (Radix Slot). |
| `...props` | Radix `Separator.Root` props without `className`, `style` | | Native div attributes: `id`, `aria-*`, `data-*`. `className` and `style` are omitted. |
<!-- api:end -->

## 13. Examples

```tsx
import { Button, Separator, Typography } from "@eluan/core";

export function AccountSummary() {
  return (
    <section style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-lg)" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-xs)" }}>
        <Typography variant="heading" as="h2">Account</Typography>
        <Typography tone="muted">Manage your plan, invoices and team seats.</Typography>
      </div>

      <Separator />

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-xs)" }}>
        <Typography variant="subheading" as="h3">Plan</Typography>
        <Typography>Team, 12 of 15 seats used. Renews on 1 March.</Typography>
      </div>

      <Separator />

      <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-md)" }}>
        <Button asChild variant="link"><a href="/billing/invoices">Invoices</a></Button>
        <Separator orientation="vertical" />
        <Button asChild variant="link"><a href="/billing/payment">Payment method</a></Button>
        <Separator orientation="vertical" />
        <Button asChild variant="link"><a href="/team">Seats</a></Button>
      </div>
    </section>
  );
}
```

## 14. Related components

- [Command](./command.md): `CommandSeparator` renders this Separator with `variant="command"`.
- [RichText](./rich-text.md): its toolbar divides button groups with `variant="toolbar"`.
- [DropdownMenu](./dropdown-menu.md): menus have their own separator part.
- [Card](./card.md): frames a block instead of dividing it.
- [Fieldset](./fieldset.md): groups related fields under a legend.

## 15. Common agent mistakes

_Filled from evals._
