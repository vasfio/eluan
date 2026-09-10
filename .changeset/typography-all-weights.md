---
"@eluan/core": minor
"@eluan/tokens": minor
---

Real font weights across the whole range.

`@eluan/tokens` now loads Inter as a variable font (`@fontsource-variable/inter`,
wght 100–900) instead of the two static 400/500 faces, and the `minimal` theme's
`--font-heading` / `--font-body` stacks lead with `"Inter Variable"`. Because the
axis is continuous, the latin subset costs roughly the same as the two static
faces it replaces.

`Typography` exposes the full range: `weight` now accepts `thin` (100),
`extralight` (200), `light` (300), `normal` (400), `medium` (500), `semibold`
(600), `bold` (700), `extrabold` (800) and `black` (900) — every one a real face
rather than a browser-synthesized fake. Per-variant defaults are unchanged, so
existing type keeps rendering exactly as before.
