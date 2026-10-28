// Shared token reading for the skills scripts: parses packages/tokens/src/*.css
// and resolves values against a theme/mode/spacing/curves/typeset context.
// Run the scripts from the repo root.

import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

export const TOKENS = "packages/tokens/src";

// Returns [{ selector, media, decls: Map }] for top-level rules and rules inside @media.
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

export const files = Object.fromEntries(
  readdirSync(TOKENS)
    .filter((f) => f.endsWith(".css"))
    .map((f) => [f, parseCss(readFileSync(join(TOKENS, f), "utf8"))]),
);

export const block = (file, selector, media = null) => {
  const r = files[file]?.find((x) => x.selector.includes(selector) && x.media === media);
  return r ? r.decls : new Map();
};

// Default context, in cascade order.
export function context({ mode = "light", spacing = "standard", curves = "slight", typeset = null } = {}) {
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

export const DEFAULT = context();

// The mode alias a token points to, e.g. "--backgrounds-primary", or null.
export const alias = (name) => {
  const raw = DEFAULT.get(`--${name}`);
  const m = raw?.match(/^var\((--[a-zA-Z0-9-]+)\)$/);
  return m ? m[1] : null;
};

export const value = (name, ctx = DEFAULT) => remToPx(resolve(ctx, `var(--${name})`));

const STEP_ORDER = ["6", "5", "4", "3", "2", "1", "0", "neg1", "neg2", "neg3"];
const SCALE_ORDER = ["xxs", "xs", "sm", "base", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl"];
export const steps = STEP_ORDER;
export const scaleSort = (a, b, prefix) =>
  SCALE_ORDER.indexOf(a.slice(prefix.length)) - SCALE_ORDER.indexOf(b.slice(prefix.length));

export const COLOUR_FAMILIES = [
  "container", "interactive", "action-primary", "action-secondary", "action-tertiary",
  "destructive", "cautionary", "positive", "informative", "important",
];

export const themeNames = [...block("themes.css", '[data-theme="minimal"]').keys()].map((k) => k.slice(2));
export const modeNames = [...block("modes.css", '[data-mode="light"]').keys()].map((k) => k.slice(2));
export const spacingNames = [...block("spacing.css", '[data-spacing="standard"]').keys()].map((k) => k.slice(2));
export const curveNames = [...block("curves.css", '[data-curves="slight"]').keys()].map((k) => k.slice(2));

// Semantic colour tokens in display order (families, scrim and tooltip, then dataviz).
export const colourNames = () =>
  COLOUR_FAMILIES.flatMap((f) => themeNames.filter((n) => n.startsWith(`${f}-`)))
    .concat(modeNames.filter((n) => n === "focus-ring" || n === "overlay-bg" || n === "tooltip-bg"))
    .concat(themeNames.filter((n) => n.startsWith("dataviz-")));

export const densityValue = (name) => {
  const std = value(name);
  const c = value(name, context({ spacing: "compact" }));
  const w = value(name, context({ spacing: "wide" }));
  return `${std} (compact ${c}, wide ${w})`;
};
export const curvesValue = (name) => {
  const s = value(name);
  const sharp = value(name, context({ curves: "sharp" }));
  const sweep = value(name, context({ curves: "sweeping" }));
  return `${s} (sharp ${sharp}, sweeping ${sweep})`;
};
export const fluidRange = (name) => [
  value(name, context({ typeset: "small" })),
  value(name, context({ typeset: "large" })),
];

// Every custom property defined anywhere in the token CSS, without the leading dashes.
export const allNames = () => {
  const names = new Set();
  for (const rules of Object.values(files)) for (const r of rules) for (const k of r.decls.keys()) names.add(k.slice(2));
  return [...names].sort();
};
