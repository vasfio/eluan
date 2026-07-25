import { cpSync, rmSync } from "fs";

const out = "storybook-dist";

// Single-package Storybook: publish core's Storybook at the site root so the
// deployed storybook-dist/ IS the core Storybook — no landing shim, no subdirs.
rmSync(out, { recursive: true, force: true });
cpSync("packages/core/storybook-static", out, { recursive: true });

console.log(`Assembled ${out}/ from core Storybook`);
