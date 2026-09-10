import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import * as stylex from "@stylexjs/stylex"

import { usePortalContainer } from "../providers/portal-container"

const TooltipProvider = ({ delayDuration = 200, ...props }: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Provider>) => (
  <TooltipPrimitive.Provider delayDuration={delayDuration} {...props} />
)

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

export type TooltipContentProps = Omit<
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>,
  "className" | "style"
> & {
  /**
   * Element to portal into, overriding `PortalContainerProvider`.
   * Defaults to the nearest provider's container, then `document.body`.
   */
  container?: HTMLElement | null
}

const styles = stylex.create({
  content: {
    backgroundColor: "var(--tooltip-bg)",
    borderColor: "var(--container-border)",
    borderRadius: "var(--curves-md)",
    borderStyle: "solid",
    borderWidth: 1,
    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    color: "var(--container-fg)",
    fontSize: "var(--font-size-sm)",
    overflow: "hidden",
    paddingBlock: "var(--spacing-xs)",
    paddingInline: "var(--spacing-sm)",
    zIndex: 50,
  },
})

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(({ container, sideOffset = 4, ...props }, ref) => {
  const portalContainer = usePortalContainer()
  return (
    <TooltipPrimitive.Portal container={container ?? portalContainer}>
      <TooltipPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        {...props}
        {...stylex.props(styles.content)}
      />
    </TooltipPrimitive.Portal>
  )
})
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }

export type TooltipProps = React.ComponentProps<typeof Tooltip>
