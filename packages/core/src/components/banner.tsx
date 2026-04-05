import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const bannerVariants = cva(
  "relative flex items-center gap-3 w-full px-4 py-3 text-sm font-medium",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--interactive-bg-active)] text-[var(--interactive-fg-active)]",
        destructive:
          "bg-[var(--destructive-bg-alt)] text-[var(--destructive-fg)] border border-[var(--destructive-border)] [&_svg]:text-[var(--destructive-fg)]",
        warning:
          "bg-[var(--cautionary-bg-alt,var(--cautionary-bg))] text-[var(--cautionary-fg)] border border-[var(--cautionary-border)] [&_svg]:text-[var(--cautionary-fg)]",
        success:
          "bg-[var(--positive-bg-alt,var(--positive-bg))] text-[var(--positive-fg)] border border-[var(--positive-border)] [&_svg]:text-[var(--positive-fg)]",
        info:
          "bg-[var(--informative-bg-alt,var(--informative-bg))] text-[var(--informative-fg)] border border-[var(--informative-border)] [&_svg]:text-[var(--informative-fg)]",
        neutral:
          "bg-[var(--backgrounds-secondary)] text-[var(--foregrounds-primary)] border border-[var(--container-border-alt)]",
      },
      position: {
        top: "fixed top-0 left-0 right-0 z-50",
        bottom: "fixed bottom-0 left-0 right-0 z-50",
        inline: "relative rounded-md",
      },
    },
    defaultVariants: {
      variant: "info",
      position: "inline",
    },
  }
)

export interface BannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerVariants> {
  icon?: React.ReactNode
  action?: React.ReactNode
  dismissible?: boolean
  onDismiss?: () => void
}

const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  ({ className, variant, position, icon, action, dismissible = false, onDismiss, children, ...props }, ref) => (
    <div
      ref={ref}
      role="banner"
      className={cn(bannerVariants({ variant, position }), className)}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <div className="flex-1">{children}</div>
      {action && <div className="shrink-0">{action}</div>}
      {dismissible && (
        <button
          type="button"
          onClick={onDismiss}
          className="shrink-0 rounded opacity-60 hover:opacity-100 transition-opacity focus:outline-none focus:ring-1 focus:ring-current"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
)
Banner.displayName = "Banner"

export { Banner, bannerVariants }
