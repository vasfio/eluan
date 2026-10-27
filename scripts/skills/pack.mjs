#!/usr/bin/env node
// Copies the agent skill into @eluan/core before it's packed, so the published
// package carries skills/eluan. Runs as @eluan/core's prepack; --clean (postpack)
// removes the copy again.
//
// Ships SKILL.md, DESIGN.md, foundations/, components/ and patterns/. Leaves out
// dotfiles (.inventory.json, .progress.json) and evals/, and strips
// <!-- REVIEW … --> comments: they're notes for maintainers, not guidance.
//
// Usage: node scripts/skills/pack.mjs [--clean]

import { readFileSync, writeFileSync, readdirSync, mkdirSync, rmSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");
const SRC = join(ROOT, "skills/eluan");
const DEST = join(ROOT, "packages/core/skills");

rmSync(DEST, { recursive: true, force: true });
if (process.argv.includes("--clean")) process.exit(0);

const SHIP = ["SKILL.md", "DESIGN.md", "foundations", "components", "patterns"];
let files = 0;
let stripped = 0;

function copy(rel) {
  const from = join(SRC, rel);
  const to = join(DEST, "eluan", rel);
  if (statSync(from).isDirectory()) {
    for (const f of readdirSync(from)) if (!f.startsWith(".")) copy(join(rel, f));
    return;
  }
  mkdirSync(dirname(to), { recursive: true });
  let text = readFileSync(from, "utf8");
  if (rel.endsWith(".md")) {
    text = text.replace(/[ \t]*<!-- REVIEW[\s\S]*?-->/g, () => {
      stripped++;
      return "";
    });
    text = text.replace(/\n{3,}/g, "\n\n");
  }
  writeFileSync(to, text);
  files++;
}

for (const entry of SHIP) copy(entry);
console.log(`skills: packed ${files} files into packages/core/skills/eluan (${stripped} REVIEW notes stripped)`);
