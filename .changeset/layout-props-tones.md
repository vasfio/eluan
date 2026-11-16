---
"@eluan/core": minor
---

Layout props for size, overlays and overflow, and more text tones.

- `Box`, `Stack`, `Row` and `Grid` take:
  - `shrink`: `shrink={false}` holds an element at its content size in a flex parent.
  - `height` and `minHeight`: `"full"` (the parent's height) or `"screen"` (the viewport's, `100dvh`).
  - `position`: `"relative"` for an anchor, or `"absolute"`.
  - `inset`: `"fill"`, `"top"` or `"bottom"` pins an overlay to its anchor and positions it absolutely.
  - `overflow`: `"hidden"` or `"auto"`.
- `Typography` `tone` gains `"positive"` and `"destructive"` for status text (`--positive-fg`, `--destructive-fg`), and `"interactive"` and `"interactive-muted"` for text on a control you build yourself (`--interactive-fg`, `--interactive-fg-alt`).
- `Icon` takes `tone`, with the same values as Typography. It defaults to `"inherit"`, so existing icons keep the text colour around them.

Nothing existing changes.
