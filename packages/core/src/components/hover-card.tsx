"use client"

import * as React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"
import * as stylex from "@stylexjs/stylex"

import { usePortalContainer } from "../providers/portal-container"

const HoverCard = HoverCardPrimitive.Root

const HoverCardTrigger = HoverCardPrimitive.Trigger

export type HoverCardContentProps = Omit<
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>,
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
    backgroundColor: "var(--container-bg)",
    borderColor: "var(--container-border)",
    borderRadius: "var(--curves-md)",
    borderStyle: "solid",
    borderWidth: 1,
    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    color: "var(--container-fg)",
    outlineStyle: "none",
    padding: "var(--spacing-md)",
    width: "16rem",
    zIndex: 50,
  },
})

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  HoverCardContentProps
>(({ align = "center", container, sideOffset = 4, collisionPadding = 8, ...props }, ref) => {
  const portalContainer = usePortalContainer()
  return (
    <HoverCardPrimitive.Portal container={container ?? portalContainer}>
      <HoverCardPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        {...props}
        {...stylex.props(styles.content)}
      />
    </HoverCardPrimitive.Portal>
  )
})
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName

export { HoverCard, HoverCardTrigger, HoverCardContent }

export type HoverCardProps = React.ComponentProps<typeof HoverCard>
