#!/usr/bin/env node
// Type-checks the complete code examples in skills/eluan: every ```tsx block that
// imports from "@eluan/core" (section 13 examples, pattern examples). Snippets
// without imports, and blocks under a "**Don't" label, are skipped: snippets are
// fragments and don't-examples are wrong on purpose.
//
// Blocks are written to node_modules/.cache/eluan-skills-examples and checked with
// the repo's TypeScript in strict mode against the built packages, so run
// `pnpm build` (or `pnpm -r build` in CI) first.
//
// Usage: node scripts/skills/check-examples.mjs

import { readFileSync, writeFileSync, readdirSync, mkdirSync, rmSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const SKILL = "skills/eluan";
const OUT = resolve("node_modules/.cache/eluan-skills-examples");
const CORE = resolve("packages/core");

for (const dts of ["packages/core/dist/index.d.ts", "packages/theme-generator/dist/index.d.ts"]) {
  if (!existsSync(dts)) {
    console.error(`Missing ${dts}. Build the packages first: pnpm -r build`);
    process.exit(1);
  }
}

// ---------- Collect blocks ----------

const files = ["SKILL.md", ...["foundations", "components", "patterns"].flatMap((d) =>
  readdirSync(join(SKILL, d)).filter((f) => f.endsWith(".md")).map((f) => `${d}/${f}`))];

const blocks = [];
for (const rel of files) {
  const lines = readFileSync(join(SKILL, rel), "utf8").split("\n");
  let label = null;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^#{2,3} /.test(line)) label = null;
    else if (/^\*\*(Do|Don't)\b/.test(line)) label = line.startsWith("**Don't") ? "dont" : "do";
    if (line !== "```tsx") continue;
    const start = i + 1;
    let end = start;
    while (end < lines.length && lines[end] !== "```") end++;
    const code = lines.slice(start, end).join("\n");
    i = end;
    if (label === "dont" || !/from "@eluan\/core"/.test(code)) continue;
    const name = `${rel.replace(/[/.]/g, "_")}_L${start + 1}.tsx`;
    blocks.push({ rel, line: start + 1, name, code });
  }
}

// ---------- Write and check ----------

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
for (const b of blocks) writeFileSync(join(OUT, b.name), b.code + "\n");

writeFileSync(
  join(OUT, "tsconfig.json"),
  JSON.stringify(
    {
      compilerOptions: {
        target: "ES2022",
        lib: ["ES2022", "DOM", "DOM.Iterable"],
        module: "ESNext",
        moduleResolution: "bundler",
        moduleDetection: "force",
        jsx: "react-jsx",
        strict: true,
        noEmit: true,
        skipLibCheck: true,
        allowUmdGlobalAccess: true,
        baseUrl: CORE,
        paths: {
          "@eluan/core": ["dist/index.d.ts"],
          "@eluan/theme-generator": [resolve("packages/theme-generator/dist/index.d.ts")],
          "*": ["node_modules/@types/*", "node_modules/*"],
        },
        typeRoots: [join(CORE, "node_modules/@types")],
        types: ["react", "react-dom"],
      },
      include: ["*.tsx"],
    },
    null,
    2,
  ),
);

const tsc = resolve("node_modules/typescript/bin/tsc");
const res = spawnSync(process.execPath, [tsc, "-p", join(OUT, "tsconfig.json"), "--pretty", "false"], {
  encoding: "utf8",
});
const output = `${res.stdout}${res.stderr}`;

// Map "file.tsx(12,5): error TS…" back to the markdown line.
const byName = new Map(blocks.map((b) => [b.name, b]));
const errors = [];
for (const m of output.matchAll(/^(\S+\.tsx)\((\d+),(\d+)\): error (TS\d+: .*)$/gm)) {
  const b = byName.get(m[1].split("/").pop());
  errors.push(b ? `${SKILL}/${b.rel}:${b.line + Number(m[2]) - 1}: ${m[4]}` : m[0]);
}
const other = output.split("\n").filter((l) => l.trim() && !/\.tsx\(\d+,\d+\): error/.test(l) && !/^\s/.test(l));

for (const e of errors) console.error(`error ${e}`);
for (const o of other) console.error(o);
console.log(`\n${blocks.length} examples checked, ${errors.length} error(s)`);
process.exit(res.status === 0 ? 0 : 1);
