---
name: eluan-public-review
description: Audit the Eluan design system for open-source and portfolio readiness. Use for repository-wide review, pre-release checks, packaging metadata, stale docs, README quality, package exports, lockfile hygiene, generated artifacts, lint/test/build reliability, public API consistency, accessibility risks, dependency drift, or checking that code is legible and impressive for prospects or employers.
---

# Eluan Public Review

## Review Stance

Lead with concrete problems before making changes. Prioritize issues that affect:

- installability and package publishing
- public documentation accuracy
- design-system consistency
- accessibility and component correctness
- test/build/lint reliability
- maintainability and legibility for outside contributors

Ignore unrelated dirty worktree changes unless they affect the review.

## Audit Checklist

Inspect:

- Root and package `package.json` files
- `exports`, `types`, `files`, `sideEffects`, `peerDependencies`, and `publishConfig`
- source dependencies for public packages; prefer normal semver over `workspace:` where npm publishing from the package itself should work
- `pnpm-lock.yaml`, package manager consistency, nested lockfiles, and generated tarballs
- README files and `docs/`
- root ESLint and package Vitest/Vite configs
- public exports in `packages/*/src/index.ts`
- representative components in `core`, `web`, `native`, and `ai`

Search for:

```bash
find packages -name '*.tgz' -o -name 'package-lock.json'
rg -n 'TODO|FIXME|console\.|debugger|@ts-ignore|eslint-disable' packages/*/src
rg -n 'bg-primary|text-foreground|text-muted-foreground|border-input|ring-ring|rounded-md|#[0-9a-fA-F]{3,8}' packages/*/src
rg -n 'lime|bold|beige|funky|Resizable|Sidebar|TimePicker|Rating' README.md docs packages/*/README.md
```

For consumer package-manager compatibility, inspect packed package metadata:

```bash
pnpm --filter @eluan/core pack --pack-destination /private/tmp
pnpm --filter @eluan/tokens pack --pack-destination /private/tmp
tar -xOf /private/tmp/eluan-core-*.tgz package/package.json
```

The packed `package.json` should contain normal semver dependencies, not `workspace:` specifiers. Consumer docs should show npm/yarn/pnpm/bun install commands where appropriate.

## Action Order

1. Report findings first if the user asks for a review or asks to list problems before action.
2. Fix verification blockers before style polish.
3. Clean stale public docs and package metadata before deeper refactors.
4. Remove generated artifacts only when clearly accidental.
5. Keep component changes narrow and covered by tests.

## Verification

Use:

```bash
pnpm lint
pnpm test
pnpm run build:publish
git status --short
git diff --stat
```

Report any residual warnings separately from failures. A passing test with a console warning is still worth naming if it affects public confidence.
