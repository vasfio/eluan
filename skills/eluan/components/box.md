---
name: Box
use_when: One element needs token padding, or needs to take the remaining space in a Row or Stack, without laying out children of its own.
instead_of: Stack or Row when the element also places several children; Card when the block needs a surface, border or radius.
source: packages/core/src/components/box.tsx
---

# Box

## 1. Overview

Box is the smallest layout primitive: an element (`div` by default) that takes `--spacing-*` padding through `pad`, `padX` and `padY`, and can take the remaining space in a flex parent with `grow`. It has no display, background or border of its own. Stack, Row and Grid take the same props, so reach for Box only when the element doesn't also lay out its children. It takes `as` and `asChild` and drops `className` and `style`.

## 2. When to use

- The child of a Row that should take the leftover width, such as a search Input beside a Button (`<Box grow>`).
- Padding around a single child, such as content inside a region you own.
- A semantic wrapper with padding (`as="li"`, `as="section"`).

### When not to use

- An element that places several children → [Stack](./stack.md), [Row](./row.md) or [Grid](./grid.md), which take the same padding props.
- A framed block with a surface → [Card](./card.md).
- Space between siblings → `gap` on their parent, not padding on each.

## 3. Anatomy

1. **Element**: one element (`div` by default) with padding and, with `grow`, `flex: 1 1 0` and `min-width: 0`. With no props it renders a plain element with no styles.

## 4. Variants

Box has no `variant`.

## 5. Sizes

Box has no size prop. `pad` pads every side; `padX` (inline: left and right in LTR) and `padY` (block: top and bottom) override it per axis. Each is a `--spacing-*` step from `"none"` to `"4xl"`. `<Box pad="sm" padX="lg">` is `sm` top and bottom, `lg` left and right.

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Default | Its content, padded | Static. Box has no interactive states. |

## 7. Content guidelines

- Box carries no meaning of its own. Use `as` when the element is a list item, section or label.

## 8. Rules

1. Use `--spacing-*` steps only, through `pad`, `padX` and `padY`. Never write px.
2. Don't use Box to space siblings apart; use `gap` on their Stack, Row or Grid.
3. Don't nest a Box inside a Stack or Row just to pad it; give the Stack or Row `pad` itself.
4. With `grow`, put `truncate` text inside the Box: `min-width: 0` lets it shrink, so the ellipsis shows instead of the row overflowing.
5. Don't pass `className` or `style`; they're dropped. Width, position and overflow go on an element you own.

## 9. Dos and don'ts

**Do:** let one child take the remaining width.

```tsx
<Row gap="sm">
  <Box grow>
    <Input type="search" aria-label="Search projects" />
  </Box>
  <Button variant="outline">Filters</Button>
</Row>
```

**Don't:** stretch it with a hand-written flex rule.

```tsx
<div style={{ display: "flex", gap: 8 }}>
  <div style={{ flex: 1 }}>
    <Input type="search" aria-label="Search projects" />
  </div>
  <Button variant="outline">Filters</Button>
</div>
```

## 10. Accessibility

- Role: none by default. Use `as` (`li`, `section`, `label`) when the element has meaning.
- Keyboard: none. Box isn't focusable.

## 11. Behaviour

- Responsive: Box has no responsive props.
- Density: padding follows `data-spacing`.
- Shrinking: with `grow`, Box has `min-width: 0`, so it can shrink below its content in a Row.
- Motion: none.

## 12. API

<!-- api:start -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
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
import { Box, Button, Row, Typography } from "@eluan/core";

export function ProjectRow({ title, updated }: { title: string; updated: string }) {
  return (
    <Row gap="md" padY="sm">
      <Box grow>
        <Typography truncate>{title}</Typography>
      </Box>
      <Typography variant="caption" tone="muted" tabular>
        {updated}
      </Typography>
      <Button size="sm">Open</Button>
    </Row>
  );
}
```

## 14. Related components

- [Stack](./stack.md), [Row](./row.md), [Grid](./grid.md): take the same padding and `grow` props, and lay out children too.
- [Card](./card.md): a padded block with a surface.

## 15. Common agent mistakes

_Filled from evals._
