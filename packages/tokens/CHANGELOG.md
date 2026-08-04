# @eluan/tokens

## 0.3.0

### Minor Changes

- a242387: Replace static font-size primitives with a fluid typeset, add the `Typography` component, and swap Geist Mono for Paper Mono.

  **Fluid typeset (`@eluan/tokens`)**

  A new `typeset.css` defines a 12-step scale — `--font-size-step-6` down to
  `--font-size-step-neg3` — where every step is viewport-fluid. Each step is
  anchored at three viewport widths (480px / 748px / 1024px, matching
  `--viewports-screen-s|m|l`) and interpolated by a two-segment `clamp()`:
  small→medium from 480px to 748px, medium→large from 748px to 1024px, pinned to
  the end columns outside that range. The small column steps by a minor third
  (×1.2), the large column by a major third (×1.25), so wider viewports get more
  typographic contrast. Type now resizes without a single media query in app code.

  Two companion families ship alongside the sizes and are meant to be applied
  together with them: `--line-height-step-*` (1.5 for steps neg3–0, 1.375 for 1–2,
  1.2 for 3–6) and `--letter-spacing-step-*` (`0em` up to step 1, tightening to
  `-0.03em` at step 6). The negative tracking gives display type the optical fit a
  dedicated "Tight" cut would, in `em` so it scales with the fluid size — no
  second font to download.

  **New `data-typeset` axis**

  `data-typeset="small" | "medium" | "large"` pins every step to that column's
  static value. Omitting the attribute (the default) keeps the scale fluid. Like
  the other axes it works on any element, so a subtree can be pinned while the
  page stays fluid. `EluanProvider` gains a `defaultTypeset` prop and
  `useEluanTheme()` gains `typeset` / `setTypeset`, with the state typed
  `"auto" | "small" | "medium" | "large"`. `"auto"` _removes_ the attribute and
  clears `eluan:typeset` from localStorage; only explicit pins are persisted.

  **Breaking: `--font-size-12` … `--font-size-60` are removed**

  The numeric font-size primitives are gone from `primitives.css`. The
  density-scaled `--font-size-xs` … `--font-size-5xl` aliases still exist and are
  the supported API, but they now select a _typeset step_ rather than a static
  primitive, and each density shifts the selection by one step — the same one-rung
  shift `--size-*` and `--spacing-*` already used:

  | Alias              | compact   | standard  | wide      |
  | ------------------ | --------- | --------- | --------- |
  | `--font-size-xs`   | step-neg3 | step-neg2 | step-neg1 |
  | `--font-size-base` | step-neg1 | step-0    | step-1    |
  | `--font-size-5xl`  | step-5    | step-6    | step-6    |

  **Migration** — replace any direct `var(--font-size-24)` style reference with
  either the alias closest to your intent (`var(--font-size-2xl)`) or an explicit
  step (`var(--font-size-step-3)`). Note that sizes now move with the viewport, so
  a layout that assumed a fixed px value may need its container constraints
  revisited. To opt out entirely, pin with `data-typeset`.

  **Breaking: Paper Mono replaces Geist Mono**

  `--font-mono` now resolves to `"Paper Mono"` and `@fontsource/geist-mono` has
  been dropped from `@eluan/tokens`' dependencies. Paper Mono is vendored inside
  the package as a variable WOFF2 (weight axis 100–800) at
  `dist/files/paper-mono-variable.woff2` and declared with a plain `@font-face` in
  `fonts-base.css`, so it needs no registry dependency and works offline. It is
  licensed under the SIL Open Font License 1.1 (Copyright 2025 The Paper Mono
  Project Authors); the full notice is in `THIRD_PARTY_NOTICES.md`. Anyone who
  imported `@fontsource/geist-mono` transitively through `@eluan/tokens` must now
  depend on it directly, and any theme that hard-coded `"Geist Mono"` in
  `--font-mono` should be updated.

  **New `Typography` component (`@eluan/core`)**

  The ergonomic front door to the typeset — it always applies a step's size, line
  height, and letter spacing as a set, so heading tracking can never drift from
  the size.

  ```tsx
  <Typography variant="display">Ships fast</Typography>
  <Typography variant="body">Body copy on step-0.</Typography>
  <Typography variant="label" step="2">Any variant, any step</Typography>
  ```

  `variant` (`display | title | heading | subheading | lead | body | label |
caption`) selects a step, family, weight, and a default element (`h1`–`h4` for
  the headings, `p` for `lead`/`body`, `span` for `label`/`caption`). `step`
  overrides the size trio while keeping the variant's font and weight; `as` and
  `asChild` override the element; `weight` is capped at `medium` because no
  heavier face is loaded; plus `family`, `tone`, `align`, and `truncate`.

  **Token exports**

  `@eluan/tokens` (re-exported from `@eluan/core`) adds `typeset`,
  `typesetAnchors`, `typesetSteps`, `lineHeightSteps`, `letterSpacingSteps`,
  `resolveTypesetSize(step, viewportWidthPx)`, and the `TypesetStep` /
  `TypesetViewport` types. `resolveTypesetSize` implements the same two-segment
  interpolation as the CSS, so `@eluan/native` and other non-CSS consumers render
  identically. `fontSizes` is now marked `@deprecated` but is unchanged and still
  exported.

  **Skeuomorphic token teardown completed (`@eluan/core`)**

  The `--skeuo-*` and `--slider-thumb-*` definitions were already removed from the
  token files, which left ~40 dead `var()` references across ten components
  resolving to their initial values. Those declarations are now deleted. Rendering
  is unchanged — the components already drew flat. The live parts of those rules
  were kept: solid `Button` variants still nudge down half a pixel when pressed,
  and the `Slider` thumb still sizes from `--size-xxs`.

- a242387: Add sizing primitives, author colour primitives in OKLCH, and drop the private `--tabs-*` token family.

  **Sizing primitives (`@eluan/tokens`)**

  The density-scaled `--size-*` tokens used to alias the spacing scale
  (`--size-md: var(--spacing-space-24)`), so component dimensions and layout
  spacing shared one set of primitives. `primitives.css` now carries numeric
  sizing steps alongside the existing t-shirt scale — `--sizing-size-12` through
  `--sizing-size-240` — and every `--size-*` token in the `compact`, `standard`,
  and `wide` blocks resolves through those instead. Values are unchanged: this is
  a pure aliasing refactor with no visual effect. `sizingSteps` is exported from
  `@eluan/tokens` for cross-platform parity; the existing `sizing` export (the
  t-shirt scale, a different set of values) is untouched.

  **Colour primitives are now OKLCH**

  All 233 colour primitives are declared as `oklch()` with the sRGB hex they were
  derived from kept as a trailing comment. Every value round-trips to its original
  hex (max deviation 0.47/255, and all 233 re-quantise to the identical 8-bit
  colour), so rendered colour is unchanged. The `concrete` ramp, already in OKLCH,
  was renormalised to the file-wide number format (lightness 4dp as a 0–1 number,
  chroma 4dp, hue 2dp) — same colours. `primitiveColors` in the JS export stays
  hex for cross-platform consumers.

  **Breaking: the `--tabs-*` tokens are gone**

  `Tabs` was the only component with a private token family. `[data-theme="minimal"]`
  no longer defines `--tabs-list-bg`, `--tabs-list-shadow`, `--tabs-list-radius`,
  `--tabs-list-padding`, `--tabs-list-gap`, `--tabs-trigger-radius`,
  `--tabs-trigger-fg`, `--tabs-trigger-hover-fg`, `--tabs-trigger-selected-bg`,
  `--tabs-trigger-selected-fg`, `--tabs-trigger-selected-surface`, or
  `--tabs-trigger-selected-shadow`. The component reads the generic semantic
  tokens directly (`--interactive-bg-alt`, `--interactive-fg-alt`,
  `--interactive-fg`, `--container-bg`, `--curves-md`, `--curves-sm`,
  `--spacing-xs`), matching how every other component is styled. The rendered
  appearance in `minimal` is identical.

  **Migration** — a custom theme that overrode any `--tabs-*` token silently loses
  that override. `Tabs` now follows the semantic tokens it shares with the rest of
  the system, so retheming it means moving those (`--interactive-bg-alt` for the
  track, `--container-bg` for the active cap, `--curves-*` for the corners). Tab
  styling that cannot be expressed through the shared semantics is no longer
  themeable from tokens alone.

## 0.2.0

### Minor Changes

- 0dd7768: Remove the `industrial-retro` theme. `minimal` is now the only built-in theme — everything else is a consumer theme built with `createTheme()` from `@eluan/core` or generated with `@eluan/theme-generator`.

  **Breaking changes**

  - The `[data-theme="industrial-retro"]` block is gone from `themes.css`. `data-theme="industrial-retro"` no longer resolves any tokens.
  - `themes` is now `["minimal"]`, and the `Theme` type narrows to `"minimal"`. `themeFonts` and `themeNeutrals` no longer carry an `industrial-retro` entry, and `loadThemeFonts("industrial-retro")` is no longer a valid call.
  - The `@eluan/tokens/fonts/industrial-retro` subpath export and its `fonts-industrial-retro.css` file are removed, as is the Geist (sans) `@import` from `@eluan/tokens/fonts/all`. Geist Mono is unaffected — it remains the shared monospace face in `fonts/base`. The unused `@fontsource/geist` dependency was dropped.
  - **The unthemed default look changes.** The `:root` block previously mirrored `industrial-retro`, aliasing `--color-neutral-*` to the warm `concrete` ramp. It now mirrors `minimal` and aliases the achromatic `mono` ramp. Any scope that renders without a `data-theme` attribute — bare `@eluan/tokens/css` usage, sub-trees outside the provider's target element — shifts from warm grey to neutral grey.

  **Migration**

  - Set `data-theme="minimal"` (or drop the attribute and take the `:root` default).
  - Swap `@import "@eluan/tokens/fonts/industrial-retro"` for `@import "@eluan/tokens/fonts/minimal"`, or load your own faces and point `--font-heading` / `--font-body` / `--font-mono` at them.
  - To keep the old look, recreate it as a custom theme: `createTheme({ name: "…", tokens: { … } })` re-aliasing `--color-neutral-*` to `--color-concrete-*` and setting the accent tokens you want. `@eluan/theme-generator` will build a complete, contrast-checked token set from your accent colors.

## 0.1.0

### Minor Changes

- f9fd64d: Initial public release of the Eluan design system under the `@eluan` npm scope.

---

_Earlier `1.0.x`–`2.0.0` entries in this file's history were published under the
former `@frolda` scope, before the rebrand to `@eluan`. They belong to a
different, now-unpublished versioning line and have been removed to avoid
confusion — the `@eluan/tokens` line starts at `0.1.0`._
