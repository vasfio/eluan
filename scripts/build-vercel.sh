#!/bin/bash
set -ex

echo "=== Node version ==="
node --version

echo "=== pnpm version ==="
pnpm --version

echo "=== Working directory ==="
pwd

echo "=== Building tokens ==="
pnpm --filter @eluan/tokens build

echo "=== Building core ==="
pnpm --filter @eluan/core build

echo "=== Building core storybook ==="
pnpm --filter @eluan/core build-storybook

echo "=== Building web storybook ==="
pnpm --filter @eluan/web build-storybook

echo "=== Assembling storybook ==="
node scripts/assemble-storybook.mjs

echo "=== storybook-dist contents ==="
ls -la storybook-dist/
