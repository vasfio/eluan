---
"@eluan/tokens": minor
"@eluan/core": minor
---

Density-aware text sizes and an inheriting tone for `Typography`.

- New `--line-height-*` and `--letter-spacing-*` aliases (`xs` to `5xl`) beside
  the `--font-size-*` ones. In every spacing density each pair sits on the
  same typeset step as its font size, so a density-aware size can still apply
  size, line height and tracking together.
- `Typography` takes `size` (`"xs"` to `"5xl"`), which reads those three
  aliases instead of a fixed step, so app text re-flows with `data-spacing`
  like the components around it. It takes precedence over `step`.
- `Typography` `tone` gains `"inherit"`, for text inside a coloured parent
  (a Banner, a Button, a link). The default stays `"default"`.

Nothing existing changes.
