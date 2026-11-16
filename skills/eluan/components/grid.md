---
name: Grid
use_when: Items go in columns, such as a grid of cards or stat tiles, a page split into main and side columns, or a layout whose column count changes with the viewport.
instead_of: Table for rows users compare across the same attributes; Row with wrap for tags or chips of uneven width; Stack for a single column.
source: packages/core/src/components/grid.tsx
---

# Grid

## 1. Overview

Grid is CSS grid with a `--spacing-*` gap. `cols` takes a column count (1 to 12 equal tracks), a raw `grid-template-columns` value for uneven tracks, or an object per breakpoint, mobile first, keyed by Eluan's breakpoint names. Its children get `min-width: 0`, so long content can't stretch a column past its share. Like the other layout primitives it draws nothing, takes `Box`'s props (padding, `grow`, `shrink`, `height`, `minHeight`, `position`, `inset`, `overflow`), `as` and `asChild`, and drops `className` and `style`.

## 2. When to use

- A grid of Cards, stat tiles or media that should line up in columns.
- A page split into a main column and a side column.
- A label column beside a value column (`cols="auto minmax(0, 1fr)"`).
- Any layout whose column count changes with the viewport width.

### When not to use

- Rows users compare across the same attributes → [Table](./table.md).
- Tags, Badges or chips of different widths → [Row](./row.md) with `wrap`.
- One column → [Stack](./stack.md).
- Hierarchical data → [TreeView](./tree-view.md).

## 3. Anatomy

1. **Container**: one element (`div` by default) laid out as a grid. Each direct child is a grid item and gets `min-width: 0`.

## 4. Variants

Grid has no `variant`. `cols` sets the tracks:

| `cols` | Gives |
| --- | --- |
| unset | One full-width column |
| `3` | Three equal columns (`repeat(3, minmax(0, 1fr))`); counts run 1 to 12 |
| `"auto minmax(0, 1fr)"` | Any `grid-template-columns` value |
| `{ base: 1, m: 2, l: 4 }` | One column, two from 748px, four from 1024px |

`align` sets how items sit in their row: `start`, `center`, `end`, `stretch` (the default when unset) or `baseline`.

## 5. Sizes

Grid has no size prop. `gap` sets the space between rows and columns and `pad`, `padX`, `padY` set padding, each a `--spacing-*` step from `"none"` to `"4xl"`. `gap` defaults to `"md"`.

Breakpoints, each a minimum width (`breakpoints` in `@eluan/tokens`):

| `xxs` | `xs` | `s` | `m` | `l` | `xl` | `2xl` | `3xl` | `4xl` |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 320px | 414px | 480px | 748px | 1024px | 1280px | 1440px | 1920px | 2580px |

A level you don't set inherits the nearest level below it: `{ base: 2, l: 4 }` is two columns up to 1024px and four from there on.

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Default | Items in columns with the gap | Static. Grid has no interactive states. |

## 7. Content guidelines

- Start from the smallest screen: `base` is the phone layout, and each breakpoint adds columns as space allows.
- Keep items in one grid the same kind (all stat tiles, all Cards), so rows read evenly.
- Two to four columns suit Cards; tiles with a single number can go to five or six on wide screens.

## 8. Rules

1. Use Eluan's breakpoint names (`s`, `m`, `l`, …), never Tailwind's (`sm`, `md`, `lg`) or px media queries.
2. Use a column count for equal columns. Use a raw template only for uneven tracks, and write `minmax(0, 1fr)`, not a bare `1fr`, so content can't widen a track.
3. Space items with `gap`, never margins.
4. Don't use Grid for tabular data that users compare across rows; use Table.
5. Don't pass `className` or `style`; they're dropped. To make one item span two columns, wrap the item in your own element with `grid-column: span 2`.
6. A Grid inside a Grid keeps its own `cols`; nested grids don't inherit the parent's columns.

## 9. Dos and don'ts

**Do:** give the grid a mobile-first column count.

```tsx
<Grid cols={{ base: 1, m: 2, l: 4 }} gap="lg">
  {plans.map((plan) => <PlanCard key={plan.id} plan={plan} />)}
</Grid>
```

**Don't:** use utility-framework breakpoint names or a hand-written media query.

```tsx
<Grid cols={{ base: 1, md: 2, lg: 4 }}>{cards}</Grid>
<div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>{cards}</div>
```

## 10. Accessibility

- Role: none by default. For a list of items, pass `role="list"` and give each child `role="listitem"`, or use `as="ul"` with `li` children (the browser's list margin stays).
- Order: visual order is DOM order; Grid doesn't place items out of order. Keep the DOM in reading order.
- Keyboard: none of its own. Tab order follows the DOM, row by row.

## 11. Behaviour

- Responsive: column counts change at the breakpoints you set; unset levels inherit the level below.
- Density: `gap` and padding follow `data-spacing`.
- Overflow: children have `min-width: 0`, so long words or `truncate` text stay inside their column.
- Motion: none.

## 12. API

<!-- api:start -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `cols` | `GridColumns \| GridResponsiveColumns` | | Columns: a count, a template, or per breakpoint. Defaults to one column. |
| `gap` | `"none" \| "xxs" \| "xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl" \| "3xl" \| "4xl"` | `"md"` | Space between rows and columns, as a `--spacing-*` step. |
| `align` | `"start" \| "center" \| "end" \| "stretch" \| "baseline"` | | Cross-axis alignment of items in their row. Unset, items stretch. |
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

`GridColumns` is a count from 1 to 12 or a template string. `GridResponsiveColumns` is `{ base?, xxs?, xs?, s?, m?, l?, xl?, "2xl"?, "3xl"?, "4xl"? }`, each a `GridColumns`.

## 13. Examples

```tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Grid, Stack, Typography } from "@eluan/core";

const stats = [
  { label: "Revenue", value: "$48,210" },
  { label: "Active users", value: "2,318" },
  { label: "Open invoices", value: "14" },
  { label: "Projects", value: "36" },
];

export function DashboardOverview() {
  return (
    <Stack gap="2xl">
      <Grid cols={{ base: 2, l: 4 }} gap="lg">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader>
              <CardDescription>{stat.label}</CardDescription>
              <CardTitle>{stat.value}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </Grid>

      <Grid cols={{ base: 1, l: "minmax(0, 2fr) minmax(0, 1fr)" }} gap="xl" align="start">
        <Card>
          <CardHeader>
            <CardTitle>Recent invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <Typography tone="muted">Two of four paid.</Typography>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <Typography tone="muted">The billing run moves to Friday this month.</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Stack>
  );
}
```

## 14. Related components

- [Stack](./stack.md): one column.
- [Row](./row.md): one line, or wrapping chips of uneven width.
- [Card](./card.md): the usual grid item.
- [Table](./table.md): rows users compare.
- [Skeleton](./skeleton.md): placeholders in the same Grid while items load.

## 15. Common agent mistakes

_Filled from evals._
