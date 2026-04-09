import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { RefreshCw, ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "./button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./dropdown-menu"

const aiRegenerateVariants = cva(
  "inline-flex items-center justify-center gap-[var(--spacing-xs)] whitespace-nowrap rounded-[var(--curves-md)] text-[var(--font-size-sm)] font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--interactive-border)] focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "border border-[var(--action-secondary-border)] bg-transparent text-[var(--action-secondary-fg)] hover:bg-[var(--action-secondary-bg-hover)] active:bg-[var(--action-secondary-bg-active)]",
        ghost:
          "bg-transparent text-[var(--container-fg-alt)] hover:bg-[var(--interactive-bg-hover)] hover:text-[var(--container-fg)]",
        primary:
          "bg-[var(--action-primary-bg)] text-[var(--action-primary-fg)] hover:bg-[var(--action-primary-bg-hover)] active:bg-[var(--action-primary-bg-active)] shadow-sm",
      },
      size: {
        sm: "h-[var(--size-md)] px-[var(--spacing-sm)] text-[var(--font-size-xs)]",
        default: "h-[var(--size-lg)] px-[var(--spacing-md)]",
        lg: "h-[var(--size-xl)] px-[var(--spacing-lg)] text-[var(--font-size-base)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

/** Maps AI regenerate variants to core Button variants */
function mapVariant(variant: "default" | "ghost" | "primary" | null | undefined) {
  switch (variant) {
    case "primary":
      return "default" as const
    case "ghost":
      return "ghost" as const
    default:
      return "outline" as const
  }
}

/** Maps AI regenerate sizes to core Button sizes */
function mapSize(size: "sm" | "default" | "lg" | null | undefined) {
  switch (size) {
    case "sm":
      return "sm" as const
    case "lg":
      return "lg" as const
    default:
      return "default" as const
  }
}

export interface AIRegenerateProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof aiRegenerateVariants> {
  /** Callback fired when regenerate is triggered */
  onRegenerate?: () => void
  /** Show a loading/spinning state on the icon */
  loading?: boolean
  /** Current iteration counter, e.g. "1/4" */
  count?: string
  /** Show a dropdown trigger for additional options */
  showDropdown?: boolean
  /** Callback fired when the dropdown trigger is clicked */
  onDropdownClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const AIRegenerate = React.forwardRef<HTMLButtonElement, AIRegenerateProps>(
  (
    {
      className,
      variant,
      size,
      onRegenerate,
      loading = false,
      count,
      showDropdown = false,
      onDropdownClick,
      children,
      ...props
    },
    ref
  ) => {
    const buttonVariant = mapVariant(variant)
    const buttonSize = mapSize(size)

    const mainButton = (
      <Button
        ref={ref}
        variant={buttonVariant}
        size={buttonSize}
        className={cn(
          showDropdown && "rounded-r-none border-r-0",
          className
        )}
        onClick={onRegenerate}
        disabled={loading || props.disabled}
        {...props}
      >
        <RefreshCw
          className={cn(
            "h-[var(--size-xxs)] w-[var(--size-xxs)] shrink-0",
            loading && "animate-spin"
          )}
        />
        {children ?? "Regenerate"}
        {count && (
          <span className="text-[var(--container-fg-alt)] text-[var(--font-size-xs)]">
            {count}
          </span>
        )}
      </Button>
    )

    if (!showDropdown) {
      return mainButton
    }

    return (
      <span className="inline-flex items-center">
        {mainButton}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={buttonVariant}
              size={buttonSize}
              className="rounded-l-none px-[var(--spacing-xs)] border-l border-l-[var(--container-border)]"
              disabled={loading || props.disabled}
              aria-label="More regeneration options"
              onClick={onDropdownClick}
            >
              <ChevronDown className="h-[var(--size-xxs)] w-[var(--size-xxs)]" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" />
        </DropdownMenu>
      </span>
    )
  }
)
AIRegenerate.displayName = "AIRegenerate"

export {
  AIRegenerate,
  aiRegenerateVariants,
  DropdownMenu as AIRegenerateDropdownMenu,
  DropdownMenuTrigger as AIRegenerateDropdownMenuTrigger,
  DropdownMenuContent as AIRegenerateDropdownMenuContent,
  DropdownMenuItem as AIRegenerateDropdownMenuItem,
}
