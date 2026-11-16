import * as stylex from "@stylexjs/stylex"

// Shared text colours for Typography and Icon. Internal module: the type is
// re-exported by both components, the styles are not exported from the package.

/**
 * A foreground colour from the theme.
 *
 * - `default`, `muted`, `inverse`: body text, secondary text, text on an
 *   inverse surface (`--container-fg*`).
 * - `inherit`: the parent's colour, for text inside a Banner, Button or link.
 * - `positive`, `destructive`: status text, such as a success or error
 *   message (`--positive-fg`, `--destructive-fg`, both held to 4.5:1).
 * - `interactive`, `interactive-muted`: text on a control you build
 *   yourself, such as a custom menu trigger (`--interactive-fg*`).
 */
export type Tone =
  | "default"
  | "muted"
  | "inverse"
  | "inherit"
  | "positive"
  | "destructive"
  | "interactive"
  | "interactive-muted"

export const toneStyles = stylex.create({
  default: { color: "var(--container-fg)" },
  muted: { color: "var(--container-fg-alt)" },
  inverse: { color: "var(--container-fg-inverse)" },
  inherit: { color: "inherit" },
  positive: { color: "var(--positive-fg)" },
  destructive: { color: "var(--destructive-fg)" },
  interactive: { color: "var(--interactive-fg)" },
  "interactive-muted": { color: "var(--interactive-fg-alt)" },
})
