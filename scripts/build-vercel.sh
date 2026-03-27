#!/bin/bash
set -ex

echo "=== Node version ==="
node --version

echo "=== pnpm version ==="
pnpm --version

echo "=== Working directory ==="
pwd

echo "=== Building tokens ==="
pnpm --filter @vasf/ragnar-tokens build

echo "=== Building core ==="
pnpm --filter @vasf/ragnar-core build

echo "=== Building core storybook ==="
pnpm --filter @vasf/ragnar-core build-storybook

echo "=== Building web storybook ==="
pnpm --filter @vasf/ragnar-web build-storybook

echo "=== Assembling storybook ==="
node scripts/assemble-storybook.mjs

echo "=== storybook-dist contents ==="
ls -la storybook-dist/
