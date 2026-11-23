import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import * as stylex from "@stylexjs/stylex"
import { withoutStyling } from "./layout-shared"

export type VisuallyHiddenElement =
  | "span"
  | "div"
  | "p"
  | "label"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"

export interface VisuallyHiddenProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "className" | "style"> {
  /** Element override. Defaults to `span`. */
  as?: VisuallyHiddenElement
  /** Hide the child element instead of wrapping it (Radix Slot). */
  asChild?: boolean
}

const styles = stylex.create({
  root: {
    borderWidth: 0,
    clip: "rect(0, 0, 0, 0)",
    clipPath: "inset(50%)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    whiteSpace: "nowrap",
    width: "1px",
  },
})

/** Content for screen readers only: removed from view, kept in the accessibility tree. */
const VisuallyHidden = React.forwardRef<HTMLElement, VisuallyHiddenProps>(
  ({ as = "span", asChild = false, ...props }, ref) => {
    const Comp = (asChild ? Slot : as) as React.ElementType

    return <Comp ref={ref} {...withoutStyling(props)} {...stylex.props(styles.root)} />
  }
)
VisuallyHidden.displayName = "VisuallyHidden"

export { VisuallyHidden }
