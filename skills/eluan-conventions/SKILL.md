---
name: eluan-conventions
description: Eluan design system coding conventions for building, editing, or auditing components. Use when creating new components for @eluan/core, fixing existing ones, or any task that involves Eluan tokens, styling, or component patterns in the eluan monorepo.
---

# Eluan Conventions

## Repo structure
- `packages/core/src/components/` — UI and marketing components (including Header, HeaderNavigation, and Footer)
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
- Style with StyleX only: `const styles = stylex.create({ ... })` applied by spreading `{...stylex.props(...)}` — no className-composition or variant-factory helpers; styling is entirely StyleX + semantic tokens
- Model variants as named `stylex.create` entries plus a `Record<Variant, stylex.StyleXStyles>` lookup map (see `button.tsx`)
- Use `React.forwardRef` for all leaf components
- Set `.displayName` on every component
- Do not accept or forward `className`/`style` — omit them from public props (`Omit<..., "className" | "style">`); consumers theme via tokens
- Export the component (and its `*Props`/variant *types*), e.g. `export { Button }` with `export type ButtonVariant = ...`

## Style guidelines
- No hardcoded hex/rgb colours or raw pixel values — reference tokens as `var(--...)` string values in StyleX
- Font weight: use `fontWeight: 400`/`500`, avoid heavy weights except headings
- Headings use `fontFamily: "var(--font-heading)"`
- Focus rings: a `":focus-visible"` block with `outlineColor: "var(--interactive-border)"`, `outlineWidth: "1px"`, `outlineStyle: "solid"`, `outlineOffset: "1px"`
- Borders: `borderColor: "var(--container-border)"` or `"var(--interactive-border)"` (with `borderWidth`/`borderStyle`)
- Transitions: prefer a scoped `transitionProperty` list; use `"all"` sparingly

## Build & publish workflow
1. `cd packages/core && npm run build` — verify clean build before committing
2. Version bump: edit `package.json` version manually (workspace: protocol breaks npm version)
3. Publish: `npm publish --access public --no-workspaces` from the package folder
4. Commit with: `feat: eluan core improvements - description`

## Common mistakes to avoid
- Don't use `bg-primary`, `text-foreground` etc. (shadcn compat aliases) — use full token vars
- Don't use `workspace:*` in deps when building standalone — replace with published semver
- Don't import from `@radix-ui/*` directly in new components — always wrap in a Eluan component
