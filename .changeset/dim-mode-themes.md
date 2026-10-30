---
"@eluan/theme-generator": minor
---

Generated themes get their own dim mode: light mode toned down, built the way
`minimal`'s dim is.

Every semantic token resolves one step deeper on its ramp than in light, against
`primitivesDim`: colour ramps keep `dimChroma` of their chroma (default 0.8,
0.5–1) and the greys take the hue and chroma of `minimal`'s warm teak ramp by
`dimWarmth` (default 1; 0 keeps the brand-tinted greys). Dim gets its own
contrast pass and appears everywhere dark does: `customTheme`,
`createThemeOptions.modes.dim`, `css.dimMode`, a dim block in `css.theme`,
`semantic.json` and the preview. Semantic entries take an optional `dim` ref.
The CLI adds `--dim-chroma` and `--dim-warmth`. Light and dark output are
unchanged.
