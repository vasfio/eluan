"use client"

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"
import * as stylex from "@stylexjs/stylex"

type ScrollAreaProps = Omit<
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>,
  "className" | "style"
>

type ScrollBarProps = Omit<
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  "className" | "style"
>

const styles = stylex.create({
  root: {
    overflow: "hidden",
    position: "relative",
  },
  viewport: {
    borderRadius: "inherit",
    height: "100%",
    width: "100%",
  },
  scrollbar: {
    display: "flex",
    touchAction: "none",
    transitionDuration: "150ms",
    transitionProperty: "color, background-color, border-color",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    userSelect: "none",
  },
  scrollbarVertical: {
    borderLeftColor: "transparent",
    borderLeftStyle: "solid",
    borderLeftWidth: 1,
    height: "100%",
    padding: 1,
    width: "calc(var(--spacing-sm) + var(--spacing-xxs))",
  },
  scrollbarHorizontal: {
    borderTopColor: "transparent",
    borderTopStyle: "solid",
    borderTopWidth: 1,
    flexDirection: "column",
    height: "calc(var(--spacing-sm) + var(--spacing-xxs))",
    padding: 1,
  },
  thumb: {
    backgroundColor: "var(--interactive-border-alt)",
    borderRadius: "var(--radius-radius-full)",
    flex: 1,
    position: "relative",
  },
})

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  ScrollAreaProps
>(({ children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    {...props}
    {...stylex.props(styles.root)}
  >
    <ScrollAreaPrimitive.Viewport {...stylex.props(styles.viewport)}>
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  ScrollBarProps
>(({ orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    {...props}
    {...stylex.props(
      styles.scrollbar,
      orientation === "vertical" && styles.scrollbarVertical,
      orientation === "horizontal" && styles.scrollbarHorizontal
    )}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb {...stylex.props(styles.thumb)} />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }
