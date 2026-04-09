import * as React from "react"
// Timeline-based action plan
import {
  Circle,
  Loader2,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Timeline,
  TimelineItem,
  TimelineDot,
  TimelineLine,
  TimelineContent,
  TimelineTitle,
  TimelineDescription,
  TimelineTime,
} from "./timeline"

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
  queued: "text-[var(--container-fg-alt)] opacity-50",
  running: "text-[var(--informative-fg-strong)] animate-spin",
  complete: "text-[var(--positive-fg-strong)]",
  error: "text-[var(--destructive-fg-strong)]",
  awaiting: "text-[var(--cautionary-fg-strong)]",
} as const

type StepStatus = "queued" | "running" | "complete" | "error" | "awaiting"

export interface AIActionPlanProps extends React.HTMLAttributes<HTMLDivElement> {}

const AIActionPlan = React.forwardRef<HTMLDivElement, AIActionPlanProps>(
  ({ className, children, ...props }, ref) => (
    <Timeline
      ref={ref}
      className={cn(className)}
      {...props}
    >
      {children}
    </Timeline>
  )
)
AIActionPlan.displayName = "AIActionPlan"

export interface AIActionPlanStepProps
  extends React.HTMLAttributes<HTMLDivElement> {
  status?: StepStatus
  title: string
  description?: string
  duration?: string
  isLast?: boolean
}

const AIActionPlanStep = React.forwardRef<HTMLDivElement, AIActionPlanStepProps>(
  (
    {
      className,
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
        className={cn(isLast && "pb-0", className)}
        {...props}
      >
        <TimelineDot
          variant="icon"
          icon={
            <IconComponent
              className={cn("h-3.5 w-3.5", iconColor)}
            />
          }
        />
        {!isLast && <TimelineLine />}
        <TimelineContent>
          <div className="flex flex-row items-start justify-between">
            <div className="flex flex-col">
              <TimelineTitle className="text-[var(--font-size-sm)]">
                {title}
              </TimelineTitle>
              {description && (
                <TimelineDescription className="mt-0 text-[var(--font-size-xs)]">
                  {description}
                </TimelineDescription>
              )}
            </div>
            {duration && (
              <TimelineTime className="text-[var(--font-size-xs)] shrink-0 ml-[var(--spacing-sm)]">
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
