# @eluan/core

## 0.5.0

### Minor Changes

- 4422c92: Add `PortalContainerProvider` / `usePortalContainer()` so portalled overlays stay inside a scoped theme.

  Radix `*Primitive.Portal` mounts into `document.body`, which puts overlay content outside any element carrying scoped `data-theme` / `data-mode` / `data-spacing` / `data-curves` / `data-typeset` attributes — a scoped region got a themed trigger but a default-themed popover.

  - New `PortalContainerProvider` (accepts an element or a ref object) and `usePortalContainer()`, both exported from the package root.
  - `EluanProvider` gains an optional `portalContainer` prop that forwards to it, so `target={el} portalContainer={el}` scopes a theme and its overlays in one step.
  - `PopoverContent`, `DropdownMenuContent`, `SelectContent`, `ContextMenuContent`, `DialogContent`, `SheetContent`, and `MenubarContent` read the context and accept an explicit `container` prop that overrides it.

  Behaviour is unchanged without a provider: overlays still portal to `document.body`.

- 1391285: Real font weights across the whole range.

  `@eluan/tokens` now loads Inter as a variable font (`@fontsource-variable/inter`,
  wght 100–900) instead of the two static 400/500 faces, and the `minimal` theme's
  `--font-heading` / `--font-body` stacks lead with `"Inter Variable"`. Because the
  axis is continuous, the latin subset costs roughly the same as the two static
  faces it replaces.

  `Typography` exposes the full range: `weight` now accepts `thin` (100),
  `extralight` (200), `light` (300), `normal` (400), `medium` (500), `semibold`
  (600), `bold` (700), `extrabold` (800) and `black` (900) — every one a real face
  rather than a browser-synthesized fake. Per-variant defaults are unchanged, so
  existing type keeps rendering exactly as before.

### Patch Changes

- 7a43216: Composite component fixes: MultiSelect density, RichText tokens, Sheet motion.

  - **MultiSelect**: the chips broke at `data-spacing="compact"`, where
    `--spacing-xxs` resolves to `0`. The gap between tags and the gap between a
    tag's label and its remove button move to `--spacing-xs`, the remove icon
    sizes off `--font-size-xs` so it tracks the chip text, and the clear/backspace
    icon moves to `--size-xxs` so it matches the chevron beside it. The chip's
    hard-coded `calc(var(--font-size-xs) - 0.0625rem)` is now plain
    `--font-size-xs`.
  - **MultiSelect**: selected rows in the dropdown show a `Check` at the right
    edge of the option instead of an `X` with its own click handler — clicking
    anywhere on the row already toggles the selection.
  - **RichText**: the toolbar padding, the blockquote rule, and the inline `code`
    padding were raw `4px` / `0.125rem` values that ignored spacing density; they
    now read `--spacing-xs` / `--spacing-xxs`. Heading leading comes from
    `--line-height-step-*` instead of literals, so it stays paired with the
    typeset step each heading size lands on.
  - **Sheet**: opening and closing now animate. The styles transitioned
    `transform` between `[data-state]` values, but Radix mounts the content
    already in the open state, so nothing ever ran. `stylex.keyframes` per side
    slide the panel in from its anchored edge while fading in, and reverse on
    close; the overlay fades with it. Both are gated on
    `prefers-reduced-motion: reduce`.

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

- cad0fbf: Give nested "pill in a track" components an even inset on every density.

  `Tabs`, `SegmentedControl`, `Menubar` and `DropdownMenu` now follow one rule: the
  track's padding is the inset, uniform on all four sides; the inner element fills
  the track's inner box; and the inner radius is derived as
  `calc(var(--curves-md) - var(--spacing-xs))` so the corners nest on every
  curves × spacing combination.

  The track padding moved from `--spacing-xxs` (which collapses to `0` in compact,
  letting active segments and menu items sit flush against the track border) to
  `--spacing-xs`. `TabsList` and the `Menubar` root also drop their `minHeight` and
  stretch their children, so the trigger's own padding — not a fixed `--size-lg` —
  defines the height; previously a 32px track held a 22.6px trigger, giving a 4.7px
  vertical inset against a 2px horizontal one.

  Also fixes `InputOTP`: the digit input flashed a black outline on click because
  `transition-property: all` animated the outline from the browser's default focus
  ring to the 1px token ring. It now transitions the same explicit list `Input`
  uses, `color, background-color, border-color`.

- 3d92455: Re-cut the `standard` spacing/sizing scale onto half-step rungs.

  `standard` was built from the same coarse primitive rungs as `compact` and
  `wide`, one notch up from compact — close enough that the two densities read
  almost alike. Both families gain the intermediate rungs the scale was missing,
  and `standard` moves onto them so it now lands visibly between the other two
  densities instead of hugging compact.

  **New primitives** (`primitives.css`, inserted in numeric order):

  - Spacing: `--spacing-space-6` (0.375rem), `-10` (0.625rem), `-14` (0.875rem),
    `-18` (1.125rem).
  - Sizing: `--sizing-size-14` (0.875rem), `-18` (1.125rem), `-22` (1.375rem),
    `-28` (1.75rem), `-36` (2.25rem), `-44` (2.75rem).

  **New `standard` values** (`compact` and `wide` are unchanged, as are the
  `--font-size-*` typeset-step mappings in every density):

  | Token           | before | after |     | Token        | before | after |
  | --------------- | ------ | ----- | --- | ------------ | ------ | ----- |
  | `--spacing-xxs` | 2      | 2     |     | `--size-xxs` | 16     | 14    |
  | `--spacing-xs`  | 4      | 4     |     | `--size-xs`  | 20     | 18    |
  | `--spacing-sm`  | 8      | 6     |     | `--size-sm`  | 24     | 22    |
  | `--spacing-md`  | 12     | 10    |     | `--size-md`  | 32     | 28    |
  | `--spacing-lg`  | 16     | 14    |     | `--size-lg`  | 40     | 36    |
  | `--spacing-xl`  | 20     | 18    |     | `--size-xl`  | 48     | 44    |
  | `--spacing-2xl` | 24     | 20    |     | `--size-2xl` | 64     | 56    |
  | `--spacing-3xl` | 40     | 32    |     | `--size-3xl` | 96     | 80    |
  | `--spacing-4xl` | 80     | 64    |     | `--size-4xl` | 160    | 120   |

  **Menubar and Tabs**: both had wider inline padding than block padding around
  their items, which read as a squashed pill at every density (2px by 4px in
  compact). The Menubar trigger, item, indicator item and label, and the Tabs
  trigger, now pad equally on both axes from `--spacing-sm`; the indicator and
  inset items keep their extra left offset for the check/radio slot. The Menubar
  root's fixed `height: var(--size-lg)` becomes `minHeight` — with even padding
  the trigger is taller than the fixed track in `wide`, and was being clipped.

- Updated dependencies [95dbf92]
- Updated dependencies [3d92455]
- Updated dependencies [1391285]
  - @eluan/tokens@0.4.0

## 0.4.1

### Patch Changes

- 3db8b14: Add a light-mode Prism syntax palette to CodeBlock.

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

## 0.4.0

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

### Patch Changes

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

- Updated dependencies [a242387]
- Updated dependencies [a242387]
  - @eluan/tokens@0.3.0

## 0.3.0

### Minor Changes

- 0dd7768: Remove the `industrial-retro` theme. `minimal` is now the only built-in theme, and consumer themeability via `createTheme()` is the story for every other look.

  **Breaking changes**

  - `EluanProvider`'s `defaultTheme` now defaults to `"minimal"` instead of `"industrial-retro"`. Apps that relied on the default get the minimal look.
  - `createTheme`'s `extends` now defaults to `"minimal"`, so custom themes inherit minimal's tokens unless told otherwise.
  - `"industrial-retro"` is no longer a valid theme name: it is rejected by the provider's theme validation (`setTheme("industrial-retro")` is ignored with a dev-mode warning) and `data-theme="industrial-retro"` no longer resolves any tokens. A persisted `eluan:theme` value of `"industrial-retro"` in `localStorage` is ignored, and the provider falls back to `defaultTheme`.
  - The re-exported `themes` array is now `["minimal"]` and the `Theme` type narrows accordingly.

  **Migration**

  - Pass `theme="minimal"` / `defaultTheme="minimal"`, or omit the prop entirely.
  - To keep the old look, recreate it as a custom theme with `createTheme({ name: "…", tokens: { … } })` and register it via `<EluanProvider customThemes={[…]} defaultTheme="…">`; `@eluan/theme-generator` can generate the token set from your accent colors.

### Patch Changes

- Updated dependencies [0dd7768]
  - @eluan/tokens@0.2.0

## 0.2.0

### Minor Changes

- 58cbff9: Unify callback, tone, and size vocabularies across components (breaking).

  These conventions are now applied consistently across every component, batched
  into a single release while adoption is zero. Migrate as follows.

  **Callbacks — value-emitting callbacks are now `onValueChange`**

  Every callback that emits a parsed value (rather than a raw DOM event) is now
  named `onValueChange`. Components that expose a native element still forward the
  raw event via `onChange` (`EmailInput`, `PasswordInput` — unchanged).

  | Component                                                              | Old prop   | New prop                                                 |
  | ---------------------------------------------------------------------- | ---------- | -------------------------------------------------------- |
  | `NumberInput`                                                          | `onChange` | `onValueChange`                                          |
  | `DecimalInput` (and `CurrencyInput` / `PercentageInput` / `UnitInput`) | `onChange` | `onValueChange`                                          |
  | `TimeInput`                                                            | `onChange` | `onValueChange`                                          |
  | `DatePicker`                                                           | `onChange` | `onValueChange`                                          |
  | `DateRangePicker`                                                      | `onChange` | `onValueChange`                                          |
  | `DateTimePicker`                                                       | `onChange` | `onValueChange`                                          |
  | `PhoneInput`                                                           | `onChange` | `onValueChange` (`onCountryChange` unchanged)            |
  | `FileInput` (and `ImageInput` / `DocumentInput`)                       | `onChange` | `onValueChange`                                          |
  | `MultiSelect`                                                          | `onChange` | `onValueChange` (also gains uncontrolled `defaultValue`) |
  | `InputOTP`                                                             | `onChange` | `onValueChange` (`onComplete` unchanged)                 |
  | `RichText`                                                             | `onChange` | `onValueChange`                                          |
  | `SearchInput`                                                          | `onChange` | `onValueChange` (`onSearch` / `onClear` unchanged)       |
  | `AutocompleteSearch`                                                   | `onChange` | `onValueChange` (`onSelect` unchanged)                   |
  | `CreditCardNumberInput`                                                | `onChange` | `onValueChange`                                          |
  | `CreditCardExpiryInput`                                                | `onChange` | `onValueChange`                                          |
  | `CreditCardCVVInput`                                                   | `onChange` | `onValueChange`                                          |

  `CreditCardInput`'s composite `onCardChange` report is unchanged. `CheckboxGroup`
  already used `onValueChange`.

  **Tones — intent-based names `informative / positive / caution / destructive`**

  | Component | Old `variant` | New `variant` |
  | --------- | ------------- | ------------- |
  | `Badge`   | `cautionary`  | `caution`     |
  | `Banner`  | `warning`     | `caution`     |
  | `Banner`  | `success`     | `positive`    |
  | `Banner`  | `info`        | `informative` |

  `Banner`'s default `variant` changed from `info` to `informative`. Token names
  (`--cautionary-*`, `--positive-*`, `--informative-*`) are unchanged.

  **Sizes — normalized to the shared `xs / sm / md / lg / xl` scale plus `icon`
  sizes**

  Icon sizes use a single camelCase `icon`-prefixed scheme (`icon`, `iconSm`,
  `iconXs`, `iconInline`), mirroring the unsuffixed base of the text scale.

  | Component                | Old `size`    | New `size`   |
  | ------------------------ | ------------- | ------------ |
  | `Select` (`SelectItem`)  | `compact`     | `sm`         |
  | `Toggle` / `ToggleGroup` | `iconMd`      | `iconSm`     |
  | `Button`                 | `compactIcon` | `iconSm`     |
  | `Button`                 | `xsIcon`      | `iconXs`     |
  | `Button`                 | `inlineIcon`  | `iconInline` |

  `Button`'s `icon` size and all other size values (`default` / `sm` / `lg`, plus
  `Spinner`'s `xl`) are unchanged.

## 0.1.0

### Minor Changes

- f9fd64d: Initial public release of the Eluan design system under the `@eluan` npm scope.

### Patch Changes

- Updated dependencies [f9fd64d]
  - @eluan/tokens@0.1.0

---

_Earlier `1.0.x`–`2.0.0` entries in this file's history were published under the
former `@frolda` scope, before the rebrand to `@eluan`. They belong to a
different, now-unpublished versioning line and have been removed to avoid
confusion — the `@eluan/core` line starts at `0.1.0`._
