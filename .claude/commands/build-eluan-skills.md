---
description: Build Eluan's agent skill (router, foundations, per-component guidelines, patterns, generators, CI, evals) in reviewed phases
argument-hint: "[phase N]"
---

You are building the agent skill for the Eluan design system in this repo.

Read `agent-skills-kit/PLAN.md` in full before doing anything. It is the spec. The templates in `agent-skills-kit/templates/` define the exact file shapes.

Arguments: $ARGUMENTS
- Empty: start at Phase 0, or resume at the first phase whose output is missing (check `skills/eluan/.progress.json`).
- `phase N`: run that phase only.

Rules for this run:
1. Work one phase at a time. At the end of each phase, update `skills/eluan/.progress.json`, summarise what you did in under 10 lines, list every `<!-- REVIEW -->` marker you added, and STOP. Wait for the user before starting the next phase.
2. Never invent design guidance. Source every rule, do, don't and usage claim from the component code, its stories or tests, the docs site source, the Figma/Paper notes in the repo, or existing tokens. When there is no source, write your best draft and mark it `<!-- REVIEW: why this needs a human -->`.
3. Never change component source code. You only add files under `skills/eluan/`, `scripts/` and CI config, and update package.json `files`/scripts if Phase 3 needs it.
4. Run `node agent-skills-kit/scripts/check-skills.mjs` after Phases 1, 2, 3 and 5, and fix every error before stopping.
5. Commit at the end of each phase with a message like `skills(eluan): phase 2, top components`.
