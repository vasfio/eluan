"use client"

import type * as React from "react"
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

export type CollapsibleProps = React.ComponentProps<typeof Collapsible>
export type CollapsibleTriggerProps = React.ComponentProps<
  typeof CollapsibleTrigger
>
export type CollapsibleContentProps = React.ComponentProps<
  typeof CollapsibleContent
>

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
