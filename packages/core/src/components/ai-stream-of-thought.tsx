"use client"

import * as React from "react"
import * as stylex from "@stylexjs/stylex"
import {
  ChevronRight,
  Wrench,
  Search,
  Code,
} from "lucide-react"

import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "./collapsible"
import { Button } from "./button"

const thoughtToolIconMap = {
  wrench: Wrench,
  search: Search,
  code: Code,
} as const

export type ThoughtToolType = keyof typeof thoughtToolIconMap

export interface AIStreamOfThoughtProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style"> {
  label?: string
  isStreaming?: boolean
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  duration?: string
}

export interface AIThoughtStepProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style"> {
  tool?: ThoughtToolType
}

const pulse = stylex.keyframes({
  "0%, 100%": {
    opacity: 1,
  },
  "50%": {
    opacity: 0.5,
  },
})

const styles = stylex.create({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  chevron: {
    flexShrink: 0,
    height: "var(--size-xxs)",
    transitionDuration: "200ms",
    transitionProperty: "transform",
    width: "var(--size-xxs)",
  },
  chevronOpen: {
    transform: "rotate(90deg)",
  },
  dots: {
    display: "inline-flex",
    gap: "calc(var(--spacing-xxs) / 2)",
    marginLeft: "var(--spacing-xxs)",
  },
  dot: {
    animationDuration: "1s",
    animationIterationCount: "infinite",
    animationName: pulse,
    animationTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)",
    backgroundColor: "var(--container-fg-alt)",
    borderRadius: "var(--radius-radius-full)",
    height: "var(--spacing-xxs)",
    width: "var(--spacing-xxs)",
  },
  dotDelaySm: {
    animationDelay: "150ms",
  },
  dotDelayMd: {
    animationDelay: "300ms",
  },
  duration: {
    color: "var(--container-fg-alt)",
    fontSize: "var(--font-size-xs)",
    marginLeft: "auto",
  },
  content: {
    backgroundColor: "var(--container-bg-alt)",
    borderColor: "var(--container-border)",
    borderLeftStyle: "solid",
    borderLeftWidth: 2,
    marginLeft: "var(--spacing-xs)",
    marginTop: "var(--spacing-xxs)",
    paddingLeft: "var(--spacing-sm)",
  },
  step: {
    alignItems: "flex-start",
    color: "var(--container-fg-alt)",
    display: "flex",
    flexDirection: "row",
    fontSize: "var(--font-size-sm)",
    gap: "var(--spacing-xs)",
    paddingBlock: "var(--spacing-xxs)",
  },
  stepIcon: {
    color: "var(--container-fg-alt)",
    flexShrink: 0,
    height: "var(--size-xxs)",
    marginTop: "calc(var(--spacing-xxs) / 2)",
    width: "var(--size-xxs)",
  },
  stepBody: {
    flex: "1 1 0%",
  },
})

const AIStreamOfThought = React.forwardRef<
  HTMLDivElement,
  AIStreamOfThoughtProps
>(
  (
    {
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
          {...props}
          {...stylex.props(styles.root)}
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="mutedGhost"
              size="sm"
              align="start"
              aria-expanded={isOpen}
            >
              <ChevronRight
                {...stylex.props(styles.chevron, isOpen && styles.chevronOpen)}
              />
              <span>{label}</span>
              {isStreaming && (
                <span {...stylex.props(styles.dots)}>
                  <span {...stylex.props(styles.dot)} />
                  <span {...stylex.props(styles.dot, styles.dotDelaySm)} />
                  <span {...stylex.props(styles.dot, styles.dotDelayMd)} />
                </span>
              )}
              {duration && (
                <span {...stylex.props(styles.duration)}>
                  {duration}
                </span>
              )}
            </Button>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <div {...stylex.props(styles.content)}>
              {children}
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    )
  }
)
AIStreamOfThought.displayName = "AIStreamOfThought"

const AIThoughtStep = React.forwardRef<HTMLDivElement, AIThoughtStepProps>(
  ({ tool, children, ...props }, ref) => {
    const IconComponent = tool ? thoughtToolIconMap[tool] : null

    return (
      <div
        ref={ref}
        {...props}
        {...stylex.props(styles.step)}
      >
        {IconComponent && (
          <IconComponent {...stylex.props(styles.stepIcon)} />
        )}
        <div {...stylex.props(styles.stepBody)}>{children}</div>
      </div>
    )
  }
)
AIThoughtStep.displayName = "AIThoughtStep"

export { AIStreamOfThought, AIThoughtStep }
