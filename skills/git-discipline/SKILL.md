---
name: git-discipline
description: Git workflow conventions for all of Vas's repos. Use when committing, pushing, creating branches, or resolving conflicts in any of the frolda/* GitHub repos.
---

# Git Discipline

## Commit message format (conventional commits)
```
<type>: <short description>

Types: feat | fix | chore | docs | refactor | style | test | perf
```
Examples:
- `feat: add AvatarStatus component with online/offline/busy/away states`
- `fix: slider range dial missing second thumb`
- `chore: bump core version to 1.1.0`
- `refactor: replace hardcoded colours with design tokens`

## Pre-commit checklist
1. Run `npm run build` in the affected package — never push a broken build
2. Check `git status` — don't accidentally commit node_modules, .next, dist, or .env
3. Keep commits focused — one logical change per commit

## Branch strategy
- Default: work directly on `main` for solo repos
- For large features: `feat/<name>` branch, merge via PR
- Never force-push to main on shared repos

## Push workflow
```bash
git add -A
git commit -m "type: description"
git push
```
If push is rejected (diverged remote):
1. `git fetch origin`
2. Check what changed: `git log --oneline origin/main -5`
3. `git merge origin/main` (prefer merge over rebase for history clarity)
4. Resolve conflicts, then push

## Repos
All live at `~/Documents/github/` and remote at `github.com/frolda/`
- ragnar, finance-tracker, merch-mockup-flask, taiwanese-learning, japanese-learning
- ocean-yoga-backend, ds-prototype, vasf-io, thought-net

## gitignore defaults (ensure these are ignored)
`node_modules`, `.next`, `dist`, `.env`, `.env.local`, `public/bundles`, `tmp/`
