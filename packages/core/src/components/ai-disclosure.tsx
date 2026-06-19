import * as React from "react"
import * as stylex from "@stylexjs/stylex"
import { Sparkles } from "lucide-react"

import { Badge } from "./badge"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "./tooltip"

const actionLabels: Record<string, string> = {
  generated: "AI Generated",
  edited: "AI Edited",
  summarized: "AI Summarized",
  suggested: "AI Suggested",
}

export type AIDisclosureVariant = "badge" | "label" | "tag" | "compact"

export interface AIDisclosureProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "className" | "style"> {
  /** Predefined action label */
  action?: "generated" | "edited" | "summarized" | "suggested"
  /** Override the default icon */
  icon?: React.ReactNode
  variant?: AIDisclosureVariant
}

const styles = stylex.create({
  root: {
    alignItems: "center",
    display: "inline-flex",
    fontSize: "var(--font-size-xs)",
    gap: "var(--spacing-xxs)",
  },
  badgeContent: {
    alignItems: "center",
    display: "inline-flex",
    gap: "var(--spacing-xxs)",
  },
  label: {
    color: "var(--container-fg-alt)",
  },
  tag: {
    backgroundColor: "var(--container-bg-alt)",
    borderLeftColor: "var(--informative-border)",
    borderLeftStyle: "solid",
    borderLeftWidth: 2,
    borderTopRightRadius: "var(--curves-sm)",
    borderBottomRightRadius: "var(--curves-sm)",
    paddingBlock: "var(--spacing-xxs)",
    paddingInline: "var(--spacing-xs)",
  },
  sparkle: {
    flexShrink: 0,
    height: "var(--spacing-md)",
    width: "var(--spacing-md)",
  },
})

const AIDisclosure = React.forwardRef<HTMLSpanElement, AIDisclosureProps>(
  (
    { variant = "badge", icon, action = "generated", children, ...props },
    ref
  ) => {
    const label = children ?? actionLabels[action] ?? "AI Generated"
    const sparkleIcon = icon ?? <Sparkles {...stylex.props(styles.sparkle)} />

    if (variant === "badge") {
      return (
        <span ref={ref}>
          <Badge variant="secondary" {...props}>
            <span {...stylex.props(styles.badgeContent)}>
              {sparkleIcon}
              <span>{label}</span>
            </span>
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
                <Badge variant="secondary" {...props}>
                  {sparkleIcon}
                </Badge>
              </span>
            </TooltipTrigger>
            <TooltipContent>{String(label)}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }

    return (
      <span
        ref={ref}
        {...props}
        {...stylex.props(
          styles.root,
          variant === "label" && styles.label,
          variant === "tag" && styles.tag
        )}
      >
        {sparkleIcon}
        <span>{label}</span>
      </span>
    )
  }
)
AIDisclosure.displayName = "AIDisclosure"

export { AIDisclosure }
