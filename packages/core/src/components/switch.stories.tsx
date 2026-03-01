import type { Meta, StoryObj } from "@storybook/react"
import { Switch } from "./switch"

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <label htmlFor="airplane-mode" className="text-sm font-medium">Airplane Mode</label>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="disabled" disabled />
      <label htmlFor="disabled" className="text-sm font-medium opacity-70">Disabled</label>
    </div>
  ),
}

export const CheckedByDefault: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="checked" defaultChecked />
      <label htmlFor="checked" className="text-sm font-medium">Enabled by default</label>
    </div>
  ),
}

export const SettingsExample: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <label className="text-sm font-medium">Marketing emails</label>
          <p className="text-sm text-muted-foreground">Receive emails about new products.</p>
        </div>
        <Switch />
      </div>
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <label className="text-sm font-medium">Security emails</label>
          <p className="text-sm text-muted-foreground">Receive emails about account activity.</p>
        </div>
        <Switch defaultChecked />
      </div>
    </div>
  ),
}
