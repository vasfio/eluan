---
"@eluan/core": minor
"@eluan/theme-generator": minor
---

Generated themes work in light and dark mode, with brighter dark colours.

`createTheme()` takes per-mode overrides: `createTheme({ name, tokens, modes: { dark } })`
adds a `[data-theme-custom][data-mode]` rule per mode, so a custom theme can
carry its own dark values instead of reusing its light ones.

`generateTheme()` returns the theme ready to use in both modes:
`customTheme` goes straight into `<EluanProvider customThemes>`, and
`createThemeOptions` (`{ tokens, modes: { dark } }`) spreads into
`createTheme()`. Both layer on `minimal`, keeping its fonts and neutral ramp.
The CLI writes them as `custom-theme.css` and `create-theme.json`.

Dark mode now resolves against a lifted copy of the colour ramps
(`primitivesDark`): a new `darkLift` option (default 0.08, 0 turns it off,
`--dark-lift` on the CLI) raises OKLCH lightness on the mid steps so accents
and status colours stay vivid on a dark ground. Contrast is still checked for
every pair in both modes; light-mode output is unchanged.
