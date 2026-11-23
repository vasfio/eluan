---
name: AspectRatio
use_when: Content you own (an embed, map, canvas or placeholder) must keep a fixed width-to-height ratio as its container resizes.
instead_of: Image or Video ratio presets for images and videos; a hard-coded height on your own element.
source: packages/core/src/components/aspect-ratio.tsx
---

# AspectRatio

## 1. Overview

AspectRatio locks its child to a width-to-height ratio. It wraps Radix Aspect Ratio: an outer box takes the full width of its container and sets its height from `ratio`, and an inner box fills it. It has no visual styles of its own: no radius, background or border.

## 2. When to use

- An embedded iframe (map, video player, slide deck) that must keep its proportions.
- A chart canvas or illustration box that should scale with its column.
- A placeholder box for media that hasn't loaded yet, in a ratio Image doesn't offer (4:3, 2:1).
- Any ratio other than Image's presets (1:1, 16:9, 3:4, 21:9).

### When not to use

- An image or video in a standard ratio → use [Media](./media.md) (`Image` or `Video` with `ratio`), which adds rounding, a loading state and a fallback. <!-- REVIEW: drafted; source doesn't compare the two. -->
- A loading placeholder in a known shape → use [Skeleton](./skeleton.md).
- A profile picture → use [Avatar](./avatar.md).
- A slideshow of images → use [Carousel](./carousel.md).

## 3. Anatomy

1. **Wrapper**: an outer `<div>` (Radix), `position: relative`, full container width, with bottom padding that sets the height from `ratio`.
2. **Content box**: an inner `<div>` absolutely positioned to fill the wrapper. Your props, `ref` and children go here.
3. **Child**: the element you supply. Size it to fill the box (`width` and `height` 100%).

## 4. Variants

AspectRatio has no variants. `ratio` sets the shape; your child sets the look.

## 5. Sizes

AspectRatio has no size prop. Width comes from its container; height comes from `ratio`. Constrain the width with a wrapper you own.

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Default | An empty box of the given ratio, filled by your child | No interactive states. |

## 7. Content guidelines

- Give an embedded iframe a `title` that names what it shows: "Map of the Lisbon office", not "map".
- Give an `<img>` you place inside meaningful `alt` text, or `alt=""` when it's decorative.
- Write ratios as fractions (`16 / 9`, `4 / 3`) so the intent reads at a glance, as the stories and docs do.

## 8. Rules

1. Pass `ratio` as width ÷ height: `16 / 9`, `4 / 3`, `1`. The default is `1` (square).
2. Make the child fill the box: `width: "100%"`, `height: "100%"`, and `objectFit: "cover"` for an `<img>` or `<video>` you own.
3. Put radius, border and background on your child or on a wrapper you own, with tokens (`--curves-*`, `--container-*`). AspectRatio drops `className` and `style`.
4. Constrain width on a parent wrapper. Never set a fixed height around AspectRatio; the ratio sets it.
5. Don't put an Eluan `Image` or `Video` inside AspectRatio. Their own frame doesn't fill the box; use their `ratio` prop instead. <!-- REVIEW: drafted from source: Image's frame has no height, so its img sizes to the image, not to the AspectRatio box. -->

## 9. Dos and don'ts

**Do:** fill the box with a child you own and round it with a token.

```tsx
<div style={{ borderRadius: "var(--curves-lg)", overflow: "hidden" }}>
  <AspectRatio ratio={4 / 3}>
    <img
      src="/floorplans/level-2.png"
      alt="Level 2 floor plan with 24 desks and two meeting rooms"
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  </AspectRatio>
</div>
```

**Don't:** fix a height or pass styles to AspectRatio.

```tsx
<div style={{ height: 300 }}>
  <AspectRatio ratio={4 / 3} style={{ borderRadius: 12 }}>
    <img src="/floorplans/level-2.png" />
  </AspectRatio>
</div>
```

**Do:** use Image's ratio preset for a standard image.

```tsx
<Image src="/team/offsite.jpg" alt="The team at the spring offsite" ratio="video" />
```

**Don't:** wrap an Image in AspectRatio.

```tsx
<AspectRatio ratio={16 / 9}>
  <Image src="/team/offsite.jpg" alt="The team at the spring offsite" />
</AspectRatio>
```

## 10. Accessibility

- Role: none. Both boxes are plain `<div>`s; the child carries the semantics.
- Label: from the child: `alt` on an image, `title` on an iframe.
- Keyboard: none of its own. Focusable content inside (an iframe, a button) keeps its usual behaviour.
- Focus: AspectRatio adds no focus stop.
- Contrast: AspectRatio draws nothing; contrast comes from your child and the theme.

## 11. Behaviour

- Responsive: the box always spans its container's width and recalculates its height as the width changes.
- Overflow and truncation: the content box fills the wrapper exactly. Content larger than the box overflows unless your child clips it (`objectFit` for media, `overflow: hidden` on your wrapper).
- Motion: none.

## 12. API

<!-- api:start -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `ratio` | `number` | `1` | Width divided by height, for example `16 / 9`. |
| `asChild` | `boolean` | `false` | Renders the child as the content box instead of an inner `<div>` (Radix Slot). |
| `children` | `ReactNode` | | The content to lock to the ratio. |
| `...props` | Radix `AspectRatio.Root` props without `className`, `style` | | Applied to the content box: `id`, `aria-*`, `data-*`. `className` and `style` are omitted and stripped at runtime. |
<!-- api:end -->

## 13. Examples

```tsx
import { AspectRatio, Typography } from "@eluan/core";

export function OfficeLocation() {
  return (
    <section style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-md)" }}>
      <Typography variant="subheading" as="h2">Lisbon office</Typography>
      <div
        style={{
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: "var(--container-border)",
          borderRadius: "var(--curves-lg)",
          overflow: "hidden",
        }}
      >
        <AspectRatio ratio={4 / 3}>
          <iframe
            title="Map of the Lisbon office at Rua Augusta 120"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-9.1405%2C38.7085%2C-9.1355%2C38.7115&layer=mapnik"
            loading="lazy"
            style={{ width: "100%", height: "100%", borderWidth: 0 }}
          />
        </AspectRatio>
      </div>
      <Typography tone="muted">Rua Augusta 120, 2nd floor. Reception opens at 8:30.</Typography>
    </section>
  );
}
```

## 14. Related components

- [Media](./media.md): `Image` and `Video` with built-in ratio presets, rounding and loading states.
- [Skeleton](./skeleton.md): a loading placeholder in the shape of the content.
- [Card](./card.md): a frame for media plus text.
- [Carousel](./carousel.md): several slides in a row.

## 15. Common agent mistakes

_Filled from evals._
