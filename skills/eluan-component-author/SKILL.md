---
name: eluan-component-author
description: Build, modify, or audit components in the Eluan monorepo. Use for tasks in packages/core/src/components, packages/web/src/components, or packages/native/src/components; when adding component APIs, variants, stories, tests, Radix wrappers, forwardRef/displayName patterns, CVA variants, className merging, accessibility behavior, or replacing shadcn-style classes with Eluan semantic tokens.
---

# Eluan Component Author

## Workflow

1. Inspect the target component, adjacent components, tests, stories, exports, and package conventions before editing.
2. Keep changes scoped to the component family and public API requested.
3. Preserve behavior unless the task explicitly asks for a behavior change.
4. Add or update focused tests when changing behavior, accessibility, variants, refs, or exported API.
5. Run the narrow package test/lint command first, then the broader package gate if the change touches shared patterns.

## Core Patterns

- Use `React.forwardRef` for every public component that renders an element.
- Set `displayName` for every public component.
- Use `cn()` from `@/lib/utils` for className merging.
- Use `cva()` for meaningful variant matrices. Do not keep a CVA object if it is only a type wrapper around empty variants.
- Export new core components from `packages/core/src/index.ts` alphabetically inside the component export block.
- Prefer composition over duplication. Specialized inputs should build on `Input` when possible.
- For Radix wrappers, forward `asChild` when exposing slot-like composition.

## Token Rules

Use Eluan semantic CSS variables instead of shadcn aliases or hardcoded Tailwind values:

- Background: `bg-[var(--container-bg)]`, `bg-[var(--interactive-bg)]`, `bg-[var(--interactive-bg-hover)]`
- Text color: `text-[color:var(--container-fg)]`, `text-[color:var(--container-fg-alt)]`
- Font size: `text-[length:var(--font-size-sm)]`
- Border: `border-[var(--container-border)]`, `border-[var(--interactive-border-alt)]`
- Focus: `focus-visible:ring-1 focus-visible:ring-[var(--interactive-border)] focus-visible:ring-offset-1`
- Sizing: `h-[var(--size-lg)]`, `w-[var(--size-lg)]`
- Spacing: `p-[var(--spacing-md)]`, `gap-[var(--spacing-sm)]`
- Curves: `rounded-[var(--curves-md)]`

Avoid `bg-primary`, `text-foreground`, `text-muted-foreground`, `border-input`, `ring-ring`, `rounded-md`, `h-9`, `px-4`, and hex colors in shipped components unless there is a specific non-token visual surface such as a media overlay.

## Accessibility

- Preserve Radix roles and state attributes.
- Prefer semantic queries in tests: role, label, text, `data-state`.
- For `Separator`, remember it is decorative by default; pass `decorative={false}` when testing separator role.
- For overlays and dialogs, ensure title/description expectations are intentional. If omitting a description, pass `aria-describedby={undefined}` when the primitive expects that.

## Verification

Use package-scoped commands:

```bash
pnpm --filter @eluan/core lint
pnpm --filter @eluan/core test
pnpm --filter @eluan/web lint
pnpm --filter @eluan/web test
pnpm --filter @eluan/native lint
pnpm --filter @eluan/native test
```

For public package changes, finish with:

```bash
pnpm lint
pnpm test
pnpm run build:publish
```
