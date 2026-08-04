---
"@eluan/tokens": minor
"@eluan/core": patch
---

Add sizing primitives, author colour primitives in OKLCH, and drop the private `--tabs-*` token family.

**Sizing primitives (`@eluan/tokens`)**

The density-scaled `--size-*` tokens used to alias the spacing scale
(`--size-md: var(--spacing-space-24)`), so component dimensions and layout
spacing shared one set of primitives. `primitives.css` now carries numeric
sizing steps alongside the existing t-shirt scale — `--sizing-size-12` through
`--sizing-size-240` — and every `--size-*` token in the `compact`, `standard`,
and `wide` blocks resolves through those instead. Values are unchanged: this is
a pure aliasing refactor with no visual effect. `sizingSteps` is exported from
`@eluan/tokens` for cross-platform parity; the existing `sizing` export (the
t-shirt scale, a different set of values) is untouched.

**Colour primitives are now OKLCH**

All 233 colour primitives are declared as `oklch()` with the sRGB hex they were
derived from kept as a trailing comment. Every value round-trips to its original
hex (max deviation 0.47/255, and all 233 re-quantise to the identical 8-bit
colour), so rendered colour is unchanged. The `concrete` ramp, already in OKLCH,
was renormalised to the file-wide number format (lightness 4dp as a 0–1 number,
chroma 4dp, hue 2dp) — same colours. `primitiveColors` in the JS export stays
hex for cross-platform consumers.

**Breaking: the `--tabs-*` tokens are gone**

`Tabs` was the only component with a private token family. `[data-theme="minimal"]`
no longer defines `--tabs-list-bg`, `--tabs-list-shadow`, `--tabs-list-radius`,
`--tabs-list-padding`, `--tabs-list-gap`, `--tabs-trigger-radius`,
`--tabs-trigger-fg`, `--tabs-trigger-hover-fg`, `--tabs-trigger-selected-bg`,
`--tabs-trigger-selected-fg`, `--tabs-trigger-selected-surface`, or
`--tabs-trigger-selected-shadow`. The component reads the generic semantic
tokens directly (`--interactive-bg-alt`, `--interactive-fg-alt`,
`--interactive-fg`, `--container-bg`, `--curves-md`, `--curves-sm`,
`--spacing-xs`), matching how every other component is styled. The rendered
appearance in `minimal` is identical.

**Migration** — a custom theme that overrode any `--tabs-*` token silently loses
that override. `Tabs` now follows the semantic tokens it shares with the rest of
the system, so retheming it means moving those (`--interactive-bg-alt` for the
track, `--container-bg` for the active cap, `--curves-*` for the corners). Tab
styling that cannot be expressed through the shared semantics is no longer
themeable from tokens alone.
