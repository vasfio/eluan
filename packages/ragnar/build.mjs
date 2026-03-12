#!/usr/bin/env node
/**
 * Ragnar umbrella build script
 * Builds each sub-package and copies dist artifacts into this package.
 */

import { execSync } from 'child_process'
import { cpSync, mkdirSync, rmSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '../..')
const pkgs = resolve(__dirname, '..')

function run(cmd, cwd = root) {
  console.log(`\n▶ ${cmd}`)
  execSync(cmd, { cwd, stdio: 'inherit' })
}

function copyDist(srcPackage, destDir) {
  const src = resolve(pkgs, srcPackage, 'dist')
  const dest = resolve(__dirname, destDir)
  console.log(`\n📂 Copying ${srcPackage}/dist → ${destDir}/`)
  rmSync(dest, { recursive: true, force: true })
  mkdirSync(dest, { recursive: true })
  cpSync(src, dest, { recursive: true })
}

// 1. Build sub-packages in dependency order
run('pnpm --filter @ragnar/tokens build')
run('pnpm --filter @ragnar/core build')
run('pnpm --filter @ragnar/web build')
run('pnpm --filter @ragnar/native build')

// 2. Copy dist artifacts into umbrella package
copyDist('tokens', 'tokens')
copyDist('core', 'core')
copyDist('web', 'web')
copyDist('native', 'native')

console.log('\n✅ Ragnar umbrella build complete!')
