import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import * as stylex from "@stylexjs/stylex"

const Tabs = TabsPrimitive.Root

type TabsListProps = Omit<
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
  "className" | "style"
>

type TabsTriggerProps = Omit<
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
  "className" | "style"
>

type TabsContentProps = Omit<
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>,
  "className" | "style"
>

const styles = stylex.create({
  // Theme-scoped via --tabs-* component tokens (see packages/tokens themes.css):
  // industrial-retro renders the machined SegmentedControl look (recessed track,
  // raised active cap); minimal keeps its original flat pill. All theme-varying
  // properties resolve through those tokens so minimal is frozen unchanged.
  list: {
    alignItems: "center",
    backgroundColor: "var(--tabs-list-bg)",
    borderRadius: "var(--tabs-list-radius)",
    boxShadow: "var(--tabs-list-shadow)",
    color: "var(--interactive-fg-alt)",
    display: "inline-flex",
    gap: "var(--tabs-list-gap)",
    justifyContent: "center",
    minHeight: "var(--size-lg)",
    padding: "var(--tabs-list-padding)",
  },
  trigger: {
    alignItems: "center",
    backgroundColor: "transparent",
    backgroundImage: "none",
    borderWidth: 0,
    borderRadius: "var(--tabs-trigger-radius)",
    color: "var(--tabs-trigger-fg)",
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
      color: "var(--tabs-trigger-hover-fg)",
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
      backgroundColor: "var(--tabs-trigger-selected-bg)",
      backgroundImage: "var(--tabs-trigger-selected-surface)",
      boxShadow: "var(--tabs-trigger-selected-shadow)",
      color: "var(--tabs-trigger-selected-fg)",
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
