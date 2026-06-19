import * as React from "react"
import * as stylex from "@stylexjs/stylex"
import { FileEdit, FileCheck } from "lucide-react"

import { Badge } from "./badge"

export type AIDraftIndicatorVariant = "default" | "compact"

export interface AIDraftIndicatorProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style" | "onChange"> {
  /** Token cost string to display when showCost is true */
  cost?: string
  /** Optional label override */
  label?: string
  /** Current mode of the indicator */
  mode: "draft" | "final"
  /** Callback when the mode is toggled */
  onModeChange?: (mode: "draft" | "final") => void
  /** Show approximate token cost difference */
  showCost?: boolean
  variant?: AIDraftIndicatorVariant
}

const styles = stylex.create({
  root: {
    alignItems: "center",
    display: "inline-flex",
    fontSize: "var(--font-size-sm)",
    fontWeight: 500,
    gap: "var(--spacing-xxs)",
  },
  compact: {
    borderRadius: "var(--curves-xl)",
    paddingBlock: "var(--spacing-xxs)",
    paddingInline: "var(--spacing-xs)",
  },
  draft: {
    backgroundColor: "var(--cautionary-bg-alt)",
    borderColor: "var(--cautionary-border)",
    borderStyle: "dashed",
    borderWidth: 1,
    color: "var(--cautionary-fg)",
  },
  final: {
    backgroundColor: "var(--positive-bg-alt)",
    borderColor: "var(--positive-border)",
    borderStyle: "solid",
    borderWidth: 1,
    color: "var(--positive-fg)",
  },
  group: {
    alignItems: "center",
    display: "inline-flex",
    gap: "var(--spacing-xs)",
  },
  option: {
    alignItems: "center",
    backgroundColor: "transparent",
    borderColor: "var(--interactive-border-alt)",
    borderRadius: "var(--curves-xl)",
    borderStyle: "solid",
    borderWidth: 1,
    color: "var(--interactive-fg)",
    cursor: "pointer",
    display: "inline-flex",
    fontSize: "var(--font-size-sm)",
    fontWeight: 500,
    gap: "var(--spacing-sm)",
    height: "var(--size-lg)",
    justifyContent: "center",
    minWidth: "var(--size-lg)",
    paddingInline: "var(--spacing-md)",
    transitionDuration: "150ms",
    transitionProperty: "color, background-color, border-color",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    ":hover": {
      backgroundColor: "var(--interactive-bg-hover)",
    },
    ":focus-visible": {
      outlineColor: "var(--interactive-border)",
      outlineOffset: "1px",
      outlineStyle: "solid",
      outlineWidth: "1px",
    },
  },
  icon: {
    height: "calc(var(--spacing-md) + var(--spacing-xxs))",
    width: "calc(var(--spacing-md) + var(--spacing-xxs))",
  },
})

const AIDraftIndicator = React.forwardRef<
  HTMLDivElement,
  AIDraftIndicatorProps
>(
  (
    {
      variant = "default",
      mode,
      onModeChange,
      label,
      showCost = false,
      cost,
      ...props
    },
    ref
  ) => {
    const isDraft = mode === "draft"
    const isCompact = variant === "compact"
    const Icon = isDraft ? FileEdit : FileCheck
    const defaultLabel = isDraft ? "Draft" : "Final"

    if (isCompact) {
      return (
        <div
          ref={ref}
          {...props}
          {...stylex.props(
            styles.root,
            styles.compact,
            isDraft ? styles.draft : styles.final
          )}
        >
          <Icon {...stylex.props(styles.icon)} />
          <span>{label || defaultLabel}</span>
        </div>
      )
    }

    return (
      <div ref={ref} {...props} {...stylex.props(styles.root)}>
        <div role="group" aria-label="Draft or final mode" {...stylex.props(styles.group)}>
          <button
            type="button"
            aria-pressed={isDraft}
            onClick={() => onModeChange?.("draft")}
            {...stylex.props(styles.option, isDraft && styles.draft)}
          >
            <FileEdit {...stylex.props(styles.icon)} />
            Draft
          </button>
          <button
            type="button"
            aria-pressed={!isDraft}
            onClick={() => onModeChange?.("final")}
            {...stylex.props(styles.option, !isDraft && styles.final)}
          >
            <FileCheck {...stylex.props(styles.icon)} />
            Final
          </button>
        </div>
        {showCost && cost && <Badge variant="secondary">{cost}</Badge>}
      </div>
    )
  }
)
AIDraftIndicator.displayName = "AIDraftIndicator"

export { AIDraftIndicator }
