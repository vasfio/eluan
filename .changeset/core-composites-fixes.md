---
"@eluan/core": patch
---

Composite component fixes: MultiSelect density, RichText tokens, Sheet motion.

- **MultiSelect**: the chips broke at `data-spacing="compact"`, where
  `--spacing-xxs` resolves to `0`. The gap between tags and the gap between a
  tag's label and its remove button move to `--spacing-xs`, the remove icon
  sizes off `--font-size-xs` so it tracks the chip text, and the clear/backspace
  icon moves to `--size-xxs` so it matches the chevron beside it. The chip's
  hard-coded `calc(var(--font-size-xs) - 0.0625rem)` is now plain
  `--font-size-xs`.
- **MultiSelect**: selected rows in the dropdown show a `Check` at the right
  edge of the option instead of an `X` with its own click handler — clicking
  anywhere on the row already toggles the selection.
- **RichText**: the toolbar padding, the blockquote rule, and the inline `code`
  padding were raw `4px` / `0.125rem` values that ignored spacing density; they
  now read `--spacing-xs` / `--spacing-xxs`. Heading leading comes from
  `--line-height-step-*` instead of literals, so it stays paired with the
  typeset step each heading size lands on.
- **Sheet**: opening and closing now animate. The styles transitioned
  `transform` between `[data-state]` values, but Radix mounts the content
  already in the open state, so nothing ever ran. `stylex.keyframes` per side
  slide the panel in from its anchored edge while fading in, and reverse on
  close; the overlay fades with it. Both are gated on
  `prefers-reduced-motion: reduce`.
