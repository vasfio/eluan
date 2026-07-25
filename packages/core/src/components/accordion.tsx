import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import * as stylex from "@stylexjs/stylex"
import { ChevronDown } from "lucide-react"

const Accordion = AccordionPrimitive.Root

export type AccordionItemProps = Omit<
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>,
  "className" | "style"
>

export type AccordionTriggerProps = Omit<
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>,
  "className" | "style"
>

export type AccordionContentProps = Omit<
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>,
  "className" | "style"
>

const styles = stylex.create({
  item: {
    borderBottomColor: "var(--interactive-border-alt)",
    borderBottomStyle: "solid",
    borderBottomWidth: 1,
  },
  header: {
    display: "flex",
  },
  trigger: {
    alignItems: "center",
    backgroundColor: "transparent",
    borderWidth: 0,
    color: "var(--interactive-fg)",
    display: "flex",
    flex: 1,
    fontSize: "var(--font-size-base)",
    fontWeight: 500,
    justifyContent: "space-between",
    paddingBlock: "var(--spacing-sm)",
    transitionDuration: "150ms",
    transitionProperty: "all",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    ":hover": {
      color: "var(--interactive-fg)",
    },
    "[data-state=open] > svg": {
      transform: "rotate(180deg)",
    },
  },
  icon: {
    color: "var(--container-fg-alt)",
    flexShrink: 0,
    fontWeight: 400,
    height: "var(--size-xxs)",
    transitionDuration: "200ms",
    transitionProperty: "transform",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    width: "var(--size-xxs)",
  },
  content: {
    color: "var(--container-fg-alt)",
    fontSize: "var(--font-size-sm)",
    fontWeight: 300,
    overflow: "hidden",
    transitionDuration: "150ms",
    transitionProperty: "all",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
  contentInner: {
    lineHeight: 1.625,
    paddingBottom: "var(--spacing-sm)",
    paddingTop: "var(--spacing-xxs)",
  },
})

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  AccordionItemProps
>(({ ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    {...props}
    {...stylex.props(styles.item)}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(({ children, ...props }, ref) => (
  <AccordionPrimitive.Header {...stylex.props(styles.header)}>
    <AccordionPrimitive.Trigger
      ref={ref}
      {...props}
      {...stylex.props(styles.trigger)}
    >
      {children}
      <ChevronDown aria-hidden="true" {...stylex.props(styles.icon)} />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  AccordionContentProps
>(({ children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    {...props}
    {...stylex.props(styles.content)}
  >
    <div {...stylex.props(styles.contentInner)}>{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }

export type AccordionProps = React.ComponentProps<typeof Accordion>
