# @eluan/theme-generator

CLI and library that generates accessible, light + dark mode [Eluan](https://github.com/vasfio/eluan) theme token sets from one to three accent colors. Contrast is checked (and auto-corrected) against a configurable minimum ratio, so generated themes are WCAG-aware out of the box.

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
  name: "ocean",
  accents: ["#FF4A2C"],
  minContrast: 4.5,
})
```

Lower-level helpers are exported too — `generateScale`, `buildPrimitives`, `buildSemanticMap`, `checkContrast`, `autoCorrect`, `compileThemeCSS`, and the `hexToOklch` / `oklchToHex` color utilities. See the exported TypeScript types for the full shape of `GeneratorResult`.

## License

MIT
