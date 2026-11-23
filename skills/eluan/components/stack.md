---
name: Stack
use_when: Children go one above the other with a token gap, such as page sections, form fields, or a heading over its text.
instead_of: Row for items side by side; Grid for columns; Fieldset for a labelled group of form fields; margins on the children.
source: packages/core/src/components/stack.tsx
---

# Stack

## 1. Overview

Stack is vertical flow: a flex column with a `--spacing-*` gap between its children. It draws nothing (no background, border or radius) and only places what's inside it, so a page can be laid out from tokens without a utility framework or hand-written CSS. It takes `Box`'s props (padding, `grow`, `shrink`, `height`, `minHeight`, `position`, `inset`, `overflow`), `as` and `asChild`, and drops `className` and `style`.

## 2. When to use

- The outer flow of a page or panel: header, sections, footer.
- Form fields one under another, with the submit row last.
- A heading over its supporting text, or a label over a value.
- Any list of items you compose yourself.

### When not to use

- Items side by side → [Row](./row.md).
- Items in columns, or a layout that changes columns with the viewport → [Grid](./grid.md).
- A group of form fields under a legend → [Fieldset](./fieldset.md), with a Stack inside if needed.
- A framed block with a surface → [Card](./card.md); a Stack goes inside its content.
- Padding alone, with no flow → [Box](./box.md).

## 3. Anatomy

1. **Container**: one element (`div` by default) laid out as a flex column with `min-width: 0`, so it can shrink inside a Row or Grid. Children sit directly inside it.

## 4. Variants

Stack has no `variant`. `align` and `justify` change how children sit:

| Prop | Values | Default |
| --- | --- | --- |
| `align` (cross axis) | `start`, `center`, `end`, `stretch`, `baseline` | unset: children stretch to the Stack's width |
| `justify` (main axis) | `start`, `center`, `end`, `between` | unset: children pack at the top |

## 5. Sizes

Stack has no size prop. `gap` sets the space between children and `pad`, `padX`, `padY` set padding, each a `--spacing-*` step from `"none"` to `"4xl"`. `gap` defaults to `"md"`.

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Default | Children stacked with the gap | Static. Stack has no interactive states. |

## 7. Content guidelines

- Pick the gap by relationship, not by pixel: tight (`xs`, `sm`) between a label and its value, `md` to `lg` between fields or list items, `2xl` to `3xl` between page sections.
- Nest Stacks to group: an outer Stack with a large gap between sections, an inner one with a small gap inside each.

## 8. Rules

1. Space children with `gap`. Never put margins on the children.
2. Use `--spacing-*` steps only, through `gap` and `pad*`. Never write px.
3. Use `as` for the element's meaning (`main`, `section`, `form`, `nav`), not a wrapper `div` around the Stack.
4. For list semantics, prefer `role="list"` on the Stack and `role="listitem"` on each child over `as="ul"`: a `ul` keeps the browser's list margin, which no prop resets.
5. Don't pass `className` or `style`; they're dropped. Position, height and overflow are props; fixed widths, hover effects and animation go on an element you own, with the Stack nested in it.
6. Don't wrap a single child in a Stack to pad it. Use [Box](./box.md).

## 9. Dos and don'ts

**Do:** stack fields with a gap.

```tsx
<Stack as="form" gap="lg" onSubmit={save}>
  <Input aria-label="Name" />
  <Input type="email" aria-label="Email" />
  <Button type="submit">Save</Button>
</Stack>
```

**Don't:** space children with margins or a hand-written flex column.

```tsx
<div style={{ display: "flex", flexDirection: "column" }}>
  <Input aria-label="Name" style={{ marginBottom: 16 }} />
  <Button type="submit">Save</Button>
</div>
```

## 10. Accessibility

- Role: none by default (a `div`). Use `as` for landmarks and forms (`main`, `nav`, `section` with a label, `form`), or `role="list"` for a list.
- Label: give a `section` an `aria-label` or `aria-labelledby` so it becomes a region landmark.
- Keyboard: none. Stack isn't focusable.
- Order: visual order is DOM order. `justify` and `align` don't reorder children, so reading order matches what's shown.

## 11. Behaviour

- Responsive: Stack is one column at every width. For a layout that becomes several columns, use Grid.
- Density: `gap` and padding follow `data-spacing`, so a Stack re-flows with the components inside it.
- Shrinking: Stack has `min-width: 0`, so inside a Row or Grid it can shrink below its content's width, and `truncate` text inside it works.
- Motion: none.

## 12. API

<!-- api:start -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `gap` | `"none" \| "xxs" \| "xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl" \| "3xl" \| "4xl"` | `"md"` | Space between children, as a `--spacing-*` step. |
| `align` | `"start" \| "center" \| "end" \| "stretch" \| "baseline"` | | Cross-axis alignment. Unset, children stretch to the Stack's width. |
| `justify` | `"start" \| "center" \| "end" \| "between"` | | Main-axis distribution. |
| `pad` | `"none" \| "xxs" \| "xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl" \| "3xl" \| "4xl"` | | Padding on every side. `padX` / `padY` override it per axis. |
| `padX` | `"none" \| "xxs" \| "xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl" \| "3xl" \| "4xl"` | | Inline padding (left and right in LTR). |
| `padY` | `"none" \| "xxs" \| "xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl" \| "3xl" \| "4xl"` | | Block padding (top and bottom). |
| `grow` | `boolean` | | Take the remaining space in a flex parent: `flex: 1 1 0` with `min-width: 0`. |
| `shrink` | `boolean` | | `false` keeps the element at its content size in a flex parent (`flex-shrink: 0`). |
| `height` | `"full" \| "screen"` | | `full` fills the parent's height; `screen` fills the viewport (`100dvh`, so mobile browser bars don't cover the bottom). |
| `minHeight` | `"full" \| "screen"` | | At least the parent's height (`full`) or the viewport's (`screen`). |
| `position` | `"relative" \| "absolute"` | | `relative` makes this the anchor for `inset` children; `absolute` takes it out of flow. |
| `inset` | `"fill" \| "top" \| "bottom"` | | Pin to the nearest positioned ancestor: `fill` covers it, `top` and `bottom` run along that edge at full width. Sets `position: absolute`. |
| `overflow` | `"hidden" \| "auto"` | | `hidden` clips the content; `auto` scrolls it when it doesn't fit. |
| `as` | `"div" \| "span" \| "section" \| "article" \| "aside" \| "header" \| "footer" \| "main" \| "nav" \| "form" \| "fieldset" \| "label" \| "p" \| "ul" \| "ol" \| "li" \| "dl" \| "dt" \| "dd"` | | Element override. Defaults to `div`. |
| `asChild` | `boolean` | `false` | Render the child element instead (Radix Slot); the layout styles move onto it. |
| `...props` | `HTMLAttributes<HTMLElement>` without `className`, `style` | | Native attributes: `id`, `role`, `aria-*`, `data-*`, event handlers. |
<!-- api:end -->

## 13. Examples

```tsx
import { Button, Input, Stack, Typography } from "@eluan/core";

export function InviteForm() {
  return (
    <Stack as="section" gap="2xl" pad="xl" aria-labelledby="invite-heading">
      <Stack gap="xs">
        <Typography variant="heading" as="h2" id="invite-heading">
          Invite a teammate
        </Typography>
        <Typography tone="muted">They get an email with a sign-up link.</Typography>
      </Stack>

      <Stack as="form" gap="lg" onSubmit={(event) => event.preventDefault()}>
        <Input type="email" placeholder="name@company.com" aria-label="Email" />
        <Button type="submit">Send invite</Button>
      </Stack>
    </Stack>
  );
}
```

## 14. Related components

- [Row](./row.md): the horizontal counterpart, centred by default.
- [Grid](./grid.md): columns, including responsive ones.
- [Box](./box.md): padding, `grow`, height, position and overflow without flow.
- [Fieldset](./fieldset.md): a labelled group of form fields.
- [Card](./card.md): a framed surface; Stacks go inside its content.

## 15. Common agent mistakes

_Filled from evals._
