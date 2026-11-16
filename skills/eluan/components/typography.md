---
name: Typography
use_when: Setting any app text (page titles, section headings, paragraphs, labels and captions) on the fluid type scale.
instead_of: Raw h1–h6, p or span with hand-set font sizes; Label for form labels; CodeBlock or Kbd for code.
source: packages/core/src/components/typography.tsx
---

# Typography

## 1. Overview

Typography is the front door to Eluan's fluid type scale. One `variant` picks a step (size, line height and letter spacing together), a font family, a weight and a semantic element. It renders that element, or its child with `asChild`, and drops `className` and `style`. Read [typography.md](../foundations/typography.md) for the scale itself.

## 2. When to use

- Page titles, section and group headings.
- Intro paragraphs, body copy, helper and meta text.
- Text inside your own layout elements and inside Card, Dialog or Sheet bodies.
- Styling a link or other element as a heading or label (`asChild`).

### When not to use

- A label for a form control → use [Label](./form-label.md).
- Code samples → use [CodeBlock](./code-block.md); keyboard keys → use [Kbd](./kbd.md).
- Text inside a Button, Badge, Banner or other component → pass plain text; the component sets its own type and colour.
- A card's title → use CardTitle inside [Card](./card.md), or `variant="subheading"` with a heading `as`.
- Rich, user-authored formatted text → use [RichText](./rich-text.md).

## 3. Anatomy

1. **Element**: the rendered tag, from the variant's default or `as` (`h1`–`h6`, `p`, `span`, `div`, `blockquote`, `figcaption`), or your child element with `asChild`.
2. **Text**: the children, with margin reset to 0 and `text-wrap: pretty`.

## 4. Variants

| Variant | Step | Family | Weight | Default element | Use for |
| --- | --- | --- | --- | --- | --- |
| `display` | 5 | heading | medium | `h1` | A hero or marketing headline. |
| `title` | 4 | heading | medium | `h2` | The page title (with `as="h1"`). |
| `heading` | 3 | heading | medium | `h3` | Section headings (usually `as="h2"`). |
| `subheading` | 2 | heading | medium | `h4` | Card, group or sub-section headings. |
| `lead` | 1 | body | normal | `p` | An intro line under a page title. |
| `body` (default) | 0 | body | normal | `p` | Paragraphs and general copy. |
| `label` | neg1 | body | medium | `span` | Short emphasised UI text: names in lists, small headers. Not form labels. |
| `caption` | neg2 | body | normal | `span` | Helper text, timestamps and meta. |

<!-- REVIEW: "Use for" for display, label and caption is drafted; the foundation's "Choosing a value" table covers title, heading, subheading, lead, body and caption. -->

`tone` sets the colour:

- `default` (`--container-fg`), `muted` (`--container-fg-alt`), or `inverse` (`--container-fg-inverse`, only on a `--container-bg-inverse` surface).
- `positive` (`--positive-fg`) and `destructive` (`--destructive-fg`): status text such as "Payment received" or an error under a form. Both are held to 4.5:1.
- `interactive` (`--interactive-fg`) and `interactive-muted` (`--interactive-fg-alt`): text on a control you build yourself, such as a custom menu trigger. Text inside an Eluan control needs no tone.
- `inherit`: the parent's colour.

## 5. Sizes

The variant sets the size. `step` moves any variant to another of the ten steps (`"6"` to `"neg3"`) and swaps size, line height and letter spacing together, keeping the variant's family, weight and element. Sizes are fluid between 480px and 1024px viewports. Pick a variant first; reach for `step` only when no variant fits.

Steps don't change with the spacing density. For app UI text that should move with `data-spacing` like the controls beside it (table cells, form hints, toolbar labels), use `size` instead: `"xs"` to `"5xl"`, the `--font-size-*` aliases, one step lower in compact and one higher in wide. `size` takes precedence over `step`.

## 6. States

Typography has no interactive states. With `asChild` around a link or button, the child keeps its own behaviour, but its colour becomes the Typography tone.

## 7. Content guidelines

- Use sentence case for every heading and label: "Account settings", not "Account Settings".
- Don't end headings with a full stop.
- Keep a `lead` to one or two sentences.
- Keep captions short and factual: "Updated 2 hours ago".

| Do | Don't |
| --- | --- |
| Account settings | ACCOUNT SETTINGS |
| Billing history | Billing History. |
| Updated 2 hours ago | This information was last updated about 2 hours ago |

<!-- REVIEW: content guidance drafted; source gives no copy rules. -->

## 8. Rules

1. Set app text with Typography. Pick the `variant` for the role of the text, not its size.
2. Use `as` to fix the heading level for the document outline; keep the variant for the look.
3. Use one `title` or `display` per page.
4. Keep heading levels in order: one `h1`, then `h2` sections, then `h3`. Don't skip a level to get a smaller look; change the variant instead. <!-- REVIEW: level-order rule drafted to match page-layout.md rule 3. -->
5. Use `tone="inverse"` only on a `--container-bg-inverse` surface.
6. Don't wrap other components' text in Typography. Typography always sets a colour, so it overrides the colour a Button, Badge or Banner gives its content.
7. If you style text yourself, apply all three tokens of one step together, for example `--font-size-step-1`, `--line-height-step-1` and `--letter-spacing-step-1` (or, density-aware, `--font-size-sm`, `--line-height-sm` and `--letter-spacing-sm`). Never write a font size, line height or letter spacing in px, rem or em.
8. Change fonts only in the theme. Use `family` to pick `heading`, `body` or `mono`, never a font name.
9. Don't pin `data-typeset` unless a region must not resize (for example a fixed-size canvas).
10. Never pass `className` or `style`; they're dropped, even through a cast.

## 9. Dos and don'ts

**Do:** pick variants by role and set the level with `as`.

```tsx
<Typography variant="title" as="h1">Account settings</Typography>
<Typography variant="lead">Manage your profile, notifications and billing.</Typography>
<Typography variant="heading" as="h2">Notifications</Typography>
```

**Don't:** size text by hand or pick a heading tag for its size.

```tsx
<h1 style={{ fontSize: "32px", lineHeight: 1.1 }}>Account settings</h1>
<h4>Notifications</h4>
```

**Do:** use muted tone for meta text.

```tsx
<Typography variant="caption" tone="muted">Last updated 2 hours ago</Typography>
```

**Don't:** colour text yourself.

```tsx
<Typography variant="caption" style={{ color: "gray" }}>Last updated 2 hours ago</Typography>
```

**Do:** pass plain text to components.

```tsx
<Button type="submit">Save changes</Button>
```

**Don't:** wrap a component's label in Typography.

```tsx
<Button type="submit">
  <Typography variant="label">Save changes</Typography>
</Button>
```

## 10. Accessibility

- Role: whatever the element is. `display` to `subheading` render real headings (`h1`–`h4`); `as` changes the level and `as="span"` or `asChild` removes the heading role (asserted in tests).
- Label: the text content. Typography forwards `id`, `lang` and `aria-*`, so a heading can label a region with `aria-labelledby`.
- Keyboard: none, unless `asChild` renders a link or button.
- Truncation: `truncate` cuts text to one line visually; screen readers still read all of it. Sighted users can't see the rest, so don't truncate text that matters, or show it in full elsewhere. <!-- REVIEW: drafted; truncate adds no title or tooltip. -->
- Contrast: handled by the theme for each tone on its intended surface. Don't override colours.

## 11. Behaviour

- Responsive: every step is fluid between 480px and 1024px viewport widths, with no media queries. `data-typeset` on an ancestor pins the scale.
- Overflow and truncation: text wraps with `text-wrap: pretty`. `truncate` gives a single line with an ellipsis; it needs a width limit from its parent.
- Alignment: `align` takes logical values (`start`, `center`, `end`) and follows the writing direction.
- Motion: none.

## 12. API

<!-- api:start -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"display" \| "title" \| "heading" \| "subheading" \| "lead" \| "body" \| "label" \| "caption"` | `"body"` | Picks the step, family, weight and default element. |
| `as` | `"h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6" \| "p" \| "span" \| "div" \| "blockquote" \| "figcaption"` | variant's element | Element override; keeps the variant's look. |
| `asChild` | `boolean` | `false` | Renders the child element with the styles (Radix Slot). |
| `step` | `"6" \| "5" \| "4" \| "3" \| "2" \| "1" \| "0" \| "neg1" \| "neg2" \| "neg3"` | variant's step | Moves to another step; size, line height and letter spacing change together. |
| `size` | `"xs" \| "sm" \| "base" \| "lg" \| "xl" \| "2xl" \| "3xl" \| "4xl" \| "5xl"` | | Density-aware size: reads `--font-size-*` with its `--line-height-*` and `--letter-spacing-*`, so the text moves a step with `data-spacing`. Takes precedence over `step`. |
| `tone` | `"default" \| "muted" \| "inverse" \| "inherit" \| "positive" \| "destructive" \| "interactive" \| "interactive-muted"` | `"default"` | `--container-fg`, `--container-fg-alt` or `--container-fg-inverse`; `positive` and `destructive` for status text; `interactive` and `interactive-muted` for text on a control you build; `inherit` takes the parent's colour, for text inside a Banner, Button or link. |
| `weight` | `"thin" \| "extralight" \| "light" \| "normal" \| "medium" \| "semibold" \| "bold" \| "extrabold" \| "black"` | variant's weight | Weight override, 100 to 900. |
| `family` | `"heading" \| "body" \| "mono"` | variant's family | Reads `--font-heading`, `--font-body` or `--font-mono`. |
| `align` | `"start" \| "center" \| "end"` | | Logical text alignment. |
| `truncate` | `boolean` | `false` | One line with an ellipsis. |
| `tabular` | `boolean` | `false` | Tabular figures: every digit the same width, so numbers line up in columns. |
| `...props` | `HTMLAttributes<HTMLElement>` without `className`, `style` | | Native attributes: `id`, `lang`, `aria-*`. |
<!-- api:end -->

## 13. Examples

A page header with a section and meta text.

```tsx
import { Button, Typography } from "@eluan/core";

export function ProjectsHeader({ count, updated }: { count: number; updated: string }) {
  return (
    <header style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-md)" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "var(--spacing-md)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-xs)" }}>
          <Typography variant="title" as="h1">Projects</Typography>
          <Typography variant="lead" tone="muted">
            Everything your team is building, sorted by last activity.
          </Typography>
        </div>
        <Button type="button">New project</Button>
      </div>

      <section aria-labelledby="active-projects" style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-xs)" }}>
        <Typography id="active-projects" variant="heading" as="h2">Active</Typography>
        <Typography variant="caption" tone="muted">
          {count} projects · updated {updated}
        </Typography>
      </section>
    </header>
  );
}
```

## 14. Related components

- [Label](./form-label.md): labels for form controls.
- [CodeBlock](./code-block.md) and [Kbd](./kbd.md): code and keys.
- [Card](./card.md): CardTitle and CardDescription for card headings.
- [Button](./button.md): `variant="link"` for inline text actions.

## 15. Common agent mistakes

_Filled from evals._
