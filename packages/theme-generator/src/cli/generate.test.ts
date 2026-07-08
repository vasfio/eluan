import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { execFileSync } from 'node:child_process';
import { writeFileSync, mkdirSync, rmSync, readFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';

const CLI_PATH = resolve(import.meta.dirname, '../../dist/cli/generate.js');

function run(args: string[], cwd?: string): { stdout: string; exitCode: number } {
  try {
    const stdout = execFileSync('node', [CLI_PATH, ...args], {
      encoding: 'utf-8',
      cwd,
      timeout: 15000,
    });
    return { stdout, exitCode: 0 };
  } catch (err: any) {
    return { stdout: (err.stdout ?? '') + (err.stderr ?? ''), exitCode: err.status ?? 1 };
  }
}

describe('CLI: bin entry point', () => {
  it('has shebang line', () => {
    const content = readFileSync(CLI_PATH, 'utf-8');
    expect(content.startsWith('#!/usr/bin/env node')).toBe(true);
  });

  it('shows help with no command', () => {
    const { stdout, exitCode } = run([]);
    expect(stdout).toContain('ragnar-theme generate');
    expect(exitCode).toBe(0);
  });

  it('shows help with --help', () => {
    const { stdout, exitCode } = run(['generate', '--help']);
    expect(stdout).toContain('--accent');
    expect(exitCode).toBe(0);
  });
});

describe('CLI: --name flag', () => {
  let outDir: string;

  beforeEach(() => {
    outDir = join(tmpdir(), `ragnar-test-name-${Date.now()}`);
  });

  afterEach(() => {
    rmSync(outDir, { recursive: true, force: true });
  });

  it('uses default name "custom" when --name not provided', () => {
    const { stdout, exitCode } = run(['generate', '--accent', '#FF4A2C', '--out', outDir]);
    expect(exitCode).toBe(0);
    expect(stdout).toContain('"custom"');

    const css = readFileSync(join(outDir, 'theme.css'), 'utf-8');
    expect(css).toContain('[data-theme="custom"]');
  });

  it('uses provided --name in CSS output', () => {
    const { stdout, exitCode } = run(['generate', '--accent', '#FF4A2C', '--name', 'ocean', '--out', outDir]);
    expect(exitCode).toBe(0);
    expect(stdout).toContain('"ocean"');

    const css = readFileSync(join(outDir, 'theme.css'), 'utf-8');
    expect(css).toContain('[data-theme="ocean"]');
    expect(css).not.toContain('[data-theme="custom"]');
  });
});

describe('CLI: config file support', () => {
  let outDir: string;
  let configDir: string;

  beforeEach(() => {
    outDir = join(tmpdir(), `ragnar-test-config-${Date.now()}`);
    configDir = join(tmpdir(), `ragnar-test-configdir-${Date.now()}`);
    mkdirSync(configDir, { recursive: true });
  });

  afterEach(() => {
    rmSync(outDir, { recursive: true, force: true });
    rmSync(configDir, { recursive: true, force: true });
  });

  it('reads explicit --config file', () => {
    const configPath = join(configDir, 'my-config.json');
    writeFileSync(configPath, JSON.stringify({
      name: 'from-config',
      accents: ['#FF4A2C'],
      outDir,
    }));

    const { stdout, exitCode } = run(['generate', '--config', configPath]);
    expect(exitCode).toBe(0);
    expect(stdout).toContain('"from-config"');

    const css = readFileSync(join(outDir, 'theme.css'), 'utf-8');
    expect(css).toContain('[data-theme="from-config"]');
  });

  it('auto-detects ragnar-theme.config.json in cwd', () => {
    writeFileSync(join(configDir, 'ragnar-theme.config.json'), JSON.stringify({
      name: 'auto-detected',
      accents: ['#0F3D3E'],
      outDir,
    }));

    const { stdout, exitCode } = run(['generate'], configDir);
    expect(exitCode).toBe(0);
    expect(stdout).toContain('"auto-detected"');
  });

  it('CLI flags override config file values', () => {
    const configPath = join(configDir, 'config.json');
    writeFileSync(configPath, JSON.stringify({
      name: 'from-config',
      accents: ['#FF4A2C'],
      outDir: join(outDir, 'wrong'),
    }));

    const { stdout, exitCode } = run([
      'generate', '--config', configPath,
      '--name', 'from-cli',
      '--accent', '#0F3D3E',
      '--out', outDir,
    ]);

    expect(exitCode).toBe(0);
    expect(stdout).toContain('"from-cli"');
    expect(stdout).toContain('#0F3D3E');

    const css = readFileSync(join(outDir, 'theme.css'), 'utf-8');
    expect(css).toContain('[data-theme="from-cli"]');
  });

  it('errors for missing --config file', () => {
    const { exitCode, stdout } = run(['generate', '--config', '/nonexistent/config.json']);
    expect(exitCode).toBe(1);
    expect(stdout).toContain('Config file not found');
  });
});

describe('CLI: generate command', () => {
  let outDir: string;

  beforeEach(() => {
    outDir = join(tmpdir(), `ragnar-test-gen-${Date.now()}`);
  });

  afterEach(() => {
    rmSync(outDir, { recursive: true, force: true });
  });

  it('generates all output files', () => {
    const { exitCode } = run(['generate', '--accent', '#FF4A2C', '--out', outDir]);
    expect(exitCode).toBe(0);
    expect(existsSync(join(outDir, 'primitives.json'))).toBe(true);
    expect(existsSync(join(outDir, 'semantic.json'))).toBe(true);
    expect(existsSync(join(outDir, 'theme.css'))).toBe(true);
    expect(existsSync(join(outDir, 'preview.html'))).toBe(true);
    expect(existsSync(join(outDir, 'report.md'))).toBe(true);
  });

  it('supports multiple accents', () => {
    const { stdout, exitCode } = run([
      'generate', '--accent', '#FF4A2C', '--accent', '#0F3D3E', '--out', outDir,
    ]);
    expect(exitCode).toBe(0);
    expect(stdout).toContain('#FF4A2C, #0F3D3E');
  });

  it('exits 1 for unknown command', () => {
    const { exitCode } = run(['unknown']);
    expect(exitCode).toBe(1);
  });
});
