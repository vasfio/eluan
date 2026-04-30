import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { Stepper, StepperContent } from "./stepper"

const meta: Meta<typeof Stepper> = {
  title: "Components/Stepper",
  component: Stepper,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A multi-step progress indicator that guides users through a sequential workflow, displaying completed, current, and upcoming steps.

**Import**
\`\`\`tsx
import { Stepper, StepperContent } from "@vasf/ragnar-core"
\`\`\`

**Usage**
\`\`\`tsx
<Stepper
  steps={[
    { id: "1", title: "Account", description: "Create your account" },
    { id: "2", title: "Profile", description: "Set up your profile" },
  ]}
  currentStep={0}
  onStepClick={(step) => setStep(step)}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    steps: {
      description: "Array of step objects with id, title, optional description, and optional icon.",
    },
    currentStep: {
      description: "Zero-based index of the currently active step.",
    },
    orientation: {
      description: "Layout direction of the stepper. Accepts `\"horizontal\"` or `\"vertical\"`. Defaults to `\"horizontal\"`.",
    },
    onStepClick: {
      description: "Callback fired when a completed step is clicked, receiving the step index.",
    },
    allowClickOnCompleted: {
      description: "Whether completed steps are clickable. Defaults to `true`.",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const steps = [
  { id: "step-1", title: "Account", description: "Create your account" },
  { id: "step-2", title: "Profile", description: "Set up your profile" },
  { id: "step-3", title: "Complete", description: "Review and submit" },
]

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "Interactive horizontal stepper with step content panels that switch based on the current step.",
      },
    },
  },
  render: () => {
    const [current, setCurrent] = useState(1)
    return (
      <div className="w-full space-y-4">
        <Stepper
          steps={steps}
          currentStep={current}
          onStepClick={setCurrent}
          className="w-full"
        />
        {steps.map((step, i) => (
          <StepperContent key={step.id} step={i} currentStep={current}>
            <p className="text-sm text-muted-foreground">Content for {step.title}</p>
          </StepperContent>
        ))}
      </div>
    )
  },
}

export const Vertical: Story = {
  parameters: {
    docs: {
      description: {
        story: "Vertical orientation of the stepper, suitable for sidebar or narrow-width layouts.",
      },
    },
  },
  render: () => {
    const [current, setCurrent] = useState(0)
    return (
      <Stepper
        steps={steps}
        currentStep={current}
        orientation="vertical"
        onStepClick={setCurrent}
        className="w-64"
      />
    )
  },
}

export const NoInteraction: Story = {
  parameters: {
    docs: {
      description: {
        story: "A read-only stepper with no onStepClick handler, displaying progress without user interaction.",
      },
    },
  },
  render: () => (
    <Stepper
      steps={steps}
      currentStep={1}
      className="w-full"
    />
  ),
}
