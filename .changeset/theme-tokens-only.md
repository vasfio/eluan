---
"@eluan/core": patch
---

Components read theme tokens only, never the mode layer's grey aliases
(`--backgrounds-*`, `--foregrounds-*`). Card's description uses
`--interactive-fg-alt` (as Dialog and Sheet do), the Progress track
`--container-border`, Calendar's month divider `--container-border-alt`, the
SegmentedControl track `--interactive-bg-alt`, and Button's Ghost-family and
input hovers `--interactive-bg-hover`. Faded and danger Ghost text use
`--container-fg-alt`, hovering to `--container-fg`, like muted Ghost. In
`minimal` every swap resolves to the same colour in every mode, so nothing
changes on screen; custom themes now restyle these through the theme tokens
they already set.
