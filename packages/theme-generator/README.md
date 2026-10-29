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
| `--dark-lift <num>` | `0.08` | OKLCH lightness added to dark-mode colours, 0–0.2 |
| `--config <path>` | — | Path to a JSON config file |

You can also drop a `eluan-theme.config.json` in your project root; CLI flags override its values.

```json
{ "name": "ocean", "accents": ["#FF4A2C"], "outDir": "./tokens" }
```

The generator writes primitive + semantic token JSON, theme CSS, a smoke-test preview HTML you can open to eyeball the result, and the two files for applying the theme in both modes: `custom-theme.css` (register it like a `createTheme()` result) and `create-theme.json` (`{ name, tokens, modes }` for `createTheme()`).

## Programmatic API

```ts
import { generateTheme } from "@eluan/theme-generator"

const result = generateTheme({
  accents: ["#FF4A2C"],       // 1–3 hex accents
  themeName: "ocean",
  minContrast: 4.5,
  neutralTintRatio: 0.04,
  darkLift: 0.08,             // optional; brighter dark-mode colours (0 turns it off)
})

result.customTheme        // { name, extends, css }: pass to <EluanProvider customThemes={[…]} />
result.createThemeOptions // { tokens, modes: { dark } }: spread into createTheme() from @eluan/core
result.report             // markdown report: warnings, contrast corrections
result.css.theme          // standalone CSS for both modes, scoped to [data-theme="ocean"]
result.createThemeTokens  // light-mode token map only (kept for compatibility)
```

`customTheme` and `createThemeOptions` cover light and dark mode and layer on top of `minimal`, so its fonts and neutral ramp stay in place. `css.theme` replaces the theme instead, so it drops them; prefer the first two in apps that use `EluanProvider`.

### Brighter dark mode

Dark grounds swallow mid-tone colour, so dark mode resolves against `result.primitivesDark`: every colour ramp (accents and status hues, never neutral) lifted in OKLCH lightness by `darkLift`. The lift is full on steps 300–600 and tapers to nothing at 50 and 950, so surfaces and tints stay dark. Contrast is checked for every pair against the lifted ramp, and the report lists any corrections; on bright accents that usually means dark text on the primary button in dark mode. Light mode is unaffected.

Lower-level helpers are exported too — `generateScale`, `buildPrimitives`, `buildDarkPrimitives`, `buildSemanticMap`, `checkContrast`, `autoCorrect`, `compileThemeCSS`, `compileCreateThemeTokens`, `compileCustomThemeCSS`, and the `hexToOklch` / `oklchToHex` color utilities. See the exported TypeScript types for the full shape of `GeneratorResult`.

## Use in the browser

The package entry pulls in nothing from Node — no `fs`, no `crypto` — so you can import it in a client component and generate a theme live from user input. A `check:browser` script bundles the built entry with `esbuild --platform=browser` in CI to keep it that way.

```tsx
"use client"

import { generateTheme } from "@eluan/theme-generator"

function applyTheme(accent: string) {
  const { customTheme, createThemeOptions } = generateTheme({
    accents: [accent],
    themeName: "live",
    minContrast: 4.5,
    neutralTintRatio: 0.04,
  })

  // Option A — with EluanProvider: register it and switch to it
  //   <EluanProvider customThemes={[customTheme]} /> … setTheme("live")

  // Option B — without the Provider: inject the CSS and set the attributes it targets
  const style = document.createElement("style")
  style.textContent = customTheme.css
  document.head.append(style)
  document.documentElement.dataset.theme = "minimal"
  document.documentElement.dataset.themeCustom = "live"

  // Option C — the token maps, for createTheme({ name: "live", ...createThemeOptions })
  return createThemeOptions
}
```

`generateTheme` is synchronous and typically runs in a few milliseconds, but it is pure CPU work — debounce it if you are calling it on every keystroke of a color input.

Each generated theme carries a short input fingerprint (`computeInputHash`) in its CSS header. It is a cache-busting marker derived from the accents and contrast settings, not a cryptographic digest.

## License

MIT
