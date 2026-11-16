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

/** `full` is the parent's height (100%), `screen` the viewport's. */
export type LayoutHeight = "full" | "screen"

/** `relative` anchors overlays; `absolute` takes the element out of flow. */
export type LayoutPosition = "relative" | "absolute"

/** Where an overlay sits in its anchor: covering it, or along one edge. */
export type LayoutInset = "fill" | "top" | "bottom"

/** `hidden` clips content that doesn't fit; `auto` scrolls it. */
export type LayoutOverflow = "hidden" | "auto"

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
  /** `false` keeps the element at its content size in a flex parent (`flex-shrink: 0`). */
  shrink?: boolean
  /** `full` fills the parent's height; `screen` fills the viewport (`100dvh`, so mobile browser bars don't cover the bottom). */
  height?: LayoutHeight
  /** At least the parent's height (`full`) or the viewport's (`screen`). */
  minHeight?: LayoutHeight
  /** `relative` makes this the anchor for `inset` children; `absolute` takes it out of flow. */
  position?: LayoutPosition
  /**
   * Pin to the nearest positioned ancestor: `fill` covers it, `top` and
   * `bottom` run along that edge at full width. Sets `position: absolute`.
   */
  inset?: LayoutInset
  /** `hidden` clips the content; `auto` scrolls it when it doesn't fit. */
  overflow?: LayoutOverflow
}

/** The props `boxStyle` reads; every flow primitive passes them through. */
export type LayoutBoxStyleProps = Pick<
  LayoutBoxProps,
  "pad" | "padX" | "padY" | "grow" | "shrink" | "height" | "minHeight" | "position" | "inset" | "overflow"
>

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
  shrink: { flexShrink: 1 },
  noShrink: { flexShrink: 0 },
})

const heightStyles = stylex.create({
  full: { height: "100%" },
  screen: { height: "100dvh" },
})

const minHeightStyles = stylex.create({
  full: { minHeight: "100%" },
  screen: { minHeight: "100dvh" },
})

const positionStyles = stylex.create({
  relative: { position: "relative" },
  absolute: { position: "absolute" },
})

// Physical top/bottom with logical sides, so an edge bar spans the anchor
// in either writing direction.
const insetStyles = stylex.create({
  fill: { bottom: 0, insetInlineEnd: 0, insetInlineStart: 0, position: "absolute", top: 0 },
  top: { insetInlineEnd: 0, insetInlineStart: 0, position: "absolute", top: 0 },
  bottom: { bottom: 0, insetInlineEnd: 0, insetInlineStart: 0, position: "absolute" },
})

const overflowStyles = stylex.create({
  hidden: { overflow: "hidden" },
  auto: { overflow: "auto" },
})

/** Padding, flex, size, position and overflow styles, in `stylex.props` order. */
export function boxStyle({
  pad,
  padX,
  padY,
  grow,
  shrink,
  height,
  minHeight,
  position,
  inset,
  overflow,
}: LayoutBoxStyleProps) {
  const block = padY ?? pad
  const inline = padX ?? pad
  return [
    block !== undefined && padBlockStyles[block],
    inline !== undefined && padInlineStyles[inline],
    grow === true && boxStyles.grow,
    // After grow, so `grow shrink={false}` takes the space without giving it back.
    shrink !== undefined && (shrink ? boxStyles.shrink : boxStyles.noShrink),
    height !== undefined && heightStyles[height],
    minHeight !== undefined && minHeightStyles[minHeight],
    inset !== undefined && insetStyles[inset],
    // After inset, so an explicit position wins over the one inset implies.
    position !== undefined && positionStyles[position],
    overflow !== undefined && overflowStyles[overflow],
  ] as const
}

/**
 * Split the `boxStyle` props off the rest, so a primitive spreads only
 * native attributes onto its element.
 */
export function splitBoxProps<P extends LayoutBoxStyleProps>(props: P) {
  const { pad, padX, padY, grow, shrink, height, minHeight, position, inset, overflow, ...rest } =
    props
  return [
    boxStyle({ pad, padX, padY, grow, shrink, height, minHeight, position, inset, overflow }),
    rest,
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
