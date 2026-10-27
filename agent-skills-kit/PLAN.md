# Eluan agent skill: build spec

## Goal

Give coding agents a designer-written guideline layer for Eluan, alongside the human docs. An agent should always know which file to read, which component to use, and what never to do. Agents load the router first; the router points them to exactly the foundations, components and patterns the task needs.

Docs explain what a component is. This skill adds the judgment: when to use it, when to use something else, the rules, dos and don'ts, and the mistakes agents make.

## Output layout

```
skills/eluan/
  SKILL.md                 router (always loaded first)
  DESIGN.md                exported from the theme generator (Phase 3, if feasible)
  foundations/
    theming.md colour.md typography.md spacing.md radius.md
    elevation.md motion.md iconography.md
  components/
    <kebab-name>.md        one per exported component
  patterns/
    forms.md feedback.md page-layout.md empty-states.md navigation.md
  evals/
    runs/<date>/...
  .inventory.json          written in Phase 0, read by the check script
  .progress.json           phase tracking
```

Naming: the component export name in kebab case. `Button` → `button.md`, `DatePicker` → `date-picker.md`. Compound components (`Dialog.Title`) live in the parent's file under Anatomy.

Drop any foundation file whose subject Eluan doesn't have (for example no elevation tokens), and note it in the router.

## Source of truth

Every guideline line must come from one of:
1. component source, props and types
2. stories, tests, examples
3. the docs site source
4. token definitions and the theme generator
5. design notes in the repo (Figma/Paper exports, READMEs, changesets)

If a line has no source, draft it and mark `<!-- REVIEW: reason -->`. Never present an invented rule as settled.

## Phase 0: Inventory

1. Find the packages, component exports, token source, theme generator, docs site and stories. Note the package manager and how the repo builds and tests.
2. Write `skills/eluan/.inventory.json`:

```json
{
  "packages": ["@eluan/react"],
  "importPath": "@eluan/react",
  "components": [{ "name": "Button", "source": "packages/react/src/button/Button.tsx", "docs": "apps/docs/content/button.mdx" }],
  "tokens": { "source": "packages/tokens/src/tokens.json", "cssPrefix": "--eluan-", "names": ["color-bg-default"] },
  "themeGenerator": "apps/docs/src/theme-generator",
  "icons": "lucide-react",
  "docsSite": "apps/docs"
}
```

3. Propose the top 5 components by likely usage (default suggestion: button, input, dialog, card, select) and list any gaps: undocumented components, missing tokens, no stories.
4. STOP for confirmation.

## Phase 1: Router and foundations

1. Write `skills/eluan/SKILL.md` from `templates/SKILL.template.md`. The component index can be hand-written for now; Phase 3 generates it.
2. Write each foundation file from `templates/foundation.template.md`. Token tables come from the real token source.
3. `foundations/theming.md` must explain: what the theme generator controls (colour, curves, spacing), where a generated theme lives, how to apply or switch it, and that contrast is checked at generation so agents must not override colour pairs.
4. Run the check. STOP.

## Phase 2: Top components and core patterns

1. Write the 5 confirmed components from `templates/component.template.md`. Every section, in order. Section 12 (API) can be hand-written now; Phase 3 replaces it with generated content between the markers.
2. Write `patterns/forms.md` and `patterns/feedback.md` from `templates/pattern.template.md`.
3. Leave section 15 (Common agent mistakes) with a single line `_Filled from evals._` unless the repo already shows known misuse.
4. Run the check. STOP.

## Phase 3: Generators and CI

1. `scripts/skills/generate-api.mjs`: reads component prop types (use the approach that fits the repo: react-docgen-typescript, ts-morph, or existing docs-site prop tables) and rewrites the content between `<!-- api:start -->` and `<!-- api:end -->` in each component file.
2. `scripts/skills/generate-index.mjs`: reads each component file's frontmatter (`name`, `use_when`, `instead_of`) and rewrites the table between `<!-- index:start -->` and `<!-- index:end -->` in SKILL.md.
3. `scripts/skills/generate-tokens.mjs`: rewrites token tables between `<!-- tokens:start -->` / `<!-- tokens:end -->` in foundation files, and refreshes `tokens.names` in `.inventory.json`.
4. If the theme generator's output can be serialised without UI, add `scripts/skills/export-design-md.mjs` to write `skills/eluan/DESIGN.md` (frontmatter tokens + short rationale). If not feasible, write the reason in the phase summary.
5. Add a `skills:build` script that runs the generators, and a `skills:check` script that runs `node agent-skills-kit/scripts/check-skills.mjs`. Move the check script into `scripts/skills/` if the user prefers.
6. Add `skills:check` to CI (existing workflow if there is one). Also make sure example code blocks in component files type-check: extract them to a temp dir and run the repo's type check, as part of `skills:check` or a separate CI step.
7. Ship it: add `skills/` to the published package's `files`, add a short "Using Eluan with agents" section to the README with the install line for Claude Code (`cp -r node_modules/@eluan/<pkg>/skills/eluan .claude/skills/eluan`) and a one-line pointer for AGENTS.md / CLAUDE.md.
8. Run the generators and the check. STOP.

## Phase 4: Evals

Use `evals/tasks.md`. For each task, run docs-only (A) and with-skill (B) as separate subagents. Score each 0 to 2 on:

| Criterion | 2 | 1 | 0 |
| --- | --- | --- | --- |
| Tokens | no raw values | 1 to 2 raw values | many |
| Reuse | only Eluan components | one custom element an Eluan one covers | reinvented components |
| Choice | right component for intent | defensible but not preferred | wrong (custom modal, toast for errors that block) |
| Accessibility | labels, focus, keyboard, contrast intact | minor gap | broken |
| Navigation (B only) | read router then only the right files | read extra files | read wrong files or skipped router |

Write the report, propose fixes per failure (file, section, exact line). Each fix becomes a rule, a don't, or a section-15 entry. Keep the tasks as a regression suite. STOP.

## Phase 5: The rest

Remaining components in batches of about 8, then remaining patterns. Run the generators and check after each batch. STOP after each batch.

## Writing style for the guidelines

- Second person imperative, short: "Use one primary button per view."
- Every "don't" pairs with a "do".
- Every "when not to use" names the alternative and links it.
- Code examples are complete, import from the real package, and use tokens.
- No marketing language. Agents need rules, not adjectives.
