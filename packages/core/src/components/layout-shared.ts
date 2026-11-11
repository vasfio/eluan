import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import * as stylex from "@stylexjs/stylex"

// Shared vocabulary and styles for the layout primitives (Box, Stack, Row,
// Grid, Icon). Internal module: the types are re-exported by the components
// that use them, the styles are not exported from the package.

/**
 * A `--spacing-*` token name. Every step is density-aware, so switching
 * `data-spacing` re-flows any layout built from these. `none` is 0.
 */
export type LayoutSpacing =
  | "none"
  | "xxs"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"

/** A `--size-*` token name (control heights, icon boxes). Density-aware. */
export type LayoutSize = "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl"

/** Cross-axis alignment of the children (`align-items`). */
export type LayoutAlign = "start" | "center" | "end" | "stretch" | "baseline"

/** Main-axis distribution of the children (`justify-content`). */
export type LayoutJustify = "start" | "center" | "end" | "between"

/** Elements a layout primitive can render as. `asChild` covers anything else. */
export type LayoutElement =
  | "div"
  | "span"
  | "section"
  | "article"
  | "aside"
  | "header"
  | "footer"
  | "main"
  | "nav"
  | "form"
  | "fieldset"
  | "label"
  | "p"
  | "ul"
  | "ol"
  | "li"
  | "dl"
  | "dt"
  | "dd"

/** Props every flow primitive shares with `Box`. */
export interface LayoutBoxProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "className" | "style"> {
  /** Element override. Defaults to `div`. */
  as?: LayoutElement
  /** Render the child element instead (Radix Slot); the layout styles move onto it. */
  asChild?: boolean
  /** Padding on every side. `padX` / `padY` override it per axis. */
  pad?: LayoutSpacing
  /** Inline padding (left and right in LTR). */
  padX?: LayoutSpacing
  /** Block padding (top and bottom). */
  padY?: LayoutSpacing
  /** Take the remaining space in a flex parent: `flex: 1 1 0` with `min-width: 0`. */
  grow?: boolean
}

// Style maps are keyed by token name, so indexing one with a LayoutSpacing
// value is type-checked: a missing step is a compile error.

export const gapStyles = stylex.create({
  none: { gap: 0 },
  xxs: { gap: "var(--spacing-xxs)" },
  xs: { gap: "var(--spacing-xs)" },
  sm: { gap: "var(--spacing-sm)" },
  md: { gap: "var(--spacing-md)" },
  lg: { gap: "var(--spacing-lg)" },
  xl: { gap: "var(--spacing-xl)" },
  "2xl": { gap: "var(--spacing-2xl)" },
  "3xl": { gap: "var(--spacing-3xl)" },
  "4xl": { gap: "var(--spacing-4xl)" },
})

const padBlockStyles = stylex.create({
  none: { paddingBlock: 0 },
  xxs: { paddingBlock: "var(--spacing-xxs)" },
  xs: { paddingBlock: "var(--spacing-xs)" },
  sm: { paddingBlock: "var(--spacing-sm)" },
  md: { paddingBlock: "var(--spacing-md)" },
  lg: { paddingBlock: "var(--spacing-lg)" },
  xl: { paddingBlock: "var(--spacing-xl)" },
  "2xl": { paddingBlock: "var(--spacing-2xl)" },
  "3xl": { paddingBlock: "var(--spacing-3xl)" },
  "4xl": { paddingBlock: "var(--spacing-4xl)" },
})

const padInlineStyles = stylex.create({
  none: { paddingInline: 0 },
  xxs: { paddingInline: "var(--spacing-xxs)" },
  xs: { paddingInline: "var(--spacing-xs)" },
  sm: { paddingInline: "var(--spacing-sm)" },
  md: { paddingInline: "var(--spacing-md)" },
  lg: { paddingInline: "var(--spacing-lg)" },
  xl: { paddingInline: "var(--spacing-xl)" },
  "2xl": { paddingInline: "var(--spacing-2xl)" },
  "3xl": { paddingInline: "var(--spacing-3xl)" },
  "4xl": { paddingInline: "var(--spacing-4xl)" },
})

export const alignStyles = stylex.create({
  start: { alignItems: "flex-start" },
  center: { alignItems: "center" },
  end: { alignItems: "flex-end" },
  stretch: { alignItems: "stretch" },
  baseline: { alignItems: "baseline" },
})

export const justifyStyles = stylex.create({
  start: { justifyContent: "flex-start" },
  center: { justifyContent: "center" },
  end: { justifyContent: "flex-end" },
  between: { justifyContent: "space-between" },
})

const boxStyles = stylex.create({
  grow: {
    flexBasis: 0,
    flexGrow: 1,
    flexShrink: 1,
    minWidth: 0,
  },
})

/** Padding and grow styles, in `stylex.props` order. */
export function boxStyle({
  pad,
  padX,
  padY,
  grow,
}: Pick<LayoutBoxProps, "pad" | "padX" | "padY" | "grow">) {
  const block = padY ?? pad
  const inline = padX ?? pad
  return [
    block !== undefined && padBlockStyles[block],
    inline !== undefined && padInlineStyles[inline],
    grow === true && boxStyles.grow,
  ] as const
}

/** The element to render: the Slot under `asChild`, else `as`, else a div. */
export function layoutElement(as: LayoutElement | undefined, asChild: boolean) {
  // Polymorphic: TS would otherwise intersect every element's ref type, so
  // the tag is widened here. The public `as` union still constrains callers.
  return (asChild ? Slot : (as ?? "div")) as React.ElementType
}

/**
 * Drop `className` / `style`. They're already typed out of every layout
 * primitive; this stops a cast from smuggling them past the token system.
 */
export function withoutStyling<P extends object>(props: P): P {
  const { className: _className, style: _style, ...rest } = props as P & {
    className?: string
    style?: React.CSSProperties
  }
  return rest as P
}

/**
 * `stylex.props(...)` plus a static class hook, for the few rules StyleX
 * can't express (child selectors). The hook's rules live in the `base`
 * layer of globals.css, below every StyleX layer, so a child's own
 * component styles still win over them.
 */
export function withClassHook(hook: string, props: ReturnType<typeof stylex.props>) {
  return { ...props, className: props.className ? `${props.className} ${hook}` : hook }
}
