import type { Meta, StoryObj } from "@storybook/react"
import { FormLabel } from "./form-label"
import { Input } from "./input"

const meta: Meta<typeof FormLabel> = {
  title: "Components/Form Label",
  component: FormLabel,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="space-y-2">
      <FormLabel htmlFor="email">Email</FormLabel>
      <Input id="email" type="email" placeholder="Enter your email" />
    </div>
  ),
}

export const Required: Story = {
  render: () => (
    <div className="space-y-2">
      <FormLabel htmlFor="name" required>Name</FormLabel>
      <Input id="name" placeholder="Enter your name" />
    </div>
  ),
}

export const WithDescription: Story = {
  render: () => (
    <div className="space-y-2">
      <FormLabel htmlFor="username">Username</FormLabel>
      <Input id="username" placeholder="Choose a username" />
      <p className="text-sm text-muted-foreground">This will be your public display name.</p>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="space-y-2">
      <FormLabel htmlFor="disabled-input" className="opacity-50 cursor-not-allowed">Disabled Field</FormLabel>
      <Input id="disabled-input" disabled placeholder="Disabled" />
    </div>
  ),
}
