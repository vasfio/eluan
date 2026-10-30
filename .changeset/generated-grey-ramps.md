---
"@eluan/theme-generator": minor
---

Generated themes set the base grey aliases (`--backgrounds-primary` …
`-quinary`, `--foregrounds-primary` … `-quinary`) in every mode. Components
that read them directly (the Secondary button, Ghost-family hover fills and the
faded and danger Ghost text, Card's muted text, the Progress track,
SegmentedControl, a Calendar border) used to show `minimal`'s greys under a
generated theme, teak in dim whatever `dimWarmth` said; they now follow the
theme. The aliases are semantic map entries, so they appear in `customTheme`,
`createThemeOptions`, `css.theme`, `semantic.json` and the preview, and the
text ones are contrast-checked. Output for existing tokens is unchanged.
