# Contributing to Eluan

Thanks for taking an interest in contributing. This document covers how to work within the monorepo, add or modify components, and get changes merged.

---

## Prerequisites

- **Node.js** 20+
- **pnpm** 10.32+ (`npm install -g pnpm`)
- A working knowledge of React, TypeScript, and [StyleX](https://stylexjs.com)

---

## Setup

```bash
git clone https://github.com/vasfio/eluan.git
cd eluan
pnpm install
```

Build the packages in dependency order before running Storybook:

```bash
pnpm build
```

Then start Storybook for the package you're working on:

```bash
pnpm storybook          # core components — port 6006
pnpm storybook:web      # web/marketing components — port 6007
```

---

## Monorepo Structure

```
eluan/
  packages/
    tokens/    @eluan/tokens   Design tokens, CSS variables, fonts
    core/      @eluan/core     60+ UI components (Radix + StyleX)
    web/       @eluan/web      Compatibility facade (Header/HeaderNavigation/Footer)
    native/    @eluan/native   React Native components
  apps/
    storybook-native/                Native Storybook (Expo)
```

Build order always matters: `tokens` → `core` → `web`. Native only depends on `tokens`.

---

## Making Changes

### Modifying an existing component

1. Find the component in `packages/core/src/components/` (or `web` / `native`)
2. Make your changes
3. Update or add stories in the same directory (`my-component.stories.tsx`)
4. Run tests: `pnpm test`
5. Check Storybook visually: `pnpm storybook`

### Adding a new component to `@eluan/core`

1. Create `packages/core/src/components/my-component.tsx`

   Follow the standard pattern — StyleX styles + `React.forwardRef`, with variants
   modeled as a lookup of `stylex.create` styles keyed by a typed union. See
   [`packages/core/src/components/button.tsx`](./packages/core/src/components/button.tsx)
   for the reference implementation.

   ```tsx
   import * as React from "react"
   import * as stylex from "@stylexjs/stylex"

   export type MyComponentVariant = "default" | "muted"

   const styles = stylex.create({
     base: {
       backgroundColor: "var(--container-bg)",
       color: "var(--container-fg)",
       borderRadius: "var(--curves-md)",
       padding: "var(--spacing-md)",
     },
     muted: {
       color: "var(--container-fg-alt)",
     },
   })

   const variantStyles = {
     default: null,
     muted: styles.muted,
   } satisfies Record<MyComponentVariant, stylex.StyleXStyles | null>

   export interface MyComponentProps
     extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style"> {
     variant?: MyComponentVariant
   }

   const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
     ({ variant = "default", ...props }, ref) => (
       <div ref={ref} {...props} {...stylex.props(styles.base, variantStyles[variant])} />
     )
   )
   MyComponent.displayName = "MyComponent"

   export { MyComponent }
   ```

2. Export from `packages/core/src/index.ts`
3. Create stories with `tags: ["autodocs"]`

### Adding a new component to `@eluan/web`

Same pattern in `packages/web/src/components/`. Can import from `@eluan/core`.

### Adding a new component to `@eluan/native`

Use React Native primitives and `createThemedStyles` / `getSemanticColors` from `../utils/styles` (React Native has no CSS variables, so tokens are consumed as JS values).

---

## Token Usage Rules

Always reference CSS variable tokens inside `stylex.create`. Never hardcode colours or spacing.

```tsx
// ✅ Correct
const styles = stylex.create({
  card: {
    backgroundColor: "var(--container-bg)",
    color: "var(--container-fg)",
    padding: "var(--spacing-md)",
    borderRadius: "var(--curves-md)",
    borderColor: "var(--container-border)",
  },
})

// ❌ Wrong
const styles = stylex.create({
  card: { backgroundColor: "#fff", color: "#333", padding: 12 },
})
```

Check `packages/tokens/src/themes.css` for actual variable names before using them.

---

## Code Style

- TypeScript strict — no `any`
- `React.forwardRef` for all DOM-rendering components
- Export the component and its `*Props`/variant type unions (e.g. `Button`, `ButtonProps`, `ButtonVariant`)
- Style with StyleX (`stylex.create` / `stylex.props`); reference tokens as `var(--token)` values
- File names: `kebab-case.tsx`, stories: `kebab-case.stories.tsx`
- Run `pnpm lint` before opening a PR

---

## Testing

```bash
pnpm test             # run all tests once
pnpm test:coverage    # with coverage report
```

Use `@testing-library/react`. Query by role/label/text, not implementation selectors.

---

## Changesets

```bash
pnpm dlx @changesets/cli add
```

Select affected packages, choose bump type (`patch` / `minor` / `major`), write a description. Commit the generated `.changeset/*.md` file with your changes.

No changeset needed for internal refactors, test-only, or doc-only changes.

---

## Pull Requests

- One component/feature per PR where possible
- Screenshots or Storybook links for visual changes
- `pnpm lint` and `pnpm test` must pass

---

## Releasing (maintainers only)

```bash
pnpm version-packages
git add . && git commit -m "chore: version packages"
pnpm release
```
