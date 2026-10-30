#!/usr/bin/env node
// Rewrites the token tables between <!-- tokens:start --> and <!-- tokens:end -->
// in skills/eluan/foundations/*.md from packages/tokens/src/*.css, and refreshes
// tokens.names in skills/eluan/.inventory.json.
// Values resolve against the default context: theme minimal, mode light,
// spacing standard, curves slight, fluid typeset. Hand-edited "Use for" cells
// are kept; new tokens get a default description.
// Usage: node scripts/skills/generate-tokens.mjs [--check]

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import {
  alias, allNames, colourNames, curveNames, curvesValue, densityValue, fluidRange,
  scaleSort, spacingNames, steps, themeNames, value, context,
} from "./lib/tokens.mjs";

const SKILL = "skills/eluan";
const CHECK = process.argv.includes("--check");

const colourValue = (name) => {
  const a = alias(name);
  const light = value(name);
  const dark = value(name, context({ mode: "dark" }));
  const resolved = light === dark ? light : `${light} / dark ${dark}`;
  return a ? `\`${a}\` → ${resolved}` : resolved;
};
const fluidValue = (name) => {
  const [small, large] = fluidRange(name);
  return `${small} → ${large}, fluid`;
};

const GROUPS = {
  "colour.md": () => colourNames().map((n) => [n, colourValue(n)]),
  "typography.md": () => [
    ...themeNames.filter((n) => n.startsWith("font-")).map((n) => [n, value(n).split(",")[0]]),
    ...spacingNames
      .filter((n) => n.startsWith("font-size-"))
      .sort((a, b) => scaleSort(a, b, "font-size-"))
      .map((n) => [n, `\`${alias(n)}\` (density shifts one step)`]),
    ...["font-size-step-", "line-height-step-", "letter-spacing-step-"].flatMap((p) =>
      steps.map((s) => `${p}${s}`).map((n) => [n, p === "font-size-step-" ? fluidValue(n) : value(n)]),
    ),
  ],
  "spacing.md": () =>
    ["spacing-", "size-"].flatMap((p) =>
      spacingNames
        .filter((n) => n.startsWith(p))
        .sort((a, b) => scaleSort(a, b, p))
        .map((n) => [n, densityValue(n)]),
    ),
  "radius.md": () => [
    ...curveNames.sort((a, b) => scaleSort(a, b, "curves-")).map((n) => [n, curvesValue(n)]),
    ["radius-radius-full", value("radius-radius-full")],
  ],
  "iconography.md": () =>
    ["size-xxs", "size-xs", "size-sm", "size-md"].map((n) => [n, densityValue(n)]),
  "theming.md": () => [
    ...themeNames.filter((n) => n.startsWith("color-neutral-")).map((n) => [n, colourValue(n)]),
    ...themeNames.filter((n) => n.startsWith("font-")).map((n) => [n, value(n).split(",")[0]]),
  ],
  "elevation.md": () => [],
  "motion.md": () => [],
};

// ---------- Default "Use for" text ----------

const SUFFIX = {
  bg: "background", fg: "text and icons", border: "border",
  "bg-alt": "subtle alternate background", "fg-alt": "muted text and icons", "border-alt": "subtle border",
  "bg-hover": "background on hover", "bg-active": "background while pressed",
  "bg-selected": "background when selected", "bg-disabled": "background when disabled",
  "fg-hover": "text on hover", "fg-active": "text while pressed", "fg-selected": "text when selected",
  "fg-disabled": "text when disabled", "border-hover": "border on hover", "border-disabled": "border when disabled",
  "bg-inverse": "background on an inverse surface", "fg-inverse": "text on an inverse surface",
  "border-inverse": "border on an inverse surface", "fg-strong": "high-emphasis text",
  "bg-alt2": "second alternate background", "fg-readonly": "text when read-only",
};
const FAMILY = {
  container: "Surfaces (cards, panels, popovers)", interactive: "Inputs and selectable items",
  "action-primary": "Primary actions", "action-secondary": "Secondary (outline) actions",
  "action-tertiary": "Tertiary (ghost) actions", "action-neutral": "Neutral actions (the `secondary` button)",
  destructive: "Destructive status and actions",
  cautionary: "Caution status (the `caution` tone)", positive: "Positive status",
  informative: "Informative status", important: "Important status",
};
function defaultUse(name) {
  if (name === "focus-ring") return "Keyboard focus outline; components draw it, don't restyle it";
  if (name === "overlay-bg") return "Scrim behind modal overlays";
  if (name === "tooltip-bg") return "Tooltip background";
  if (name.startsWith("dataviz-")) return "Charts only: series colour";
  if (name.startsWith("color-neutral-")) return "Theme's neutral ramp; modes derive backgrounds and foregrounds from it";
  if (name === "font-heading") return "Headings";
  if (name === "font-body") return "Body text and UI";
  if (name === "font-mono") return "Code and tabular figures";
  if (name.startsWith("font-size-step-")) return "Type step; apply with its line-height and letter-spacing";
  if (name.startsWith("line-height-step-")) return "Line height paired with the same step";
  if (name.startsWith("letter-spacing-step-")) return "Tracking paired with the same step";
  if (name.startsWith("font-size-")) return "Density-aware type size alias";
  if (name.startsWith("spacing-")) return "Gap, padding, margin";
  if (name.startsWith("size-")) return "Control height, icon size";
  if (name.startsWith("curves-")) return "Corner radius";
  if (name === "radius-radius-full") return "Pills and circles only";
  for (const f of Object.keys(FAMILY).sort((a, b) => b.length - a.length)) {
    if (name.startsWith(`${f}-`)) {
      const s = name.slice(f.length + 1);
      return `${FAMILY[f]}: ${SUFFIX[s] ?? s}`;
    }
  }
  return "";
}

// ---------- Rewrite ----------

const START = "<!-- tokens:start -->";
const END = "<!-- tokens:end -->";
const HEADER = "| Token | Value (default theme) | Use for |\n| --- | --- | --- |";

function rewrite(file, rows) {
  const text = readFileSync(file, "utf8");
  const s = text.indexOf(START);
  const e = text.indexOf(END);
  if (s === -1 || e === -1) return null;
  const existing = new Map();
  for (const m of text.slice(s, e).matchAll(/^\| `--([a-z0-9-]+)` \| .*? \| (.*) \|$/gm)) existing.set(m[1], m[2]);
  const body = rows.length
    ? rows.map(([n, v]) => `| \`--${n}\` | ${v} | ${existing.get(n) || defaultUse(n)} |`).join("\n")
    : "| _No tokens yet_ | | Follow the rules above |";
  const next = `${text.slice(0, s)}${START}\n${HEADER}\n${body}\n${text.slice(e)}`;
  return next === text ? null : next;
}

let changed = 0;
for (const [f, rowsFn] of Object.entries(GROUPS)) {
  const p = join(SKILL, "foundations", f);
  if (!existsSync(p)) continue;
  const next = rewrite(p, rowsFn());
  if (next) {
    changed++;
    if (CHECK) console.error(`stale: ${p}`);
    else writeFileSync(p, next);
  }
}

const invPath = join(SKILL, ".inventory.json");
if (existsSync(invPath)) {
  const inv = JSON.parse(readFileSync(invPath, "utf8"));
  const sorted = allNames();
  if (JSON.stringify(sorted) !== JSON.stringify(inv.tokens?.names)) {
    changed++;
    if (CHECK) console.error(`stale: ${invPath} tokens.names`);
    else {
      inv.tokens.names = sorted;
      writeFileSync(invPath, JSON.stringify(inv, null, 2) + "\n");
    }
  }
}

console.log(CHECK ? `${changed} stale file(s)` : `${changed} file(s) updated`);
if (CHECK && changed) process.exit(1);
