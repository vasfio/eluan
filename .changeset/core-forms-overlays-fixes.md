---
"@eluan/core": patch
"@eluan/tokens": patch
"@eluan/theme-generator": patch
---

Form and overlay polish.

- **Fieldset**: `FieldsetLegend` now sits one typeset step above `Label`
  (`--font-size-base` instead of `--font-size-sm`), and its trailing margin drops
  from `--spacing-lg` to `--spacing-xs` so a `FieldsetDescription` follows the
  legend instead of floating between it and the field group.
- **InputOTP**: focus now matches `Input` — a 1px `--interactive-border` outline
  at `1px` offset plus a matching border colour, replacing the doubled
  box-shadow ring. `InputOTPSlot`'s active state uses the same treatment, so both
  the default and slot variants read as a focused `Input`.
- **Tooltip**: new mode-aware `--tooltip-bg` token. Light and dim resolve to
  `--backgrounds-primary` (unchanged); dark resolves to `--backgrounds-tertiary`,
  the same value `--container-border` carries, so the tooltip's border disappears
  against its own background instead of ringing it. `@eluan/theme-generator`
  emits the token for generated themes.
- **TreeView**: leaf rows render an aria-hidden spacer the width of the chevron,
  so icons at the same depth share a column. Indentation is token-based —
  `calc(var(--size-xxs) + var(--spacing-sm))` per level over a `--spacing-sm`
  base — which keeps a child's icon under its parent's label at every spacing
  density. `indentSize` still overrides it with raw px when passed explicitly.
- **SearchInput**: grouped autocomplete headings are no longer uppercase and drop
  the tracking that went with the caps; groups after the first gain a
  `--spacing-xs` top margin to separate them from the group above.
