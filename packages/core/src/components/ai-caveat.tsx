import * as React from "react"
import * as stylex from "@stylexjs/stylex"
import { AlertTriangle } from "lucide-react"

export type AICaveatVariant = "subtle" | "bordered" | "warning"

export interface AICaveatProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style"> {
  /** Override the default icon */
  icon?: React.ReactNode
  variant?: AICaveatVariant
}

const styles = stylex.create({
  root: {
    alignItems: "center",
    color: "var(--container-fg-alt)",
    display: "inline-flex",
    fontSize: "var(--font-size-xs)",
    gap: "var(--spacing-xs)",
  },
  bordered: {
    backgroundColor: "var(--container-bg-alt)",
    borderColor: "var(--container-border)",
    borderRadius: "var(--curves-sm)",
    borderStyle: "solid",
    borderWidth: 1,
    padding: "var(--spacing-xs)",
  },
  warning: {
    backgroundColor: "var(--cautionary-bg-alt,var(--container-bg-alt))",
    borderColor: "var(--cautionary-border)",
    color: "var(--cautionary-fg)",
  },
  icon: {
    flexShrink: 0,
    height: "var(--size-xxs)",
    width: "var(--size-xxs)",
  },
})

const AICaveat = React.forwardRef<HTMLDivElement, AICaveatProps>(
  ({ variant = "subtle", icon, children, ...props }, ref) => (
    <div
      ref={ref}
      {...props}
      {...stylex.props(
        styles.root,
        variant === "bordered" && styles.bordered,
        variant === "warning" && styles.bordered,
        variant === "warning" && styles.warning
      )}
    >
      {icon ?? <AlertTriangle {...stylex.props(styles.icon)} />}
      <span>{children}</span>
    </div>
  )
)
AICaveat.displayName = "AICaveat"

export { AICaveat }
