# @eluan/theme-generator

CLI and library that generates accessible, light + dark mode [Eluan](https://github.com/vasfio/eluan) theme token sets from one to three accent colors. Contrast is checked (and auto-corrected) against a configurable minimum ratio, so generated themes are WCAG-aware out of the box.

The programmatic entry point (`@eluan/theme-generator`) is pure color math with no Node built-ins, so it runs in the browser as well as in Node. Only the `eluan-theme` binary touches the filesystem.

## Install

```bash
pnpm add -D @eluan/theme-generator
# or run without installing:
pnpm dlx @eluan/theme-generator generate --accent "#FF4A2C"
```

## CLI

The package exposes an `eluan-theme` binary.

```bash
# One or more accent colors (repeat --accent, up to 3)
eluan-theme generate --accent "#FF4A2C" --accent "#0F3D3E" --name ocean --out ./tokens

# Interactive mode (prompts for the values)
eluan-theme generate
```

Options:

| Flag | Default | Description |
|---|---|---|
| `--accent <hex>` | — | Accent color; repeat the flag for up to 3 |
| `--name <string>` | `custom` | Theme name |
| `--out <dir>` | `./tokens` | Output directory |
| `--min-contrast <num>` | `4.5` | Minimum contrast ratio to enforce |
| `--neutral-tint <num>` | `0.04` | Neutral tint ratio |
| `--config <path>` | — | Path to a JSON config file |

You can also drop a `eluan-theme.config.json` in your project root; CLI flags override its values.

```json
{ "name": "ocean", "accents": ["#FF4A2C"], "outDir": "./tokens" }
```

The generator writes primitive + semantic token JSON, theme CSS, and a smoke-test preview HTML you can open to eyeball the result.

## Programmatic API

```ts
import { generateTheme } from "@eluan/theme-generator"

const result = generateTheme({
  accents: ["#FF4A2C"],       // 1–3 hex accents
  themeName: "ocean",
  minContrast: 4.5,
  neutralTintRatio: 0.04,
})

result.css.theme          // drop-in CSS for both modes, as a string
result.createThemeTokens  // light-mode token map for createTheme()
result.report             // markdown report: warnings, contrast corrections
```

Lower-level helpers are exported too — `generateScale`, `buildPrimitives`, `buildSemanticMap`, `checkContrast`, `autoCorrect`, `compileThemeCSS`, `compileCreateThemeTokens`, and the `hexToOklch` / `oklchToHex` color utilities. See the exported TypeScript types for the full shape of `GeneratorResult`.

## Use in the browser

The package entry pulls in nothing from Node — no `fs`, no `crypto` — so you can import it in a client component and generate a theme live from user input. A `check:browser` script bundles the built entry with `esbuild --platform=browser` in CI to keep it that way.

```tsx
"use client"

import { generateTheme, compileCreateThemeTokens } from "@eluan/theme-generator"

function applyTheme(accent: string) {
  const result = generateTheme({
    accents: [accent],
    themeName: "live",
    minContrast: 4.5,
    neutralTintRatio: 0.04,
  })

  // Option A — inject the compiled CSS (both modes, scoped to data-theme="live")
  const style = document.createElement("style")
  style.textContent = result.css.theme
  document.head.append(style)
  document.documentElement.dataset.theme = "live"

  // Option B — take the raw token maps and hand them to createTheme()
  const light = result.createThemeTokens
  const dark = compileCreateThemeTokens(result.semanticMap, result.primitives, "dark")
  return { light, dark }
}
```

`generateTheme` is synchronous and typically runs in a few milliseconds, but it is pure CPU work — debounce it if you are calling it on every keystroke of a color input.

Each generated theme carries a short input fingerprint (`computeInputHash`) in its CSS header. It is a cache-busting marker derived from the accents and contrast settings, not a cryptographic digest.

## License

MIT
