"use client"

import * as React from "react"
import { ChevronDown, Copy } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Button,
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@vasf/ragnar-core"

export interface AIPromptDetailsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onCopy"> {
  /** Controlled open state */
  open?: boolean
  /** Default open state for uncontrolled usage */
  defaultOpen?: boolean
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void
  /** Label for the toggle header */
  label?: string
  /** Show a copy prompt button */
  showCopy?: boolean
  /** Text to copy when copy button is clicked (defaults to children text content) */
  copyText?: string
  /** Callback when copy is triggered */
  onCopy?: (text: string) => void
}

const AIPromptDetails = React.forwardRef<HTMLDivElement, AIPromptDetailsProps>(
  (
    {
      className,
      open,
      defaultOpen = false,
      onOpenChange,
      label = "Show prompt details",
      showCopy = false,
      copyText,
      onCopy,
      children,
      ...props
    },
    ref
  ) => {
    const handleCopy = React.useCallback(() => {
      const text = copyText ?? ""
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        navigator.clipboard.writeText(text)
      }
      onCopy?.(text)
    }, [copyText, onCopy])

    return (
      <Collapsible
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        asChild
      >
        <div ref={ref} className={cn("w-full", className)} {...props}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="flex w-full items-center justify-start gap-[var(--spacing-xs)] py-[var(--spacing-xs)] text-[length:var(--font-size-xs)] font-medium text-[color:var(--container-fg-alt)] transition-colors hover:text-[color:var(--container-fg)]"
            >
              <ChevronDown
                className={cn(
                  "h-[var(--size-xxs)] w-[var(--size-xxs)] shrink-0 transition-transform duration-200",
                  "[[data-state=open]>&]:rotate-180"
                )}
              />
              {label}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="bg-[var(--container-bg-alt)] rounded-[var(--curves-sm)] p-[var(--spacing-sm)] mt-[var(--spacing-xxs)]">
              <div className="flex flex-col gap-[var(--spacing-xs)]">
                {children}
              </div>
              {showCopy && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                  className="mt-[var(--spacing-sm)] inline-flex items-center gap-[var(--spacing-xxs)] text-[length:var(--font-size-xs)] text-[color:var(--container-fg-alt)] hover:text-[color:var(--container-fg)]"
                >
                  <Copy className="h-3 w-3" />
                  Copy prompt
                </Button>
              )}
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    )
  }
)
AIPromptDetails.displayName = "AIPromptDetails"

export interface AIPromptDetailsItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Label for the metadata field */
  label: string
  /** Value to display */
  value?: React.ReactNode
}

const AIPromptDetailsItem = React.forwardRef<
  HTMLDivElement,
  AIPromptDetailsItemProps
>(({ className, label, value, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-baseline justify-between gap-[var(--spacing-md)]",
      className
    )}
    {...props}
  >
    <span className="text-[color:var(--container-fg-alt)] text-[length:var(--font-size-xs)] shrink-0">
      {label}
    </span>
    <span className="text-[color:var(--container-fg)] text-[length:var(--font-size-xs)] text-right">
      {value ?? children}
    </span>
  </div>
))
AIPromptDetailsItem.displayName = "AIPromptDetailsItem"

export { AIPromptDetails, AIPromptDetailsItem }
