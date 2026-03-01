import type { Meta, StoryObj } from "@storybook/react"
import {
  Stepper,
  StepperItem,
  StepperTrigger,
  StepperContent,
  StepperTitle,
  StepperDescription,
} from "./stepper"

const meta: Meta<typeof Stepper> = {
  title: "Components/Stepper",
  component: Stepper,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Stepper defaultValue="step-1" className="w-full">
      <StepperItem value="step-1" completed>
        <StepperTrigger>
          <StepperTitle>Step 1</StepperTitle>
          <StepperDescription>Description for step 1</StepperDescription>
        </StepperTrigger>
        <StepperContent>
          <p className="text-sm text-muted-foreground">Content for step 1</p>
        </StepperContent>
      </StepperItem>
      <StepperItem value="step-2">
        <StepperTrigger>
          <StepperTitle>Step 2</StepperTitle>
          <StepperDescription>Description for step 2</StepperDescription>
        </StepperTrigger>
        <StepperContent>
          <p className="text-sm text-muted-foreground">Content for step 2</p>
        </StepperContent>
      </StepperItem>
      <StepperItem value="step-3">
        <StepperTrigger>
          <StepperTitle>Step 3</StepperTitle>
          <StepperDescription>Description for step 3</StepperDescription>
        </StepperTrigger>
        <StepperContent>
          <p className="text-sm text-muted-foreground">Content for step 3</p>
        </StepperContent>
      </StepperItem>
    </Stepper>
  ),
}

export const Vertical: Story = {
  render: () => (
    <Stepper defaultValue="step-1" orientation="vertical" className="w-full">
      <StepperItem value="step-1" completed>
        <StepperTrigger>
          <StepperTitle>Account</StepperTitle>
          <StepperDescription>Create your account</StepperDescription>
        </StepperTrigger>
      </StepperItem>
      <StepperItem value="step-2">
        <StepperTrigger>
          <StepperTitle>Profile</StepperTitle>
          <StepperDescription>Set up your profile</StepperDescription>
        </StepperTrigger>
      </StepperItem>
      <StepperItem value="step-3">
        <StepperTrigger>
          <StepperTitle>Complete</StepperTitle>
          <StepperDescription>Review and submit</StepperDescription>
        </StepperTrigger>
      </StepperItem>
    </Stepper>
  ),
}
