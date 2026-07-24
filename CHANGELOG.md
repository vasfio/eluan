# Eluan Design System — Changelog

Per-package changelogs:
- [`packages/tokens/CHANGELOG.md`](./packages/tokens/CHANGELOG.md)
- [`packages/core/CHANGELOG.md`](./packages/core/CHANGELOG.md)
- [`packages/theme-generator/CHANGELOG.md`](./packages/theme-generator/CHANGELOG.md)
- [`packages/web/CHANGELOG.md`](./packages/web/CHANGELOG.md)
- [`packages/native/CHANGELOG.md`](./packages/native/CHANGELOG.md)

---

## [0.1.0] — Initial public release

First release of the Eluan design system under the `@eluan` npm scope.

### Published to npm

- `@eluan/tokens` `0.1.0` — Three-layer token architecture (primitives → modes → themes), 2 visual themes (`industrial-retro`, `minimal`), 3 modes (`light`, `dim`, `dark`), 3 spacing scales, 3 curve scales, self-hosted fonts, and a typed TypeScript API.
- `@eluan/core` `0.1.0` — 60+ accessible UI components built on Radix UI primitives and styled with StyleX. Includes `EluanProvider`, `useEluanTheme`, and `createTheme` for runtime theming.
- `@eluan/theme-generator` `0.1.0` — CLI (and programmatic API) that generates accessibility-checked light/dark theme token sets from one to three accent colors.

### Private (not yet published)

- `@eluan/web` — Compatibility facade re-exporting `Header`, `HeaderNavigation`, and `Footer` from core.
- `@eluan/native` — React Native component library sharing the same token foundation.

### Infrastructure

- pnpm workspace monorepo with Changesets
- Storybook for core (port 6006) and web (port 6007)
- Vitest across core, theme-generator, web, and native
- GitHub Actions CI and an automated release workflow (npm trusted publishing via OIDC)
