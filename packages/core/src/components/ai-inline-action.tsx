import * as React from "react"
import * as stylex from "@stylexjs/stylex"
import {
  Sparkles,
  ArrowUpRight,
  Minimize2,
  Languages,
  RefreshCw,
} from "lucide-react"

import { Separator } from "./separator"

export type AIInlineActionVariant = "default" | "elevated"
export type AIInlineActionButtonVariant = "default" | "active"

export interface AIInlineActionProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style"> {
  variant?: AIInlineActionVariant
}

const styles = stylex.create({
  root: {
    alignItems: "center",
    backgroundColor: "var(--container-bg)",
    borderColor: "var(--container-border)",
    borderRadius: "var(--curves-md)",
    borderStyle: "solid",
    borderWidth: 1,
    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    display: "inline-flex",
    flexDirection: "row",
    gap: "var(--spacing-xxs)",
    padding: "var(--spacing-xxs)",
  },
  elevated: {
    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  },
  button: {
    alignItems: "center",
    backgroundColor: "transparent",
    borderWidth: 0,
    borderRadius: "var(--curves-sm)",
    color: "var(--container-fg)",
    cursor: "pointer",
    display: "inline-flex",
    fontSize: "var(--font-size-xs)",
    fontWeight: 500,
    gap: "var(--spacing-xxs)",
    padding: "var(--spacing-xs)",
    transitionDuration: "150ms",
    transitionProperty: "color, background-color, border-color",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    whiteSpace: "nowrap",
    ":hover": {
      backgroundColor: "var(--interactive-bg-hover)",
    },
    ":focus-visible": {
      outlineColor: "var(--interactive-border)",
      outlineOffset: "1px",
      outlineStyle: "solid",
      outlineWidth: "1px",
    },
    ":disabled": {
      opacity: 0.5,
      pointerEvents: "none",
    },
  },
  buttonActive: {
    backgroundColor: "var(--interactive-bg-selected)",
    color: "var(--interactive-fg-selected)",
  },
  icon: {
    flexShrink: 0,
  },
  iconSvg: {
    height: "var(--size-xxs)",
    width: "var(--size-xxs)",
  },
})

const AIInlineAction = React.forwardRef<HTMLDivElement, AIInlineActionProps>(
  ({ variant = "default", ...props }, ref) => (
    <div
      ref={ref}
      role="toolbar"
      {...props}
      {...stylex.props(styles.root, variant === "elevated" && styles.elevated)}
    />
  )
)
AIInlineAction.displayName = "AIInlineAction"

export interface AIInlineActionButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "style"> {
  icon?: React.ReactNode
  variant?: AIInlineActionButtonVariant
}

const AIInlineActionButton = React.forwardRef<
  HTMLButtonElement,
  AIInlineActionButtonProps
>(({ variant = "default", icon, children, ...props }, ref) => (
  <button
    ref={ref}
    {...props}
    {...stylex.props(
      styles.button,
      variant === "active" && styles.buttonActive
    )}
  >
    {icon && (
      <span {...stylex.props(styles.icon)}>
        {React.isValidElement(icon)
          ? React.cloneElement(
              icon as React.ReactElement<Record<string, unknown>>,
              stylex.props(styles.iconSvg)
            )
          : icon}
      </span>
    )}
    {children}
  </button>
))
AIInlineActionButton.displayName = "AIInlineActionButton"

export interface AIInlineActionSeparatorProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style"> {}

const AIInlineActionSeparator = React.forwardRef<
  HTMLDivElement,
  AIInlineActionSeparatorProps
>((props, ref) => (
  <Separator
    ref={ref as unknown as React.Ref<React.ElementRef<typeof Separator>>}
    orientation="vertical"
    variant="inline"
    {...(props as React.ComponentPropsWithoutRef<typeof Separator>)}
  />
))
AIInlineActionSeparator.displayName = "AIInlineActionSeparator"

export {
  AIInlineAction,
  AIInlineActionButton,
  AIInlineActionSeparator,
  Sparkles as AIInlineActionImproveIcon,
  ArrowUpRight as AIInlineActionExpandIcon,
  Minimize2 as AIInlineActionShortenIcon,
  Languages as AIInlineActionTranslateIcon,
  RefreshCw as AIInlineActionRewriteIcon,
}
