---
"@eluan/core": patch
---

Give nested "pill in a track" components an even inset on every density.

`Tabs`, `SegmentedControl`, `Menubar` and `DropdownMenu` now follow one rule: the
track's padding is the inset, uniform on all four sides; the inner element fills
the track's inner box; and the inner radius is derived as
`calc(var(--curves-md) - var(--spacing-xs))` so the corners nest on every
curves × spacing combination.

The track padding moved from `--spacing-xxs` (which collapses to `0` in compact,
letting active segments and menu items sit flush against the track border) to
`--spacing-xs`. `TabsList` and the `Menubar` root also drop their `minHeight` and
stretch their children, so the trigger's own padding — not a fixed `--size-lg` —
defines the height; previously a 32px track held a 22.6px trigger, giving a 4.7px
vertical inset against a 2px horizontal one.

Also fixes `InputOTP`: the digit input flashed a black outline on click because
`transition-property: all` animated the outline from the browser's default focus
ring to the 1px token ring. It now transitions the same explicit list `Input`
uses, `color, background-color, border-color`.
