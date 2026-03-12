import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { Stepper, StepperContent } from "./stepper"

const meta: Meta<typeof Stepper> = {
  title: "Components/Stepper",
  component: Stepper,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

const steps = [
  { id: "step-1", title: "Account", description: "Create your account" },
  { id: "step-2", title: "Profile", description: "Set up your profile" },
  { id: "step-3", title: "Complete", description: "Review and submit" },
]

export const Default: Story = {
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
  render: () => (
    <Stepper
      steps={steps}
      currentStep={1}
      className="w-full"
    />
  ),
}
