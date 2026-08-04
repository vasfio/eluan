import * as React from "react"
import * as stylex from "@stylexjs/stylex"
import { X } from "lucide-react"

export type BadgeVariant =
  | "default"
  | "secondary"
  | "destructive"
  | "outline"
  | "positive"
  | "caution"
  | "informative"
  | "important"

export type BadgeSize = "default" | "microdot"

export interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "className" | "style"> {
  /** Show a remove button — call onRemove when clicked */
  onRemove?: () => void
  removable?: boolean
  size?: BadgeSize
  variant?: BadgeVariant
}

const styles = stylex.create({
  root: {
    alignItems: "center",
    borderStyle: "solid",
    borderWidth: 1,
    display: "inline-flex",
    fontWeight: 400,
    transitionDuration: "150ms",
    transitionProperty: "color, background-color, border-color",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    ":focus": {
      outlineStyle: "none",
    },
    ":focus-visible": {
      outlineColor: "color-mix(in srgb, var(--container-border) 50%, transparent)",
      outlineOffset: "1px",
      outlineStyle: "solid",
      outlineWidth: "1px",
    },
  },
  variantDefault: {
    backgroundColor: "var(--action-primary-bg)",
    borderColor: "transparent",
    color: "var(--action-primary-fg)",
  },
  variantSecondary: {
    backgroundColor: "var(--interactive-bg-alt2)",
    borderColor: "transparent",
    color: "var(--container-fg-alt)",
  },
  variantDestructive: {
    backgroundColor: "var(--destructive-bg-alt)",
    borderColor: "transparent",
    color: "var(--destructive-fg)",
  },
  variantOutline: {
    backgroundColor: "transparent",
    borderColor: "var(--container-border)",
    color: "var(--container-fg-alt)",
  },
  variantPositive: {
    backgroundColor: "var(--positive-bg)",
    borderColor: "transparent",
    color: "var(--positive-fg)",
  },
  variantCaution: {
    backgroundColor: "var(--cautionary-bg)",
    borderColor: "transparent",
    color: "var(--cautionary-fg)",
  },
  variantInformative: {
    backgroundColor: "var(--informative-bg)",
    borderColor: "transparent",
    color: "var(--informative-fg)",
  },
  variantImportant: {
    backgroundColor: "var(--important-bg)",
    borderColor: "transparent",
    color: "var(--important-fg)",
  },
  sizeDefault: {
    borderRadius: "var(--curves-md)",
    fontSize: "var(--font-size-xs)",
    gap: "var(--spacing-xs)",
    paddingBlock: "var(--spacing-xxs)",
    paddingInline: "var(--spacing-xs)",
  },
  sizeMicrodot: {
    borderRadius: "var(--radius-radius-full)",
    borderWidth: 0,
    boxShadow: "0 0 0 2px var(--container-bg)",
    height: "calc(var(--spacing-sm) + var(--spacing-xxs))",
    padding: 0,
    width: "calc(var(--spacing-sm) + var(--spacing-xxs))",
  },
  removeButton: {
    backgroundColor: "transparent",
    borderWidth: 0,
    borderRadius: "var(--curves-xl)",
    color: "inherit",
    cursor: "pointer",
    marginLeft: "var(--spacing-xxs)",
    marginRight: "calc(var(--spacing-xxs) * -1)",
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
  },
  removeIcon: {
    height: "var(--spacing-md)",
    width: "var(--spacing-md)",
  },
})

const variantStyles = {
  default: styles.variantDefault,
  secondary: styles.variantSecondary,
  destructive: styles.variantDestructive,
  outline: styles.variantOutline,
  positive: styles.variantPositive,
  caution: styles.variantCaution,
  informative: styles.variantInformative,
  important: styles.variantImportant,
} satisfies Record<BadgeVariant, stylex.StyleXStyles>

const sizeStyles = {
  default: styles.sizeDefault,
  microdot: styles.sizeMicrodot,
} satisfies Record<BadgeSize, stylex.StyleXStyles>

function Badge({
  variant = "default",
  size = "default",
  onRemove,
  removable,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      {...props}
      {...stylex.props(styles.root, variantStyles[variant], sizeStyles[size])}
    >
      {size !== "microdot" && children}
      {size !== "microdot" && (removable || onRemove) && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onRemove?.()
          }}
          aria-label="Remove"
          {...stylex.props(styles.removeButton)}
        >
          <X aria-hidden="true" {...stylex.props(styles.removeIcon)} />
        </button>
      )}
    </span>
  )
}

export { Badge }
