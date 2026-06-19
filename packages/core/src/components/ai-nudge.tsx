import * as React from "react"
import * as stylex from "@stylexjs/stylex"
import { Sparkles, X } from "lucide-react"

import { Button } from "./button"

export type AINudgeVariant = "inline" | "floating" | "subtle"

/** Contextual AI feature discovery hint. */
export interface AINudgeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style"> {
  /** Optional action element (e.g. a button or link). */
  action?: React.ReactNode
  /** Whether the nudge can be dismissed. */
  dismissible?: boolean
  /** Called when the dismiss button is clicked. */
  onDismiss?: () => void
  /** Override the default Sparkles icon. */
  icon?: React.ReactNode
  variant?: AINudgeVariant
}

const styles = stylex.create({
  root: {
    alignItems: "center",
    display: "flex",
    fontSize: "var(--font-size-sm)",
    fontWeight: 400,
    gap: "var(--spacing-sm)",
  },
  inline: {
    backgroundColor: "var(--informative-bg-alt,var(--informative-bg))",
    borderColor: "var(--informative-border)",
    borderRadius: "var(--curves-sm)",
    borderStyle: "solid",
    borderWidth: 1,
    color: "var(--informative-fg)",
    paddingBlock: "var(--spacing-xs)",
    paddingInline: "var(--spacing-sm)",
    position: "relative",
    width: "100%",
  },
  floating: {
    backgroundColor: "var(--informative-bg-alt,var(--informative-bg))",
    borderColor: "var(--informative-border)",
    borderRadius: "var(--curves-md)",
    borderStyle: "solid",
    borderWidth: 1,
    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    color: "var(--informative-fg)",
    paddingBlock: "var(--spacing-xs)",
    paddingInline: "var(--spacing-sm)",
    position: "absolute",
    zIndex: 50,
  },
  subtle: {
    color: "var(--foregrounds-tertiary)",
  },
  iconWrap: {
    color: "var(--informative-fg)",
    flexShrink: 0,
  },
  icon: {
    height: "var(--size-xxs)",
    width: "var(--size-xxs)",
  },
  content: {
    flex: 1,
  },
  action: {
    flexShrink: 0,
  },
})

const AINudge = React.forwardRef<HTMLDivElement, AINudgeProps>(
  (
    {
      variant = "inline",
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
      {...props}
      {...stylex.props(
        styles.root,
        variant === "inline" && styles.inline,
        variant === "floating" && styles.floating,
        variant === "subtle" && styles.subtle
      )}
    >
      <span {...stylex.props(styles.iconWrap)}>
        {icon ?? <Sparkles {...stylex.props(styles.icon)} />}
      </span>
      <span {...stylex.props(styles.content)}>{children}</span>
      {action && <div {...stylex.props(styles.action)}>{action}</div>}
      {dismissible && (
        <span {...stylex.props(styles.action)}>
          <Button
            variant="fadedGhost"
            size="inlineIcon"
            onClick={onDismiss}
            aria-label="Dismiss"
          >
            <X {...stylex.props(styles.icon)} />
          </Button>
        </span>
      )}
    </div>
  )
)
AINudge.displayName = "AINudge"

export { AINudge }
