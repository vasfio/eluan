# Eluan Design System — Changelog

Per-package changelogs:
- [`packages/tokens/CHANGELOG.md`](./packages/tokens/CHANGELOG.md)
- [`packages/core/CHANGELOG.md`](./packages/core/CHANGELOG.md)
- [`packages/web/CHANGELOG.md`](./packages/web/CHANGELOG.md)
- [`packages/native/CHANGELOG.md`](./packages/native/CHANGELOG.md)

---

## [0.1.x] — April 2026

### Packages published

- `@eluan/tokens` `0.1.1` — Three-layer token system, 6 visual themes, 3 spacing scales, 4 curve scales, self-hosted fonts, Tailwind v3 preset and TypeScript API.
- `@eluan/core` `0.1.5` — 60+ UI components on Radix UI + Tailwind CSS v4 + CVA. Includes AI component suite.
- `@eluan/web` `0.1.1` — 29 marketing/web components (hero, pricing, footer, blog card, shaders, etc.).
- `@eluan/native` `0.1.1` — React Native component library sharing the same token foundation.

### Infrastructure

- pnpm workspace monorepo with Changesets
- Storybook for core (port 6006) and web (port 6007)
- Vitest across core, web, and native
- GitHub Actions CI/CD with automated release workflow
- Vercel deployment for combined Storybook docs site
