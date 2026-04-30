import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Sparkles } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Badge,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@vasf/ragnar-core"

const actionLabels: Record<string, string> = {
  generated: "AI Generated",
  edited: "AI Edited",
  summarized: "AI Summarized",
  suggested: "AI Suggested",
}

const aiDisclosureVariants = cva(
  "inline-flex items-center gap-[var(--spacing-xxs)] text-[length:var(--font-size-xs)]",
  {
    variants: {
      variant: {
        badge:
          "rounded-[var(--curves-md)] border bg-[var(--container-bg-alt)] px-[var(--spacing-xs)] py-[var(--spacing-xxs)]",
        label: "text-[color:var(--container-fg-alt)]",
        tag: "border-l-2 border-l-[var(--informative-border)] bg-[var(--container-bg-alt)] px-[var(--spacing-xs)] py-[var(--spacing-xxs)] rounded-r-[var(--curves-sm)]",
        compact: "text-[color:var(--container-fg-alt)]",
      },
    },
    defaultVariants: {
      variant: "badge",
    },
  }
)

export interface AIDisclosureProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof aiDisclosureVariants> {
  /** Override the default icon */
  icon?: React.ReactNode
  /** Predefined action label */
  action?: "generated" | "edited" | "summarized" | "suggested"
}

const AIDisclosure = React.forwardRef<HTMLSpanElement, AIDisclosureProps>(
  (
    { className, variant, icon, action = "generated", children, ...props },
    ref
  ) => {
    const label = children ?? actionLabels[action] ?? "AI Generated"
    const sparkleIcon = icon ?? <Sparkles className="h-3 w-3 shrink-0" />

    if (variant === "badge") {
      return (
        <span ref={ref}>
          <Badge
            variant="secondary"
            className={className}
            {...props}
          >
            {sparkleIcon}
            <span>{label}</span>
          </Badge>
        </span>
      )
    }

    if (variant === "compact") {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span ref={ref}>
                <Badge
                  variant="secondary"
                  className={cn("cursor-default", className)}
                  {...props}
                >
                  {sparkleIcon}
                </Badge>
              </span>
            </TooltipTrigger>
            <TooltipContent>{String(label)}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }

    // label and tag variants — keep as custom styled elements
    return (
      <span
        ref={ref}
        className={cn(aiDisclosureVariants({ variant }), className)}
        {...props}
      >
        {sparkleIcon}
        <span>{label}</span>
      </span>
    )
  }
)
AIDisclosure.displayName = "AIDisclosure"

export { AIDisclosure, aiDisclosureVariants }
