import * as React from "react"
import * as stylex from "@stylexjs/stylex"
import { Sparkles } from "lucide-react"

import { Badge } from "./badge"

export type AISharedVisionVariant = "glow" | "border" | "badge"

export interface AISharedVisionProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style"> {
  /** Whether the AI is actively working */
  active?: boolean
  /** Optional label to display (e.g. "AI is editing...") */
  label?: string
  variant?: AISharedVisionVariant
}

const pulse = stylex.keyframes({
  "0%, 100%": {
    opacity: 1,
  },
  "50%": {
    opacity: 0.5,
  },
})

const ping = stylex.keyframes({
  "75%, 100%": {
    opacity: 0,
    transform: "scale(2)",
  },
})

const styles = stylex.create({
  root: {
    borderRadius: "var(--curves-md)",
    position: "relative",
    transitionDuration: "150ms",
    transitionProperty: "all",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
  activeGlow: {
    animationDuration: "2s",
    animationIterationCount: "infinite",
    animationName: pulse,
    animationTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)",
    boxShadow: "0 0 0 2px var(--informative-border)",
  },
  activeBorder: {
    animationDuration: "2s",
    animationIterationCount: "infinite",
    animationName: pulse,
    animationTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)",
    borderColor: "var(--informative-border)",
    borderStyle: "solid",
    borderWidth: 2,
  },
  inactiveBorder: {
    borderColor: "transparent",
    borderStyle: "solid",
    borderWidth: 2,
  },
  badgePosition: {
    position: "absolute",
    right: 0,
    top: 0,
    transform: "translate(50%, -50%)",
    zIndex: 10,
  },
  badgeContent: {
    alignItems: "center",
    display: "inline-flex",
    gap: "var(--spacing-xxs)",
  },
  dotWrap: {
    display: "flex",
    height: "var(--spacing-sm)",
    position: "relative",
    width: "var(--spacing-sm)",
  },
  ping: {
    animationDuration: "1s",
    animationIterationCount: "infinite",
    animationName: ping,
    animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
    backgroundColor: "var(--informative-fg)",
    borderRadius: "var(--radius-radius-full)",
    display: "inline-flex",
    height: "100%",
    opacity: 0.75,
    position: "absolute",
    width: "100%",
  },
  dot: {
    backgroundColor: "var(--informative-fg)",
    borderRadius: "var(--radius-radius-full)",
    display: "inline-flex",
    height: "var(--spacing-sm)",
    position: "relative",
    width: "var(--spacing-sm)",
  },
  label: {
    alignItems: "center",
    color: "var(--informative-fg)",
    display: "flex",
    fontSize: "var(--font-size-xs)",
    gap: "var(--spacing-xxs)",
    marginTop: "var(--spacing-xxs)",
  },
  sparkle: {
    height: "var(--spacing-md)",
    width: "var(--spacing-md)",
  },
})

const AISharedVision = React.forwardRef<HTMLDivElement, AISharedVisionProps>(
  (
    {
      variant = "glow",
      active = false,
      label,
      children,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      {...props}
      {...stylex.props(
        styles.root,
        variant === "glow" && active && styles.activeGlow,
        variant === "border" && (active ? styles.activeBorder : styles.inactiveBorder)
      )}
    >
      {children}
      {variant === "badge" && active && (
        <span {...stylex.props(styles.badgePosition)}>
          <Badge variant="informative">
            <span {...stylex.props(styles.badgeContent)}>
              <span {...stylex.props(styles.dotWrap)}>
                <span {...stylex.props(styles.ping)} />
                <span {...stylex.props(styles.dot)} />
              </span>
              {label || "AI Active"}
            </span>
          </Badge>
        </span>
      )}
      {variant !== "badge" && active && label && (
        <span {...stylex.props(styles.label)}>
          <Sparkles {...stylex.props(styles.sparkle)} />
          {label}
        </span>
      )}
    </div>
  )
)
AISharedVision.displayName = "AISharedVision"

export { AISharedVision }
