#!/usr/bin/env node
// Validates the Eluan agent skill. Usage: node check-skills.mjs [skillDir]
// Exits 1 on any error. Warnings (REVIEW markers) don't fail the run.

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.argv[2] ?? "skills/eluan";
const errors = [];
const warnings = [];

const COMPONENT_SECTIONS = [
  "1. Overview",
  "2. When to use",
  "3. Anatomy",
  "4. Variants",
  "5. Sizes",
  "6. States",
  "7. Content guidelines",
  "8. Rules",
  "9. Dos and don'ts",
  "10. Accessibility",
  "11. Behaviour",
  "12. API",
  "13. Examples",
  "14. Related components",
  "15. Common agent mistakes",
];
const COMPONENT_FRONTMATTER = ["name", "use_when", "instead_of"];

const kebab = (s) =>
  s.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/([A-Z])([A-Z][a-z])/g, "$1-$2").toLowerCase();

const read = (p) => readFileSync(p, "utf8");
const listMd = (dir) => (existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith(".md")) : []);

function frontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return null;
  const out = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^([A-Za-z_]+):\s*(.*)$/);
    if (kv) out[kv[1]] = kv[2].trim();
  }
  return out;
}

const headings = (text) => [...text.matchAll(/^## (.+)$/gm)].map((m) => m[1].trim());

// Router
const skillPath = join(ROOT, "SKILL.md");
if (!existsSync(skillPath)) {
  errors.push(`Missing ${skillPath}`);
} else {
  const skill = read(skillPath);
  const fm = frontmatter(skill);
  if (!fm?.name || !fm?.description) errors.push("SKILL.md: frontmatter needs name and description");
  for (const h of ["Rules", "How to work", "Decision tree", "Component index", "When nothing fits"]) {
    if (!headings(skill).includes(h)) errors.push(`SKILL.md: missing section "## ${h}"`);
  }
  // Every file the router links must exist
  for (const m of skill.matchAll(/`((?:components|foundations|patterns)\/[a-z0-9-]+\.md)`/g)) {
    if (!existsSync(join(ROOT, m[1]))) errors.push(`SKILL.md links ${m[1]}, which doesn't exist`);
  }
  // Every component file must be in the router
  for (const f of listMd(join(ROOT, "components"))) {
    if (!skill.includes(`components/${f}`)) errors.push(`SKILL.md: component index doesn't link components/${f}`);
  }
  if (skill.includes("{")) warnings.push("SKILL.md: template placeholders { } still present");
}

// Components
const tokenNames = new Set();
let tokenPrefix = null;
const invPath = join(ROOT, ".inventory.json");
let inventory = null;
if (existsSync(invPath)) {
  inventory = JSON.parse(read(invPath));
  for (const t of inventory.tokens?.names ?? []) tokenNames.add(t);
  tokenPrefix = inventory.tokens?.cssPrefix ?? null;
} else {
  warnings.push(".inventory.json missing: skipping coverage and token checks");
}

const checkTokens = (file, text) => {
  if (!tokenPrefix || tokenNames.size === 0) return;
  const re = new RegExp(`${tokenPrefix.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")}([a-z0-9-]+)`, "g");
  for (const m of text.matchAll(re)) {
    if (!tokenNames.has(m[1])) errors.push(`${file}: unknown token ${tokenPrefix}${m[1]}`);
  }
};

for (const f of listMd(join(ROOT, "components"))) {
  const p = join(ROOT, "components", f);
  const text = read(p);
  const fm = frontmatter(text);
  if (!fm) errors.push(`${p}: missing frontmatter`);
  else for (const k of COMPONENT_FRONTMATTER) if (!fm[k]) errors.push(`${p}: frontmatter missing "${k}"`);

  const hs = headings(text);
  let last = -1;
  for (const s of COMPONENT_SECTIONS) {
    const i = hs.indexOf(s);
    if (i === -1) errors.push(`${p}: missing section "## ${s}"`);
    else if (i < last) errors.push(`${p}: section "## ${s}" out of order`);
    else last = i;
  }
  if (!text.includes("<!-- api:start -->") || !text.includes("<!-- api:end -->"))
    errors.push(`${p}: missing api markers`);
  if (!/```tsx[\s\S]+?```/.test(text)) errors.push(`${p}: no tsx example`);
  // Relative links to sibling components must resolve
  for (const m of text.matchAll(/\]\(\.\/([a-z0-9-]+\.md)\)/g)) {
    if (!existsSync(join(ROOT, "components", m[1]))) errors.push(`${p}: links ./${m[1]}, which doesn't exist`);
  }
  checkTokens(p, text);
  const reviews = (text.match(/<!-- REVIEW/g) ?? []).length;
  if (reviews) warnings.push(`${p}: ${reviews} REVIEW marker(s)`);
}

// Coverage
if (inventory?.components) {
  for (const c of inventory.components) {
    const file = join(ROOT, "components", `${kebab(c.name)}.md`);
    if (!existsSync(file)) errors.push(`No guideline file for ${c.name} (expected ${file})`);
  }
}

// Foundations and patterns
for (const dir of ["foundations", "patterns"]) {
  for (const f of listMd(join(ROOT, dir))) {
    const p = join(ROOT, dir, f);
    const text = read(p);
    if (!frontmatter(text)?.name) errors.push(`${p}: frontmatter needs name`);
    if (!headings(text).includes("Rules")) errors.push(`${p}: missing "## Rules"`);
    checkTokens(p, text);
    const reviews = (text.match(/<!-- REVIEW/g) ?? []).length;
    if (reviews) warnings.push(`${p}: ${reviews} REVIEW marker(s)`);
  }
}

for (const w of warnings) console.warn(`warn  ${w}`);
for (const e of errors) console.error(`error ${e}`);
console.log(`\n${errors.length} error(s), ${warnings.length} warning(s)`);
process.exit(errors.length ? 1 : 0);
