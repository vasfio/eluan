---
name: VisuallyHidden
use_when: Text should reach screen readers but not show, such as a heading sighted users infer from the layout, extra context on a link, or a status announced with a live region.
instead_of: aria-label on the control itself for an icon-only Button; Tooltip when sighted users need the text too; display none or the hidden attribute, which hide it from everyone.
source: packages/core/src/components/visually-hidden.tsx
---

# VisuallyHidden

## 1. Overview

VisuallyHidden takes its content out of view and keeps it in the accessibility tree: a 1px clipped box that screen readers read like any other text. It renders a `span` by default; `as` picks another element (a heading, `p`, `label`) and `asChild` hides your own element. It drops `className` and `style`.

## 2. When to use

- A heading for a region that's visually obvious from layout, so screen-reader users can navigate to it.
- Context appended to a link or button label: "Edit *profile*", "Read more *about pricing*", "(opens in a new tab)".
- A live-region status message that sighted users already see expressed another way (a colour change, an icon).
- A visible-elsewhere label for a control whose purpose is clear from layout.

### When not to use

- Naming an icon-only Button → put `aria-label` on the [Button](./button.md); see [iconography](../foundations/iconography.md).
- Text sighted users also need on hover or focus → [Tooltip](./tooltip.md).
- Content that should be hidden from everyone → `hidden` or conditional rendering.
- A form field's label → a visible [FormLabel](./form-label.md); hidden labels make fields harder for everyone.

## 3. Anatomy

1. **Hidden element**: one element (`span` by default), positioned absolutely, 1px square, clipped, with no padding or border. Its text stays in the accessibility tree.

## 4. Variants

VisuallyHidden has no `variant`.

## 5. Sizes

VisuallyHidden has no size prop.

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Default | Nothing visible | Always hidden. It doesn't reveal on focus, so don't put focusable content (a skip link) in it. |

## 7. Content guidelines

- Write it as you'd say it: a full phrase, not a keyword.
- Appended context starts where the visible text leaves off: visible "Edit", hidden " profile".
- Keep it short. Screen-reader users hear it every time.

## 8. Rules

1. Prefer a visible label. Hide text only when the visual design already makes its meaning clear.
2. Don't hide focusable elements: a focused element that's invisible strands keyboard users.
3. For an icon-only Button, use `aria-label` on the Button, not VisuallyHidden inside it.
4. Use `as="h2"` (or the right level) for a hidden region heading, keeping heading levels in order.
5. Don't pass `className` or `style`; they're dropped.

## 9. Dos and don'ts

**Do:** give a region a heading screen readers can jump to.

```tsx
<section aria-labelledby="filters-heading">
  <VisuallyHidden as="h2" id="filters-heading">Filters</VisuallyHidden>
  <Row wrap gap="sm">{filterControls}</Row>
</section>
```

**Don't:** hide text with `display: none`; screen readers skip it too.

```tsx
<h2 style={{ display: "none" }}>Filters</h2>
```

## 10. Accessibility

- Role: the element's own (`span` has none; `as="h2"` is a heading).
- Screen readers read the content in place, as part of its parent's text or accessible name.
- Keyboard: none. Never put a focusable element inside.
- Live regions: pair with `role="status"` or `aria-live="polite"` on the element for announcements.

## 11. Behaviour

- Layout: it's absolutely positioned, so it takes no space and never affects layout. Its nearest positioned ancestor contains it.
- Density: no effect.
- Motion: none.

## 12. API

<!-- api:start -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `"span" \| "div" \| "p" \| "label" \| "h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6"` | `"span"` | Element override. Defaults to `span`. |
| `asChild` | `boolean` | `false` | Hide the child element instead of wrapping it (Radix Slot). |
| `...props` | `HTMLAttributes<HTMLElement>` without `className`, `style` | | Native attributes: `id`, `role`, `aria-live`, `data-*`. |
<!-- api:end -->

## 13. Examples

```tsx
import { Button, Row, Stack, Typography, VisuallyHidden } from "@eluan/core";

export function ClassList({ classes }: { classes: { id: string; name: string }[] }) {
  return (
    <Stack as="section" gap="md" aria-labelledby="classes-heading">
      <VisuallyHidden as="h2" id="classes-heading">
        Today's classes
      </VisuallyHidden>
      {classes.map((item) => (
        <Row key={item.id} justify="between">
          <Typography>{item.name}</Typography>
          <Button variant="outline" size="sm">
            Edit<VisuallyHidden> {item.name}</VisuallyHidden>
          </Button>
        </Row>
      ))}
    </Stack>
  );
}
```

## 14. Related components

- [Button](./button.md): icon-only Buttons take `aria-label` instead.
- [Icon](./icon.md): decorative icons beside hidden or visible text.
- [Tooltip](./tooltip.md): text sighted users see on hover or focus.

## 15. Common agent mistakes

_Filled from evals._
