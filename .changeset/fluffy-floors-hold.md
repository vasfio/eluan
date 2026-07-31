---
'@eluan/theme-generator': minor
---

Make `GeneratorConfig.minContrast` a real floor. Previously a per-entry `minContrast` in the semantic map always replaced the config value, so raising the config to 7 (AAA) silently did nothing for any pairing that declared its own minimum — the config was effectively inert. Per-entry values now raise the floor but never lower it.

Entries that deliberately target a lower WCAG tier can opt out with the new `SemanticEntry.allowBelowDefault` flag: `interactive-fg-alt` uses it to stay at the 3:1 large-text/UI tier even under an AAA floor, and the flag is passed through to the compiled tokens JSON so downstream tools can mirror the semantics.
