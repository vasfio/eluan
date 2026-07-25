import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import * as stylex from "@stylexjs/stylex"

import { type ToggleSize, type ToggleVariant } from "./toggle"

// Toggle Group intentionally does not support the "outline" variant that the
// standalone Toggle offers — it only renders the default style.
type ToggleGroupVariant = Exclude<ToggleVariant, "outline">

interface ToggleGroupVariantContext {
  size: ToggleSize
  variant: ToggleGroupVariant
}

const ToggleGroupContext = React.createContext<ToggleGroupVariantContext>({
  size: "default",
  variant: "default",
})

export interface ToggleGroupProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>,
    "className" | "style"
  > {
  size?: ToggleSize
  variant?: ToggleGroupVariant
}

export interface ToggleGroupItemProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>,
    "className" | "style"
  > {
  size?: ToggleSize
  variant?: ToggleGroupVariant
}

const styles = stylex.create({
  root: {
    alignItems: "center",
    display: "flex",
    gap: "var(--spacing-xs)",
    justifyContent: "center",
  },
  item: {
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
      color: "var(--interactive-fg-disabled)",
      pointerEvents: "none",
    },
    "[data-state=on]": {
      backgroundColor: "var(--interactive-bg-selected)",
      backgroundImage: "var(--skeuo-surface-pressed)",
      boxShadow: "var(--skeuo-pressed)",
      color: "var(--interactive-fg-selected)",
    },
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
  sizeIconMd: {
    height: "var(--size-md)",
    padding: 0,
    width: "var(--size-md)",
  },
})

const variantStyles = {
  default: null,
} satisfies Record<ToggleGroupVariant, stylex.StyleXStyles | null>

const sizeStyles = {
  default: styles.sizeDefault,
  sm: styles.sizeSm,
  iconMd: styles.sizeIconMd,
} satisfies Record<ToggleSize, stylex.StyleXStyles>

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  ToggleGroupProps
>(({ variant = "default", size = "default", children, ...props }, ref) => {
  const Root = ToggleGroupPrimitive.Root as React.ElementType

  return (
    <Root ref={ref} {...props} {...stylex.props(styles.root)}>
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </Root>
  )
})

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  ToggleGroupItemProps
>(({ children, variant, size, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext)
  const resolvedVariant = variant ?? context.variant
  const resolvedSize = size ?? context.size

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      {...props}
      {...stylex.props(
        styles.item,
        variantStyles[resolvedVariant],
        sizeStyles[resolvedSize]
      )}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
})

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

export { ToggleGroup, ToggleGroupItem }
