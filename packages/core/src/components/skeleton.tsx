import * as React from "react"
import * as stylex from "@stylexjs/stylex"

export interface SkeletonProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style"> {
  /** Width of the placeholder. Numbers are treated as pixels. Defaults to `100%`. */
  width?: number | string
  /** Height of the placeholder. Numbers are treated as pixels. Defaults to `var(--size-xxs)`. */
  height?: number | string
  /** Border radius override, e.g. `var(--radius-radius-full)` for a circle. */
  radius?: string
}

function Skeleton({
  width = "100%",
  height = "var(--size-xxs)",
  radius,
  ...props
}: SkeletonProps) {
  return (
    <div
      {...props}
      {...stylex.props(
        styles.root,
        dynamicStyles.size(width, height),
        radius != null && dynamicStyles.radius(radius)
      )}
    />
  )
}

const pulse = stylex.keyframes({
  "0%, 100%": {
    opacity: 1,
  },
  "50%": {
    opacity: 0.5,
  },
})

const styles = stylex.create({
  root: {
    animationDuration: {
      default: "2s",
      "@media (prefers-reduced-motion: reduce)": "0.01ms",
    },
    animationIterationCount: {
      default: "infinite",
      "@media (prefers-reduced-motion: reduce)": 1,
    },
    animationName: pulse,
    animationTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)",
    backgroundColor: "var(--container-bg-alt)",
    borderRadius: "var(--curves-md)",
    flexShrink: 0,
  },
})

const dynamicStyles = stylex.create({
  size: (width: number | string, height: number | string) => ({
    height,
    width,
  }),
  radius: (radius: string) => ({
    borderRadius: radius,
  }),
})

export { Skeleton }
