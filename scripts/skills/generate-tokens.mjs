#!/usr/bin/env node
// Rewrites the token tables between <!-- tokens:start --> and <!-- tokens:end -->
// in skills/eluan/foundations/*.md from packages/tokens/src/*.css, and refreshes
// tokens.names in skills/eluan/.inventory.json.
// Values resolve against the default context: theme minimal, mode light,
// spacing standard, curves slight, fluid typeset. Hand-edited "Use for" cells
// are kept; new tokens get a default description.
// Usage: node scripts/skills/generate-tokens.mjs [--check]

import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const TOKENS = "packages/tokens/src";
const SKILL = "skills/eluan";
const CHECK = process.argv.includes("--check");

// ---------- CSS parsing ----------

// Returns [{ selector, decls: Map }] for top-level rules, plus rules inside @media.
function parseCss(text) {
  const src = text.replace(/\/\*[\s\S]*?\*\//g, "");
  const rules = [];
  const walk = (s, media) => {
    let i = 0;
    while (i < s.length) {
      const open = s.indexOf("{", i);
      if (open === -1) break;
      const selector = s.slice(i, open).trim().replace(/^[;\s]+/, "");
      let depth = 1;
      let j = open + 1;
      while (j < s.length && depth) {
        if (s[j] === "{") depth++;
        else if (s[j] === "}") depth--;
        j++;
      }
      const body = s.slice(open + 1, j - 1);
      if (selector.startsWith("@media")) walk(body, selector);
      else if (!selector.startsWith("@")) {
        const decls = new Map();
        for (const m of body.matchAll(/(--[a-zA-Z0-9-]+)\s*:\s*([^;]+);/g)) decls.set(m[1], m[2].trim());
        rules.push({ selector, media, decls });
      }
      i = j;
    }
  };
  walk(src, null);
  return rules;
}

const files = Object.fromEntries(
  readdirSync(TOKENS)
    .filter((f) => f.endsWith(".css"))
    .map((f) => [f, parseCss(readFileSync(join(TOKENS, f), "utf8"))]),
);

const block = (file, selector, media = null) => {
  const r = files[file]?.find((x) => x.selector.includes(selector) && x.media === media);
  return r ? r.decls : new Map();
};

// Default context, in cascade order.
function context({ mode = "light", spacing = "standard", curves = "slight", typeset = null } = {}) {
  const ctx = new Map();
  const add = (m) => m.forEach((v, k) => ctx.set(k, v));
  add(block("primitives.css", ":root"));
  add(block("modes.css", `[data-mode="${mode}"]`));
  add(block("themes.css", ":root"));
  add(block("themes.css", '[data-theme="minimal"]'));
  add(block("spacing.css", `[data-spacing="${spacing}"]`));
  add(block("curves.css", `[data-curves="${curves}"]`));
  add(block("typeset.css", ":root"));
  if (typeset) add(block("typeset.css", `[data-typeset="${typeset}"]`));
  return ctx;
}

function resolve(ctx, value, seen = new Set()) {
  return value.replace(/var\((--[a-zA-Z0-9-]+)(?:,\s*([^)]+))?\)/g, (_, name, fallback) => {
    if (seen.has(name)) return name;
    const v = ctx.get(name);
    if (v === undefined) return fallback ?? name;
    return resolve(ctx, v, new Set([...seen, name]));
  });
}

const remToPx = (v) =>
  v.replace(/(-?\d*\.?\d+)rem\b/g, (_, n) => `${+(parseFloat(n) * 16).toFixed(2)}px`);

const DEFAULT = context();
const alias = (name) => {
  const raw = DEFAULT.get(`--${name}`);
  const m = raw?.match(/^var\((--[a-zA-Z0-9-]+)\)$/);
  return m ? m[1] : null;
};
const value = (name, ctx = DEFAULT) => remToPx(resolve(ctx, `var(--${name})`));

// ---------- Groups per foundation file ----------

const COLOUR_FAMILIES = [
  "container", "interactive", "action-primary", "action-secondary", "action-tertiary",
  "destructive", "cautionary", "positive", "informative", "important",
];
const STEP_ORDER = ["6", "5", "4", "3", "2", "1", "0", "neg1", "neg2", "neg3"];
const SCALE_ORDER = ["xxs", "xs", "sm", "base", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl"];
const scaleSort = (a, b, prefix) =>
  SCALE_ORDER.indexOf(a.slice(prefix.length)) - SCALE_ORDER.indexOf(b.slice(prefix.length));

const themeNames = [...block("themes.css", '[data-theme="minimal"]').keys()].map((k) => k.slice(2));
const modeNames = [...block("modes.css", '[data-mode="light"]').keys()].map((k) => k.slice(2));
const spacingNames = [...block("spacing.css", '[data-spacing="standard"]').keys()].map((k) => k.slice(2));
const curveNames = [...block("curves.css", '[data-curves="slight"]').keys()].map((k) => k.slice(2));

const densityValue = (name) => {
  const std = value(name);
  const c = value(name, context({ spacing: "compact" }));
  const w = value(name, context({ spacing: "wide" }));
  return `${std} (compact ${c}, wide ${w})`;
};
const curvesValue = (name) => {
  const s = value(name);
  const sharp = value(name, context({ curves: "sharp" }));
  const sweep = value(name, context({ curves: "sweeping" }));
  return `${s} (sharp ${sharp}, sweeping ${sweep})`;
};
const fluidValue = (name) => {
  const small = value(name, context({ typeset: "small" }));
  const large = value(name, context({ typeset: "large" }));
  return `${small} → ${large}, fluid`;
};
const colourValue = (name) => {
  const a = alias(name);
  const light = value(name);
  const dark = value(name, context({ mode: "dark" }));
  const resolved = light === dark ? light : `${light} / dark ${dark}`;
  return a ? `\`${a}\` → ${resolved}` : resolved;
};

const GROUPS = {
  "colour.md": () =>
    COLOUR_FAMILIES.flatMap((f) => themeNames.filter((n) => n.startsWith(`${f}-`)))
      .concat(modeNames.filter((n) => n === "overlay-bg" || n === "tooltip-bg"))
      .concat(themeNames.filter((n) => n.startsWith("dataviz-")))
      .map((n) => [n, colourValue(n)]),
  "typography.md": () => [
    ...themeNames.filter((n) => n.startsWith("font-")).map((n) => [n, value(n).split(",")[0]]),
    ...spacingNames
      .filter((n) => n.startsWith("font-size-"))
      .sort((a, b) => scaleSort(a, b, "font-size-"))
      .map((n) => [n, `\`${alias(n)}\` (density shifts one step)`]),
    ...["font-size-step-", "line-height-step-", "letter-spacing-step-"].flatMap((p) =>
      STEP_ORDER.map((s) => `${p}${s}`).map((n) => [n, p === "font-size-step-" ? fluidValue(n) : value(n)]),
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
  "action-tertiary": "Tertiary (ghost) actions", destructive: "Destructive status and actions",
  cautionary: "Caution status (the `caution` tone)", positive: "Positive status",
  informative: "Informative status", important: "Important status",
};
function defaultUse(name) {
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
    : "| _No tokens yet_ | | See the token plan below |";
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
  const names = new Set();
  for (const rules of Object.values(files)) for (const r of rules) for (const k of r.decls.keys()) names.add(k.slice(2));
  const sorted = [...names].sort();
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
