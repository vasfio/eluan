---
name: ragnar-conventions
description: Ragnar design system coding conventions for building, editing, or auditing components. Use when creating new components for @vasf/ragnar-core, fixing existing ones, or any task that involves Ragnar tokens, styling, or component patterns in the ragnar monorepo.
---

# Ragnar Conventions

## Repo structure
- `packages/core/src/components/` — UI, marketing, and AI UX components
- `packages/web/src/components/` — compatibility wrappers for Header, HeaderNavigation, and Footer
- `packages/native/src/components/` — React Native components
- Each component has a `.tsx` and a `.stories.tsx` file

## Tokens (always use these, never hardcode)
Use CSS custom properties exclusively:
- Backgrounds: `var(--backgrounds-primary/secondary/tertiary/quaternary)`
- Foregrounds: `var(--foregrounds-primary/secondary/tertiary/quaternary/quinary)`
- Actions: `var(--action-primary-bg)`, `var(--action-primary-fg)`, `var(--action-primary-bg-hover)`
- Interactive: `var(--interactive-bg)`, `var(--interactive-fg)`, `var(--interactive-bg-active)`, `var(--interactive-fg-active)`
- Semantic: `var(--positive-bg/fg)`, `var(--destructive-bg/fg)`, `var(--cautionary-bg/fg)`, `var(--informative-bg/fg)`
- Container: `var(--container-bg)`, `var(--container-fg)`, `var(--container-border)`, `var(--container-border-alt)`

## Component patterns
- Use `cn()` from `@/lib/utils` for className merging
- Use `cva()` for variant-based styling
- Use `React.forwardRef` for all leaf components
- Set `.displayName` on every component
- Export both component and variants (e.g., `export { Badge, badgeVariants }`)
- Use `@/lib/utils` not `../../lib/utils`

## Style guidelines
- No hardcoded hex/rgb colours — tokens only
- Font weight: prefer `font-medium` or `font-normal`, avoid `font-bold` except headings
- Headings use `font-heading` class → `var(--font-heading)`
- Focus rings: `focus-visible:ring-1 focus-visible:ring-[var(--interactive-fg)]`
- Borders: `border-[var(--container-border)]` or `border-[var(--interactive-border)]`
- Transitions: `transition-colors` for colour changes, `transition-all` sparingly

## Build & publish workflow
1. `cd packages/core && npm run build` — verify clean build before committing
2. Version bump: edit `package.json` version manually (workspace: protocol breaks npm version)
3. Publish: `npm publish --access public --no-workspaces` from the package folder
4. Commit with: `feat: ragnar core improvements - description`

## Common mistakes to avoid
- Don't use `bg-primary`, `text-foreground` etc. (shadcn compat aliases) — use full token vars
- Don't use `workspace:*` in deps when building standalone — replace with published semver
- Don't import from `@radix-ui/*` directly in new components — always wrap in a Ragnar component
