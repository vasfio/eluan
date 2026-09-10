import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import * as stylex from "@stylexjs/stylex"

const Tabs = TabsPrimitive.Root

export type TabsListProps = Omit<
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
  "className" | "style"
>

export type TabsTriggerProps = Omit<
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
  "className" | "style"
>

export type TabsContentProps = Omit<
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>,
  "className" | "style"
>

const styles = stylex.create({
  // Styled from the generic semantic tokens (interactive / container / curves /
  // spacing), not a private --tabs-* family: a flat pill with an underlaid
  // track and a subtly raised active cap. Custom themes restyle it by moving
  // those semantic tokens, which is the same lever every other component uses.
  list: {
    alignItems: "center",
    backgroundColor: "var(--interactive-bg-alt)",
    borderRadius: "var(--curves-md)",
    boxShadow: "none",
    color: "var(--interactive-fg-alt)",
    display: "inline-flex",
    gap: 0,
    justifyContent: "center",
    minHeight: "var(--size-lg)",
    padding: "var(--spacing-xs)",
  },
  trigger: {
    alignItems: "center",
    backgroundColor: "transparent",
    backgroundImage: "none",
    borderWidth: 0,
    borderRadius: "var(--curves-sm)",
    color: "var(--interactive-fg-alt)",
    display: "inline-flex",
    fontSize: "var(--font-size-sm)",
    fontWeight: 500,
    justifyContent: "center",
    paddingBlock: "var(--spacing-xs)",
    paddingInline: "var(--spacing-sm)",
    transitionDuration: "150ms",
    transitionProperty: "color, background-color, box-shadow",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    whiteSpace: "nowrap",
    ":hover": {
      color: "var(--interactive-fg-alt)",
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
      backgroundColor: "var(--container-bg)",
      backgroundImage: "none",
      boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      color: "var(--interactive-fg)",
    },
  },
  content: {
    marginTop: "var(--spacing-sm)",
    ":focus-visible": {
      outlineColor: "var(--interactive-border)",
      outlineOffset: "1px",
      outlineStyle: "solid",
      outlineWidth: "1px",
    },
  },
})

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    {...props}
    {...stylex.props(styles.list)}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    {...props}
    {...stylex.props(styles.trigger)}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>(({ ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    {...props}
    {...stylex.props(styles.content)}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
