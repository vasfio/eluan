---
name: Row
use_when: Items sit side by side in a line, such as a title with its actions, a group of buttons, an icon with its label, or tags that wrap.
instead_of: Stack for items one above another; Grid when items must line up in columns across rows; ToggleGroup or SegmentedControl for a set of choices.
source: packages/core/src/components/row.tsx
---

# Row

## 1. Overview

Row is horizontal flow: a flex row with a `--spacing-*` gap, children vertically centred by default. It draws nothing and only places what's inside it. `justify="between"` pushes the first and last child apart, `wrap` lets children flow onto further lines, and `inline` sits the row inside running text. It takes `Box`'s padding and `grow` props, `as` and `asChild`, and drops `className` and `style`.

## 2. When to use

- A page or section header: title at the start, actions at the end (`justify="between"`).
- A group of buttons, such as Cancel and Save at the end of a form.
- An input that takes the remaining width next to a button (with a `Box grow` around the input).
- Tags, Badges or chips that wrap onto further lines.
- A label and value on one line in a list row.

### When not to use

- Items one above another → [Stack](./stack.md).
- Cards or tiles that must line up in columns, or change column count with the viewport → [Grid](./grid.md).
- A set of choices the user picks from → [ToggleGroup](./toggle-group.md) or [SegmentedControl](./segmented-control.md).
- An icon beside a label inside a Button → just put both in the Button; it lays them out.

## 3. Anatomy

1. **Container**: one element (`div` by default) laid out as a flex row with `min-width: 0`. Children sit directly inside it.

## 4. Variants

Row has no `variant`. These props change how children sit:

| Prop | Values | Default |
| --- | --- | --- |
| `align` (cross axis) | `start`, `center`, `end`, `stretch`, `baseline` | `center` |
| `justify` (main axis) | `start`, `center`, `end`, `between` | unset: children pack at the start |
| `wrap` | `boolean` | `false`: one line |
| `inline` | `boolean` | `false`: a block-level row |

Use `align="baseline"` when items of different text sizes should share a baseline, and `align="start"` when one child is much taller.

## 5. Sizes

Row has no size prop. `gap` sets the space between children (and between lines when it wraps) and `pad`, `padX`, `padY` set padding, each a `--spacing-*` step from `"none"` to `"4xl"`. `gap` defaults to `"md"`.

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Default | Children in a line with the gap | Static. Row has no interactive states. |

## 7. Content guidelines

- Keep a Row to items that read as one line. If it holds more than one or two groups, consider Stack plus smaller Rows.
- Put the primary action last in a row of buttons, at the end of the line.
- Use `wrap` for content of unknown length (tags); without it, a long Row overflows its parent.

## 8. Rules

1. Space children with `gap`, never margins. For a gap after one child only, nest Rows or use [Icon](./icon.md)'s `after`.
2. Use `--spacing-*` steps only, through `gap` and `pad*`. Never write px.
3. Give the child that should absorb leftover space `grow`: wrap it in `<Box grow>` (or pass `grow` to a Stack or Row child).
4. Use `wrap` whenever the number or width of children isn't fixed.
5. Don't pass `className` or `style`; they're dropped.
6. Don't use Row for a grid of cards. Rows don't align across lines; use Grid.

## 9. Dos and don'ts

**Do:** put a title and its actions at either end.

```tsx
<Row justify="between" gap="lg" wrap>
  <Typography variant="heading" as="h2">Members</Typography>
  <Button>Invite</Button>
</Row>
```

**Don't:** fake it with a spacer or margins.

```tsx
<div style={{ display: "flex" }}>
  <h2>Members</h2>
  <div style={{ flex: 1 }} />
  <Button style={{ marginLeft: 16 }}>Invite</Button>
</div>
```

## 10. Accessibility

- Role: none by default. Use `as` for meaning (`nav`, `header`, `li`), or `role="toolbar"` with an `aria-label` for a group of controls that acts as a toolbar.
- Keyboard: none of its own. Tab order follows the DOM.
- Order: `justify` doesn't reorder children, so reading order matches the visual order. Don't reverse it with CSS.
- `as="label"` makes the whole row a click target for the control inside it.

## 11. Behaviour

- Responsive: Row stays one line unless `wrap` is set. For a row that becomes a column on small screens, use Grid with `cols={{ base: 1, m: 2 }}`, or Stack at small widths.
- Density: `gap` and padding follow `data-spacing`.
- Shrinking: Row has `min-width: 0`; children don't shrink below their content unless they're a `Box grow` (or other `grow` child) with `truncate` text inside.
- Motion: none.

## 12. API

<!-- api:start -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `gap` | `"none" \| "xxs" \| "xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl" \| "3xl" \| "4xl"` | `"md"` | Space between children, as a `--spacing-*` step. |
| `align` | `"start" \| "center" \| "end" \| "stretch" \| "baseline"` | `"center"` | Cross-axis alignment. Rows centre their children by default. |
| `justify` | `"start" \| "center" \| "end" \| "between"` | | Main-axis distribution. `between` pushes the first and last child apart. |
| `wrap` | `boolean` | `false` | Let children wrap onto further lines (the gap applies between lines too). |
| `inline` | `boolean` | `false` | Render as `inline-flex`, so the row sits in a line of text. |
| `pad` | `"none" \| "xxs" \| "xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl" \| "3xl" \| "4xl"` | | Padding on every side. `padX` / `padY` override it per axis. |
| `padX` | `"none" \| "xxs" \| "xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl" \| "3xl" \| "4xl"` | | Inline padding (left and right in LTR). |
| `padY` | `"none" \| "xxs" \| "xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl" \| "3xl" \| "4xl"` | | Block padding (top and bottom). |
| `grow` | `boolean` | | Take the remaining space in a flex parent: `flex: 1 1 0` with `min-width: 0`. |
| `as` | `"div" \| "span" \| "section" \| "article" \| "aside" \| "header" \| "footer" \| "main" \| "nav" \| "form" \| "fieldset" \| "label" \| "p" \| "ul" \| "ol" \| "li" \| "dl" \| "dt" \| "dd"` | | Element override. Defaults to `div`. |
| `asChild` | `boolean` | `false` | Render the child element instead (Radix Slot); the layout styles move onto it. |
| `...props` | `HTMLAttributes<HTMLElement>` without `className`, `style` | | Native attributes: `id`, `role`, `aria-*`, `data-*`, event handlers. |
<!-- api:end -->

## 13. Examples

```tsx
import { Badge, Box, Button, Input, Row, Stack, Typography } from "@eluan/core";

export function MembersHeader() {
  return (
    <Stack gap="lg">
      <Row justify="between" gap="lg" wrap>
        <Typography variant="title" as="h1">Members</Typography>
        <Row gap="sm">
          <Button variant="outline">Export</Button>
          <Button>Invite</Button>
        </Row>
      </Row>

      <Row gap="sm">
        <Box grow>
          <Input type="search" placeholder="Search members" aria-label="Search members" />
        </Box>
        <Button variant="outline">Filters</Button>
      </Row>

      <Row wrap gap="xs">
        <Badge variant="secondary">Active</Badge>
        <Badge variant="secondary">Teachers</Badge>
        <Badge variant="secondary">Joined this month</Badge>
      </Row>
    </Stack>
  );
}
```

## 14. Related components

- [Stack](./stack.md): the vertical counterpart.
- [Box](./box.md): `grow` for the child that takes the remaining width.
- [Grid](./grid.md): columns that line up across rows.
- [Icon](./icon.md): sizes icons inside a Row; `after` for a gap after one icon.
- [ToggleGroup](./toggle-group.md): a row of choices, not of layout.

## 15. Common agent mistakes

_Filled from evals._
