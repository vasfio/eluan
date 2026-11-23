---
"@eluan/tokens": minor
"@eluan/theme-generator": minor
"@eluan/core": patch
---

New `--action-neutral-bg`, `--action-neutral-bg-hover` and `--action-neutral-fg`
theme tokens for the Secondary button, which was the last component reading
the grey aliases directly. `minimal` points them at `--backgrounds-tertiary`,
`--backgrounds-quaternary` and `--foregrounds-primary`, so the button looks the
same. Generated themes set them on the same steps and check the text against
both fills; at a 7:1 floor that moves dim Secondary text to black, since the
hover fill only reached 6.55:1 before.
