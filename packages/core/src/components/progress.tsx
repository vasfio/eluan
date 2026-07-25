import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import * as stylex from "@stylexjs/stylex"

export type ProgressProps = Omit<
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
  "className" | "style"
> & {
  size?: "default" | "sm"
  tone?: "default" | "weak" | "medium" | "strong"
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ value, size = "default", tone = "default", ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    {...props}
    {...stylex.props(styles.root, sizeStyles[size], toneStyles[tone])}
  >
    <ProgressPrimitive.Indicator
      {...stylex.props(styles.indicator, toneStyles[tone])}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

const styles = stylex.create({
  root: {
    backgroundColor: "var(--backgrounds-tertiary)",
    borderRadius: "var(--radius-radius-full)",
    height: "var(--spacing-sm)",
    overflow: "hidden",
    position: "relative",
    width: "100%",
  },
  sm: {
    height: "calc(var(--spacing-xs) + var(--spacing-xxs))",
  },
  indicator: {
    backgroundColor: "var(--interactive-bg-active)",
    flex: 1,
    height: "100%",
    transitionDuration: "300ms",
    transitionProperty: "all",
    transitionTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
    width: "100%",
  },
  weak: {
    backgroundColor: "var(--destructive-fg)",
  },
  medium: {
    backgroundColor: "var(--cautionary-fg)",
  },
  strong: {
    backgroundColor: "var(--positive-fg)",
  },
})

const sizeStyles = {
  default: null,
  sm: styles.sm,
} satisfies Record<NonNullable<ProgressProps["size"]>, stylex.StyleXStyles | null>

const toneStyles = {
  default: null,
  weak: styles.weak,
  medium: styles.medium,
  strong: styles.strong,
} satisfies Record<NonNullable<ProgressProps["tone"]>, stylex.StyleXStyles | null>

export { Progress }
