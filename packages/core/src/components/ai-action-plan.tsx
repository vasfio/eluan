import * as React from "react"
import * as stylex from "@stylexjs/stylex"
// Timeline-based action plan
import {
  Circle,
  Loader2,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react"

import { Timeline, TimelineItem, TimelineDot, TimelineLine, TimelineContent, TimelineTitle, TimelineDescription, TimelineTime } from "./timeline"

const statusIconMap = {
  queued: Circle,
  running: Loader2,
  complete: CheckCircle2,
  error: XCircle,
  awaiting: Clock,
} as const

const statusToVariant = {
  complete: "success",
  error: "error",
  running: "info",
  awaiting: "warning",
  queued: "default",
} as const

const statusIconColorMap = {
  queued: "queued",
  running: "running",
  complete: "complete",
  error: "error",
  awaiting: "awaiting",
} as const

type StepStatus = "queued" | "running" | "complete" | "error" | "awaiting"

export type AIActionPlanProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "className" | "style"
>

const styles = stylex.create({
  icon: {
    height: "calc(var(--size-xxs) + var(--spacing-xxs))",
    width: "calc(var(--size-xxs) + var(--spacing-xxs))",
  },
  iconQueued: {
    color: "var(--container-fg-alt)",
    opacity: 0.5,
  },
  iconRunning: {
    animationDuration: "1s",
    animationIterationCount: "infinite",
    animationName: stylex.keyframes({
      from: {
        transform: "rotate(0deg)",
      },
      to: {
        transform: "rotate(360deg)",
      },
    }),
    animationTimingFunction: "linear",
    color: "var(--informative-fg)",
  },
  iconComplete: {
    color: "var(--positive-fg)",
  },
  iconError: {
    color: "var(--destructive-fg)",
  },
  iconAwaiting: {
    color: "var(--cautionary-fg)",
  },
  row: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  copy: {
    display: "flex",
    flexDirection: "column",
  },
})

const AIActionPlan = React.forwardRef<HTMLDivElement, AIActionPlanProps>(
  ({ children, ...props }, ref) => (
    <Timeline
      ref={ref}
      {...props}
    >
      {children}
    </Timeline>
  )
)
AIActionPlan.displayName = "AIActionPlan"

export interface AIActionPlanStepProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style"> {
  status?: StepStatus
  title: string
  description?: string
  duration?: string
  isLast?: boolean
}

const AIActionPlanStep = React.forwardRef<HTMLDivElement, AIActionPlanStepProps>(
  (
    {
      status = "queued",
      title,
      description,
      duration,
      isLast = false,
      ...props
    },
    ref
  ) => {
    const IconComponent = statusIconMap[status]
    const iconColor = statusIconColorMap[status]
    const itemVariant = statusToVariant[status]

    return (
      <TimelineItem
        ref={ref}
        variant={itemVariant}
        spacing={isLast ? "none" : "default"}
        {...props}
      >
        <TimelineDot
          variant="icon"
          icon={
            <IconComponent
              {...stylex.props(
                styles.icon,
                iconColor === "queued" && styles.iconQueued,
                iconColor === "running" && styles.iconRunning,
                iconColor === "complete" && styles.iconComplete,
                iconColor === "error" && styles.iconError,
                iconColor === "awaiting" && styles.iconAwaiting
              )}
            />
          }
        />
        {!isLast && <TimelineLine />}
        <TimelineContent>
          <div {...stylex.props(styles.row)}>
            <div {...stylex.props(styles.copy)}>
              <TimelineTitle size="sm">
                {title}
              </TimelineTitle>
              {description && (
                <TimelineDescription spacing="none" size="xs">
                  {description}
                </TimelineDescription>
              )}
            </div>
            {duration && (
              <TimelineTime layout="inlineEnd" size="xs">
                {duration}
              </TimelineTime>
            )}
          </div>
        </TimelineContent>
      </TimelineItem>
    )
  }
)
AIActionPlanStep.displayName = "AIActionPlanStep"

export { AIActionPlan, AIActionPlanStep }
