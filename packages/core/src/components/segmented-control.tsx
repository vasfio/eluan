import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import * as stylex from "@stylexjs/stylex"

type SegmentedControlSize = "default" | "sm"

interface SegmentedControlContextValue {
  size: SegmentedControlSize
  fullWidth: boolean
  disabled: boolean
}

const SegmentedControlContext =
  React.createContext<SegmentedControlContextValue>({
    size: "default",
    fullWidth: false,
    disabled: false,
  })

export interface SegmentedControlProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>,
    "className" | "style" | "orientation" | "asChild"
  > {
  size?: SegmentedControlSize
  fullWidth?: boolean
  disabled?: boolean
}

export type SegmentedControlItemProps = Omit<
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
  "className" | "style" | "asChild"
>

const styles = stylex.create({
  root: {
    display: "inline-flex",
    verticalAlign: "middle",
  },
  rootFullWidth: {
    display: "flex",
    width: "100%",
  },
  track: {
    alignItems: "center",
    backgroundColor: "var(--backgrounds-secondary)",
    borderRadius: "var(--curves-md)",
    display: "inline-flex",
    gap: "var(--spacing-xs)",
    padding: "var(--spacing-xs)",
  },
  trackFullWidth: {
    display: "flex",
    width: "100%",
  },
  segment: {
    alignItems: "center",
    backgroundColor: "transparent",
    backgroundImage: "none",
    borderRadius: "calc(var(--curves-md) - var(--spacing-xs))",
    borderWidth: 0,
    color: "var(--interactive-fg-alt)",
    cursor: "pointer",
    display: "inline-flex",
    fontSize: "var(--font-size-sm)",
    fontWeight: 500,
    height: "var(--size-md)",
    justifyContent: "center",
    paddingInline: "var(--spacing-md)",
    transitionDuration: "150ms",
    transitionProperty: "color, background-color, box-shadow",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    whiteSpace: "nowrap",
    ":hover": {
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
    "[data-state=active]": {
      backgroundColor: "var(--interactive-bg)",
      color: "var(--interactive-fg)",
    },
  },
  segmentSm: {
    fontSize: "var(--font-size-xs)",
    height: "var(--size-sm)",
    paddingInline: "var(--spacing-sm)",
  },
  segmentFullWidth: {
    flexBasis: 0,
    flexGrow: 1,
    flexShrink: 1,
  },
})

const sizeStyles = {
  default: null,
  sm: styles.segmentSm,
} satisfies Record<SegmentedControlSize, stylex.StyleXStyles | null>

const SegmentedControl = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  SegmentedControlProps
>(
  (
    { size = "default", fullWidth = false, disabled = false, children, ...props },
    ref
  ) => {
    const context = React.useMemo<SegmentedControlContextValue>(
      () => ({ size, fullWidth, disabled }),
      [size, fullWidth, disabled]
    )

    return (
      <TabsPrimitive.Root
        ref={ref}
        {...props}
        {...stylex.props(styles.root, fullWidth && styles.rootFullWidth)}
      >
        <SegmentedControlContext.Provider value={context}>
          <TabsPrimitive.List
            {...stylex.props(styles.track, fullWidth && styles.trackFullWidth)}
          >
            {children}
          </TabsPrimitive.List>
        </SegmentedControlContext.Provider>
      </TabsPrimitive.Root>
    )
  }
)
SegmentedControl.displayName = "SegmentedControl"

const SegmentedControlItem = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  SegmentedControlItemProps
>(({ disabled, children, ...props }, ref) => {
  const context = React.useContext(SegmentedControlContext)

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      disabled={disabled || context.disabled}
      {...props}
      {...stylex.props(
        styles.segment,
        sizeStyles[context.size],
        context.fullWidth && styles.segmentFullWidth
      )}
    >
      {children}
    </TabsPrimitive.Trigger>
  )
})
SegmentedControlItem.displayName = "SegmentedControlItem"

export { SegmentedControl, SegmentedControlItem }
