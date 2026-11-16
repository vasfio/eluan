---
name: Icon
use_when: A lucide icon (or inline svg) sits next to text, in a list row or inside a Button, and needs sizing to a --size-* token.
instead_of: Button with an icon size for an icon-only action; Avatar for a person's picture; Spinner for loading; Lucide's numeric size prop or a px width.
source: packages/core/src/components/icon.tsx
---

# Icon

## 1. Overview

Icon sizes an svg child to a `--size-*` token, so icons follow the spacing density like the controls around them. It wraps the svg in an `inline-flex` span that doesn't shrink, sets the span's width and height from `size`, and makes the svg fill it, overriding Lucide's 24px default. `tone` colours it from the same tones as Typography; by default it inherits the text colour. It's decorative by default (`aria-hidden`). `after` adds a trailing gap for an icon followed by text outside a gapped Row; `asChild` puts the sizing on the svg itself with no wrapping span. It drops `className` and `style`.

## 2. When to use

- An icon beside a label: in a Button, a list row, a Badge or a line of text.
- A standalone decorative icon in an empty state or a Card header.
- Any lucide icon you'd otherwise size with `size={16}` or a width style.

### When not to use

- An icon-only action → [Button](./button.md) with `size="icon"` (or `iconSm`, `iconXs`, `iconInline`) and an `aria-label`; put the Icon inside it.
- A person or brand image → [Avatar](./avatar.md) or [Media](./media.md).
- Something loading → [Spinner](./spinner.md).
- Inputs with `type="search"`, `email`, `password`, `tel` or `url` → [Input](./input.md) already shows an icon.

## 3. Anatomy

1. **Box**: a `span` sized to the token, `inline-flex` and centred, that never shrinks in a flex row.
2. **Glyph**: the svg child, filling the box. It inherits `currentColor`.

With `asChild` there is no span: the svg is the box.

## 4. Variants

Icon has no `variant`. Colour comes from the surrounding text unless `tone` sets one: `default`, `muted`, `inverse`, `positive`, `destructive`, `interactive` or `interactive-muted`, the same tones as Typography.

## 5. Sizes

`size` is a `--size-*` step from `"xxs"` to `"4xl"`, default `"xs"`:

| Size | Use for |
| --- | --- |
| `xxs` | Inside text, Badges and dense controls |
| `xs` | Beside a label in a Button or list row (the default) |
| `sm`, `md` | Standalone icons in a Card header or toolbar |
| `xl` and up | Empty-state illustrations |

See [iconography](../foundations/iconography.md) for the token values per density.

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Default | The glyph at the token size | Static. Icon has no interactive states; the control around it does. |

## 7. Content guidelines

- Pair an icon with a label wherever space allows; an icon alone is ambiguous.
- Use one icon style throughout: lucide-react. Don't mix sets.

## 8. Rules

1. Size every icon with Icon or a `--size-*` token. Never use Lucide's numeric `size` prop or a px width.
2. Let the icon inherit colour. When it must differ from the text beside it, set `tone`; never a colour value.
3. Leave it decorative (`aria-hidden`, the default) when a visible label or the control's `aria-label` already says what it means.
4. In a Row, space the icon with the Row's `gap`. Use `after` only when the icon sits in running text or another element without a gap.
5. Give it exactly one svg child.
6. Don't pass `className` or `style`; they're dropped.

## 9. Dos and don'ts

**Do:** size the icon with a token and let the Button lay it out.

```tsx
<Button>
  <Icon size="xs">
    <Plus />
  </Icon>
  New project
</Button>
```

**Don't:** size it with numbers or colour it by hand.

```tsx
<Button>
  <Plus size={16} color="#666" style={{ marginRight: 8 }} />
  New project
</Button>
```

## 10. Accessibility

- Role: none; the span is `aria-hidden` by default, so screen readers skip the icon.
- Label: an icon-only control gets `aria-label` on the control (the Button), not on the Icon.
- Meaningful icon: when the icon alone carries meaning outside a control (a status mark with no text), pass `aria-hidden={false}`, `role="img"` and `aria-label`.
- Contrast: the icon takes the text colour, or a theme tone, so it meets the same contrast as text in that tone. Don't let colour alone carry meaning: pair a `positive` or `destructive` icon with words.

## 11. Behaviour

- Density: `size` and `after` follow `data-spacing`, so icons grow and shrink with the controls they sit in.
- Shrinking: the box never shrinks in a flex row, so the icon keeps its size when the label is long.
- Motion: none. Animate a spinner with [Spinner](./spinner.md), not by rotating an Icon.

## 12. API

<!-- api:start -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `"xxs" \| "xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl" \| "3xl" \| "4xl"` | `"xs"` | Width and height, as a `--size-*` step. |
| `after` | `"none" \| "xxs" \| "xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl" \| "3xl" \| "4xl"` | | Trailing gap, for an icon followed by a label outside a gapped Row. |
| `asChild` | `boolean` | `false` | Size the child svg itself instead of wrapping it in a span (Radix Slot). |
| `tone` | `"default" \| "muted" \| "inverse" \| "inherit" \| "positive" \| "destructive" \| "interactive" \| "interactive-muted"` | `"inherit"` | Colour, from the same tones as Typography. Defaults to `"inherit"` (the text colour around it). |
| `...props` | `HTMLAttributes<HTMLSpanElement>` without `className`, `style` | | Native attributes: `aria-*`, `role`, `data-*`. |
<!-- api:end -->

## 13. Examples

```tsx
import { Calendar, Check, Clock } from "lucide-react";
import { Button, Icon, Row, Stack, Typography } from "@eluan/core";

export function PaymentSummary() {
  return (
    <Stack gap="md" align="start">
      <Typography>
        <Icon size="xxs" after="xs">
          <Check />
        </Icon>
        Payment received
      </Typography>

      <Row gap="sm">
        <Icon size="xs">
          <Clock />
        </Icon>
        <Typography variant="label">Last synced 09:41</Typography>
      </Row>

      <Button variant="outline">
        <Icon size="xs">
          <Calendar />
        </Icon>
        Add to calendar
      </Button>
    </Stack>
  );
}
```

## 14. Related components

- [Button](./button.md): icon sizes for icon-only actions; put the Icon inside.
- [Row](./row.md): spaces an icon and its label with `gap`.
- [VisuallyHidden](./visually-hidden.md): text for screen readers beside a decorative icon.
- [Spinner](./spinner.md): the animated loading icon.

## 15. Common agent mistakes

_Filled from evals._
