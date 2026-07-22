import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import * as stylex from "@stylexjs/stylex"

type SliderProps = Omit<
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
  "className" | "style"
>

const styles = stylex.create({
  root: {
    alignItems: "center",
    display: "flex",
    position: "relative",
    touchAction: "none",
    userSelect: "none",
    width: "100%",
  },
  track: {
    backgroundColor: "var(--interactive-bg-alt)",
    borderRadius: "var(--radius-radius-full)",
    boxShadow: "var(--skeuo-recessed)",
    flexGrow: 1,
    height: "calc(var(--spacing-xs) + var(--spacing-xxs))",
    overflow: "hidden",
    position: "relative",
    width: "100%",
  },
  range: {
    backgroundColor: "var(--interactive-bg-selected)",
    height: "100%",
    position: "absolute",
    "[data-disabled]": {
      backgroundColor: "var(--interactive-fg-disabled)",
    },
  },
  thumb: {
    backgroundColor: "var(--interactive-bg)",
    /* Three layers: two tiled dimple-grid layers (--skeuo-dimple) over the
       convex face — the size/repeat/position lists below map onto them. */
    backgroundImage: "var(--skeuo-dimple), var(--skeuo-surface-raised)",
    backgroundPosition: "center, center, center",
    backgroundRepeat: "repeat, repeat, no-repeat",
    backgroundSize: "var(--skeuo-dimple-size, auto), var(--skeuo-dimple-size, auto), auto",
    borderColor: "var(--interactive-bg-selected)",
    /* Rounded-rect fader cap; tracks the curves axis in both themes */
    borderRadius: "var(--curves-md)",
    borderStyle: "solid",
    borderWidth: 1,
    boxShadow: "var(--skeuo-raised)",
    display: "block",
    height: "var(--slider-thumb-height, var(--size-xxs))",
    transitionDuration: "150ms",
    transitionProperty: "color, background-color, border-color",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    width: "var(--slider-thumb-width, var(--size-xxs))",
    ":focus-visible": {
      outlineColor: "var(--interactive-border)",
      outlineOffset: "1px",
      outlineStyle: "solid",
      outlineWidth: "1px",
    },
    "[data-disabled]": {
      backgroundColor: "var(--interactive-bg-disabled)",
      borderColor: "var(--interactive-fg-disabled)",
      pointerEvents: "none",
    },
  },
})

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ value, defaultValue, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    value={value}
    defaultValue={defaultValue}
    {...props}
    {...stylex.props(styles.root)}
  >
    <SliderPrimitive.Track {...stylex.props(styles.track)}>
      <SliderPrimitive.Range {...stylex.props(styles.range)} />
    </SliderPrimitive.Track>
    {(Array.isArray(value) ? value : defaultValue ?? [0]).map((_, i) => (
      <SliderPrimitive.Thumb key={i} {...stylex.props(styles.thumb)} />
    ))}
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
