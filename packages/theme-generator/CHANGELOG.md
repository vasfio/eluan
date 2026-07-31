# @eluan/theme-generator

## 0.3.0

### Minor Changes

- 1820a77: Make `GeneratorConfig.minContrast` a real floor. Previously a per-entry `minContrast` in the semantic map always replaced the config value, so raising the config to 7 (AAA) silently did nothing for any pairing that declared its own minimum — the config was effectively inert. Per-entry values now raise the floor but never lower it.

  Entries that deliberately target a lower WCAG tier can opt out with the new `SemanticEntry.allowBelowDefault` flag: `interactive-fg-alt` uses it to stay at the 3:1 large-text/UI tier even under an AAA floor, and the flag is passed through to the compiled tokens JSON so downstream tools can mirror the semantics.

## 0.2.0

### Minor Changes

- 6858c0c: Make the programmatic entry point browser-safe. `@eluan/theme-generator` can now be imported in a client component and used to generate themes live from user-picked accents — no bundler shims, no Node polyfills.

  The only Node dependency in the public entry was `node:crypto`, used by `computeInputHash`. It is now a small pure-JS FNV-1a (64-bit) hash over the same canonicalized input. Everything else was already pure color math; the `eluan-theme` CLI is unchanged and remains the only part that touches the filesystem.

  **Fingerprint format change**

  `computeInputHash` still takes the same argument and still returns a deterministic 12-character lowercase hex string, but the _value_ changes: it was the first 12 hex characters of a SHA-256 digest, and is now the high 48 bits of an FNV-1a digest. The same fingerprint appears in the `/* Input hash: … */` header of generated `theme.css` and in the generation report, so regenerating a theme with an unchanged config will produce a different hash than it did on `0.1.x`. Nothing else about the generated output changes.

  This hash is a cache-busting fingerprint, never a security primitive — FNV-1a is not collision resistant, and the doc comment now says so.

  **Also in this release**

  - New `check:browser` script bundles the built entry with `esbuild --platform=browser`, failing on any Node built-in. It runs in CI, so the browser-safety guarantee is enforced rather than asserted.
  - `sideEffects` is declared (the entry and everything it reaches are side-effect free; the self-executing CLI bin is listed as the exception), so bundlers can tree-shake unused helpers.
  - Package description and keywords broadened to cover the library use, not just the CLI.

  No API changes: every export keeps its name, signature, and behavior.

## 0.1.0

### Minor Changes

- f9fd64d: Initial public release of the Eluan design system under the `@eluan` npm scope.
