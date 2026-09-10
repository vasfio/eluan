import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import * as stylex from "@stylexjs/stylex"

export type ToggleVariant = "default" | "outline"
export type ToggleSize = "default" | "sm" | "iconSm"

export interface ToggleProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>,
    "className" | "style"
  > {
  size?: ToggleSize
  variant?: ToggleVariant
}

const styles = stylex.create({
  root: {
    alignItems: "center",
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderRadius: "var(--curves-md)",
    borderStyle: "solid",
    borderWidth: 0,
    display: "inline-flex",
    fontSize: "var(--font-size-sm)",
    fontWeight: 500,
    gap: "var(--spacing-sm)",
    justifyContent: "center",
    transitionDuration: "150ms",
    transitionProperty: "color, background-color, border-color, box-shadow",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    ":hover": {
      backgroundColor: "var(--interactive-bg-hover)",
      color: "var(--interactive-fg)",
    },
    ":focus-visible": {
      outlineColor: "var(--interactive-border)",
      outlineOffset: "1px",
      outlineStyle: "solid",
      outlineWidth: "1px",
    },
    ":disabled": {
      backgroundColor: "var(--interactive-bg-disabled)",
      color: "var(--interactive-fg-disabled)",
      pointerEvents: "none",
    },
    "[data-state=on]": {
      backgroundColor: "var(--interactive-bg-selected)",
      color: "var(--interactive-fg-selected)",
    },
  },
  outline: {
    borderColor: "var(--interactive-border-alt)",
    borderWidth: 1,
  },
  sizeDefault: {
    height: "var(--size-lg)",
    minWidth: "var(--size-lg)",
    paddingInline: "var(--spacing-md)",
  },
  sizeSm: {
    fontSize: "var(--font-size-xs)",
    height: "var(--size-sm)",
    minWidth: 0,
    paddingInline: "var(--spacing-xs)",
  },
  sizeIconSm: {
    height: "var(--size-md)",
    padding: 0,
    width: "var(--size-md)",
  },
})

const variantStyles = {
  default: null,
  outline: styles.outline,
} satisfies Record<ToggleVariant, stylex.StyleXStyles | null>

const sizeStyles = {
  default: styles.sizeDefault,
  sm: styles.sizeSm,
  iconSm: styles.sizeIconSm,
} satisfies Record<ToggleSize, stylex.StyleXStyles>

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  ToggleProps
>(({ variant = "default", size = "default", ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    {...props}
    {...stylex.props(styles.root, variantStyles[variant], sizeStyles[size])}
  />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle }
