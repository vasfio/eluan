---
"@eluan/core": patch
"@eluan/tokens": patch
"@eluan/theme-generator": patch
---

Visible keyboard focus everywhere, from a new `--focus-ring` token.

Every focus outline read `--interactive-border`, a pale grey that measured
1.26:1 on white and 1.31:1 in dark mode, so keyboard focus was effectively
invisible across the library. A new mode-aware `--focus-ring` token clears 3:1
on every page and panel ground in light, dim and dark, and stays distinct from
the pressed fill. All focus outlines and box-shadow rings now use it; focused
fields darken their border instead of fading it; Badge and MultiSelect remove
buttons gained the focus ring they suppressed; Banner's dismiss button rings
in the banner's text colour. `@eluan/theme-generator` emits `--focus-ring` for
generated themes, contrast-checked at 3:1.
