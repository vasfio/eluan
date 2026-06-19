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
  list: {
    alignItems: "center",
    backgroundColor: "var(--interactive-bg-alt)",
    borderRadius: "var(--curves-md)",
    color: "var(--interactive-fg-alt)",
    display: "inline-flex",
    justifyContent: "center",
    minHeight: "var(--size-lg)",
    padding: "var(--spacing-xs)",
  },
  trigger: {
    alignItems: "center",
    borderWidth: 0,
    borderRadius: "var(--curves-sm)",
    display: "inline-flex",
    fontSize: "var(--font-size-sm)",
    fontWeight: 500,
    justifyContent: "center",
    paddingBlock: "var(--spacing-xs)",
    paddingInline: "var(--spacing-sm)",
    transitionDuration: "150ms",
    transitionProperty: "all",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    whiteSpace: "nowrap",
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
    "[data-state=active]": {
      backgroundColor: "var(--container-bg)",
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
