import * as React from "react"
import * as stylex from "@stylexjs/stylex"
import { RefreshCw, ChevronDown } from "lucide-react"

import { Button } from "./button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./dropdown-menu"

const aiRegenerateVariants = () => ""

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
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "style"> {
  variant?: "default" | "ghost" | "primary"
  size?: "sm" | "default" | "lg"
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

const styles = stylex.create({
  icon: {
    flexShrink: 0,
    height: "var(--size-xxs)",
    width: "var(--size-xxs)",
  },
  iconSpinning: {
    animationDuration: "1s",
    animationIterationCount: "infinite",
    animationName: stylex.keyframes({
      from: {
        transform: "rotate(0deg)",
      },
      to: {
        transform: "rotate(360deg)",
      },
    }),
    animationTimingFunction: "linear",
  },
  count: {
    color: "var(--container-fg-alt)",
    fontSize: "var(--font-size-xs)",
  },
  group: {
    alignItems: "center",
    display: "inline-flex",
  },
})

const AIRegenerate = React.forwardRef<HTMLButtonElement, AIRegenerateProps>(
  (
    {
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
        attachment={showDropdown ? "start" : "none"}
        onClick={onRegenerate}
        disabled={loading || props.disabled}
        {...props}
      >
        <RefreshCw
          {...stylex.props(
            styles.icon,
            loading && styles.iconSpinning
          )}
        />
        {children ?? "Regenerate"}
        {count && (
          <span {...stylex.props(styles.count)}>
            {count}
          </span>
        )}
      </Button>
    )

    if (!showDropdown) {
      return mainButton
    }

    return (
      <span {...stylex.props(styles.group)}>
        {mainButton}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={buttonVariant}
              size={buttonSize}
              attachment="end"
              disabled={loading || props.disabled}
              aria-label="More regeneration options"
              onClick={onDropdownClick}
            >
              <ChevronDown {...stylex.props(styles.icon)} />
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
