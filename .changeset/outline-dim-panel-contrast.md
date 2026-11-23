---
"@eluan/tokens": patch
"@eluan/theme-generator": patch
---

Outline button text clears 4.5:1 on panels in dim mode, the same fix Ghost text
got.

In `minimal`, `--action-secondary-fg` moves to modes.css beside
`--action-tertiary-fg`: `--mono-background` in light and dark as before,
`--foregrounds-tertiary` (teak-800) in dim instead of teak-700 (4.36:1 on the
panel before, 6.19:1 now). The Outline border keeps teak-700.

The theme generator checks `action-secondary-fg` against both `container-bg`
and `container-bg-alt`, so in generated themes dim Outline text moves one step
deeper (3.95–4.47:1 on the panel before, 5.57–6.31:1 now). Light and dark
output are unchanged at the default floor.
