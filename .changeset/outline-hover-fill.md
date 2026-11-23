---
"@eluan/tokens": patch
---

Outline and Dashed button hover is visible in every mode. In `minimal`,
`--action-secondary-bg-hover` pointed at `--mono-tint`, which matched the
panel in light and the page in dim, so hovering changed nothing. It now points
at `--backgrounds-tertiary`, the fill Ghost hovers to.
