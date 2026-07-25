import { cpSync, rmSync, readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const out = "storybook-dist";

// Single-package Storybook: publish core's Storybook at the site root so the
// deployed storybook-dist/ IS the core Storybook — no landing shim, no subdirs.
rmSync(out, { recursive: true, force: true });
cpSync("packages/core/storybook-static", out, { recursive: true });

// Storybook writes a generic static <title>; brand it (runtime title comes from
// the manager theme, but the static one is what crawlers and first paint see).
for (const file of ["index.html", "iframe.html"]) {
  const path = join(out, file);
  if (!existsSync(path)) continue;
  const html = readFileSync(path, "utf8");
  writeFileSync(path, html.replace(/<title>[^<]*<\/title>/, "<title>Eluan — Component Library</title>"));
}

console.log(`Assembled ${out}/ from core Storybook`);
