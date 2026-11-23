import scoresJson from "../../runs/2026-10-30/scores.json";

export const RUN_DATE = "2026-10-30";

export type Side = "a" | "b";
export type Criterion = "tokens" | "reuse" | "choice" | "a11y";

export interface Score extends Record<Criterion, number> {
  notes: Record<Criterion, string>;
}

export interface Task {
  id: string;
  title: string;
  prompt: string;
  tests: string;
}

// From agent-skills-kit/evals/tasks.md, as run on 2026-10-30.
export const TASKS: Task[] = [
  { id: "t01", title: "Signup form", prompt: "Build a signup form with name, email, password and a terms checkbox.", tests: "forms pattern, input labels, error states, one primary button" },
  { id: "t02", title: "Delete with confirm", prompt: "Add a \"Delete project\" action that asks before deleting.", tests: "dialog, destructive variant, focus returns to trigger" },
  { id: "t03", title: "Settings page", prompt: "Build an account settings page with profile, notifications and billing sections.", tests: "page layout, switches for on/off settings, grouping and spacing tokens" },
  { id: "t04", title: "Save success", prompt: "Show a success message after the user saves settings.", tests: "toast, not alert or banner" },
  { id: "t05", title: "Server error", prompt: "Show a form-level error when the server rejects the signup.", tests: "inline alert in the form, not a toast" },
  { id: "t06", title: "Pricing", prompt: "Build a pricing table with three plans, the middle one recommended.", tests: "card or table choice, one primary action, tokens only" },
  { id: "t07", title: "Empty state", prompt: "Build the empty state for a dashboard with no projects yet.", tests: "empty state pattern, single clear action" },
  { id: "t08", title: "Tabs", prompt: "Add tabs to switch between Overview, Activity and Settings.", tests: "tabs, not buttons or links styled as tabs" },
  { id: "t09", title: "Users table", prompt: "Build a users table with sorting and a row action menu.", tests: "table, menu, keyboard access" },
  { id: "t10", title: "Nav search", prompt: "Add a search field to the top nav.", tests: "input with icon, accessible label without visible label" },
  { id: "t11", title: "Brand theme", prompt: "Make the app use our brand colour #2F6F5E with rounder corners.", tests: "theming foundation, generator, no per-component overrides" },
  { id: "t12", title: "Dark mode toggle", prompt: "Add a dark mode toggle.", tests: "switch, theming, no hardcoded colours" },
  { id: "t13", title: "Close icon button", prompt: "Add an icon-only button to close a side panel.", tests: "icon button, aria-label, Lucide icon size token" },
  { id: "t14", title: "Trial warning", prompt: "Show a warning across the top that the trial ends in 3 days.", tests: "banner, not toast" },
  { id: "t15", title: "Filter bar", prompt: "Build a filter bar with a date range, a status select and a reset button.", tests: "select, date picker if available, secondary button for reset" },
];

export const CRITERIA: { key: Criterion; label: string }[] = [
  { key: "tokens", label: "Tokens" },
  { key: "reuse", label: "Reuse" },
  { key: "choice", label: "Choice" },
  { key: "a11y", label: "Accessibility" },
];

const scores = scoresJson as unknown as {
  rows: Record<string, Record<Side, Score>>;
  nav: Record<string, number>;
};

export const score = (task: string, side: Side) => scores.rows[task][side];
export const navigation = (task: string) => scores.nav[task];
export const total = (s: Score) => CRITERIA.reduce((n, c) => n + s[c.key], 0);

export const SIDES: Record<Side, string> = { a: "A · docs only", b: "B · with skill" };

const raw = (files: Record<string, unknown>) =>
  Object.fromEntries(Object.entries(files).map(([path, text]) => [path.split("/").pop()!, text as string]));

const sources = raw(import.meta.glob("../../runs/2026-10-30/*.tsx", { query: "?raw", import: "default", eager: true }));
const logs = raw(import.meta.glob("../../runs/2026-10-30/*.log.md", { query: "?raw", import: "default", eager: true }));
const typechecks = raw(import.meta.glob("../../runs/2026-10-30/typecheck/*.txt", { query: "?raw", import: "default", eager: true }));

export const source = (run: string) => sources[`${run}.tsx`] ?? "";
export const log = (run: string) => logs[`${run}.log.md`] ?? "";
export const typecheck = (run: string) => (typechecks[`${run}.txt`] ?? "").trim();
export const compiles = (run: string) => typecheck(run) === "no type errors";
