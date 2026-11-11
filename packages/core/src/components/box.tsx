import * as React from "react"
import * as stylex from "@stylexjs/stylex"
import {
  boxStyle,
  layoutElement,
  withoutStyling,
  type LayoutBoxProps,
} from "./layout-shared"

export type {
  LayoutElement,
  LayoutSpacing,
} from "./layout-shared"

export type BoxProps = LayoutBoxProps

/**
 * A plain block that takes token padding, or takes the remaining space in a
 * flex parent with `grow`. No display of its own: it is a `div` unless `as`
 * says otherwise.
 */
const Box = React.forwardRef<HTMLElement, BoxProps>(
  ({ as, asChild = false, pad, padX, padY, grow, ...props }, ref) => {
    const Comp = layoutElement(as, asChild)

    return (
      <Comp
        ref={ref}
        {...withoutStyling(props)}
        {...stylex.props(...boxStyle({ pad, padX, padY, grow }))}
      />
    )
  }
)
Box.displayName = "Box"

export { Box }
