import type { Meta, StoryObj } from "@storybook/react"
import { PasswordInput } from "./password-input"

const meta: Meta<typeof PasswordInput> = {
  title: "Core/PasswordInput",
  component: PasswordInput,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-[300px]">
      <PasswordInput placeholder="Enter password" />
    </div>
  ),
}

export const WithStrengthIndicator: Story = {
  render: () => (
    <div className="w-[300px]">
      <PasswordInput
        placeholder="Create a strong password"
        showStrengthIndicator
        onStrengthChange={(strength) => console.log("Strength:", strength)}
      />
    </div>
  ),
}

export const CustomRequirements: Story = {
  render: () => (
    <div className="w-[300px]">
      <PasswordInput
        placeholder="Enter password"
        showStrengthIndicator
        strengthRequirements={{
          minLength: 12,
          requireUppercase: true,
          requireLowercase: true,
          requireNumbers: true,
          requireSpecialChars: true,
        }}
      />
    </div>
  ),
}

export const MinimalRequirements: Story = {
  render: () => (
    <div className="w-[300px]">
      <PasswordInput
        placeholder="Simple password"
        showStrengthIndicator
        strengthRequirements={{
          minLength: 6,
          requireUppercase: false,
          requireLowercase: false,
          requireNumbers: false,
          requireSpecialChars: false,
        }}
      />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="w-[300px]">
      <PasswordInput placeholder="Disabled" disabled />
    </div>
  ),
}
