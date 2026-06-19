import * as React from "react"
import * as stylex from "@stylexjs/stylex"

import { Timeline, TimelineItem, TimelineDot, TimelineLine, TimelineContent, TimelineTitle, TimelineTime, TimelineDescription } from "./timeline"

const aiFootprintsVariants = () => ""

const AIFootprintsContext = React.createContext({ compact: false })

export interface AIFootprintsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style"> {
  /** Reduces spacing and hides metadata */
  compact?: boolean
  variant?: "default" | "compact"
}

const AIFootprints = React.forwardRef<HTMLDivElement, AIFootprintsProps>(
  ({ compact, variant: _variant, children, ...props }, ref) => (
    <AIFootprintsContext.Provider value={{ compact: Boolean(compact) }}>
      <Timeline
        ref={ref}
        data-compact={compact || undefined}
        {...props}
      >
        {children}
      </Timeline>
    </AIFootprintsContext.Provider>
  )
)
AIFootprints.displayName = "AIFootprints"

export interface AIFootprintStepProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style"> {
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

const styles = stylex.create({
  meta: {
    alignItems: "center",
    color: "var(--container-fg-alt)",
    display: "flex",
    flexWrap: "wrap",
    fontSize: "var(--font-size-xs)",
    gap: "var(--spacing-xs)",
  },
  detailsButton: {
    backgroundColor: "transparent",
    borderWidth: 0,
    color: "var(--informative-fg)",
    cursor: "pointer",
    fontSize: "var(--font-size-xs)",
    padding: 0,
    ":hover": {
      textDecorationLine: "underline",
    },
  },
})

const AIFootprintStep = React.forwardRef<HTMLDivElement, AIFootprintStepProps>(
  (
    { icon, label, timestamp, metadata, details, children, ...props },
    ref
  ) => {
    const [expanded, setExpanded] = React.useState(false)
    const { compact } = React.useContext(AIFootprintsContext)

    return (
      <TimelineItem ref={ref} {...props}>
        <TimelineLine />
        <TimelineDot variant={icon ? "icon" : "default"} icon={icon} />
        <TimelineContent>
          <TimelineTitle size="sm">
            {label}
          </TimelineTitle>

          {!compact && (
            <div {...stylex.props(styles.meta)}>
              {timestamp && <TimelineTime size="xs">{timestamp}</TimelineTime>}
              {metadata &&
                Object.entries(metadata).map(([key, value]) => (
                  <span key={key}>
                    {key}: {value}
                  </span>
                ))}
            </div>
          )}

          {details && !compact && (
            <div>
              <button
                type="button"
                onClick={() => setExpanded((prev) => !prev)}
                {...stylex.props(styles.detailsButton)}
              >
                {expanded ? "Hide details" : "Show details"}
              </button>
              {expanded && (
                <TimelineDescription spacing="xs">
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
