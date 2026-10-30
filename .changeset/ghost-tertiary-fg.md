---
"@eluan/core": patch
---

Button's `ghost` variant reads `--action-tertiary-fg` (and
`--action-tertiary-fg-alt` on hover) instead of `--foregrounds-secondary` and
`--foregrounds-primary`, so custom and generated themes colour it like the rest
of their tertiary actions. In `minimal` the hover colour is unchanged and the
resting colour moves to `--mono-background`: near-black in light, near-white in
dark, teak-700 in dim.
