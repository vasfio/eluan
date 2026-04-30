# Contributing to Ragnar

Thanks for taking an interest in contributing. This document covers how to work within the monorepo, add or modify components, and get changes merged.

---

## Prerequisites

- **Node.js** 20+
- **pnpm** 10.32+ (`npm install -g pnpm`)
- A working knowledge of React, TypeScript, and Tailwind CSS v4

---

## Setup

```bash
git clone https://github.com/vasf/ragnar.git
cd ragnar
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
ragnar/
  packages/
    tokens/    @vasf/ragnar-tokens   Design tokens, CSS variables, fonts
    core/      @vasf/ragnar-core     60+ UI components (Radix + Tailwind v4)
    web/       @vasf/ragnar-web      Marketing & web components
    native/    @vasf/ragnar-native   React Native components
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

### Adding a new component to `@vasf/ragnar-core`

1. Create `packages/core/src/components/my-component.tsx`

   Follow the standard pattern:

   ```tsx
   import * as React from "react"
   import { cva, type VariantProps } from "class-variance-authority"
   import { cn } from "@/lib/utils"

   const myComponentVariants = cva("/* base classes */", {
     variants: {
       variant: { default: "/* ... */" },
     },
     defaultVariants: { variant: "default" },
   })

   export interface MyComponentProps
     extends React.HTMLAttributes<HTMLDivElement>,
       VariantProps<typeof myComponentVariants> {}

   const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
     ({ className, variant, ...props }, ref) => (
       <div ref={ref} className={cn(myComponentVariants({ variant }), className)} {...props} />
     )
   )
   MyComponent.displayName = "MyComponent"

   export { MyComponent, myComponentVariants }
   ```

2. Export from `packages/core/src/index.ts`
3. Create stories with `tags: ["autodocs"]`

### Adding a new component to `@vasf/ragnar-web`

Same pattern in `packages/web/src/components/`. Can import from `@vasf/ragnar-core`.

### Adding a new component to `@vasf/ragnar-native`

Use React Native primitives and `createThemedStyles` / `getSemanticColors` from `../utils/styles` instead of Tailwind.

---

## Token Usage Rules

Always use CSS variable tokens. Never hardcode colours or spacing.

```tsx
// ✅ Correct
className="bg-[var(--container-bg)] text-[var(--container-fg)]"
className="p-[var(--spacing-md)] rounded-[var(--curves-md)]"
className="border border-[color:var(--container-border)]"

// ❌ Wrong
className="bg-white text-gray-900"
style={{ color: "#333" }}
```

Check `packages/tokens/src/themes.css` for actual variable names before using them.

---

## Code Style

- TypeScript strict — no `any`
- `React.forwardRef` for all DOM-rendering components
- Export both component and variants (e.g. `Button` and `buttonVariants`)
- `cn()` from `@/lib/utils` for all className merging
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
