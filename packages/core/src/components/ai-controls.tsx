import * as React from "react"
import * as stylex from "@stylexjs/stylex"
import { Square, Pause, Play, RefreshCw } from "lucide-react"

import { Button } from "./button"

const variantIconMap = {
  stop: Square,
  pause: Pause,
  resume: Play,
  regenerate: RefreshCw,
} as const

const variantLabelMap = {
  stop: "Stop",
  pause: "Pause",
  resume: "Resume",
  regenerate: "Regenerate",
} as const

const variantToButtonVariant = {
  stop: "destructive",
  pause: "caution",
  resume: "positive",
  regenerate: "outline",
} as const

type ControlVariant = "stop" | "pause" | "resume" | "regenerate"
type ControlSize = "sm" | "default" | "lg"

const styles = stylex.create({
  controls: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: "var(--spacing-xs)",
  },
  icon: {
    flexShrink: 0,
  },
  iconSm: {
    height: "var(--font-size-sm)",
    width: "var(--font-size-sm)",
  },
  iconDefault: {
    height: "var(--size-xxs)",
    width: "var(--size-xxs)",
  },
  iconLg: {
    height: "var(--size-xs)",
    width: "var(--size-xs)",
  },
})

export interface AIControlButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "style"> {
  variant?: ControlVariant
  size?: ControlSize
  iconOnly?: boolean
}

const AIControlButton = React.forwardRef<
  HTMLButtonElement,
  AIControlButtonProps
>(
  (
    {
      variant = "stop",
      size = "default",
      iconOnly = false,
      children,
      ...props
    },
    ref
  ) => {
    const IconComponent = variantIconMap[variant]
    const label = children ?? variantLabelMap[variant]
    const buttonVariant = variantToButtonVariant[variant]

    return (
      <Button
        ref={ref}
        type="button"
        variant={buttonVariant}
        size={iconOnly ? "icon" : size}
        aria-label={iconOnly ? variantLabelMap[variant] : undefined}
        {...props}
      >
        <IconComponent
          {...stylex.props(
            styles.icon,
            size === "sm" && styles.iconSm,
            size === "default" && styles.iconDefault,
            size === "lg" && styles.iconLg
          )}
        />
        {!iconOnly && <span>{label}</span>}
      </Button>
    )
  }
)
AIControlButton.displayName = "AIControlButton"

export interface AIControlsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style"> {}

const AIControls = React.forwardRef<HTMLDivElement, AIControlsProps>(
  ({ children, ...props }, ref) => (
    <div
      ref={ref}
      {...props}
      {...stylex.props(styles.controls)}
    >
      {children}
    </div>
  )
)
AIControls.displayName = "AIControls"

export { AIControls, AIControlButton }
