#!/usr/bin/env node

import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { parseArgs } from 'node:util';
import prompts from 'prompts';
import { generateTheme } from '../generate.js';
import { generateSmokeHTML } from '../preview/smoke.js';
import { compilePrimitivesJSON, compileSemanticJSON } from '../compile/css.js';
import { normalizeHex } from '../input/validate.js';
import type { GeneratorConfig } from '../types.js';

type ConfigFile = {
  name?: string;
  accents?: string[];
  outDir?: string;
  minContrast?: number;
  neutralTintRatio?: number;
};

function printUsage() {
  console.log(`
ragnar-theme generate — Generate a complete Ragnar theme from accent colors

Usage:
  ragnar-theme generate --accent "#FF4A2C" [--accent "#0F3D3E"] [options]
  ragnar-theme generate                     (interactive mode)

Options:
  --accent <hex>          Accent color (1-3 allowed, repeat flag for multiple)
  --name <string>         Theme name (default: "custom")
  --out <dir>             Output directory (default: ./tokens)
  --min-contrast <num>    Minimum contrast ratio (default: 4.5)
  --neutral-tint <num>    Neutral tint ratio (default: 0.04)
  --config <path>         Path to config file (JSON)
  --help                  Show this help

Config file:
  Place a ragnar-theme.config.json in your project root, or pass --config <path>.
  Schema: { "name": "ocean", "accents": ["#FF4A2C"], "outDir": "./tokens" }
  CLI flags override config file values.
`);
}

function loadConfigFile(configPath?: string): ConfigFile | null {
  if (configPath) {
    const resolved = resolve(configPath);
    if (!existsSync(resolved)) {
      console.error(`Config file not found: ${resolved}`);
      process.exit(1);
    }
    return JSON.parse(readFileSync(resolved, 'utf-8'));
  }

  const defaultPath = resolve('ragnar-theme.config.json');
  if (existsSync(defaultPath)) {
    return JSON.parse(readFileSync(defaultPath, 'utf-8'));
  }

  return null;
}

function isValidHex(input: string): boolean {
  return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(input.trim());
}

async function runInteractive(): Promise<GeneratorConfig & { outDir: string }> {
  console.log('');
  console.log('ragnar-theme — Interactive theme generator');
  console.log('');

  const nameResponse = await prompts({
    type: 'text',
    name: 'themeName',
    message: 'Theme name',
    initial: 'custom',
    validate: (v: string) => v.trim().length > 0 || 'Theme name cannot be empty',
  });

  if (!nameResponse.themeName) process.exit(0);

  const accents: string[] = [];

  for (let i = 0; i < 3; i++) {
    const label = i === 0 ? 'Primary accent color (hex)' : `Accent color ${i + 1} (hex, leave empty to skip)`;
    const response = await prompts({
      type: 'text',
      name: 'color',
      message: label,
      validate: (v: string) => {
        if (i > 0 && v.trim() === '') return true;
        if (i === 0 && v.trim() === '') return 'At least one accent color is required';
        return isValidHex(v) || 'Invalid hex color. Use #RGB, #RRGGBB, or #RRGGBBAA format.';
      },
    });

    if (response.color === undefined) process.exit(0);
    if (response.color.trim() === '') break;

    try {
      const { hex } = normalizeHex(response.color);
      accents.push(hex);
    } catch {
      console.error(`Invalid color: ${response.color}`);
      process.exit(1);
    }
  }

  const outResponse = await prompts({
    type: 'text',
    name: 'outDir',
    message: 'Output directory',
    initial: './tokens',
  });

  if (!outResponse.outDir) process.exit(0);

  console.log('');
  console.log('Summary:');
  console.log(`  Theme name: ${nameResponse.themeName}`);
  console.log(`  Accents:    ${accents.join(', ')}`);
  console.log(`  Output:     ${resolve(outResponse.outDir)}`);
  console.log('');

  const confirm = await prompts({
    type: 'confirm',
    name: 'proceed',
    message: 'Generate theme?',
    initial: true,
  });

  if (!confirm.proceed) {
    console.log('Aborted.');
    process.exit(0);
  }

  return {
    accents,
    themeName: nameResponse.themeName,
    minContrast: 4.5,
    neutralTintRatio: 0.04,
    outDir: outResponse.outDir,
  };
}

function parseCliArgs(): (GeneratorConfig & { outDir: string }) | null {
  const { values } = parseArgs({
    options: {
      accent: { type: 'string', multiple: true },
      name: { type: 'string' },
      out: { type: 'string' },
      'min-contrast': { type: 'string' },
      'neutral-tint': { type: 'string' },
      config: { type: 'string' },
      help: { type: 'boolean', default: false },
    },
    allowPositionals: true,
    strict: false,
  });

  if (values.help) {
    printUsage();
    process.exit(0);
  }

  const config = loadConfigFile(values.config as string | undefined);

  const cliAccents = values.accent as string[] | undefined;
  const accents = (cliAccents && cliAccents.length > 0) ? cliAccents : (config?.accents ?? []);
  const themeName = (values.name as string | undefined) ?? config?.name ?? 'custom';
  const minContrast = values['min-contrast']
    ? parseFloat(values['min-contrast'] as string)
    : (config?.minContrast ?? 4.5);
  const neutralTintRatio = values['neutral-tint']
    ? parseFloat(values['neutral-tint'] as string)
    : (config?.neutralTintRatio ?? 0.04);
  const outDir = (values.out as string | undefined) ?? config?.outDir ?? './tokens';

  if (accents.length === 0) {
    return null;
  }

  return { accents, themeName, minContrast, neutralTintRatio, outDir };
}

function generate(opts: GeneratorConfig & { outDir: string }) {
  const { outDir, ...config } = opts;
  const resolvedOut = resolve(outDir);

  console.log(`Generating theme "${config.themeName}"...`);
  console.log(`  Accents: ${config.accents.join(', ')}`);
  console.log(`  Min contrast: ${config.minContrast}:1`);
  console.log(`  Output: ${resolvedOut}`);
  console.log('');

  const result = generateTheme(config);

  mkdirSync(resolvedOut, { recursive: true });

  writeFileSync(
    join(resolvedOut, 'primitives.json'),
    compilePrimitivesJSON(result.primitives)
  );

  writeFileSync(
    join(resolvedOut, 'semantic.json'),
    compileSemanticJSON(result.semanticMap, result.primitives)
  );

  const fullCSS = [
    result.css.primitives,
    '',
    result.css.theme,
  ].join('\n\n');
  writeFileSync(join(resolvedOut, 'theme.css'), fullCSS);

  const previewHTML = generateSmokeHTML(
    result.primitives,
    result.semanticMap,
    config.themeName
  );
  writeFileSync(join(resolvedOut, 'preview.html'), previewHTML);

  writeFileSync(join(resolvedOut, 'report.md'), result.report);

  if (result.corrections.length > 0) {
    console.log(`⚠ ${result.corrections.length} contrast correction(s) applied:`);
    for (const c of result.corrections) {
      console.log(`  ${c.token} (${c.mode}): ${c.originalRef} → ${c.correctedRef} (${c.originalContrast.toFixed(2)} → ${c.correctedContrast.toFixed(2)})`);
    }
    console.log('');
  }

  console.log('Output files:');
  console.log(`  ${join(resolvedOut, 'primitives.json')}`);
  console.log(`  ${join(resolvedOut, 'semantic.json')}`);
  console.log(`  ${join(resolvedOut, 'theme.css')}`);
  console.log(`  ${join(resolvedOut, 'preview.html')}`);
  console.log(`  ${join(resolvedOut, 'report.md')}`);
  console.log('');
  console.log('Done.');
}

async function main() {
  const command = process.argv[2];

  if (command !== 'generate') {
    printUsage();
    process.exit(command ? 1 : 0);
  }

  let opts = parseCliArgs();

  if (!opts) {
    opts = await runInteractive();
  }

  generate(opts);
}

main();
