import * as React from "react"
import * as stylex from "@stylexjs/stylex"

export interface SkeletonProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style"> {}

function Skeleton(props: SkeletonProps) {
  return <div {...props} {...stylex.props(styles.root)} />
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
    animationDuration: "2s",
    animationIterationCount: "infinite",
    animationName: pulse,
    animationTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)",
    backgroundColor: "var(--container-bg-alt)",
    borderRadius: "var(--curves-md)",
  },
})

export { Skeleton }
