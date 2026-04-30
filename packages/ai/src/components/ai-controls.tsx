import * as React from "react"
import { Square, Pause, Play, RefreshCw } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@vasf/ragnar-core"

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

const iconSizeMap = {
  sm: "h-3.5 w-3.5",
  default: "h-4 w-4",
  lg: "h-5 w-5",
} as const

const variantToButtonVariant = {
  stop: "destructive",
  pause: "outline",
  resume: "outline",
  regenerate: "outline",
} as const

const variantColorOverrides = {
  stop: "",
  pause: "bg-[var(--cautionary-bg)] text-[color:var(--cautionary-fg)] hover:bg-[var(--cautionary-bg-hover)] border-transparent",
  resume: "bg-[var(--positive-bg)] text-[color:var(--positive-fg)] hover:bg-[var(--positive-bg-hover)] border-transparent",
  regenerate: "",
} as const

type ControlVariant = "stop" | "pause" | "resume" | "regenerate"
type ControlSize = "sm" | "default" | "lg"

export interface AIControlButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
      className,
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
    const iconSize = iconSizeMap[size]
    const buttonVariant = variantToButtonVariant[variant]
    const colorOverride = variantColorOverrides[variant]

    return (
      <Button
        ref={ref}
        type="button"
        variant={buttonVariant}
        size={iconOnly ? "icon" : size}
        className={cn(colorOverride, className)}
        aria-label={iconOnly ? variantLabelMap[variant] : undefined}
        {...props}
      >
        <IconComponent className={cn(iconSize, "shrink-0")} />
        {!iconOnly && <span>{label}</span>}
      </Button>
    )
  }
)
AIControlButton.displayName = "AIControlButton"

export interface AIControlsProps extends React.HTMLAttributes<HTMLDivElement> {}

const AIControls = React.forwardRef<HTMLDivElement, AIControlsProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-row gap-[var(--spacing-xs)] items-center",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
)
AIControls.displayName = "AIControls"

export { AIControls, AIControlButton }
