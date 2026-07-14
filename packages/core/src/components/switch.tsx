import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import * as stylex from "@stylexjs/stylex"

type SwitchProps = Omit<
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>,
  "className" | "style"
>

const styles = stylex.create({
  root: {
    alignItems: "center",
    borderStyle: "solid",
    borderWidth: 2,
    boxShadow: "var(--skeuo-recessed)",
    cursor: "pointer",
    display: "inline-flex",
    flexShrink: 0,
    height: "var(--size-xs)",
    borderRadius: "var(--radius-radius-full)",
    transitionDuration: "150ms",
    transitionProperty: "color, background-color, border-color, box-shadow",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    width: "var(--size-lg)",
    ":focus-visible": {
      outlineColor: "var(--interactive-border)",
      outlineOffset: "1px",
      outlineStyle: "solid",
      outlineWidth: "1px",
    },
    ":disabled": {
      backgroundColor: "var(--interactive-bg-disabled)",
      color: "var(--interactive-fg-disabled)",
      cursor: "not-allowed",
    },
    "[data-state=checked]": {
      backgroundColor: "var(--interactive-bg-selected)",
      borderColor: "var(--interactive-bg-selected)",
    },
    "[data-state=unchecked]": {
      backgroundColor: "var(--interactive-border-alt)",
      borderColor: "var(--interactive-border-alt)",
    },
  },
  thumb: {
    backgroundColor: "var(--interactive-bg)",
    backgroundImage: "var(--skeuo-surface-raised)",
    borderRadius: "var(--radius-radius-full)",
    boxShadow: "var(--skeuo-raised)",
    display: "block",
    height: "var(--size-xxs)",
    pointerEvents: "none",
    transitionDuration: "150ms",
    transitionProperty: "transform",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    width: "var(--size-xxs)",
    "[data-state=checked]": {
      transform: "translateX(calc(var(--size-lg) - var(--size-xxs) - 4px))",
    },
    "[data-state=unchecked]": {
      transform: "translateX(0)",
    },
  },
})

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>((props, ref) => (
  <SwitchPrimitives.Root ref={ref} {...props} {...stylex.props(styles.root)}>
    <SwitchPrimitives.Thumb {...stylex.props(styles.thumb)} />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
