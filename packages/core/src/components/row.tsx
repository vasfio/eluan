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

export interface RowProps extends LayoutBoxProps {
  /** Cross-axis alignment. Rows centre their children by default. */
  align?: LayoutAlign
  /** Space between children, as a `--spacing-*` token name. */
  gap?: LayoutSpacing
  /** Render as `inline-flex`, so the row sits in a line of text. */
  inline?: boolean
  /** Main-axis distribution. `between` pushes the first and last child apart. */
  justify?: LayoutJustify
  /** Let children wrap onto further lines (the gap applies between lines too). */
  wrap?: boolean
}

const styles = stylex.create({
  base: {
    display: "flex",
    flexDirection: "row",
    minWidth: 0,
  },
  inline: { display: "inline-flex" },
  wrap: { flexWrap: "wrap" },
})

/** Horizontal flow: children in a line, vertically centred by default. */
const Row = React.forwardRef<HTMLElement, RowProps>(
  (
    {
      align = "center",
      as,
      asChild = false,
      gap = "md",
      grow,
      inline = false,
      justify,
      pad,
      padX,
      padY,
      wrap = false,
      ...props
    },
    ref
  ) => {
    const Comp = layoutElement(as, asChild)

    return (
      <Comp
        ref={ref}
        {...withoutStyling(props)}
        {...stylex.props(
          styles.base,
          inline && styles.inline,
          wrap && styles.wrap,
          gapStyles[gap],
          alignStyles[align],
          justify && justifyStyles[justify],
          ...boxStyle({ pad, padX, padY, grow })
        )}
      />
    )
  }
)
Row.displayName = "Row"

export { Row }
