---
"@eluan/core": minor
---

Layout primitives: `Stack`, `Row`, `Grid`, `Box`, `Icon` and `VisuallyHidden`.

Apps can now lay out whole pages from Eluan tokens alone, with no utility
framework and no hand-written spacing. `gap` and `pad` / `padX` / `padY` take
`--spacing-*` token names (`"none"` to `"4xl"`), and `Icon` sizes an svg child
to a `--size-*` token, so switching `data-spacing` re-flows the layout along
with the components. `Grid` takes a column count (1–12), a raw
`grid-template-columns` value, or both per breakpoint, keyed by Eluan's
breakpoint names: `cols={{ base: 1, m: 2, l: 4 }}`. Like every Eluan component
they take `as` and `asChild` and no `className` or `style`. Nothing existing
changes.
