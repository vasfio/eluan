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
    // When `onStepClick` is provided every step is clickable. The legacy
    // `allowClickOnCompleted` flag is preserved so existing call sites keep
    // working — set to `false` to revert to the old completed-only behavior.
    const stepsClickable = !!onStepClick

    return (
      <div
        ref={ref}
        className={cn(
          "flex",
          isVertical
            ? "flex-col gap-[var(--spacing-md)]"
            : "flex-row items-center",
          className
        )}
        {...props}
      >
        {steps.map((step, index) => {
          const isCompleted = index < currentStep
          const isCurrent = index === currentStep
          const isClickable =
            stepsClickable &&
            (allowClickOnCompleted ? true : isCompleted)

          return (
            <React.Fragment key={step.id}>
              <div
                className={cn(
                  "flex",
                  isVertical
                    ? "flex-row items-start gap-[var(--spacing-sm)]"
                    : "flex-col items-center gap-[var(--spacing-sm)]"
                )}
              >
                <button
                  type="button"
                  disabled={!isClickable}
                  onClick={() => isClickable && onStepClick?.(index)}
                  className={cn(
                    "relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-[length:var(--font-size-sm)] font-medium transition-colors",
                    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--interactive-border)] focus-visible:ring-offset-1",
                    isCompleted &&
                      "border-[var(--interactive-bg-active)] bg-[var(--interactive-bg-active)] text-[color:var(--interactive-fg-active)]",
                    isCurrent &&
                      "border-[var(--interactive-bg-active)] bg-[var(--interactive-bg)] text-[color:var(--interactive-fg)]",
                    !isCompleted && !isCurrent &&
                      "border-[var(--interactive-border-alt)] bg-[var(--interactive-bg)] text-[color:var(--interactive-fg-alt)]",
                    isClickable && "cursor-pointer",
                    // Hover states tuned per state so each variant reads as actionable.
                    isClickable && isCompleted &&
                      "hover:border-[var(--action-primary-bg-hover)] hover:bg-[var(--action-primary-bg-hover)]",
                    isClickable && isCurrent &&
                      "hover:bg-[var(--interactive-bg-hover)]",
                    isClickable && !isCompleted && !isCurrent &&
                      "hover:border-[var(--interactive-bg-active)] hover:text-[color:var(--interactive-fg)]"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    step.icon ?? index + 1
                  )}
                </button>
                <div className={cn(!isVertical && "text-center")}>
                  <p
                    className={cn(
                      "text-[length:var(--font-size-sm)] font-medium",
                      isCurrent || isCompleted
                        ? "text-[color:var(--foregrounds-primary)]"
                        : "text-[color:var(--foregrounds-tertiary)]"
                    )}
                  >
                    {step.title}
                  </p>
                  {step.description && (
                    <p className="mt-[var(--spacing-xxs)] text-[length:var(--font-size-xs)] text-[color:var(--foregrounds-tertiary)]">
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
                      // Centered on the button column (button is h-10 w-10, so center is 20px).
                      // `min-h-[var(--spacing-xl)]` gives the line a fixed visible height; the
                      // parent `gap-md` provides equal breathing room above and below.
                      ? "ml-5 min-h-[var(--spacing-xl)] w-0.5 -translate-x-1/2"
                      : "mx-[var(--spacing-sm)] h-0.5 flex-1 min-w-[24px]",
                    index < currentStep
                      ? "bg-[var(--interactive-bg-active)]"
                      : "bg-[var(--interactive-border-alt)]"
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
      <div ref={ref} className={cn("mt-[var(--spacing-md)]", className)} {...props}>
        {children}
      </div>
    )
  }
)
StepperContent.displayName = "StepperContent"

export { Stepper, StepperContent }
