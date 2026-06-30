---
name: ragnar-token-theme
description: Work with Ragnar design tokens, theme CSS, modes, spacing density, curve scales, font loading, createTheme, and custom theme support. Use when editing packages/tokens/src/*.css, packages/tokens/src/index.ts, RagnarProvider theme behavior, create-theme helpers, docs/theming.md, or any code involving data-theme, data-mode, data-spacing, data-curves, --container-bg, --interactive-border, --action-primary-bg, or similar semantic variables.
---

# Ragnar Token Theme

## Architecture

Ragnar has three CSS-variable layers:

1. `primitives.css`: raw values such as `--color-mono-200`.
2. `modes.css`: light/dim/dark aliases such as `--backgrounds-primary`.
3. `themes.css`: component-facing semantics such as `--container-bg`, `--interactive-bg-selected`, `--action-primary-bg-hover`.

Components should consume semantic tokens, not primitives, modes, or hex colors.

## Built-In Axes

- Themes: `industrial-retro`, `minimal`
- Modes: `light`, `dim`, `dark`
- Spacing: `compact`, `standard`, `wide`
- Curves: `sharp`, `slight`, `sweeping`

Do not reintroduce removed built-in themes such as `lime`, `bold`, `beige`, or `funky`.

## Editing Tokens

When adding or renaming tokens:

1. Add complete definitions for every built-in theme/mode/axis that should support the token.
2. Update TypeScript exports in `packages/tokens/src/index.ts` when the public API changes.
3. Update docs and examples that mention the changed token or axis.
4. Search for the old name across `packages`, `docs`, and `README.md`.

Prefer semantic names that describe usage, not color: `--interactive-border-alt`, not `--blue-border`.

## Custom Themes

Custom themes should go through `createTheme()` and `RagnarProvider customThemes`.

The provider uses both:

- `data-theme=<base>`
- `data-theme-custom=<custom-name>`

This lets custom themes inherit a built-in base and override only supplied tokens. Do not bypass this with component-level theme logic.

## Fonts

Token CSS exports:

- `@vasf/ragnar-tokens/css`
- `@vasf/ragnar-tokens/fonts/base`
- `@vasf/ragnar-tokens/fonts/industrial-retro`
- `@vasf/ragnar-tokens/fonts/minimal`
- `@vasf/ragnar-tokens/fonts/all`

Provider-driven apps should normally import `@vasf/ragnar-core/styles.css` and `@vasf/ragnar-tokens/css`, then let `RagnarProvider` lazy-load active theme fonts.

## Verification

Run:

```bash
pnpm --filter @vasf/ragnar-tokens build
pnpm --filter @vasf/ragnar-core test
pnpm run build:publish
```

If docs changed, also search for stale removed themes:

```bash
rg -n 'lime|bold|beige|funky|rounded' README.md docs packages -g '!*.css'
```
