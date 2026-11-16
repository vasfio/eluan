import * as React from "react"
import * as stylex from "@stylexjs/stylex"
import {
  layoutElement,
  splitBoxProps,
  withoutStyling,
  type LayoutBoxProps,
} from "./layout-shared"

export type {
  LayoutElement,
  LayoutHeight,
  LayoutInset,
  LayoutOverflow,
  LayoutPosition,
  LayoutSpacing,
} from "./layout-shared"

export type BoxProps = LayoutBoxProps

/**
 * A plain block that takes token padding, takes or keeps its space in a flex
 * parent (`grow`, `shrink`), fills a height, or sits as an overlay
 * (`position`, `inset`). No display of its own: it is a `div` unless `as`
 * says otherwise.
 */
const Box = React.forwardRef<HTMLElement, BoxProps>(
  ({ as, asChild = false, ...props }, ref) => {
    const Comp = layoutElement(as, asChild)
    const [box, rest] = splitBoxProps(props)

    return <Comp ref={ref} {...withoutStyling(rest)} {...stylex.props(...box)} />
  }
)
Box.displayName = "Box"

export { Box }
