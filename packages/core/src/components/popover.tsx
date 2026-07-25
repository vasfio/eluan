import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import * as stylex from "@stylexjs/stylex"

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

export type PopoverContentProps = Omit<
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>,
  "className" | "style"
> & {
  layout?: "default" | "calendar" | "calendarSingle" | "matchTrigger"
}

const styles = stylex.create({
  content: {
    backgroundColor: "var(--container-bg)",
    borderColor: "var(--container-border)",
    borderRadius: "var(--curves-md)",
    borderStyle: "solid",
    borderWidth: 1,
    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    color: "var(--interactive-fg)",
    outlineStyle: "none",
    padding: "var(--spacing-md)",
    width: "18rem",
    zIndex: 50,
  },
  calendar: {
    minWidth: 0,
    padding: 0,
    width: "auto",
  },
  /* Fill the trigger's width (e.g. a max-width DatePicker field) but never
     shrink below the calendar's intrinsic size. */
  calendarSingle: {
    minWidth: "fit-content",
    width: "var(--radix-popover-trigger-width)",
  },
  matchTrigger: {
    padding: 0,
    width: "var(--radix-popover-trigger-width)",
  },
})

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(({ align = "center", layout = "default", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      {...props}
      {...stylex.props(
        styles.content,
        layout === "calendar" && styles.calendar,
        layout === "calendarSingle" && styles.calendar,
        layout === "calendarSingle" && styles.calendarSingle,
        layout === "matchTrigger" && styles.matchTrigger
      )}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent }

export type PopoverProps = React.ComponentProps<typeof Popover>
