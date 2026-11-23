import * as React from "react"
import * as stylex from "@stylexjs/stylex"
import {
  alignStyles,
  gapStyles,
  justifyStyles,
  layoutElement,
  splitBoxProps,
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
  ({ align, as, asChild = false, gap = "md", justify, ...props }, ref) => {
    const Comp = layoutElement(as, asChild)
    const [box, rest] = splitBoxProps(props)

    return (
      <Comp
        ref={ref}
        {...withoutStyling(rest)}
        {...stylex.props(
          styles.base,
          gapStyles[gap],
          align && alignStyles[align],
          justify && justifyStyles[justify],
          ...box
        )}
      />
    )
  }
)
Stack.displayName = "Stack"

export { Stack }
