import type { Meta, StoryObj } from "@storybook/react"
import { Fieldset, FieldsetLegend } from "./fieldset"
import { Input } from "./input"
import { Checkbox } from "./checkbox"

const meta: Meta<typeof Fieldset> = {
  title: "Components/Fieldset",
  component: Fieldset,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Fieldset>
      <FieldsetLegend>Personal Information</FieldsetLegend>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Name</label>
          <Input placeholder="Enter your name" />
        </div>
        <div>
          <label className="text-sm font-medium">Email</label>
          <Input type="email" placeholder="Enter your email" />
        </div>
      </div>
    </Fieldset>
  ),
}

export const WithCheckboxes: Story = {
  render: () => (
    <Fieldset>
      <FieldsetLegend>Notification Preferences</FieldsetLegend>
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox id="email-notif" />
          <label htmlFor="email-notif" className="text-sm">Email notifications</label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="sms-notif" />
          <label htmlFor="sms-notif" className="text-sm">SMS notifications</label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="push-notif" />
          <label htmlFor="push-notif" className="text-sm">Push notifications</label>
        </div>
      </div>
    </Fieldset>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Fieldset disabled>
      <FieldsetLegend>Disabled Fieldset</FieldsetLegend>
      <div className="space-y-4">
        <Input placeholder="This input is disabled" />
        <Input placeholder="This one too" />
      </div>
    </Fieldset>
  ),
}
