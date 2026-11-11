import * as React from "react"
import * as stylex from "@stylexjs/stylex"
import {
  alignStyles,
  boxStyle,
  gapStyles,
  justifyStyles,
  layoutElement,
  withoutStyling,
  type LayoutAlign,
  type LayoutBoxProps,
  type LayoutJustify,
  type LayoutSpacing,
} from "./layout-shared"

export type {
  LayoutAlign,
  LayoutElement,
  LayoutJustify,
  LayoutSpacing,
} from "./layout-shared"

export interface StackProps extends LayoutBoxProps {
  /** Cross-axis alignment. Unset, children stretch to the stack's width. */
  align?: LayoutAlign
  /** Space between children, as a `--spacing-*` token name. */
  gap?: LayoutSpacing
  /** Main-axis distribution. */
  justify?: LayoutJustify
}

const styles = stylex.create({
  base: {
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  },
})

/** Vertical flow: children stacked with a token gap. */
const Stack = React.forwardRef<HTMLElement, StackProps>(
  (
    { align, as, asChild = false, gap = "md", grow, justify, pad, padX, padY, ...props },
    ref
  ) => {
    const Comp = layoutElement(as, asChild)

    return (
      <Comp
        ref={ref}
        {...withoutStyling(props)}
        {...stylex.props(
          styles.base,
          gapStyles[gap],
          align && alignStyles[align],
          justify && justifyStyles[justify],
          ...boxStyle({ pad, padX, padY, grow })
        )}
      />
    )
  }
)
Stack.displayName = "Stack"

export { Stack }
