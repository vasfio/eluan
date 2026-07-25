---
name: eluan-component-author
description: Build, modify, or audit components in the Eluan monorepo. Use for tasks in packages/core/src/components, packages/web/src/components, or packages/native/src/components; when adding component APIs, variants, stories, tests, Radix wrappers, forwardRef/displayName patterns, StyleX variant maps, accessibility behavior, or wiring components to Eluan semantic tokens.
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
- Style with StyleX only: `import * as stylex from "@stylexjs/stylex"`, declare a
  `const styles = stylex.create({ ... })` object, and apply it by spreading
  `{...stylex.props(styles.base, condition && styles.variant)}`. There is no
  className-composition helper and no variant-factory helper in this repo — styling
  is entirely StyleX + semantic tokens.
- Do not accept or forward `className`/`style`. Public props omit them
  (`Omit<React.ButtonHTMLAttributes<...>, "className" | "style">`); consumers
  theme via tokens, not overrides. Tests assert overrides are dropped.
- Model variant matrices as named entries in the `stylex.create` object plus a
  lookup map, e.g.
  `const variantStyles = { default: styles.variantDefault, ... } satisfies Record<ButtonVariant, stylex.StyleXStyles>`,
  applied with `variantStyles[variant]`. See `button.tsx` for the canonical shape.
- Export new core components from `packages/core/src/index.ts` alphabetically inside the component export block.
- Prefer composition over duplication. Specialized inputs should build on `Input` when possible.
- For Radix wrappers, forward `asChild` when exposing slot-like composition.

## Token Rules

Reference Eluan semantic CSS variables as plain values inside StyleX property
objects (never hardcoded colors, sizes, or shadcn aliases):

- Background: `backgroundColor: "var(--container-bg)"` / `"var(--interactive-bg)"` / `"var(--interactive-bg-hover)"`
- Text color: `color: "var(--container-fg)"` / `"var(--container-fg-alt)"`
- Font size: `fontSize: "var(--font-size-sm)"`
- Border: `borderColor: "var(--container-border)"` / `"var(--interactive-border-alt)"` (pair with `borderWidth` + `borderStyle`)
- Focus: a `":focus-visible"` block with `outlineColor: "var(--interactive-border)"`, `outlineWidth: "1px"`, `outlineStyle: "solid"`, `outlineOffset: "1px"`
- Sizing: `height: "var(--size-lg)"`, `width: "var(--size-lg)"`
- Spacing: `padding: "var(--spacing-md)"`, `gap: "var(--spacing-sm)"`
- Curves: `borderRadius: "var(--curves-md)"`

Avoid `bg-primary`, `text-foreground`, `text-muted-foreground`, `border-input`, `ring-ring`, and hardcoded values (`#hex`, `rgb()`, `9`, `16px`) in shipped components unless there is a specific non-token visual surface such as a media overlay.

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
