---
"@eluan/core": minor
---

Remove the `industrial-retro` theme. `minimal` is now the only built-in theme, and consumer themeability via `createTheme()` is the story for every other look.

**Breaking changes**

- `EluanProvider`'s `defaultTheme` now defaults to `"minimal"` instead of `"industrial-retro"`. Apps that relied on the default get the minimal look.
- `createTheme`'s `extends` now defaults to `"minimal"`, so custom themes inherit minimal's tokens unless told otherwise.
- `"industrial-retro"` is no longer a valid theme name: it is rejected by the provider's theme validation (`setTheme("industrial-retro")` is ignored with a dev-mode warning) and `data-theme="industrial-retro"` no longer resolves any tokens. A persisted `eluan:theme` value of `"industrial-retro"` in `localStorage` is ignored, and the provider falls back to `defaultTheme`.
- The re-exported `themes` array is now `["minimal"]` and the `Theme` type narrows accordingly.

**Migration**

- Pass `theme="minimal"` / `defaultTheme="minimal"`, or omit the prop entirely.
- To keep the old look, recreate it as a custom theme with `createTheme({ name: "…", tokens: { … } })` and register it via `<EluanProvider customThemes={[…]} defaultTheme="…">`; `@eluan/theme-generator` can generate the token set from your accent colors.
