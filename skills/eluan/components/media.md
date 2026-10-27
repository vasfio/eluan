---
name: Media
use_when: You show a content image or a video and want a ratio preset, token-rounded corners, a loading state or simple playback controls.
instead_of: Avatar for profile pictures; AspectRatio for embeds and custom ratios; Carousel for a slideshow; Skeleton before you have a source.
source: packages/core/src/components/media.tsx
---

# Media

## 1. Overview

The media module ships two components, `Image` and `Video`. There is no `Media` export: import `Image` and `Video` from `"@eluan/core"`. Both render a clipped frame with a ratio preset and a `--curves-*` radius, and fill their container's width. Image adds a loading spinner and an optional fallback for failed loads. Video adds an overlay with play/pause, mute and fullscreen buttons.

## 2. When to use

- Content images: article and case-study images, product shots, screenshots, card thumbnails.
- Images that should crop to one shape across a grid (`ratio="square"` or `"video"`).
- A product demo or tutorial video that needs simple playback controls.

### When not to use

- Profile pictures or initials → use [Avatar](./avatar.md).
- Icons → use `lucide-react`; see [iconography](../foundations/iconography.md).
- A map, iframe embed, or a ratio outside the presets → use [AspectRatio](./aspect-ratio.md).
- Several images to step through → use [Carousel](./carousel.md).
- A placeholder before you have a source → use [Skeleton](./skeleton.md).

## 3. Anatomy

**Image**

1. **Frame**: a `<div>` that clips its content and applies `ratio` and `rounded`.
2. **Loading overlay**: covers the frame in `--container-bg-alt` with a spinning icon until the image loads. It's a `role="status"` element labelled "Loading image".
3. **Image element**: the native `<img>`. It fills the frame with `object-fit: cover`. `ref` points here.
4. **Fallback** (optional): your node, centred on `--container-bg-alt`, shown in place of the image when it fails to load.

**Video**

1. **Frame**: the same clipping frame, `ratio="video"` (16:9) by default.
2. **Video element**: the native `<video>`, filling the frame with `object-fit: cover`. `ref` points here; children (`<source>`, `<track>`) render inside it.
3. **Controls overlay** (when `showControls`): a dark gradient along the bottom holding a progress bar (display only) and a row of buttons: Play/Pause, Mute/Unmute and, at the far end, Toggle fullscreen.

## 4. Variants

Media has no `variant` prop. `ratio` and `rounded` set the look.

| `ratio` | Use for |
| --- | --- |
| `auto` | Image's default. The frame follows the image's own proportions, so nothing is cropped. Use for charts and screenshots with text. |
| `square` | 1:1. Thumbnail grids and product tiles. |
| `video` | 16:9. Video's default; hero images and wide screenshots. |
| `portrait` | 3:4. Photos of people, posters, covers. |
| `wide` | 21:9. Banners. |

| `rounded` | Radius |
| --- | --- |
| `none` | Square corners. |
| `sm` | `--curves-sm` |
| `md` | `--curves-md` (default) |
| `lg` | `--curves-lg` |
| `xl` | `--curves-xl` |
| `full` | `--radius-radius-full`: a circle with `ratio="square"`, a pill otherwise. |

<!-- REVIEW: "Use for" text for each ratio is drafted; source only defines the ratios. -->

## 5. Sizes

Media has no size prop. Image and Video fill their container's width; height comes from `ratio` (or from the image itself with `auto`). Constrain width with a wrapper you own. The `width` and `height` attributes don't change the rendered size, because the media element is styled to fill its frame.

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Loading (Image) | Frame filled with `--container-bg-alt` and a spinning icon | Clears on the image's `load` event. |
| Loaded (Image) | The image, cropped to the frame by `object-fit: cover` | |
| Error, with `fallback` (Image) | Your fallback, centred on `--container-bg-alt`, in the same frame | |
| Error, no `fallback` (Image) | The loading spinner never clears | Always pass `fallback`. <!-- REVIEW: source bug, not in the fix plan. onError sets the error flag, but the overlay is only removed by onLoad, and the error branch only renders when a fallback exists. --> |
| Controls hidden (Video) | Overlay at zero opacity | Shows while the pointer is over the frame or focus is inside it. |
| Hover (Video buttons) | Translucent white circle behind the icon | |
| Focus (Video buttons) | 1px ring in `--container-fg-inverse` | Never remove or restyle the focus ring. |
| Playing / paused (Video) | Pause or Play icon; the label switches to match | |
| Muted (Video) | Crossed-out speaker icon, label "Unmute" | Starts as "Mute" even when you pass `muted`. <!-- REVIEW: source oddity, not in the fix plan. Video's mute state starts at false and never reads the `muted` prop or the element's volume events. --> |

## 7. Content guidelines

- Write alt text that says what the image shows and why it's there, in one sentence.
- Don't start with "Image of" or "Photo of", and never use the file name.
- Use `alt=""` for decorative images and for images the adjacent text already describes.
- Keep fallback text short and plain: "Image unavailable".
- Give any video with speech a captions track (`<track kind="captions">`) and a `poster` frame.

| Do | Don't |
| --- | --- |
| Weekly revenue chart, up 12% since June | Chart |
| Priya Raman presenting the Q3 roadmap | IMG_2041.jpg |
| `alt=""` on a background texture | Decorative swirly pattern image |

<!-- REVIEW: alt text and caption guidance drafted from general accessibility practice; source only shows `alt` in examples. -->

## 8. Rules

1. Always pass `alt` to Image. The types make it optional and nothing enforces it.
2. Always pass `fallback` to Image; without it a failed load shows a spinner forever.
3. Use `ratio="auto"` when the whole image must stay visible. Every other preset crops with `object-fit: cover`.
4. Size Image and Video with a wrapper you own. They drop `className` and `style`.
5. Nest radii: inside a Card (`--curves-lg`) use `rounded="md"` or smaller.
6. Don't pass the native `controls` attribute while `showControls` is on; you'd get two sets of controls. Pick one.
7. If a Video autoplays and loops, keep a pause control: leave `showControls` on. See [motion](../foundations/motion.md). <!-- REVIEW: the docs site suggests `showControls={false}` for autoplay/loop banner video, which conflicts with motion.md rule 5. -->
8. `Image` shadows the browser's global `Image` constructor and clashes with framework image components. Alias it when that matters: `import { Image as MediaImage } from "@eluan/core"`. <!-- REVIEW: drafted; no source guidance on the name clash. -->
9. Don't call `mediaVariants`. It always returns an empty string.

## 9. Dos and don'ts

**Do:** pass alt text, a fallback and a ratio.

```tsx
<Image
  src="/screens/orders-dashboard.png"
  alt="Orders dashboard showing 12 open orders and one late shipment"
  ratio="video"
  fallback={<Typography variant="caption" tone="muted">Image unavailable</Typography>}
/>
```

**Don't:** leave out alt text, rely on the spinner, or style the component.

```tsx
<Image src="/screens/orders-dashboard.png" style={{ borderRadius: 12, height: 240 }} />
```

**Do:** give a video captions and a poster, and keep Video's controls.

```tsx
<Video src="/media/onboarding-tour.mp4" poster="/media/onboarding-tour.jpg" preload="metadata">
  <track kind="captions" src="/media/onboarding-tour.en.vtt" srcLang="en" label="English" default />
</Video>
```

**Don't:** stack native controls on top, or loop motion with no way to pause it.

```tsx
<Video src="/media/onboarding-tour.mp4" controls />
<Video src="/media/hero-loop.mp4" autoPlay muted loop showControls={false} />
```

## 10. Accessibility

- Role: Image renders a native `<img>` (role `img`; `alt=""` makes it presentational). Its loading overlay is `role="status"`, labelled "Loading image". Video renders a native `<video>`; its controls are native `<button type="button">` elements.
- Label: Image gets its name from `alt`. Video's buttons have built-in English labels: "Play" or "Pause", "Mute" or "Unmute", and "Toggle fullscreen". Name the video itself with a visible heading or caption nearby.
- Keyboard: Tab reaches the three control buttons, even while the overlay is hidden; focusing one shows the overlay. Enter and Space activate. There are no seek or volume keys, and the progress bar is display-only.
- Focus: focus inside the frame shows the controls; nothing is trapped.
- Captions: Video has no captions button. A `<track kind="captions" default>` child shows captions through the browser. <!-- REVIEW: drafted; source doesn't mention captions. -->
- Contrast: handled by the theme. Don't override colours. Video's icons, progress fill and focus ring use `--container-fg-inverse` over a fixed dark gradient; in dark mode that token is dark, so the controls nearly disappear. Where dark mode matters, use `showControls={false}` with the native `controls` attribute. <!-- REVIEW: source bug, not in the fix plan. The overlay gradient is a fixed rgb(0 0 0 / 0.6) while --container-fg-inverse flips to a dark grey in dark mode. -->

## 11. Behaviour

- Responsive: both fill their container's width. Ratio presets keep their shape at any width; `auto` follows the image.
- Overflow and truncation: presets crop the image's edges (`object-fit: cover`). There's no setting for `contain`; use `ratio="auto"` instead.
- Motion: Image's spinner turns once a second and stops under reduced motion. Video's overlay fades over 150ms, and the progress bar eases its width. Don't add your own.
- Fullscreen: the fullscreen button toggles the browser's fullscreen mode on the `<video>` element.
- Native attributes pass through: `loading="lazy"`, `srcSet` and `sizes` on Image; `autoPlay`, `muted`, `loop`, `playsInline` and `preload` on Video.

## 12. API

<!-- api:start -->
### Image

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `src` | `string` | | Image URL. |
| `alt` | `string` | | Accessible name. Optional in the types; always pass it (`""` for decorative). |
| `ratio` | `"auto" \| "square" \| "video" \| "portrait" \| "wide"` | `"auto"` | Frame aspect ratio. Presets crop with `object-fit: cover`. |
| `rounded` | `"none" \| "sm" \| "md" \| "lg" \| "xl" \| "full"` | `"md"` | Corner radius from `--curves-*`. |
| `fallback` | `ReactNode` | | Shown in place of the image when it fails to load. |
| `onLoad` | `ReactEventHandler<HTMLImageElement>` | | Called when the image loads; Image also clears its loading overlay. |
| `onError` | `ReactEventHandler<HTMLImageElement>` | | Called when the image fails; Image also switches to `fallback` if you passed one. |
| `...props` | `ImgHTMLAttributes` without `className`, `style` | | Native img attributes: `loading`, `decoding`, `srcSet`, `sizes`. `ref` points to the `<img>`. |

### Video

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `src` | `string` | | Video URL, or use `<source>` children. |
| `ratio` | `"auto" \| "square" \| "video" \| "portrait" \| "wide"` | `"video"` | Frame aspect ratio. |
| `rounded` | `"none" \| "sm" \| "md" \| "lg" \| "xl" \| "full"` | `"md"` | Corner radius from `--curves-*`. |
| `showControls` | `boolean` | `true` | Shows the play/pause, mute and fullscreen overlay. |
| `poster` | `string` | | Frame shown before playback. |
| `children` | `ReactNode` | | `<source>` and `<track>` elements. |
| `onPlay`, `onPause`, `onTimeUpdate` | `ReactEventHandler<HTMLVideoElement>` | | Your handlers; Video also updates its own play state and progress bar. |
| `...props` | `VideoHTMLAttributes` without `className`, `style` | | Native video attributes: `autoPlay`, `muted`, `loop`, `playsInline`, `preload`. `ref` points to the `<video>`. |

### mediaVariants

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `mediaVariants(options?)` | `(options?: { ratio?, rounded? }) => string` | | Always returns `""`. Kept for compatibility; don't use it. |
<!-- api:end -->

## 13. Examples

```tsx
import { Image, Typography, Video } from "@eluan/core";

export function CaseStudyMedia() {
  return (
    <article style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-2xl)" }}>
      <figure style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)", margin: 0 }}>
        <Image
          src="/case-studies/northwind/dock-board.jpg"
          alt="Dock board grouping today's 38 outbound orders by loading bay"
          ratio="video"
          rounded="lg"
          loading="lazy"
          fallback={<Typography variant="caption" tone="muted">Image unavailable</Typography>}
        />
        <Typography as="figcaption" variant="caption" tone="muted">
          Northwind's dock board after the redesign.
        </Typography>
      </figure>

      <section style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
        <Typography variant="subheading" as="h2">Two-minute walkthrough</Typography>
        <Video
          src="/case-studies/northwind/walkthrough.mp4"
          poster="/case-studies/northwind/walkthrough.jpg"
          preload="metadata"
          rounded="lg"
        >
          <track kind="captions" src="/case-studies/northwind/walkthrough.en.vtt" srcLang="en" label="English" default />
        </Video>
      </section>
    </article>
  );
}
```

## 14. Related components

- [AspectRatio](./aspect-ratio.md): locks any content you own, including iframes, to a custom ratio.
- [Avatar](./avatar.md): profile pictures, with `AvatarFallback` for initials.
- [Card](./card.md): pairs a thumbnail with text.
- [Carousel](./carousel.md): a row of slides.
- [Skeleton](./skeleton.md): a placeholder while you fetch the source.
- [Spinner](./spinner.md): the loading indicator for other content.

## 15. Common agent mistakes

_Filled from evals._
