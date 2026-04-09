import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Sparkles } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "./badge"

const aiSharedVisionVariants = cva("relative", {
  variants: {
    variant: {
      glow: "",
      border: "",
      badge: "",
    },
  },
  defaultVariants: {
    variant: "glow",
  },
})

export interface AISharedVisionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof aiSharedVisionVariants> {
  /** Whether the AI is actively working */
  active?: boolean
  /** Optional label to display (e.g. "AI is editing...") */
  label?: string
}

const AISharedVision = React.forwardRef<HTMLDivElement, AISharedVisionProps>(
  (
    {
      className,
      variant = "glow",
      active = false,
      label,
      children,
      ...props
    },
    ref
  ) => {
    const glowClasses = active
      ? "ring-2 ring-[var(--informative-border)] animate-pulse"
      : ""

    const borderClasses = active
      ? "border-2 border-[var(--informative-border)] animate-pulse"
      : "border-2 border-transparent"

    const variantClass =
      variant === "glow"
        ? glowClasses
        : variant === "border"
          ? borderClasses
          : ""

    return (
      <div
        ref={ref}
        className={cn(
          aiSharedVisionVariants({ variant }),
          variantClass,
          "rounded-[var(--curves-md)] transition-all",
          className
        )}
        {...props}
      >
        {children}
        {variant === "badge" && active && (
          <Badge
            variant="informative"
            className="absolute right-0 top-0 z-10 -translate-y-1/2 translate-x-1/2"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--informative-fg)] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--informative-fg)]" />
            </span>
            {label || "AI Active"}
          </Badge>
        )}
        {variant !== "badge" && active && label && (
          <span className="mt-[var(--spacing-xxs)] flex items-center gap-[var(--spacing-xxs)] text-[var(--font-size-xs)] text-[var(--informative-fg)]">
            <Sparkles className="h-3 w-3" />
            {label}
          </span>
        )}
      </div>
    )
  }
)
AISharedVision.displayName = "AISharedVision"

export { AISharedVision, aiSharedVisionVariants }
