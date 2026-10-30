---
"@eluan/theme-generator": minor
---

`--interactive-fg-alt` is held to the text floor. It carries placeholders,
unselected tabs and segments, and the descriptions in Card, Dialog and Sheet,
but was only checked at 3:1 against the input ground and kept there under a
stricter floor. It is now checked against the page and panel grounds
(`interactive-bg`, `interactive-bg-alt`, `container-bg`, `container-bg-alt`) at
4.5:1 or the config's `minContrast`, whichever is higher. At the default 4.5
nothing changes (every theme already clears it, 4.86:1 at worst); at 7:1 it
moves two steps darker in light, matching `--container-fg-alt`, and one step
in dim and dark.
