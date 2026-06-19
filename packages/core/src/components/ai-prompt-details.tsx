"use client"

import * as React from "react"
import * as stylex from "@stylexjs/stylex"
import { ChevronDown, Copy } from "lucide-react"

import { Button } from "./button"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "./collapsible"

export interface AIPromptDetailsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "onCopy" | "style"> {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  label?: string
  showCopy?: boolean
  copyText?: string
  onCopy?: (text: string) => void
}

export interface AIPromptDetailsItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style"> {
  label: string
  value?: React.ReactNode
}

const styles = stylex.create({
  root: {
    width: "100%",
  },
  icon: {
    flexShrink: 0,
    height: "var(--size-xxs)",
    transitionDuration: "200ms",
    transitionProperty: "transform",
    width: "var(--size-xxs)",
  },
  panel: {
    backgroundColor: "var(--container-bg-alt)",
    borderRadius: "var(--curves-sm)",
    marginTop: "var(--spacing-xxs)",
    padding: "var(--spacing-sm)",
  },
  stack: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-xs)",
  },
  copyWrap: {
    marginTop: "var(--spacing-sm)",
  },
  copyIcon: {
    height: "calc(var(--size-xxs) - var(--spacing-xxs))",
    width: "calc(var(--size-xxs) - var(--spacing-xxs))",
  },
  item: {
    alignItems: "baseline",
    display: "flex",
    gap: "var(--spacing-md)",
    justifyContent: "space-between",
  },
  itemLabel: {
    color: "var(--container-fg-alt)",
    flexShrink: 0,
    fontSize: "var(--font-size-xs)",
  },
  itemValue: {
    color: "var(--container-fg)",
    fontSize: "var(--font-size-xs)",
    textAlign: "right",
  },
})

const AIPromptDetails = React.forwardRef<HTMLDivElement, AIPromptDetailsProps>(
  (
    {
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
        <div ref={ref} {...props} {...stylex.props(styles.root)}>
          <CollapsibleTrigger asChild>
            <Button
              variant="mutedGhost"
              size="sm"
              fullWidth
              align="start"
            >
              <ChevronDown {...stylex.props(styles.icon)} />
              {label}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div {...stylex.props(styles.panel)}>
              <div {...stylex.props(styles.stack)}>
                {children}
              </div>
              {showCopy && (
                <div {...stylex.props(styles.copyWrap)}>
                  <Button
                    variant="mutedGhost"
                    size="sm"
                    onClick={handleCopy}
                  >
                    <Copy {...stylex.props(styles.copyIcon)} />
                    Copy prompt
                  </Button>
                </div>
              )}
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    )
  }
)
AIPromptDetails.displayName = "AIPromptDetails"

const AIPromptDetailsItem = React.forwardRef<
  HTMLDivElement,
  AIPromptDetailsItemProps
>(({ label, value, children, ...props }, ref) => (
  <div
    ref={ref}
    {...props}
    {...stylex.props(styles.item)}
  >
    <span {...stylex.props(styles.itemLabel)}>{label}</span>
    <span {...stylex.props(styles.itemValue)}>{value ?? children}</span>
  </div>
))
AIPromptDetailsItem.displayName = "AIPromptDetailsItem"

export { AIPromptDetails, AIPromptDetailsItem }
