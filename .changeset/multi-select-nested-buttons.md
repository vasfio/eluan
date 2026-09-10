---
"@eluan/core": patch
---

Fix invalid nested-button markup in MultiSelect. The trigger rendered chip
remove and clear-all `<button>`s inside a `<button>` trigger — invalid HTML
that broke React hydration in SSR apps. The trigger is now a
`div[role="combobox"]` with keyboard handling (Enter/Space toggles,
ArrowDown opens), matching FileInput's dropzone pattern. The forwarded ref
type changed from `HTMLButtonElement` to `HTMLDivElement`.
