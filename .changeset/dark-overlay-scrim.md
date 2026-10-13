---
"@eluan/core": patch
"@eluan/tokens": patch
"@eluan/theme-generator": patch
---

Dark scrim behind Dialog and Sheet in dark mode.

The Dialog and Sheet overlays painted `--container-fg` at 0.8 opacity. That
token is near-white in dark mode, so opening a dialog washed the page out light
behind a dark panel. Both overlays now read a new mode-aware `--overlay-bg`
token: light and dim keep `--foregrounds-primary` (unchanged), and dark resolves
to `--backgrounds-tertiary`, the darkest step of the neutral ramp.
`@eluan/theme-generator` emits the token for generated themes (`neutral.950` in
both modes).
