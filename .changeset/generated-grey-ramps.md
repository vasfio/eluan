---
"@eluan/theme-generator": minor
---

Generated themes set the base grey aliases (`--backgrounds-primary` …
`-quinary`, `--foregrounds-primary` … `-quinary`) in every mode, so CSS that
reads them follows the theme instead of showing `minimal`'s greys (teak in dim,
whatever `dimWarmth` said). The aliases are semantic map entries, so they
appear in `customTheme`, `createThemeOptions`, `css.theme`, `semantic.json` and
the preview, and the text ones are contrast-checked. Output for existing tokens
is unchanged.
