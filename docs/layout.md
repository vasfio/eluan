# Laying out pages with Eluan

Eluan components are styling-closed: they take no `className` or `style`. Since 0.6, `@eluan/core` also ships the layout that goes between them, so a whole page can be laid out from Eluan tokens alone, with no utility framework and no hand-written spacing values.

1. [The rule](#the-rule)
2. [The primitives](#the-primitives)
3. [Spacing, sizes and density](#spacing-sizes-and-density)
4. [Responsive columns](#responsive-columns)
5. [Text](#text)
6. [Height, overlays and overflow](#height-overlays-and-overflow)
7. [What stays in your app](#what-stays-in-your-app)
8. [Migrating from a utility framework](#migrating-from-a-utility-framework)

---

## The rule

1. **An Eluan component first.** If a component does the job (Card for a surface, Fieldset for a group of fields, Table for rows people compare), use it.
2. **Layout primitives for the space between components.** `Stack`, `Row`, `Grid` and `Box` place components; they don't draw anything.
3. **Tokens only.** Gaps and padding take `--spacing-*` token names, icon sizes take `--size-*` names. No pixel values, no utility classes.

## The primitives

| Component | Does | Key props |
| --- | --- | --- |
| `Stack` | Vertical flow | `gap` (default `md`), `align`, `justify` |
| `Row` | Horizontal flow, centred by default | `gap` (default `md`), `align` (default `center`), `justify`, `wrap`, `inline` |
| `Grid` | Columns | `cols`, `gap` (default `md`), `align` |
| `Box` | Padding, flex sizing, height, overlays, overflow | `pad`, `padX`, `padY`, `grow`, `shrink`, `height`, `minHeight`, `position`, `inset`, `overflow` |
| `Icon` | Sizes an svg child to a size token | `size` (default `xs`), `after`, `tone` |
| `VisuallyHidden` | Text for screen readers only | — |

`Stack`, `Row` and `Grid` also take `Box`'s props, so `<Stack gap="lg" pad="xl">` pads and stacks in one element, and `<Stack height="full" align="center" justify="center">` centres an empty state in its panel. Every primitive takes `as` (an element override such as `section`, `form`, `li` or `label`) and `asChild` (render your own child element with the layout styles), and like every Eluan component, none takes `className` or `style`.

```tsx
import { Button, Card, CardHeader, CardTitle, CardDescription, Grid, Row, Stack, Typography } from "@eluan/core"

export function Dashboard() {
  return (
    <Stack as="main" gap="2xl" pad="xl">
      <Row justify="between" wrap gap="lg">
        <Typography variant="title" as="h1">Dashboard</Typography>
        <Button>New project</Button>
      </Row>

      <Grid cols={{ base: 2, l: 4 }} gap="lg">
        <Card>
          <CardHeader>
            <CardDescription>Revenue</CardDescription>
            <CardTitle>$48,210</CardTitle>
          </CardHeader>
        </Card>
        {/* … */}
      </Grid>
    </Stack>
  )
}
```

## Spacing, sizes and density

`gap`, `pad`, `padX` and `padY` take a step of the spacing scale: `"none"`, `"xxs"`, `"xs"`, `"sm"`, `"md"`, `"lg"`, `"xl"`, `"2xl"`, `"3xl"`, `"4xl"`. `Icon` takes a step of the size scale (`"xxs"` to `"4xl"`).

Both scales follow the spacing density. Switch `data-spacing` (or call `setSpacing` from `useEluanTheme`) and the layout re-flows together with the components inside it:

| Step | compact | standard | wide |
| --- | --- | --- | --- |
| `xxs` | 0px | 2px | 4px |
| `xs` | 2px | 4px | 8px |
| `sm` | 4px | 6px | 12px |
| `md` | 8px | 10px | 16px |
| `lg` | 12px | 14px | 20px |
| `xl` | 16px | 18px | 24px |
| `2xl` | 20px | 20px | 32px |
| `3xl` | 24px | 32px | 80px |
| `4xl` | 32px | 64px | 160px |

Pick a step by role, not by pixel: the gap between a label and its control, between fields, between sections. The pixel value is the density's business.

## Responsive columns

`Grid`'s `cols` takes:

- a count from 1 to 12: equal `minmax(0, 1fr)` columns, `cols={3}`;
- a raw `grid-template-columns` value for uneven tracks, `cols="auto minmax(0, 1fr)"`;
- an object per breakpoint, mobile first, mixing both: `cols={{ base: 1, m: 2, l: "minmax(0, 2fr) minmax(0, 1fr)" }}`.

Breakpoints use Eluan's names (`breakpoints` in `@eluan/tokens`), each a minimum width. A level you don't set inherits the nearest one below it.

| Name | `xxs` | `xs` | `s` | `m` | `l` | `xl` | `2xl` | `3xl` | `4xl` |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| From | 320px | 414px | 480px | 748px | 1024px | 1280px | 1440px | 1920px | 2580px |

Grid children get `min-width: 0`, so long content can't stretch a column past its share. In raw templates, prefer `minmax(0, 1fr)` to a bare `1fr` for the same reason.

## Text

Text is `Typography`, not a layout primitive. For app UI text that should follow the spacing density like the controls around it, use `size` (`"xs"` to `"5xl"`) rather than `step`, which is fixed. `tone="inherit"` takes the parent's colour (text inside a Banner or a Button), `tone="positive"` and `tone="destructive"` colour status text, and `tabular` lines numbers up in columns. `Icon` takes the same tones; by default it inherits the text colour.

```tsx
<Typography size="sm" tone="muted" tabular>$18,240.00</Typography>
```

## Height, overlays and overflow

The primitives also cover the layout around flow:

- **`shrink={false}`** holds a child at its content size in a Row (a date, a badge group), so its neighbours wrap or truncate instead.
- **`height` and `minHeight`** take `"full"` (the parent's height) or `"screen"` (the viewport's, `100dvh`).
- **`position="relative"`** makes an anchor, and **`inset`** pins a child to it: `"fill"` covers it, `"top"` and `"bottom"` run along that edge. `inset` positions the child absolutely.
- **`overflow`** clips (`"hidden"`) or scrolls (`"auto"`).

```tsx
<Box position="relative" overflow="hidden">
  <img src={cover} alt="" />
  {uploading && (
    <Stack inset="fill" align="center" justify="center">
      <Spinner />
    </Stack>
  )}
</Box>
```

## What stays in your app

Page furniture (page headers, panels, stat tiles, form field wrappers) is app-level: compose it from Eluan components and primitives in your own component.

Widths, sticky positioning, hover effects and animation aren't primitive props. Put them on an element you own, styled with tokens (a CSS module, StyleX, or an inline style object), and nest the primitive inside it, or render the primitive onto it with `asChild`:

```tsx
// page.module.css
// .sidebar { position: sticky; top: var(--spacing-xl); }

<aside className={styles.sidebar}>
  <Stack gap="md">…</Stack>
</aside>
```

```tsx
<Row asChild gap="md" padY="sm">
  <label className={styles.pickerRow}>…</label>
</Row>
```

If you find yourself writing that wrapper for plain flow layout (a gap, padding, columns, height, overflow), that's a gap in the primitives; please open an issue.

## Migrating from a utility framework

Replace layout classes with primitives screen by screen. In **compact** density the spacing scale lines up with Tailwind's 4px scale step for step, so a compact app can map classes directly:

| Tailwind | Eluan |
| --- | --- |
| `flex flex-col gap-4` | `<Stack gap="xl">` |
| `flex items-center gap-2` | `<Row gap="md">` |
| `flex items-center justify-between` | `<Row justify="between">` |
| `flex flex-wrap gap-1` | `<Row wrap gap="sm">` |
| `inline-flex items-center` | `<Row inline>` |
| `grid grid-cols-2 lg:grid-cols-4 gap-3` | `<Grid cols={{ base: 2, l: 4 }} gap="lg">` |
| `grid grid-cols-[auto_1fr]` | `<Grid cols="auto minmax(0, 1fr)">` |
| `p-4`, `px-4 py-2` | `pad="xl"`, `padX="xl" padY="md"` |
| `flex-1 min-w-0` | `<Box grow>` |
| `shrink-0` | `shrink={false}` |
| `h-full`, `min-h-screen` | `height="full"`, `minHeight="screen"` |
| `relative`, `absolute inset-0` | `position="relative"`, `inset="fill"` |
| `overflow-hidden`, `overflow-auto` | `overflow="hidden"`, `overflow="auto"` |
| `w-4 h-4` on an icon | `<Icon size="xs">` (compact 16px) |
| `mr-2` after an icon | `<Icon after="md">`, or put both in a `<Row gap="md">` |
| `sr-only` | `<VisuallyHidden>` |
| `text-sm text-muted-foreground` | `<Typography size="sm" tone="muted">` |
| `text-green-700`, `text-red-600` on status text | `tone="positive"`, `tone="destructive"` (Typography or Icon) |
| `tabular-nums`, `truncate` | `tabular`, `truncate` on Typography |

Compact spacing steps: `gap-0.5` → `xs`, `gap-1` → `sm`, `gap-2` → `md`, `gap-3` → `lg`, `gap-4` → `xl`, `gap-5` → `2xl`, `gap-6` → `3xl`, `gap-8` → `4xl`. The half steps (`gap-1.5`, `gap-2.5`, 6px and 10px) have no compact step: snap to the nearest one.

Tailwind's breakpoints (`sm` 640, `md` 768, `lg` 1024, `xl` 1280, `2xl` 1536) don't match Eluan's. `lg` and `xl` line up exactly; for `sm` use `s` (480) or `m` (748), for `md` use `m` (748), for `2xl` use `2xl` (1440), and check each page at its new widths.

A migration that worked:

1. Replace page-level layout first (the outer Stack, the page header Row, the main Grid).
2. Replace icon sizing with `Icon`, then body text with `Typography`.
3. Move anything left (widths, sticky positioning, hover effects) into a CSS module next to the page, written with tokens.
4. Remove the framework, then switch `data-spacing` between compact, standard and wide on every page: layout and components should re-flow together.
