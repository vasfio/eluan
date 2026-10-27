---
name: Carousel
use_when: Showing a row of similar slides the user pages through one or a few at a time, such as screenshots, testimonials or featured items.
instead_of: Card grid when every item should be visible; Tabs for switching views; Stepper for an ordered process.
source: packages/core/src/components/carousel.tsx
---

# Carousel

## 1. Overview

Carousel is a scrolling strip of slides with previous and next buttons, built on Embla. Slides snap into place, can be dragged or swiped, and can show one, two or three per view. Embla options, plugins and its API pass through for looping, alignment and slide counters.

## 2. When to use

- Product screenshots or images the user flips through.
- Testimonials, featured articles or templates where only a few need to show at once.
- A row of cards that doesn't fit the width on small screens.

### When not to use

- Every item should be visible and comparable → use [Card](./card.md) in a grid, or [Table](./table.md).
- Switching between views of the same content → use [Tabs](./tabs.md) or [SegmentedControl](./segmented-control.md).
- Steps the user must complete in order → use [Stepper](./stepper.md).
- One important message → show it directly; a [Banner](./banner.md) for announcements.
- Paging through a long list of records → use [Pagination](./pagination.md).

## 3. Anatomy

1. **Carousel**: the root region. Holds the Embla instance and handles arrow keys.
2. **CarouselContent**: the clipping viewport and the track of slides. Slides are spaced `--spacing-md` apart.
3. **CarouselItem**: one slide. `basis` sets how much of the viewport it takes.
4. **CarouselPrevious** and **CarouselNext**: round ghost icon [Buttons](./button.md) with arrow icons, positioned outside the viewport's edges (above and below for vertical carousels).

## 4. Variants

| Orientation | Use for |
| --- | --- |
| `horizontal` (default) | Almost every carousel. Slides move left and right. |
| `vertical` | A narrow column of stacked items, such as a side rail. Needs `viewportHeight` on CarouselContent. |

<!-- REVIEW: "Use for" drafted; source describes the axis only. -->

## 5. Sizes

Carousel has no size prop. It fills its parent's width. CarouselItem `basis` sets slides per view:

| Basis | Use in |
| --- | --- |
| `full` (default) | One slide at a time: screenshots, hero images. |
| `half` | Two at a time: testimonials, larger cards. |
| `third` | Three at a time: product or template cards. |

<!-- REVIEW: "Use in" drafted; stories show third for multiple items and half for the vertical example. -->

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Default | Slides with both controls shown | |
| At first or last slide | The control for that direction is disabled (50% opacity) | Unless `opts={{ loop: true }}`. If the focused control becomes disabled, focus is lost. <!-- REVIEW: not in the fix plan; disabled buttons drop focus to the page. --> |
| Hover | Controls take the ghost Button hover | |
| Focus | Controls show the Button focus outline | Never remove or restyle the focus ring. |
| Dragging | Slides follow the pointer and snap on release | Embla handles this. |

## 7. Content guidelines

- Keep slides parallel: same component, same parts, similar length.
- Make each slide make sense on its own; users may never see the others.
- Put the most important slide first.
- Label the carousel with what it holds ("Product screenshots") and each slide with its position ("2 of 5").

| Do | Don't |
| --- | --- |
| `aria-label="Customer stories"` | No label |
| `aria-label="2 of 5"` on a slide | `aria-label="Slide"` |

<!-- REVIEW: content guidance drafted; source gives no copy rules. -->

## 8. Rules

1. Give Carousel an `aria-label`. It renders a `region` that needs a name.
2. Give each CarouselItem an `aria-label` with its position, such as "2 of 5".
3. Leave room for the controls: they sit outside the viewport, `--size-xl` plus `--spacing-md` past each edge. Pad the wrapper with at least `--size-2xl` on those sides. <!-- REVIEW: the stories use a --size-xl margin, which is slightly short of the control offset; --size-2xl is drafted. -->
4. Don't pass `onClick` or `disabled` to CarouselPrevious or CarouselNext; your props replace the scroll handler and the end-of-track state.
5. Set `viewportHeight` on CarouselContent for vertical carousels, with a size token string such as `"var(--size-4xl)"`.
6. Don't autoplay. If you add an autoplay plugin, add a visible pause control and stop on hover and focus. <!-- REVIEW: drafted; source passes plugins through and offers no pause control. -->
7. Don't put text inputs inside slides; the carousel captures Arrow Left and Arrow Right from anything inside it.
8. Never pass `className` or `style`; they're dropped. Size the carousel with a wrapper.

## 9. Dos and don'ts

**Do:** label the carousel and its slides, and leave room for the controls.

```tsx
<div style={{ paddingInline: "var(--size-2xl)" }}>
  <Carousel aria-label="Product screenshots">
    <CarouselContent>
      {shots.map((shot, i) => (
        <CarouselItem key={shot.id} aria-label={`${i + 1} of ${shots.length}`}>
          <Image src={shot.src} alt={shot.alt} />
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</div>
```

**Don't:** leave it unnamed in a tight container, or override the controls.

```tsx
<div style={{ overflow: "hidden" }}>
  <Carousel>
    <CarouselContent>{slides}</CarouselContent>
    <CarouselPrevious onClick={() => track("prev")} />
    <CarouselNext />
  </Carousel>
</div>
```

**Do:** use a grid when everything should be visible.

```tsx
<div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "var(--spacing-lg)" }}>
  {plans.map((plan) => (
    <Card key={plan.id}>{/* … */}</Card>
  ))}
</div>
```

**Don't:** hide three pricing plans in a carousel.

```tsx
<Carousel>
  <CarouselContent>
    {plans.map((plan) => (
      <CarouselItem key={plan.id}><Card>{/* … */}</Card></CarouselItem>
    ))}
  </CarouselContent>
</Carousel>
```

## 10. Accessibility

- Role: Carousel is a `region` with `aria-roledescription="carousel"`; each CarouselItem is a `group` with `aria-roledescription="slide"`.
- Label: pass `aria-label` to Carousel and to each CarouselItem; neither has a default. The controls are named "Previous slide" and "Next slide" with visually hidden text.
- Keyboard: Tab reaches the controls and any interactive slide content. While focus is anywhere inside the carousel, Arrow Left and Arrow Right move to the previous and next slide, in vertical carousels too. <!-- REVIEW: not in the fix plan; vertical carousels still use Left/Right, and the handler captures arrows from inputs inside slides. -->
- Focus: stays where it is when slides move. Off-screen slides stay in the Tab order, so links in hidden slides can receive focus. <!-- REVIEW: not in the fix plan; nothing marks off-screen slides inert. -->
- Focus ring: the controls use Button's outline, which currently measures below 3:1; don't patch it per carousel. <!-- REVIEW: system-wide focus-ring contrast issue W1, see foundations/colour.md. -->
- Contrast: handled by the theme. Don't override colours.

## 11. Behaviour

- Responsive: fills its parent's width; `basis` is a fraction of that width, so slides shrink with it. Change `basis` at small widths in your own code if three slides get too narrow.
- Overflow and truncation: the viewport clips off-screen slides. Slide content isn't truncated.
- Motion: Embla animates snapping and drag. Eluan adds no reduced-motion handling; pass Embla's `duration` option if you need faster scrolling. <!-- REVIEW: reduced-motion behaviour is not handled in source. -->
- Looping and alignment: pass Embla options through `opts`, for example `opts={{ loop: true, align: "start" }}`. Orientation always comes from `orientation`, not `opts.axis`.
- Counters and custom controls: use `setApi` to get the Embla API, then read `api.selectedScrollSnap()` and `api.scrollSnapList()` and listen for `"select"`.

## 12. API

<!-- api:start -->
### Carousel

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Scroll axis. |
| `opts` | `CarouselOptions` | | Passed to Embla: `loop`, `align`, `dragFree`, `startIndex`, `duration`. `axis` is overridden by `orientation`. |
| `plugins` | `CarouselPlugin` | | Passed to Embla. |
| `setApi` | `(api: CarouselApi) => void` | | Receives the Embla API for counters and custom controls. |
| `aria-label` | `string` | | Names the carousel region. |
| `...props` | `HTMLAttributes<HTMLDivElement>` without `className`, `style` | | Native div attributes on the root. |

### CarouselContent

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `viewportHeight` | `number \| string` | | Fixed viewport height. Required for vertical carousels; pass a size token string. |
| `...props` | `HTMLAttributes<HTMLDivElement>` without `className`, `style` | | Applied to the slide track. |

### CarouselItem

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `basis` | `"full" \| "half" \| "third"` | `"full"` | Share of the viewport each slide takes. |
| `aria-label` | `string` | | The slide's position, such as "2 of 5". |
| `...props` | `HTMLAttributes<HTMLDivElement>` without `className`, `style` | | Native div attributes. |

### CarouselPrevious, CarouselNext

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `aria-label` | `string` | | Replaces the built-in "Previous slide" / "Next slide" name, for example when translating. |
| `...props` | `ButtonHTMLAttributes` without `className`, `style` | | Spread last onto the Button, so `onClick` and `disabled` replace the built-in behaviour. Don't pass them. |
<!-- api:end -->

`CarouselApi` and `CarouselProps` are exported as types.

## 13. Examples

Customer stories, two per view, with a slide counter.

```tsx
import * as React from "react";
import {
  Card,
  CardContent,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Typography,
  type CarouselApi,
} from "@eluan/core";

const stories = [
  { id: "northwind", quote: "We moved our whole dashboard over in a week.", person: "Priya Raman, Northwind" },
  { id: "lumen", quote: "Dark mode came for free once the theme was set.", person: "Tomás Ortega, Lumen Health" },
  { id: "harbor", quote: "Designers and engineers finally use the same names.", person: "Grace Kim, Harbor" },
  { id: "fieldnote", quote: "Our forms passed the accessibility audit first time.", person: "Daniel Mensah, Fieldnote" },
];

export function CustomerStories() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(1);

  React.useEffect(() => {
    if (!api) return;
    const update = () => setCurrent(api.selectedScrollSnap() + 1);
    update();
    api.on("select", update);
    return () => {
      api.off("select", update);
    };
  }, [api]);

  return (
    <section style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-md)" }}>
      <Typography variant="heading" as="h2">What teams say</Typography>
      <div style={{ paddingInline: "var(--size-2xl)" }}>
        <Carousel aria-label="Customer stories" setApi={setApi} opts={{ align: "start" }}>
          <CarouselContent>
            {stories.map((story, i) => (
              <CarouselItem key={story.id} basis="half" aria-label={`${i + 1} of ${stories.length}`}>
                <Card elevation="none">
                  <CardContent>
                    <figure style={{ margin: 0, paddingTop: "var(--spacing-2xl)", display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
                      <Typography variant="lead" as="blockquote">“{story.quote}”</Typography>
                      <Typography variant="caption" tone="muted" as="figcaption">{story.person}</Typography>
                    </figure>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <Typography variant="caption" tone="muted" align="center" aria-live="polite">
        Story {current} of {stories.length}
      </Typography>
    </section>
  );
}
```

## 14. Related components

- [Card](./card.md): the usual slide content, or a grid when everything should show.
- [Button](./button.md): the previous and next controls.
- [Media](./media.md): images inside slides.
- [Tabs](./tabs.md): switching views instead of paging through slides.

## 15. Common agent mistakes

_Filled from evals._
