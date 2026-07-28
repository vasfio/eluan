---
"@eluan/tokens": minor
---

Remove the `industrial-retro` theme. `minimal` is now the only built-in theme — everything else is a consumer theme built with `createTheme()` from `@eluan/core` or generated with `@eluan/theme-generator`.

**Breaking changes**

- The `[data-theme="industrial-retro"]` block is gone from `themes.css`. `data-theme="industrial-retro"` no longer resolves any tokens.
- `themes` is now `["minimal"]`, and the `Theme` type narrows to `"minimal"`. `themeFonts` and `themeNeutrals` no longer carry an `industrial-retro` entry, and `loadThemeFonts("industrial-retro")` is no longer a valid call.
- The `@eluan/tokens/fonts/industrial-retro` subpath export and its `fonts-industrial-retro.css` file are removed, as is the Geist (sans) `@import` from `@eluan/tokens/fonts/all`. Geist Mono is unaffected — it remains the shared monospace face in `fonts/base`. The unused `@fontsource/geist` dependency was dropped.
- **The unthemed default look changes.** The `:root` block previously mirrored `industrial-retro`, aliasing `--color-neutral-*` to the warm `concrete` ramp. It now mirrors `minimal` and aliases the achromatic `mono` ramp. Any scope that renders without a `data-theme` attribute — bare `@eluan/tokens/css` usage, sub-trees outside the provider's target element — shifts from warm grey to neutral grey.

**Migration**

- Set `data-theme="minimal"` (or drop the attribute and take the `:root` default).
- Swap `@import "@eluan/tokens/fonts/industrial-retro"` for `@import "@eluan/tokens/fonts/minimal"`, or load your own faces and point `--font-heading` / `--font-body` / `--font-mono` at them.
- To keep the old look, recreate it as a custom theme: `createTheme({ name: "…", tokens: { … } })` re-aliasing `--color-neutral-*` to `--color-concrete-*` and setting the accent tokens you want. `@eluan/theme-generator` will build a complete, contrast-checked token set from your accent colors.
