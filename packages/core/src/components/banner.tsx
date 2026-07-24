import * as React from "react"
import * as stylex from "@stylexjs/stylex"
import { X } from "lucide-react"

export type BannerVariant =
  | "default"
  | "destructive"
  | "warning"
  | "success"
  | "info"
  | "neutral"

export type BannerPosition = "top" | "bottom" | "inline"

export interface BannerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style"> {
  action?: React.ReactNode
  dismissible?: boolean
  icon?: React.ReactNode
  onDismiss?: () => void
  position?: BannerPosition
  variant?: BannerVariant
}

const styles = stylex.create({
  root: {
    alignItems: "center",
    display: "flex",
    fontSize: "var(--font-size-sm)",
    fontWeight: 500,
    gap: "var(--spacing-sm)",
    paddingBlock: "var(--spacing-xs)",
    paddingInline: "var(--spacing-sm)",
    position: "relative",
    width: "100%",
  },
  variantDefault: {
    backgroundColor: "var(--interactive-bg-inverse)",
    color: "var(--interactive-fg-inverse)",
  },
  variantDestructive: {
    backgroundColor: "var(--destructive-bg-alt)",
    borderColor: "var(--destructive-border)",
    borderStyle: "solid",
    borderWidth: 1,
    color: "var(--destructive-fg)",
  },
  variantWarning: {
    backgroundColor: "var(--cautionary-bg-alt, var(--cautionary-bg))",
    borderColor: "var(--cautionary-border)",
    borderStyle: "solid",
    borderWidth: 1,
    color: "var(--cautionary-fg)",
  },
  variantSuccess: {
    backgroundColor: "var(--positive-bg-alt, var(--positive-bg))",
    borderColor: "var(--positive-border)",
    borderStyle: "solid",
    borderWidth: 1,
    color: "var(--positive-fg)",
  },
  variantInfo: {
    backgroundColor: "var(--informative-bg-alt, var(--informative-bg))",
    borderColor: "var(--informative-border)",
    borderStyle: "solid",
    borderWidth: 1,
    color: "var(--informative-fg)",
  },
  variantNeutral: {
    backgroundColor: "var(--container-bg-alt)",
    borderColor: "var(--container-border-alt)",
    borderStyle: "solid",
    borderWidth: 1,
    color: "var(--container-fg-alt)",
  },
  positionTop: {
    insetInline: 0,
    position: "fixed",
    top: 0,
    zIndex: 50,
  },
  positionBottom: {
    bottom: 0,
    insetInline: 0,
    position: "fixed",
    zIndex: 50,
  },
  positionInline: {
    borderRadius: "var(--curves-sm)",
    position: "relative",
  },
  shrink: {
    flexShrink: 0,
  },
  content: {
    flex: 1,
  },
  dismissButton: {
    backgroundColor: "transparent",
    borderWidth: 0,
    borderRadius: "var(--curves-xs)",
    color: "inherit",
    cursor: "pointer",
    flexShrink: 0,
    opacity: 0.6,
    padding: 0,
    transitionDuration: "150ms",
    transitionProperty: "opacity",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    ":hover": {
      opacity: 1,
    },
    ":focus": {
      outlineStyle: "none",
    },
    ":focus-visible": {
      outlineColor: "var(--interactive-border-alt)",
      outlineOffset: "1px",
      outlineStyle: "solid",
      outlineWidth: "1px",
    },
  },
  dismissIcon: {
    height: "var(--size-xxs)",
    width: "var(--size-xxs)",
  },
})

const variantStyles = {
  default: styles.variantDefault,
  destructive: styles.variantDestructive,
  warning: styles.variantWarning,
  success: styles.variantSuccess,
  info: styles.variantInfo,
  neutral: styles.variantNeutral,
} satisfies Record<BannerVariant, stylex.StyleXStyles>

const positionStyles = {
  top: styles.positionTop,
  bottom: styles.positionBottom,
  inline: styles.positionInline,
} satisfies Record<BannerPosition, stylex.StyleXStyles>

const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  (
    {
      variant = "info",
      position = "inline",
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
      role="banner"
      {...props}
      {...stylex.props(styles.root, variantStyles[variant], positionStyles[position])}
    >
      {icon && <span {...stylex.props(styles.shrink)}>{icon}</span>}
      <div {...stylex.props(styles.content)}>{children}</div>
      {action && <div {...stylex.props(styles.shrink)}>{action}</div>}
      {dismissible && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          {...stylex.props(styles.dismissButton)}
        >
          <X aria-hidden="true" {...stylex.props(styles.dismissIcon)} />
        </button>
      )}
    </div>
  )
)
Banner.displayName = "Banner"

export { Banner }
