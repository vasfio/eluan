// Turns the built viewer into a Claude Artifact page. The host wraps the page
// in its own document, so this keeps only what goes inside <head> and <body>
// (minus the charset and viewport metas the host adds) and writes
// dist/artifact.html. Publish that file with the rest of dist/ as its files.
//
//   pnpm --filter @eluan/core exec vite build --config ../../skills/eluan/evals/viewer/vite.config.mjs
//   node skills/eluan/evals/viewer/artifact.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const dist = resolve(dirname(fileURLToPath(import.meta.url)), "dist");
const html = readFileSync(resolve(dist, "index.html"), "utf8");

const head = html
  .match(/<head>([\s\S]*)<\/head>/)[1]
  .replace(/\s*<meta charset="UTF-8" \/>/, "")
  .replace(/\s*<meta name="viewport"[^>]*\/>/, "");
const body = html.match(/<body>([\s\S]*)<\/body>/)[1];

writeFileSync(resolve(dist, "artifact.html"), `${head.trim()}\n${body.trim()}\n`);
console.log("wrote dist/artifact.html");
