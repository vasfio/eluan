"use client"

import * as React from "react"
import {
  ChevronRight,
  Wrench,
  Search,
  Code,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "./collapsible"
import { Button } from "./button"

const thoughtToolIconMap = {
  wrench: Wrench,
  search: Search,
  code: Code,
} as const

export type ThoughtToolType = keyof typeof thoughtToolIconMap

export interface AIStreamOfThoughtProps
  extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
  isStreaming?: boolean
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  duration?: string
}

const AIStreamOfThought = React.forwardRef<
  HTMLDivElement,
  AIStreamOfThoughtProps
>(
  (
    {
      className,
      label = "Thinking...",
      isStreaming = false,
      defaultOpen = false,
      open,
      onOpenChange,
      duration,
      children,
      ...props
    },
    ref
  ) => {
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
    const isControlled = open !== undefined
    const isOpen = isControlled ? open : internalOpen

    const handleOpenChange = React.useCallback(
      (value: boolean) => {
        if (!isControlled) {
          setInternalOpen(value)
        }
        onOpenChange?.(value)
      },
      [isControlled, onOpenChange]
    )

    return (
      <Collapsible
        open={isOpen}
        onOpenChange={handleOpenChange}
        asChild
      >
        <div
          ref={ref}
          className={cn("flex flex-col", className)}
          {...props}
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="justify-start gap-[var(--spacing-xs)] text-[var(--container-fg-alt)] hover:text-[var(--container-fg)] px-0 h-auto py-[var(--spacing-xxs)]"
              aria-expanded={isOpen}
            >
              <ChevronRight
                className={cn(
                  "h-[var(--size-xxs)] w-[var(--size-xxs)] shrink-0 transition-transform duration-200",
                  isOpen && "rotate-90"
                )}
              />
              <span>{label}</span>
              {isStreaming && (
                <span className="inline-flex gap-0.5 ml-[var(--spacing-xxs)]">
                  <span className="h-1 w-1 rounded-full bg-[var(--container-fg-alt)] animate-pulse" />
                  <span className="h-1 w-1 rounded-full bg-[var(--container-fg-alt)] animate-pulse [animation-delay:150ms]" />
                  <span className="h-1 w-1 rounded-full bg-[var(--container-fg-alt)] animate-pulse [animation-delay:300ms]" />
                </span>
              )}
              {duration && (
                <span className="text-[var(--font-size-xs)] text-[var(--container-fg-alt)] ml-auto">
                  {duration}
                </span>
              )}
            </Button>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <div className="bg-[var(--container-bg-alt)] border-l-2 border-[var(--container-border)] pl-[var(--spacing-sm)] ml-[var(--spacing-xs)] mt-[var(--spacing-xxs)]">
              {children}
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    )
  }
)
AIStreamOfThought.displayName = "AIStreamOfThought"

export interface AIThoughtStepProps
  extends React.HTMLAttributes<HTMLDivElement> {
  tool?: ThoughtToolType
}

const AIThoughtStep = React.forwardRef<HTMLDivElement, AIThoughtStepProps>(
  ({ className, tool, children, ...props }, ref) => {
    const IconComponent = tool ? thoughtToolIconMap[tool] : null

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-row items-start gap-[var(--spacing-xs)] py-[var(--spacing-xxs)] text-[var(--font-size-sm)] text-[var(--container-fg-alt)]",
          className
        )}
        {...props}
      >
        {IconComponent && (
          <IconComponent className="h-[var(--size-xxs)] w-[var(--size-xxs)] shrink-0 mt-0.5 text-[var(--container-fg-alt)]" />
        )}
        <div className="flex-1">{children}</div>
      </div>
    )
  }
)
AIThoughtStep.displayName = "AIThoughtStep"

export { AIStreamOfThought, AIThoughtStep }
