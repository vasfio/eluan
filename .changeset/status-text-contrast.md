---
"@eluan/core": patch
"@eluan/tokens": patch
"@eluan/theme-generator": patch
---

Readable destructive and positive text, and visible validation focus rings.

`--destructive-fg` and `--positive-fg` now point one primitive step darker in
light and dim mode, so text on the tinted Banner fill clears 4.5:1 (it was
3.15–3.28:1 in light). `@eluan/theme-generator` checks both tokens against the
tint for generated themes. Input's `validationTone="positive"` and
`"destructive"` focus outlines ring in their tone colour instead of the pale
tint they used before.
