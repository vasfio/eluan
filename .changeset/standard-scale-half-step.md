---
"@eluan/tokens": minor
"@eluan/core": patch
---

Re-cut the `standard` spacing/sizing scale onto half-step rungs.

`standard` was built from the same coarse primitive rungs as `compact` and
`wide`, one notch up from compact — close enough that the two densities read
almost alike. Both families gain the intermediate rungs the scale was missing,
and `standard` moves onto them so it now lands visibly between the other two
densities instead of hugging compact.

**New primitives** (`primitives.css`, inserted in numeric order):

- Spacing: `--spacing-space-6` (0.375rem), `-10` (0.625rem), `-14` (0.875rem),
  `-18` (1.125rem).
- Sizing: `--sizing-size-14` (0.875rem), `-18` (1.125rem), `-22` (1.375rem),
  `-28` (1.75rem), `-36` (2.25rem), `-44` (2.75rem).

**New `standard` values** (`compact` and `wide` are unchanged, as are the
`--font-size-*` typeset-step mappings in every density):

| Token | before | after | | Token | before | after |
|---|---|---|---|---|---|---|
| `--spacing-xxs` | 2 | 2 | | `--size-xxs` | 16 | 14 |
| `--spacing-xs` | 4 | 4 | | `--size-xs` | 20 | 18 |
| `--spacing-sm` | 8 | 6 | | `--size-sm` | 24 | 22 |
| `--spacing-md` | 12 | 10 | | `--size-md` | 32 | 28 |
| `--spacing-lg` | 16 | 14 | | `--size-lg` | 40 | 36 |
| `--spacing-xl` | 20 | 18 | | `--size-xl` | 48 | 44 |
| `--spacing-2xl` | 24 | 20 | | `--size-2xl` | 64 | 56 |
| `--spacing-3xl` | 40 | 32 | | `--size-3xl` | 96 | 80 |
| `--spacing-4xl` | 80 | 64 | | `--size-4xl` | 160 | 120 |

**Menubar and Tabs**: both had wider inline padding than block padding around
their items, which read as a squashed pill at every density (2px by 4px in
compact). The Menubar trigger, item, indicator item and label, and the Tabs
trigger, now pad equally on both axes from `--spacing-sm`; the indicator and
inset items keep their extra left offset for the check/radio slot. The Menubar
root's fixed `height: var(--size-lg)` becomes `minHeight` — with even padding
the trigger is taller than the fixed track in `wide`, and was being clipped.
