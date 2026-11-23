---
description: Run the Eluan skill evals (docs-only vs with-skill) and turn failures into guideline fixes
argument-hint: "[task ids, optional]"
---

Run the evals defined in `agent-skills-kit/evals/tasks.md` (or only these task ids: $ARGUMENTS), following "Phase 4: Evals" in `agent-skills-kit/PLAN.md`.

For each task, spawn two subagents in parallel in separate scratch directories:
- **A, docs only:** may read the docs site source and package README, must not read `skills/eluan/`.
- **B, with skill:** told to load `skills/eluan/SKILL.md` first and follow it.

Each subagent writes its result to `skills/eluan/evals/runs/<date>/<task-id>-{a,b}.tsx` plus a short log of every file it read.

Then score both runs against the rubric in PLAN.md, write `skills/eluan/evals/runs/<date>/report.md` with a table per task and a summary, and propose the specific edits (file, section, new line) that would fix each with-skill failure. Do not apply the edits until the user approves.
