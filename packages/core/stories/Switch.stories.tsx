import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "@/components/switch";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "boolean",
      description: "Whether the switch is checked",
    },
    disabled: {
      control: "boolean",
      description: "Whether the switch is disabled",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <label htmlFor="airplane-mode" className="text-sm font-medium">
        Airplane Mode
      </label>
    </div>
  ),
};

export const Checked: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="checked" defaultChecked />
      <label htmlFor="checked" className="text-sm font-medium">
        Enabled
      </label>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch id="disabled-off" disabled />
        <label htmlFor="disabled-off" className="text-sm font-medium opacity-50">
          Disabled (Off)
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="disabled-on" disabled defaultChecked />
        <label htmlFor="disabled-on" className="text-sm font-medium opacity-50">
          Disabled (On)
        </label>
      </div>
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div className="flex items-start space-x-4">
      <Switch id="marketing" />
      <div className="grid gap-1.5">
        <label htmlFor="marketing" className="text-sm font-medium">
          Marketing emails
        </label>
        <p className="text-sm text-muted-foreground">
          Receive emails about new products, features, and more.
        </p>
      </div>
    </div>
  ),
};

export const SettingsPanel: Story = {
  render: () => (
    <div className="w-[400px] space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-4">Notifications</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">Push Notifications</label>
              <p className="text-sm text-muted-foreground">
                Receive push notifications on your device.
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">Email Notifications</label>
              <p className="text-sm text-muted-foreground">
                Receive email notifications for updates.
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">SMS Notifications</label>
              <p className="text-sm text-muted-foreground">
                Receive SMS for urgent alerts.
              </p>
            </div>
            <Switch />
          </div>
        </div>
      </div>
    </div>
  ),
};

export const InlineList: Story = {
  render: () => (
    <div className="w-[300px] rounded-lg border p-4 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Wi-Fi</span>
        <Switch defaultChecked />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Bluetooth</span>
        <Switch defaultChecked />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Airplane Mode</span>
        <Switch />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Do Not Disturb</span>
        <Switch />
      </div>
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex items-center space-x-2">
        <Switch id="off" />
        <label htmlFor="off" className="text-sm">Off</label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="on" defaultChecked />
        <label htmlFor="on" className="text-sm">On</label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="disabled-state" disabled />
        <label htmlFor="disabled-state" className="text-sm opacity-50">Disabled</label>
      </div>
    </div>
  ),
};
