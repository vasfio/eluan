import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import {
  Timeline,
  TimelineItem,
  TimelineDot,
  TimelineLine,
  TimelineContent,
  TimelineTitle,
  TimelineTime,
  TimelineDescription,
} from "@vasf/ragnar-core"

const aiFootprintsVariants = cva("relative flex flex-col", {
  variants: {
    variant: {
      default: "",
      compact: "gap-0",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export interface AIFootprintsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof aiFootprintsVariants> {
  /** Reduces spacing and hides metadata */
  compact?: boolean
}

const AIFootprints = React.forwardRef<HTMLDivElement, AIFootprintsProps>(
  ({ className, variant, compact, children, ...props }, ref) => (
    <Timeline
      ref={ref}
      className={cn(
        aiFootprintsVariants({ variant: compact ? "compact" : variant }),
        className
      )}
      data-compact={compact || undefined}
      {...props}
    >
      {children}
    </Timeline>
  )
)
AIFootprints.displayName = "AIFootprints"

export interface AIFootprintStepProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Override the default dot icon */
  icon?: React.ReactNode
  /** Action label (e.g. "Generated response") */
  label: string
  /** Timestamp string */
  timestamp?: string
  /** Key-value metadata pairs (model, tokens, etc.) */
  metadata?: Record<string, string>
  /** Expandable details content */
  details?: React.ReactNode
}

const AIFootprintStep = React.forwardRef<HTMLDivElement, AIFootprintStepProps>(
  (
    { className, icon, label, timestamp, metadata, details, children, ...props },
    ref
  ) => {
    const [expanded, setExpanded] = React.useState(false)

    return (
      <TimelineItem ref={ref} className={cn("group", className)} {...props}>
        <TimelineLine />
        <TimelineDot variant={icon ? "icon" : "default"} icon={icon} />
        <TimelineContent>
          <TimelineTitle className="text-[length:var(--font-size-sm)]">
            {label}
          </TimelineTitle>

          <div className="flex flex-wrap items-center gap-[var(--spacing-xs)] text-[length:var(--font-size-xs)] text-[color:var(--container-fg-alt)] group-[[data-compact]]/root:hidden">
            {timestamp && <TimelineTime>{timestamp}</TimelineTime>}
            {metadata &&
              Object.entries(metadata).map(([key, value]) => (
                <span key={key}>
                  {key}: {value}
                </span>
              ))}
          </div>

          {details && (
            <div>
              <button
                type="button"
                onClick={() => setExpanded((prev) => !prev)}
                className="text-[length:var(--font-size-xs)] text-[color:var(--informative-fg-strong)] hover:underline"
              >
                {expanded ? "Hide details" : "Show details"}
              </button>
              {expanded && (
                <TimelineDescription className="mt-[var(--spacing-xs)]">
                  {details}
                </TimelineDescription>
              )}
            </div>
          )}

          {children}
        </TimelineContent>
      </TimelineItem>
    )
  }
)
AIFootprintStep.displayName = "AIFootprintStep"

export { AIFootprints, AIFootprintStep, aiFootprintsVariants }
