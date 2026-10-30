---
"@eluan/theme-generator": patch
---

Contrast corrections move a foreground to the nearest step that passes instead
of the end of its ramp. Brand-coloured action text (`action-secondary-fg`, the
Outline button label, and `action-tertiary-fg`, the Ghost label and Toast's
cancel action) used to jump from `primary.500` to `primary.950` in light mode,
about 17:1 and effectively black; it now lands on `primary.600` (5.3–6.2:1
across tested accents) and keeps the brand colour. At the default 4.5 floor
nothing else changes; at stricter floors other corrected tokens also stop at
the nearest passing step.
