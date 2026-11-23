---
"@eluan/core": patch
---

`Button` gets more room either side of its label at the small and default
sizes. Side padding moves up one spacing step (`sm` → `md` for `size="sm"`,
`md` → `lg` for the default size), so it grows with the height across the
three sizes and every density instead of jumping at `lg`. The `input` and
`inputMuted` variants keep `--spacing-md`, so DatePicker triggers still line
up with Input and Select.
