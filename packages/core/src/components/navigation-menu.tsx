"use client"

import * as React from "react"
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import * as stylex from "@stylexjs/stylex"
import { ChevronDown } from "lucide-react"

export type NavigationMenuRootProps = Omit<
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>,
  "className" | "style"
>

export type NavigationMenuListProps = Omit<
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>,
  "className" | "style"
>

export type NavigationMenuTriggerProps = Omit<
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>,
  "className" | "style"
>

export type NavigationMenuContentProps = Omit<
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>,
  "className" | "style"
>

export type NavigationMenuViewportProps = Omit<
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>,
  "className" | "style"
>

export type NavigationMenuIndicatorProps = Omit<
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>,
  "className" | "style"
>

const styles = stylex.create({
  root: {
    alignItems: "center",
    display: "flex",
    flex: "1 1 0%",
    justifyContent: "center",
    maxWidth: "max-content",
    position: "relative",
    zIndex: 10,
  },
  list: {
    alignItems: "center",
    display: "flex",
    flex: "1 1 0%",
    gap: "var(--spacing-xxs)",
    justifyContent: "center",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  trigger: {
    alignItems: "center",
    backgroundColor: "var(--container-bg)",
    borderRadius: "var(--curves-md)",
    display: "inline-flex",
    fontSize: "var(--font-size-sm)",
    fontWeight: 500,
    height: "var(--size-lg)",
    justifyContent: "center",
    paddingBlock: "var(--spacing-sm)",
    paddingInline: "var(--spacing-md)",
    transitionDuration: "150ms",
    transitionProperty: "background-color, color",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    width: "max-content",
    ":hover": {
      backgroundColor: "var(--interactive-bg-hover)",
      color: "var(--interactive-fg)",
    },
    ":focus": {
      backgroundColor: "var(--interactive-bg-hover)",
      color: "var(--interactive-fg)",
      outlineStyle: "none",
    },
    ":disabled": {
      backgroundColor: "var(--interactive-bg-disabled)",
      color: "var(--interactive-fg-disabled)",
      pointerEvents: "none",
    },
    "[data-active]": {
      backgroundColor: "var(--interactive-bg-active)",
    },
    "[data-state=open]": {
      backgroundColor: "var(--interactive-bg-hover)",
    },
  },
  chevron: {
    height: "var(--size-xxs)",
    marginLeft: "var(--spacing-xs)",
    transitionDuration: "150ms",
    transitionProperty: "transform",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    width: "var(--size-xxs)",
  },
  content: {
    left: 0,
    padding: "var(--spacing-lg)",
    top: 0,
    width: "100%",
    "@media (min-width: 768px)": {
      position: "absolute",
      width: "auto",
    },
  },
  // Anchor the single shared viewport to the left edge of the menu bar (below
  // the List) rather than centering it under the whole List — centering makes
  // wide panels read as a detached "popover in the middle". Radix's
  // single-viewport model exposes no per-trigger left offset, so left-aligning
  // under the bar is the closest it can sit to the open trigger.
  viewportWrap: {
    display: "flex",
    justifyContent: "flex-start",
    left: 0,
    position: "absolute",
    top: "100%",
  },
  viewport: {
    backgroundColor: "var(--container-bg)",
    borderColor: "var(--container-border)",
    borderRadius: "var(--curves-md)",
    borderStyle: "solid",
    borderWidth: 1,
    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    color: "var(--container-fg)",
    height: "var(--radix-navigation-menu-viewport-height)",
    marginTop: "var(--spacing-xs)",
    overflow: "hidden",
    position: "relative",
    transformOrigin: "top center",
    width: "100%",
    "@media (min-width: 768px)": {
      width: "var(--radix-navigation-menu-viewport-width)",
    },
  },
  indicator: {
    alignItems: "flex-end",
    display: "flex",
    height: "calc(var(--spacing-xs) + var(--spacing-xxs))",
    justifyContent: "center",
    overflow: "hidden",
    top: "100%",
    zIndex: 1,
  },
  indicatorArrow: {
    backgroundColor: "var(--container-bg-alt)",
    borderTopLeftRadius: "var(--curves-sm)",
    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    height: "var(--spacing-sm)",
    position: "relative",
    top: "60%",
    transform: "rotate(45deg)",
    width: "var(--spacing-sm)",
  },
})

// Radix sets data-state="open" on the trigger button; StyleX cannot express a
// parent-state selector, so the open-chevron rotation is injected as raw CSS
// keyed on a literal class (mirrors calendar.tsx's approach).
const navigationMenuStyles = `
[data-state="open"] > .eluan-navmenu-chevron {
  transform: rotate(180deg);
}
`

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  NavigationMenuRootProps
>(({ children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    {...props}
    {...stylex.props(styles.root)}
  >
    <style>{navigationMenuStyles}</style>
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
))
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  NavigationMenuListProps
>(({ ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    {...props}
    {...stylex.props(styles.list)}
  />
))
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName

const NavigationMenuItem = NavigationMenuPrimitive.Item

const navigationMenuTriggerStyle = () =>
  stylex.props(styles.trigger).className ?? ""

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  NavigationMenuTriggerProps
>(({ children, ...props }, ref) => {
  const chevronProps = stylex.props(styles.chevron)
  return (
    <NavigationMenuPrimitive.Trigger
      ref={ref}
      {...props}
      {...stylex.props(styles.trigger)}
    >
      {children}
      <ChevronDown
        aria-hidden="true"
        className={`${chevronProps.className ?? ""} eluan-navmenu-chevron`}
        style={chevronProps.style}
      />
    </NavigationMenuPrimitive.Trigger>
  )
})
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  NavigationMenuContentProps
>(({ ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    {...props}
    {...stylex.props(styles.content)}
  />
))
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName

const NavigationMenuLink = NavigationMenuPrimitive.Link

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  NavigationMenuViewportProps
>(({ ...props }, ref) => (
  <div {...stylex.props(styles.viewportWrap)}>
    <NavigationMenuPrimitive.Viewport
      ref={ref}
      {...props}
      {...stylex.props(styles.viewport)}
    />
  </div>
))
NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName

const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  NavigationMenuIndicatorProps
>(({ ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    {...props}
    {...stylex.props(styles.indicator)}
  >
    <div {...stylex.props(styles.indicatorArrow)} />
  </NavigationMenuPrimitive.Indicator>
))
NavigationMenuIndicator.displayName =
  NavigationMenuPrimitive.Indicator.displayName

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
}

export type NavigationMenuProps = React.ComponentPropsWithoutRef<typeof NavigationMenu>
