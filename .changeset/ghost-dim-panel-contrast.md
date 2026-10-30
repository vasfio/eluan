---
"@eluan/tokens": patch
"@eluan/theme-generator": minor
---

Ghost button text clears 4.5:1 on panels in dim mode.

In `minimal`, `--action-tertiary-fg` (Ghost and Toast cancel text) is now
declared per mode in modes.css: `--mono-background` in light and dark as before,
`--foregrounds-tertiary` (teak-800) in dim instead of teak-700, which was 4.36:1
on the panel ground. It's now 6.79:1 on the page and 6.19:1 on the panel.

In the theme generator, a semantic entry's `contrastAgainst` can list several
grounds, and the hardest decides. `action-tertiary-fg` is checked against both
`action-tertiary-bg` and `action-tertiary-bg-alt`, so in generated themes dim
Ghost text moves one step deeper (3.95–4.46:1 on the panel before, 5.57–6.31:1
now). `contrastAgainst` in `semantic.json` can therefore be an array;
`contrastGrounds()` reads it as a list. Light and dark output are unchanged at
the default floor.
