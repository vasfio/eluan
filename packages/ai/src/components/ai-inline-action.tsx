import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import {
  Sparkles,
  ArrowUpRight,
  Minimize2,
  Languages,
  RefreshCw,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button, Separator } from "@vasf/ragnar-core"

const aiInlineActionVariants = cva(
  "inline-flex flex-row items-center bg-[var(--container-bg)] rounded-[var(--curves-md)] border border-[var(--container-border)] shadow-md px-[var(--spacing-xxs)] gap-[var(--spacing-xxs)] py-[var(--spacing-xxs)]",
  {
    variants: {
      variant: {
        default: "bg-[var(--container-bg)]",
        elevated: "bg-[var(--container-bg)] shadow-lg",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface AIInlineActionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof aiInlineActionVariants> {}

const AIInlineAction = React.forwardRef<HTMLDivElement, AIInlineActionProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      role="toolbar"
      className={cn(aiInlineActionVariants({ variant }), className)}
      {...props}
    />
  )
)
AIInlineAction.displayName = "AIInlineAction"

const aiInlineActionButtonVariants = cva(
  "inline-flex items-center gap-[var(--spacing-xxs)] rounded-[var(--curves-sm)] p-[var(--spacing-xs)] text-[length:var(--font-size-xs)] font-medium text-[color:var(--container-fg)] transition-colors hover:bg-[var(--interactive-bg-hover)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--interactive-border)] disabled:pointer-events-none disabled:opacity-50 cursor-pointer whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        active: "bg-[var(--interactive-bg-selected)] text-[color:var(--interactive-fg-selected)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface AIInlineActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof aiInlineActionButtonVariants> {
  icon?: React.ReactNode
}

const AIInlineActionButton = React.forwardRef<
  HTMLButtonElement,
  AIInlineActionButtonProps
>(({ className, variant, icon, children, ...props }, ref) => (
  <Button
    ref={ref}
    variant="ghost"
    size={children ? "sm" : "icon"}
    className={cn(
      aiInlineActionButtonVariants({ variant }),
      className
    )}
    {...props}
  >
    {icon && (
      <span className="[&_svg]:h-[var(--size-xxs)] [&_svg]:w-[var(--size-xxs)] shrink-0">
        {icon}
      </span>
    )}
    {children}
  </Button>
))
AIInlineActionButton.displayName = "AIInlineActionButton"

export interface AIInlineActionSeparatorProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const AIInlineActionSeparator = React.forwardRef<
  HTMLDivElement,
  AIInlineActionSeparatorProps
>(({ className, ...props }, ref) => (
  <Separator
    ref={ref as unknown as React.Ref<React.ElementRef<typeof Separator>>}
    orientation="vertical"
    className={cn(
      "h-[var(--size-xxs)] w-px mx-[var(--spacing-xxs)]",
      className
    )}
    {...(props as React.ComponentPropsWithoutRef<typeof Separator>)}
  />
))
AIInlineActionSeparator.displayName = "AIInlineActionSeparator"

export {
  AIInlineAction,
  aiInlineActionVariants,
  AIInlineActionButton,
  aiInlineActionButtonVariants,
  AIInlineActionSeparator,
  Sparkles as AIInlineActionImproveIcon,
  ArrowUpRight as AIInlineActionExpandIcon,
  Minimize2 as AIInlineActionShortenIcon,
  Languages as AIInlineActionTranslateIcon,
  RefreshCw as AIInlineActionRewriteIcon,
}
