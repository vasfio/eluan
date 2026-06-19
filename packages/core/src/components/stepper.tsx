import * as React from "react"
import * as stylex from "@stylexjs/stylex"
import { Check } from "lucide-react"

export interface Step {
  id: string
  title: string
  description?: string
  icon?: React.ReactNode
}

export interface StepperProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style"> {
  steps: Step[]
  currentStep: number
  orientation?: "horizontal" | "vertical"
  onStepClick?: (step: number) => void
  allowClickOnCompleted?: boolean
}

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  (
    {
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
    const stepsClickable = !!onStepClick

    return (
      <div
        ref={ref}
        {...props}
        {...stylex.props(styles.root, isVertical ? styles.rootVertical : styles.rootHorizontal)}
      >
        {steps.map((step, index) => {
          const isCompleted = index < currentStep
          const isCurrent = index === currentStep
          const isClickable = stepsClickable && (allowClickOnCompleted ? true : isCompleted)
          const stateStyle = isCompleted
            ? styles.buttonCompleted
            : isCurrent
              ? styles.buttonCurrent
              : styles.buttonUpcoming
          const titleStateStyle = isCurrent || isCompleted ? styles.titleActive : styles.titleMuted

          return (
            <React.Fragment key={step.id}>
              <div
                {...stylex.props(
                  styles.step,
                  isVertical ? styles.stepVertical : styles.stepHorizontal
                )}
              >
                <button
                  type="button"
                  disabled={!isClickable}
                  onClick={() => isClickable && onStepClick?.(index)}
                  {...stylex.props(
                    styles.button,
                    stateStyle,
                    isClickable && styles.buttonClickable,
                    isClickable && isCompleted && styles.buttonCompletedClickable,
                    isClickable && isCurrent && styles.buttonCurrentClickable,
                    isClickable && !isCompleted && !isCurrent && styles.buttonUpcomingClickable
                  )}
                >
                  {isCompleted ? (
                    <Check {...stylex.props(styles.checkIcon)} />
                  ) : (
                    step.icon ?? index + 1
                  )}
                </button>
                <div {...stylex.props(!isVertical && styles.centeredText)}>
                  <p {...stylex.props(styles.title, titleStateStyle)}>
                    {step.title}
                  </p>
                  {step.description && (
                    <p {...stylex.props(styles.description)}>
                      {step.description}
                    </p>
                  )}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  {...stylex.props(
                    styles.connector,
                    isVertical ? styles.connectorVertical : styles.connectorHorizontal,
                    index < currentStep ? styles.connectorComplete : styles.connectorIncomplete
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
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style"> {
  step: number
  currentStep: number
}

const StepperContent = React.forwardRef<HTMLDivElement, StepperContentProps>(
  ({ step, currentStep, children, ...props }, ref) => {
    if (step !== currentStep) return null

    return (
      <div ref={ref} {...props} {...stylex.props(styles.content)}>
        {children}
      </div>
    )
  }
)
StepperContent.displayName = "StepperContent"

const styles = stylex.create({
  root: {
    display: "flex",
  },
  rootHorizontal: {
    alignItems: "center",
    flexDirection: "row",
  },
  rootVertical: {
    flexDirection: "column",
    gap: "var(--spacing-md)",
  },
  step: {
    display: "flex",
  },
  stepHorizontal: {
    alignItems: "center",
    flexDirection: "column",
    gap: "var(--spacing-sm)",
  },
  stepVertical: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: "var(--spacing-sm)",
  },
  button: {
    alignItems: "center",
    borderRadius: "var(--radius-radius-full)",
    borderStyle: "solid",
    borderWidth: 2,
    display: "flex",
    flexShrink: 0,
    fontSize: "var(--font-size-sm)",
    fontWeight: 500,
    height: "var(--size-lg)",
    justifyContent: "center",
    position: "relative",
    transitionDuration: "150ms",
    transitionProperty: "background-color, border-color, color",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    width: "var(--size-lg)",
    ":focus-visible": {
      boxShadow: "0 0 0 1px var(--interactive-border), 0 0 0 2px var(--container-bg)",
      outlineStyle: "none",
    },
  },
  buttonCompleted: {
    backgroundColor: "var(--interactive-bg-active)",
    borderColor: "var(--interactive-bg-active)",
    color: "var(--interactive-fg-active)",
  },
  buttonCurrent: {
    backgroundColor: "var(--interactive-bg)",
    borderColor: "var(--interactive-bg-active)",
    color: "var(--interactive-fg)",
  },
  buttonUpcoming: {
    backgroundColor: "var(--interactive-bg)",
    borderColor: "var(--interactive-border-alt)",
    color: "var(--interactive-fg-alt)",
  },
  buttonClickable: {
    cursor: "pointer",
  },
  buttonCompletedClickable: {
    ":hover": {
      backgroundColor: "var(--action-primary-bg-hover)",
      borderColor: "var(--action-primary-bg-hover)",
    },
  },
  buttonCurrentClickable: {
    ":hover": {
      backgroundColor: "var(--interactive-bg-hover)",
    },
  },
  buttonUpcomingClickable: {
    ":hover": {
      borderColor: "var(--interactive-bg-active)",
      color: "var(--interactive-fg)",
    },
  },
  checkIcon: {
    height: "var(--size-xs)",
    width: "var(--size-xs)",
  },
  centeredText: {
    textAlign: "center",
  },
  title: {
    fontSize: "var(--font-size-sm)",
    fontWeight: 500,
    margin: 0,
  },
  titleActive: {
    color: "var(--container-fg)",
  },
  titleMuted: {
    color: "var(--container-fg-alt)",
  },
  description: {
    color: "var(--container-fg-alt)",
    fontSize: "var(--font-size-xs)",
    margin: 0,
    marginTop: "var(--spacing-xxs)",
  },
  connector: {
    transitionDuration: "150ms",
    transitionProperty: "background-color",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
  connectorVertical: {
    marginLeft: "calc(var(--size-lg) / 2)",
    minHeight: "var(--spacing-xl)",
    transform: "translateX(-50%)",
    width: "calc(var(--spacing-xxs) / 2)",
  },
  connectorHorizontal: {
    flex: 1,
    height: "calc(var(--spacing-xxs) / 2)",
    marginInline: "var(--spacing-sm)",
    minWidth: "var(--size-sm)",
  },
  connectorComplete: {
    backgroundColor: "var(--interactive-bg-active)",
  },
  connectorIncomplete: {
    backgroundColor: "var(--interactive-border-alt)",
  },
  content: {
    marginTop: "var(--spacing-md)",
  },
})

export { Stepper, StepperContent }
