import type { Meta, StoryObj } from "@storybook/react"
import { EmailInput } from "./email-input"

const meta: Meta<typeof EmailInput> = {
  title: "Components/Email Input",
  component: EmailInput,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-[300px]">
      <EmailInput placeholder="Enter your email" />
    </div>
  ),
}

export const WithValidation: Story = {
  render: () => (
    <div className="w-[300px] space-y-2">
      <EmailInput
        placeholder="Enter your email"
        showValidation
        onValidationChange={(isValid) => console.log("Valid:", isValid)}
      />
      <p className="text-sm text-muted-foreground">
        Type an email and click outside to see validation
      </p>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="w-[300px]">
      <EmailInput placeholder="Disabled" disabled />
    </div>
  ),
}
