import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Sparkles, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@vasf/ragnar-core"

const aiNudgeVariants = cva(
  "flex items-center gap-[var(--spacing-sm)] text-[length:var(--font-size-sm)] font-normal",
  {
    variants: {
      variant: {
        inline:
          "relative w-full rounded-[var(--curves-sm)] border border-[var(--informative-border)] bg-[var(--informative-bg-alt,var(--informative-bg))] px-[var(--spacing-sm)] py-[var(--spacing-xs)] text-[color:var(--informative-fg)] [&_svg]:text-[color:var(--informative-fg)]",
        floating:
          "absolute z-50 rounded-[var(--curves-md)] border border-[var(--informative-border)] bg-[var(--informative-bg-alt,var(--informative-bg))] px-[var(--spacing-sm)] py-[var(--spacing-xs)] text-[color:var(--informative-fg)] shadow-lg [&_svg]:text-[color:var(--informative-fg)]",
        subtle:
          "text-[color:var(--foregrounds-tertiary)] [&_svg]:text-[color:var(--informative-fg)]",
      },
    },
    defaultVariants: {
      variant: "inline",
    },
  }
)

/** Contextual AI feature discovery hint. */
export interface AINudgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof aiNudgeVariants> {
  /** Optional action element (e.g. a button or link). */
  action?: React.ReactNode
  /** Whether the nudge can be dismissed. */
  dismissible?: boolean
  /** Called when the dismiss button is clicked. */
  onDismiss?: () => void
  /** Override the default Sparkles icon. */
  icon?: React.ReactNode
}

const AINudge = React.forwardRef<HTMLDivElement, AINudgeProps>(
  (
    {
      className,
      variant,
      icon,
      action,
      dismissible = false,
      onDismiss,
      children,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      role="status"
      className={cn(aiNudgeVariants({ variant }), className)}
      {...props}
    >
      <span className="shrink-0">
        {icon ?? <Sparkles className="h-[var(--size-xxs)] w-[var(--size-xxs)]" />}
      </span>
      <span className="flex-1">{children}</span>
      {action && <div className="shrink-0">{action}</div>}
      {dismissible && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onDismiss}
          className="shrink-0 h-auto w-auto p-0.5 opacity-60 hover:opacity-100"
          aria-label="Dismiss"
        >
          <X className="h-[var(--size-xxs)] w-[var(--size-xxs)]" />
        </Button>
      )}
    </div>
  )
)
AINudge.displayName = "AINudge"

export { AINudge, aiNudgeVariants }
