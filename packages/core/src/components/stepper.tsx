import * as React from "react"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

export interface Step {
  id: string
  title: string
  description?: string
  icon?: React.ReactNode
}

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: Step[]
  currentStep: number
  orientation?: "horizontal" | "vertical"
  onStepClick?: (step: number) => void
  allowClickOnCompleted?: boolean
}

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  (
    {
      className,
      steps,
      currentStep,
      orientation = "horizontal",
      onStepClick,
      allowClickOnCompleted = true,
      ...props
    },
    ref
  ) => {
    const isVertical = orientation === "vertical"

    return (
      <div
        ref={ref}
        className={cn(
          "flex",
          isVertical ? "flex-col" : "flex-row items-center",
          className
        )}
        {...props}
      >
        {steps.map((step, index) => {
          const isCompleted = index < currentStep
          const isCurrent = index === currentStep
          const isClickable =
            onStepClick && (allowClickOnCompleted ? isCompleted : false)

          return (
            <React.Fragment key={step.id}>
              <div
                className={cn(
                  "flex",
                  isVertical
                    ? "flex-row items-start gap-3"
                    : "flex-col items-center gap-2"
                )}
              >
                <button
                  type="button"
                  disabled={!isClickable}
                  onClick={() => isClickable && onStepClick?.(index)}
                  className={cn(
                    "relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-sm font-medium transition-all",
                    isCompleted
                      ? "border-foreground bg-foreground text-white"
                      : isCurrent
                        ? "border-foreground bg-[var(--backgrounds-primary)] text-foreground"
                        : "border-[var(--backgrounds-quaternary)] bg-[var(--backgrounds-primary)] text-[var(--foregrounds-quinary)]",
                    isClickable &&
                      "cursor-pointer hover:border-foreground hover:text-foreground"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    step.icon ?? index + 1
                  )}
                </button>
                <div
                  className={cn(
                    isVertical ? "pb-8" : "text-center",
                    isVertical && index === steps.length - 1 && "pb-0"
                  )}
                >
                  <p
                    className={cn(
                      "text-sm font-medium",
                      isCurrent || isCompleted
                        ? "text-[var(--foregrounds-primary)]"
                        : "text-[var(--foregrounds-tertiary)]"
                    )}
                  >
                    {step.title}
                  </p>
                  {step.description && (
                    <p className="mt-0.5 text-xs text-[var(--foregrounds-tertiary)]">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "transition-colors",
                    isVertical
                      ? "ml-5 h-full min-h-[24px] w-0.5 -translate-x-1/2"
                      : "mx-2 h-0.5 flex-1 min-w-[24px]",
                    index < currentStep
                      ? "bg-foreground"
                      : "bg-[var(--backgrounds-quaternary)]"
                  )}
                />
              )}
            </React.Fragment>
          )
        })}
      </div>
    )
  }
)
Stepper.displayName = "Stepper"

export interface StepperContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  step: number
  currentStep: number
}

const StepperContent = React.forwardRef<HTMLDivElement, StepperContentProps>(
  ({ className, step, currentStep, children, ...props }, ref) => {
    if (step !== currentStep) return null

    return (
      <div ref={ref} className={cn("mt-4", className)} {...props}>
        {children}
      </div>
    )
  }
)
StepperContent.displayName = "StepperContent"

export { Stepper, StepperContent }
