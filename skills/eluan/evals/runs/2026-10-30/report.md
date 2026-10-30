# Eluan skill evals, 2026-10-30

Phase 4 of `agent-skills-kit/PLAN.md`. The 15 tasks in `agent-skills-kit/evals/tasks.md` were each run twice by separate subagents:

- **A, docs only:** the docs site source (`eluan-docs/src`, `public`) and `packages/core/README.md`.
- **B, with skill:** the packed skill (`pnpm` prepack output, REVIEW notes stripped, 83 files), starting from `SKILL.md`.

Neither could read the Eluan source, its types or node_modules, and none of the logs show a read outside its allowed sources. Each run is `tNN-{a,b}.tsx`, with a log of every file it read in `tNN-{a,b}.log.md`.

## Method

- **Typecheck:** every file compiled against the real `@eluan/core` types, with `react`, `lucide-react`, `sonner`, `@stylexjs/stylex` and `@eluan/theme-generator` available (`typecheck/`).
- **Blind scoring:** three scorer subagents scored Tokens, Reuse, Choice and Accessibility (0–2, rubric in PLAN.md). They saw each task's two answers as X and Y, randomly assigned, with comments stripped (B's comments cite skill files). They checked choices against `packages/core/src`. Scores and notes are in `scores.json`.
- **Navigation (B only):** scored from the logs.

## Results

| Task | A tokens / reuse / choice / a11y | A | B tokens / reuse / choice / a11y | B | B nav |
| --- | --- | --- | --- | --- | --- |
| t01 Signup form | 0 / 1 / 1 / 1 | 3 | 2 / 2 / 2 / 2 | 8 | 2 |
| t02 Delete with confirm | 1 / 2 / 2 / 2 | 7 | 2 / 2 / 2 / 2 | 8 | 2 |
| t03 Settings page | 0 / 1 / 1 / 1 | 3 | 2 / 2 / 2 / 1 | 7 | 1 |
| t04 Save success | 2 / 2 / 1 / 1 | 6 | 2 / 2 / 2 / 2 | 8 | 2 |
| t05 Server error | 1 / 2 / 2 / 2 | 7 | 2 / 2 / 2 / 2 | 8 | 2 |
| t06 Pricing | 0 / 2 / 2 / 1 | 5 | 2 / 2 / 2 / 2 | 8 | 2 |
| t07 Empty state | 0 / 1 / 1 / 2 | 4 | 2 / 2 / 2 / 2 | 8 | 2 |
| t08 Tabs | 2 / 2 / 2 / 1 | 7 | 2 / 2 / 2 / 2 | 8 | 2 |
| t09 Users table | 0 / 1 / 2 / 1 | 4 | 2 / 2 / 2 / 2 | 8 | 2 |
| t10 Nav search | 1 / 2 / 2 / 2 | 7 | 2 / 2 / 2 / 2 | 8 | 2 |
| t11 Brand theme | 0 / 1 / 1 / 2 | 4 | 2 / 2 / 2 / 2 | 8 | 2 |
| t12 Dark mode toggle | 1 / 2 / 1 / 2 | 6 | 2 / 2 / 2 / 2 | 8 | 2 |
| t13 Close icon button | 1 / 2 / 2 / 2 | 7 | 2 / 2 / 2 / 2 | 8 | 2 |
| t14 Trial warning | 1 / 2 / 2 / 1 | 6 | 2 / 2 / 2 / 2 | 8 | 2 |
| t15 Filter bar | 0 / 2 / 1 / 2 | 5 | 2 / 2 / 2 / 2 | 8 | 1 |
| **Total** | 10 / 25 / 23 / 23 | **81 / 120** | 30 / 30 / 30 / 29 | **119 / 120** | **28 / 30** |

B scored higher on all 15 tasks. Typecheck: all 15 B files compile; 14 of 15 A files do (t03-a passes `validationTone`, which `EmailInput` doesn't accept; t01-a passes it through a spread, so tsc misses it).

### Where docs-only lost points

- **Tokens (10 of 30):** raw rem widths (`28rem`, `64rem`, `72rem`), `1px` borders, a hand-rolled visually-hidden style, and Lucide `size={16}` / `{20}` / `{24}` where `--size-xxs` is the token. In t11, A wrote four hand-picked hexes into `createTheme` overrides.
- **Reuse:** a custom `FieldError` instead of `FormMessage` (t01, t03), and a hand-built bordered box that Card covers (t07).
- **Choice:** sent a save failure to a toast and mounted a second `<Toast />` (t04), and hand-overrode about 10 tokens instead of using the generator, with no dim or dark maps (t11). Also picked an icon-only Toggle over Switch for dark mode (t12) and a ghost Reset over a secondary button (t15).
- **Accessibility:**
  - A Spinner live region nested in the submit button (t01).
  - No focus restore after a Dialog opened from a menu (t09).
  - Fixed top Banner covering the header, keeping `role="banner"` (t14).
  - Unnamed TabsList (t08).

## Caveats (read before trusting the totals)

1. **The skill was written with these tasks in view.** Worked examples in the skill mirror 10 of the 15 prompts almost word for word, and four are labelled with the task id:
   - Labelled: `table.md` "(eval t09)", `card.md` "(eval t06)", `page-layout.md` "(eval t03)".
   - Near-verbatim: "trial ends in 3 days" (feedback, banner), "dark mode toggle" and `#2F6F5E` (theming), "Delete project" (button, dialog), "no projects yet" (empty-states), "Overview, Activity and Settings" (tabs), "Settings saved" (toast), "Close panel" (iconography, button), "filter bar" (date-picker).

   So this run shows the skill steers agents correctly on the cases it was written for. It doesn't show that it generalises. The token rules (no raw lengths, icon size tokens) look general, and they account for most of the gap, but a held-out task set is the real test.
2. **One run per task and side.** There's no variance estimate, and some single-point differences could flip on a rerun.
3. **A had no type information.** It had only the docs site and README, per the plan. B had none either, but its component files list props.
4. **Shared context:** both sides saw the user's memory index and the repo's `eluan` skill listing in their system context. Logs say none opened them.

## B failures and proposed fixes

Not applied. Each becomes a rule, a don't, or a section 15 entry once approved.

### F1. t03 accessibility: disabling a control while it saves drops keyboard focus

`switch.md` tells agents to set `disabled` while a save is in flight, so focus leaves the switch the user just toggled. `button.md` gives the same advice for a loading Button, and t02-b and t15-b both flagged the focus loss.

- `components/switch.md`, section 6 States, Loading row (line 49). Replace with:
  > While a save is in flight, keep the new position, set `aria-busy` and ignore further toggles until it settles. Don't set `disabled`: it drops keyboard focus from the switch the user just pressed. Revert if the save fails.
- The same file's example (line 198, `disabled={saving === setting.id}`): swap for `aria-busy` plus an early return in `onCheckedChange`.
- `components/button.md`, section 6 States, Loading row (line 77). Replace with:
  > Put a Spinner (`aria-hidden`) before the label, keep the label, set `aria-busy` and ignore clicks until the work settles. Don't set `disabled` on the button that was just pressed; it drops focus.
- Section 15 in both files: "Disabling the control that started a save, which drops keyboard focus."
- New regression task: "Let users toggle email notifications; the change saves to the server."

**Applied** on branch `fix/skill-eval-fixes`, as t16. The same disable-while-busy advice also sat in the examples in `spinner.md` (rule 1 and three examples), `dialog.md`, `toast.md` and `skeleton.md`, so those changed too. The Dialog's Cancel button keeps `disabled`, because it isn't the control that was pressed.

### F2. t15 navigation: the router sends filter bars to SearchInput

`SKILL.md` line 62, "Search, filter or run a command → `components/search-input.md`", sent a date-and-status filter bar to SearchInput first. Split the row:

> | Search by a typed query, or run a command | `components/search-input.md` | SearchInput, Command |
> | Filter a list by fields (date range, status, tags) | `patterns/forms.md`, then the field's component | Select, MultiSelect, DateRangePicker, SegmentedControl |

(t03-b's other navigation point was minor: a few extra files read and not used. No fix proposed.)

## Gaps the B runs reported

These weren't scored as failures, but at least one B agent had to guess or bend a rule on each.

1. **No width tokens.** In t03, t06, t07 and t10, agents wanted a page max-width, a text measure, a grid minimum or a field width. The skill bans px and rem, and the largest `--size-*` is 120px, so they left it out or multiplied size tokens. **This needs a decision:** allow `ch` for text measure and `%` / `fr` / `min()` for layout, or add width tokens. Then say so in `foundations/spacing.md` and `patterns/page-layout.md` rule 2.
2. **Fixed top Banner covers content (t14).** `patterns/feedback.md` (lines 18, 33) recommends `position="top"`, while `components/banner.md` line 151 says fixed banners don't reserve space. B built a px spacer measured at runtime. Proposal: recommend `position="inline"` as the first child of the app shell for account notices, and keep `top` for notices that must stay visible while scrolling, with the offset spelled out.
3. **The dark mode example drops dim (t12).** `foundations/theming.md` line 186, `setMode(on ? "dark" : "light")`, turns a dim user into light when they switch dark mode off. Proposal: remember the last non-dark mode in the example, or point to a three-way SegmentedControl when all modes are offered.
4. **Row actions: ActionPopover or DropdownMenu?** `SKILL.md` line 73 says ActionPopover for a row's "more actions", but `components/table.md` rule 4 (line 90) says DropdownMenu. Align table.md: "ActionPopover for a plain list of actions; DropdownMenu when you need separators, submenus or checkable items."
5. **Button's ref isn't documented (t09).** `components/button.md` section 12 API: add "Forwards its ref to the `<button>`, or to the child with `asChild`."
6. **Switch row descriptions (t03).** `patterns/forms.md` says FormDescription, while `components/switch.md`'s example uses `Typography variant="caption" tone="muted"` with a `--spacing-xxs` gap. Pick one.
7. **Theme generator setup (t11).** `foundations/theming.md` shows `pnpm dlx` for the CLI and imports `generateTheme` at runtime without saying to install the package. Proposal: say to commit the CLI output (`create-theme.json`) and keep the generator a dev dependency. Also note that a returning user's stored `curves` and theme override new defaults.

## Source issues found (not skill fixes)

- **Banner** sets `role="banner"` by default (`banner.tsx:164`), a page-landmark role that doesn't fit a status message. Every page Banner adds a stray landmark unless the caller overrides it.
- **CardTitle** renders a `<div>` (`card.tsx:119`), so card titles aren't headings unless the caller adds `role="heading"`. Both scorers docked A for this.
- **Header** renders `actions` twice while its mobile menu is open (t10-b), which breaks "one CommandSearch per page". Unverified.
- **EmailInput** `onValidationChange` reportedly doesn't validate a value set in code (t03-b). Unverified.
