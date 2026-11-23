---
name: Box
use_when: One element needs token padding, or needs to take the remaining space in a Row or Stack, without laying out children of its own.
instead_of: Stack or Row when the element also places several children; Card when the block needs a surface, border or radius.
source: packages/core/src/components/box.tsx
---

# Box

## 1. Overview

Box is the smallest layout primitive: an element (`div` by default) that takes `--spacing-*` padding through `pad`, `padX` and `padY`. In a flex parent it takes the remaining space with `grow` or holds its content size with `shrink={false}`. `height` and `minHeight` fill the parent or the viewport, `position` and `inset` make an anchor and an overlay pinned to it, and `overflow` clips or scrolls. It has no display, background or border of its own. Stack, Row and Grid take the same props, so reach for Box only when the element doesn't also lay out its children. It takes `as` and `asChild` and drops `className` and `style`.

## 2. When to use

- The child of a Row that should take the leftover width, such as a search Input beside a Button (`<Box grow>`).
- Padding around a single child, such as content inside a region you own.
- A semantic wrapper with padding (`as="li"`, `as="section"`).
- A child of a Row that must keep its size while its neighbours wrap or truncate (`<Box shrink={false}>`).
- A scroll region in a parent of fixed height (`<Box height="full" overflow="auto">`).
- An overlay on media or a panel: `position="relative"` on the anchor, `inset="fill"` (covering it) or `inset="bottom"` (a bar along its bottom edge) on the overlay.

### When not to use

- An element that places several children → [Stack](./stack.md), [Row](./row.md) or [Grid](./grid.md), which take the same padding props.
- A framed block with a surface → [Card](./card.md).
- Space between siblings → `gap` on their parent, not padding on each.

## 3. Anatomy

1. **Element**: one element (`div` by default) with padding and, with `grow`, `flex: 1 1 0` and `min-width: 0`. The other props add one rule each: `flex-shrink`, `height`, `min-height`, `position` (with edge offsets for `inset`) and `overflow`. With no props it renders a plain element with no styles.

## 4. Variants

Box has no `variant`.

## 5. Sizes

Box has no size prop. `pad` pads every side; `padX` (inline: left and right in LTR) and `padY` (block: top and bottom) override it per axis. Each is a `--spacing-*` step from `"none"` to `"4xl"`. `<Box pad="sm" padX="lg">` is `sm` top and bottom, `lg` left and right.

`height` and `minHeight` take `"full"` (100% of the parent, which needs a height of its own) or `"screen"` (the viewport, `100dvh`, so mobile browser bars don't cover the bottom). Widths aren't props; set them on an element you own.

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
5. Don't pass `className` or `style`; they're dropped. Widths, hover effects and animation go on an element you own: nest the Box in it, or render it through `asChild`.
6. `inset` positions the Box absolutely against its nearest positioned ancestor. Give that ancestor `position="relative"`, or the overlay lands on whatever positioned element is further up.
7. `height="full"` needs a parent with a height. Inside a parent whose height comes from its content, it does nothing.

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
- Shrinking: with `grow`, Box has `min-width: 0`, so it can shrink below its content in a Row. `shrink={false}` does the opposite: the Box keeps its content size and its neighbours give up the room.
- Overlays: with `inset`, Box leaves the flow and covers or edges the anchor. A covering overlay hides what's under it from pointer events, not from screen readers; take content it hides out of the page when it shows.
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
| `shrink` | `boolean` | | `false` keeps the element at its content size in a flex parent (`flex-shrink: 0`). |
| `height` | `"full" \| "screen"` | | `full` fills the parent's height; `screen` fills the viewport (`100dvh`, so mobile browser bars don't cover the bottom). |
| `minHeight` | `"full" \| "screen"` | | At least the parent's height (`full`) or the viewport's (`screen`). |
| `position` | `"relative" \| "absolute"` | | `relative` makes this the anchor for `inset` children; `absolute` takes it out of flow. |
| `inset` | `"fill" \| "top" \| "bottom"` | | Pin to the nearest positioned ancestor: `fill` covers it, `top` and `bottom` run along that edge at full width. Sets `position: absolute`. |
| `overflow` | `"hidden" \| "auto"` | | `hidden` clips the content; `auto` scrolls it when it doesn't fit. |
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

An overlay: the Box is the anchor, the Stack covers it while the cover uploads.

```tsx
import { Box, Spinner, Stack } from "@eluan/core";

export function CoverPreview({ src, uploading }: { src: string; uploading: boolean }) {
  return (
    <Box position="relative" overflow="hidden">
      <img src={src} alt="Project cover" />
      {uploading && (
        <Stack inset="fill" align="center" justify="center">
          <Spinner />
        </Stack>
      )}
    </Box>
  );
}
```

## 14. Related components

- [Stack](./stack.md), [Row](./row.md), [Grid](./grid.md): take the same padding and `grow` props, and lay out children too.
- [Card](./card.md): a padded block with a surface.

## 15. Common agent mistakes

_Filled from evals._
