import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import * as stylex from "@stylexjs/stylex"
import { withClassHook, withoutStyling, type LayoutSize, type LayoutSpacing } from "./layout-shared"
import { toneStyles, type Tone } from "./tone-shared"

export type { LayoutSize, LayoutSpacing } from "./layout-shared"

/** The icon's colour. `inherit` (the default) takes the surrounding text colour. */
export type IconTone = Tone

export interface IconProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "className" | "style"> {
  /** Trailing gap, for an icon followed by a label outside a gapped Row. */
  after?: LayoutSpacing
  /** Size the child svg itself instead of wrapping it in a span (Radix Slot). */
  asChild?: boolean
  /** Width and height, as a `--size-*` token name. */
  size?: LayoutSize
  /** Colour, from the same tones as Typography. Defaults to `"inherit"` (the text colour around it). */
  tone?: IconTone
}

const styles = stylex.create({
  base: {
    alignItems: "center",
    display: "inline-flex",
    flexShrink: 0,
    justifyContent: "center",
    // In running text, centre on the x-height instead of sitting on the
    // baseline, where the icon rides high. Flex parents ignore it.
    verticalAlign: "middle",
  },
})

const sizeStyles = stylex.create({
  xxs: { height: "var(--size-xxs)", width: "var(--size-xxs)" },
  xs: { height: "var(--size-xs)", width: "var(--size-xs)" },
  sm: { height: "var(--size-sm)", width: "var(--size-sm)" },
  md: { height: "var(--size-md)", width: "var(--size-md)" },
  lg: { height: "var(--size-lg)", width: "var(--size-lg)" },
  xl: { height: "var(--size-xl)", width: "var(--size-xl)" },
  "2xl": { height: "var(--size-2xl)", width: "var(--size-2xl)" },
  "3xl": { height: "var(--size-3xl)", width: "var(--size-3xl)" },
  "4xl": { height: "var(--size-4xl)", width: "var(--size-4xl)" },
})

const afterStyles = stylex.create({
  none: { marginInlineEnd: 0 },
  xxs: { marginInlineEnd: "var(--spacing-xxs)" },
  xs: { marginInlineEnd: "var(--spacing-xs)" },
  sm: { marginInlineEnd: "var(--spacing-sm)" },
  md: { marginInlineEnd: "var(--spacing-md)" },
  lg: { marginInlineEnd: "var(--spacing-lg)" },
  xl: { marginInlineEnd: "var(--spacing-xl)" },
  "2xl": { marginInlineEnd: "var(--spacing-2xl)" },
  "3xl": { marginInlineEnd: "var(--spacing-3xl)" },
  "4xl": { marginInlineEnd: "var(--spacing-4xl)" },
})

/**
 * Sizes an svg child (a lucide icon, or any inline svg) to a `--size-*`
 * token, so icons follow the spacing density like the controls around them.
 * Colours with `tone`; lucide icons draw in `currentColor`, so the default
 * `inherit` matches the text beside the icon.
 * Decorative by default (`aria-hidden`); pass `aria-hidden={false}` plus a
 * label when the icon carries meaning on its own.
 */
const Icon = React.forwardRef<HTMLSpanElement, IconProps>(
  ({ after, asChild = false, size = "xs", tone = "inherit", ...props }, ref) => {
    const Comp = asChild ? Slot : "span"

    return (
      <Comp
        ref={ref}
        aria-hidden
        {...withoutStyling(props)}
        {...withClassHook(
          "eluan-icon",
          stylex.props(
            styles.base,
            sizeStyles[size],
            // `inherit` adds no rule: the span already inherits its colour.
            tone !== "inherit" && toneStyles[tone],
            after && afterStyles[after]
          )
        )}
      />
    )
  }
)
Icon.displayName = "Icon"

export { Icon }
