import * as React from "react"
import * as stylex from "@stylexjs/stylex"

export type SpinnerSize = "default" | "sm" | "lg" | "xl"

export interface SpinnerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style"> {
  size?: SpinnerSize
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ size = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="status"
        aria-label="Loading"
        {...props}
        {...stylex.props(styles.root, sizeStyles[size])}
      >
        <span {...stylex.props(styles.srOnly)}>Loading...</span>
      </div>
    )
  }
)
Spinner.displayName = "Spinner"

const spin = stylex.keyframes({
  to: {
    transform: "rotate(360deg)",
  },
})

const styles = stylex.create({
  root: {
    animationDuration: {
      default: "1s",
      "@media (prefers-reduced-motion: reduce)": "0.01ms",
    },
    animationIterationCount: {
      default: "infinite",
      "@media (prefers-reduced-motion: reduce)": 1,
    },
    animationName: spin,
    animationTimingFunction: "linear",
    borderColor: "currentColor",
    borderRadius: "var(--radius-radius-full)",
    borderStyle: "solid",
    borderTopColor: "transparent",
    borderWidth: 2,
  },
  sm: {
    height: "var(--size-xxs)",
    width: "var(--size-xxs)",
  },
  default: {
    height: "var(--size-xs)",
    width: "var(--size-xs)",
  },
  lg: {
    height: "var(--size-sm)",
    width: "var(--size-sm)",
  },
  xl: {
    height: "var(--size-md)",
    width: "var(--size-md)",
  },
  srOnly: {
    borderWidth: 0,
    clip: "rect(0, 0, 0, 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    whiteSpace: "nowrap",
    width: 1,
  },
})

const sizeStyles = {
  default: styles.default,
  sm: styles.sm,
  lg: styles.lg,
  xl: styles.xl,
} satisfies Record<SpinnerSize, stylex.StyleXStyles>

export { Spinner }
