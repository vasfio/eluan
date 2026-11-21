#!/usr/bin/env node
// Rewrites the component index between <!-- index:start --> and <!-- index:end -->
// in skills/eluan/SKILL.md from each component file's frontmatter
// (name, use_when, instead_of).
// Usage: node scripts/skills/generate-index.mjs [--check]

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const SKILL = "skills/eluan";
const CHECK = process.argv.includes("--check");
const START = "<!-- index:start -->";
const END = "<!-- index:end -->";

function frontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return {};
  const out = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^([A-Za-z_]+):\s*(.*)$/);
    if (kv) out[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, "");
  }
  return out;
}

// Escape backslashes first, so a `\` already in the text can't cancel the pipe escape.
const cell = (s = "") => s.replace(/\\/g, "\\\\").replace(/\|/g, "\\|");

const rows = readdirSync(join(SKILL, "components"))
  .filter((f) => f.endsWith(".md"))
  .sort()
  .map((f) => {
    const fm = frontmatter(readFileSync(join(SKILL, "components", f), "utf8"));
    return `| ${fm.name ?? f} | ${cell(fm.use_when)} | ${cell(fm.instead_of)} | \`components/${f}\` |`;
  });

const path = join(SKILL, "SKILL.md");
const text = readFileSync(path, "utf8");
const s = text.indexOf(START);
const e = text.indexOf(END);
if (s === -1 || e === -1) {
  console.error(`${path}: missing index markers`);
  process.exit(1);
}
const next = `${text.slice(0, s)}${START}\n| Component | Use when | Instead, use | File |\n| --- | --- | --- | --- |\n${rows.join("\n")}\n${text.slice(e)}`;

if (next === text) console.log("index up to date");
else if (CHECK) {
  console.error(`stale: ${path} component index`);
  process.exit(1);
} else {
  writeFileSync(path, next);
  console.log(`index: ${rows.length} components`);
}
