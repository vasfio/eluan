import type { Theme } from "@vasf/ragnar-tokens"

// ============================================
// createTheme — define a custom theme with token overrides
// ============================================
// A custom theme inherits all ~150 tokens from a built-in `extends` theme
// and only overrides the ones you specify.
//
// CSS doesn't have selector inheritance, so we can't simply emit
// `[data-theme="acme"] { …a few tokens… }` and expect the rest to fall
// through from `industrial-retro`. Instead, the Provider sets two attributes
// on the target element when a custom theme is active:
//
//   <html data-theme="industrial-retro" data-theme-custom="acme">
//
// `data-theme` carries the BASE theme so all 150 base tokens activate via
// Ragnar's existing `[data-theme="industrial-retro"]` rule. Then a separate
// `[data-theme-custom="acme"]` rule (emitted by `createTheme`) overrides
// just the tokens listed in `tokens`. The custom rule loads after the base
// (via the Provider's injected `<style>`) so equal-specificity overrides win.

/** A semantic token name (CSS custom property), e.g. "--container-bg". */
export type ThemeTokenName = `--${string}`

/**
 * Map of token names to CSS values. Examples:
 *   "--action-primary-bg":       "#4f46e5"
 *   "--action-primary-bg-hover": "rgb(67 56 202)"
 *   "--font-heading":            '"Acme Display", serif'
 */
export type ThemeTokenOverrides = Partial<Record<ThemeTokenName, string>>

export interface CreateThemeOptions {
  /** Theme name — used as `data-theme-custom="..."` selector. Must be unique. */
  name: string
  /**
   * Built-in theme this custom theme inherits from. Tokens not overridden
   * fall through to this theme. Defaults to `"industrial-retro"`.
   */
  extends?: Theme
  /** CSS variables to override. Everything else is inherited from `extends`. */
  tokens: ThemeTokenOverrides
}

export interface CustomTheme {
  /** Unique theme name. */
  name: string
  /** Built-in theme this custom theme inherits from. */
  extends: Theme
  /**
   * Generated CSS rule. Targets `[data-theme-custom="<name>"]` so it layers
   * on top of the base theme's `[data-theme="<extends>"]` rule.
   */
  css: string
}

/**
 * Define a custom Ragnar theme by overriding tokens on top of a built-in
 * theme. Returns a `CustomTheme` object you pass to
 * `<RagnarProvider customThemes={[...]} />`.
 *
 * @example
 * const acme = createTheme({
 *   name: "acme",
 *   extends: "industrial-retro",
 *   tokens: {
 *     "--action-primary-bg": "#4f46e5",
 *     "--action-primary-bg-hover": "#4338ca",
 *     "--font-heading": '"Acme Display", serif',
 *   },
 * })
 */
export function createTheme(options: CreateThemeOptions): CustomTheme {
  const { name, extends: base = "industrial-retro", tokens } = options

  if (!/^[a-z][a-z0-9-]*$/i.test(name)) {
    throw new Error(
      `createTheme: invalid theme name "${name}". Names must start with a letter and contain only letters, digits, and hyphens.`
    )
  }

  const declarations = Object.entries(tokens)
    .map(([prop, value]) => `  ${prop}: ${value};`)
    .join("\n")

  // Custom themes target a separate attribute so they layer on top of the
  // base theme without conflict. The Provider sets BOTH `data-theme=<base>`
  // and `data-theme-custom=<name>` on the target element.
  const css = `[data-theme-custom="${name}"] {\n${declarations}\n}`

  return { name, extends: base, css }
}
