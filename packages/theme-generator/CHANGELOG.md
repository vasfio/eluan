# @eluan/theme-generator

## 0.4.0

### Minor Changes

- eae2cd3: New `--action-neutral-bg`, `--action-neutral-bg-hover` and `--action-neutral-fg`
  theme tokens for the Secondary button, which was the last component reading
  the grey aliases directly. `minimal` points them at `--backgrounds-tertiary`,
  `--backgrounds-quaternary` and `--foregrounds-primary`, so the button looks the
  same. Generated themes set them on the same steps and check the text against
  both fills; at a 7:1 floor that moves dim Secondary text to black, since the
  hover fill only reached 6.55:1 before.
- 3a1ae54: Generated themes get their own dim mode: light mode toned down, built the way
  `minimal`'s dim is.

  Every semantic token resolves one step deeper on its ramp than in light, against
  `primitivesDim`: colour ramps keep `dimChroma` of their light-mode chroma
  (default 0.8, 0.5–1) and the greys take the hue and chroma of `minimal`'s warm teak ramp by
  `dimWarmth` (default 1; 0 keeps the brand-tinted greys). Dim gets its own
  contrast pass and appears everywhere dark does: `customTheme`,
  `createThemeOptions.modes.dim`, `css.dimMode`, a dim block in `css.theme`,
  `semantic.json` and the preview. Semantic entries take an optional `dim` ref.
  The CLI adds `--dim-chroma` and `--dim-warmth`. Light and dark output are
  unchanged.

- 49fceb3: Generated themes work in light and dark mode, with brighter dark colours.

  `createTheme()` takes per-mode overrides: `createTheme({ name, tokens, modes: { dark } })`
  adds a `[data-theme-custom][data-mode]` rule per mode, so a custom theme can
  carry its own dark values instead of reusing its light ones.

  `generateTheme()` returns the theme ready to use in both modes:
  `customTheme` goes straight into `<EluanProvider customThemes>`, and
  `createThemeOptions` (`{ tokens, modes: { dark } }`) spreads into
  `createTheme()`. Both layer on `minimal`, keeping its fonts.
  The CLI writes them as `custom-theme.css` and `create-theme.json`.

  Dark mode now resolves against a lifted copy of the colour ramps
  (`primitivesDark`): a new `darkLift` option (default 0.08, 0 turns it off,
  `--dark-lift` on the CLI) raises OKLCH lightness on the mid steps so accents
  and status colours stay vivid on a dark ground. Contrast is still checked for
  every pair in both modes; light-mode output is unchanged.

- 71e59ea: Generated themes set the base grey aliases (`--backgrounds-primary` …
  `-quinary`, `--foregrounds-primary` … `-quinary`) in every mode, so CSS that
  reads them follows the theme instead of showing `minimal`'s greys (teak in dim,
  whatever `dimWarmth` said). The aliases are semantic map entries, so they
  appear in `customTheme`, `createThemeOptions`, `css.theme`, `semantic.json` and
  the preview, and the text ones are contrast-checked. Output for existing tokens
  is unchanged.
- fa1c852: Ghost button text clears 4.5:1 on panels in dim mode.

  In `minimal`, `--action-tertiary-fg` (Ghost and Toast cancel text) is now
  declared per mode in modes.css: `--mono-background` in light and dark as before,
  `--foregrounds-tertiary` (teak-800) in dim instead of teak-700, which was 4.36:1
  on the panel ground. It's now 6.79:1 on the page and 6.19:1 on the panel.

  In the theme generator, a semantic entry's `contrastAgainst` can list several
  grounds, and the hardest decides. `action-tertiary-fg` is checked against both
  `action-tertiary-bg` and `action-tertiary-bg-alt`, so in generated themes dim
  Ghost text moves one step deeper (3.95–4.46:1 on the panel before, 5.57–6.31:1
  now). `contrastAgainst` in `semantic.json` can therefore be an array;
  `contrastGrounds()` reads it as a list. Light and dark output are unchanged at
  the default floor.

- ae80725: `--interactive-fg-alt` is held to the text floor. It carries placeholders,
  unselected tabs and segments, and the descriptions in Card, Dialog and Sheet,
  but was only checked at 3:1 against the input ground and kept there under a
  stricter floor. It is now checked against the page and panel grounds
  (`interactive-bg`, `interactive-bg-alt`, `container-bg`, `container-bg-alt`) at
  4.5:1 or the config's `minContrast`, whichever is higher. At the default 4.5
  nothing changes (every theme already clears it, 4.86:1 at worst); at 7:1 it
  moves two steps darker in light, matching `--container-fg-alt`, and one step
  in dim and dark.

### Patch Changes

- 7e4814f: Dark scrim behind Dialog and Sheet in dark mode.

  The Dialog and Sheet overlays painted `--container-fg` at 0.8 opacity. That
  token is near-white in dark mode, so opening a dialog washed the page out light
  behind a dark panel. Both overlays now read a new mode-aware `--overlay-bg`
  token: light and dim keep `--foregrounds-primary` (unchanged), and dark resolves
  to `--backgrounds-tertiary`, the darkest step of the neutral ramp.
  `@eluan/theme-generator` emits the token for generated themes (`neutral.950` in
  both modes).

- 1da7431: Visible keyboard focus everywhere, from a new `--focus-ring` token.

  Every focus outline read `--interactive-border`, a pale grey that measured
  1.26:1 on white and 1.31:1 in dark mode, so keyboard focus was effectively
  invisible across the library. A new mode-aware `--focus-ring` token clears 3:1
  on every page and panel ground in light, dim and dark, and stays distinct from
  the pressed fill. All focus outlines and box-shadow rings now use it; focused
  fields darken their border instead of fading it; Badge and MultiSelect remove
  buttons gained the focus ring they suppressed; Banner's dismiss button rings
  in the banner's text colour. `@eluan/theme-generator` emits `--focus-ring` for
  generated themes, contrast-checked at 3:1.

- addd646: Contrast corrections move a foreground to the nearest step that passes instead
  of the end of its ramp. Brand-coloured action text (`action-secondary-fg`, the
  Outline button label, and `action-tertiary-fg`, the Ghost label and Toast's
  cancel action) used to jump from `primary.500` to `primary.950` in light mode,
  about 17:1 and effectively black; it now lands on `primary.600` (5.3–6.2:1
  across tested accents) and keeps the brand colour. At the default 4.5 floor
  nothing else changes; at stricter floors other corrected tokens also stop at
  the nearest passing step.
- 286e3a7: Outline button text clears 4.5:1 on panels in dim mode, the same fix Ghost text
  got.

  In `minimal`, `--action-secondary-fg` moves to modes.css beside
  `--action-tertiary-fg`: `--mono-background` in light and dark as before,
  `--foregrounds-tertiary` (teak-800) in dim instead of teak-700 (4.36:1 on the
  panel before, 6.19:1 now). The Outline border keeps teak-700.

  The theme generator checks `action-secondary-fg` against both `container-bg`
  and `container-bg-alt`, so in generated themes dim Outline text moves one step
  deeper (3.95–4.47:1 on the panel before, 5.57–6.31:1 now). Light and dark
  output are unchanged at the default floor.

- e6eace1: Readable destructive and positive text, and visible validation focus rings.

  `--destructive-fg` and `--positive-fg` now point one primitive step darker in
  light and dim mode, so text on the tinted Banner fill clears 4.5:1 (it was
  3.15–3.28:1 in light). `@eluan/theme-generator` checks both tokens against the
  tint for generated themes. Input's `validationTone="positive"` and
  `"destructive"` focus outlines ring in their tone colour instead of the pale
  tint they used before.

## 0.3.1

### Patch Changes

- 95dbf92: Form and overlay polish.

  - **Fieldset**: `FieldsetLegend` now sits one typeset step above `Label`
    (`--font-size-base` instead of `--font-size-sm`), and its trailing margin drops
    from `--spacing-lg` to `--spacing-xs` so a `FieldsetDescription` follows the
    legend instead of floating between it and the field group.
  - **InputOTP**: focus now matches `Input` — a 1px `--interactive-border` outline
    at `1px` offset plus a matching border colour, replacing the doubled
    box-shadow ring. `InputOTPSlot`'s active state uses the same treatment, so both
    the default and slot variants read as a focused `Input`.
  - **Tooltip**: new mode-aware `--tooltip-bg` token. Light and dim resolve to
    `--backgrounds-primary` (unchanged); dark resolves to `--backgrounds-tertiary`,
    the same value `--container-border` carries, so the tooltip's border disappears
    against its own background instead of ringing it. `@eluan/theme-generator`
    emits the token for generated themes.
  - **TreeView**: leaf rows render an aria-hidden spacer the width of the chevron,
    so icons at the same depth share a column. Indentation is token-based —
    `calc(var(--size-xxs) + var(--spacing-sm))` per level over a `--spacing-sm`
    base — which keeps a child's icon under its parent's label at every spacing
    density. `indentSize` still overrides it with raw px when passed explicitly.
  - **SearchInput**: grouped autocomplete headings are no longer uppercase and drop
    the tracking that went with the caps; groups after the first gain a
    `--spacing-xs` top margin to separate them from the group above.

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
