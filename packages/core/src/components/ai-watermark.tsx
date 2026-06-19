import * as React from "react"
import * as stylex from "@stylexjs/stylex"
import { Sparkles } from "lucide-react"

import { Badge } from "./badge"

export type AIWatermarkVariant = "overlay" | "corner" | "border"
export type AIWatermarkPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"

export interface AIWatermarkProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style"> {
  /** Position of the watermark label (corner and overlay variants) */
  position?: AIWatermarkPosition
  /** Watermark text */
  text?: string
  variant?: AIWatermarkVariant
}

const styles = stylex.create({
  root: {
    position: "relative",
  },
  border: {
    borderColor: "var(--container-border)",
    borderStyle: "dashed",
    borderWidth: 1,
  },
  overlay: {
    alignItems: "center",
    display: "flex",
    inset: 0,
    justifyContent: "center",
    overflow: "hidden",
    pointerEvents: "none",
    position: "absolute",
  },
  overlayText: {
    color: "var(--container-fg-alt)",
    fontSize: "var(--font-size-xl)",
    fontWeight: 700,
    letterSpacing: "0.1em",
    opacity: 0.1,
    textTransform: "uppercase",
    transform: "rotate(-30deg)",
    userSelect: "none",
  },
  badge: {
    position: "absolute",
  },
  topLeft: {
    left: "var(--spacing-xs)",
    top: "var(--spacing-xs)",
  },
  topRight: {
    right: "var(--spacing-xs)",
    top: "var(--spacing-xs)",
  },
  bottomLeft: {
    bottom: "var(--spacing-xs)",
    left: "var(--spacing-xs)",
  },
  bottomRight: {
    bottom: "var(--spacing-xs)",
    right: "var(--spacing-xs)",
  },
  badgeContent: {
    alignItems: "center",
    display: "inline-flex",
    gap: "var(--spacing-xxs)",
  },
  icon: {
    height: "var(--spacing-md)",
    width: "var(--spacing-md)",
  },
})

const positionStyles = {
  "top-left": styles.topLeft,
  "top-right": styles.topRight,
  "bottom-left": styles.bottomLeft,
  "bottom-right": styles.bottomRight,
} satisfies Record<AIWatermarkPosition, stylex.StyleXStyles>

const AIWatermark = React.forwardRef<HTMLDivElement, AIWatermarkProps>(
  (
    {
      variant = "corner",
      text = "AI Generated",
      position = "bottom-right",
      children,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      {...props}
      {...stylex.props(styles.root, variant === "border" && styles.border)}
    >
      {children}

      {variant === "overlay" && (
        <div {...stylex.props(styles.overlay)}>
          <span {...stylex.props(styles.overlayText)}>{text}</span>
        </div>
      )}

      {(variant === "corner" || variant === "border") && (
        <span {...stylex.props(styles.badge, positionStyles[position])}>
          <Badge variant="secondary">
            <span {...stylex.props(styles.badgeContent)}>
              <Sparkles {...stylex.props(styles.icon)} />
              {text}
            </span>
          </Badge>
        </span>
      )}
    </div>
  )
)
AIWatermark.displayName = "AIWatermark"

export { AIWatermark }
