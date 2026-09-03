---
"@eluan/core": patch
---

Add a light-mode Prism syntax palette to CodeBlock.

The syntax-highlight rules shipped only One Dark's hues, unscoped, while the
CodeBlock card sits on `--container-bg-alt` — near-white in light mode. On that
ground the palette measured 1.7–2.4:1 (class-name 1.73:1, string 2.02:1,
punctuation 2.13:1, function 2.36:1), below even the 3:1 large-text tier.

The One Dark rules remain the base and continue to serve dim and dark. A light
palette now overrides them, scoped off the `data-mode` axis like the token
layers: One Light's roles darkened until every token type clears ≥3.9:1 on the
light card — keyword `#8f2a91`, string `#3f7d33`, number `#8a5a10`, function
`#2b62c8`, class-name `#7d5c07`, operator `#0a6b87`, tag `#b03a2a`, punctuation
`#4b5059`, comment `#5c6370` (unchanged).
