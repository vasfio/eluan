#!/bin/bash
set -ex

pnpm --filter @vasf/ragnar-tokens build
pnpm --filter @vasf/ragnar-core build
pnpm --filter @vasf/ragnar-core build-storybook
pnpm --filter @vasf/ragnar-web build-storybook
node scripts/assemble-storybook.mjs

echo "=== storybook-dist contents ==="
ls -la storybook-dist/
