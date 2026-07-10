import type { Meta, StoryObj } from "@storybook/react"
import { Switch } from "./switch"

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "boolean",
      description: "The controlled checked state of the switch.",
    },
    defaultChecked: {
      control: "boolean",
      description: "The default checked state when uncontrolled.",
    },
    disabled: {
      control: "boolean",
      description: "Disables the switch, preventing user interaction.",
    },
    onCheckedChange: {
      description: "Callback fired when the checked state changes.",
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
A toggle switch for turning an option on or off, built on Radix UI Switch primitive.

**Import**
\`\`\`tsx
import { Switch } from "@eluan/core"
\`\`\`

**Usage**
\`\`\`tsx
<Switch id="airplane-mode" />
<label htmlFor="airplane-mode">Airplane Mode</label>
\`\`\`
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const WithLabel: Story = {
  parameters: {
    docs: {
      description: {
        story: "A switch paired with a label for accessibility.",
      },
    },
  },
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <label htmlFor="airplane-mode" className="text-sm font-medium">Airplane Mode</label>
    </div>
  ),
}

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: "A disabled switch that cannot be toggled.",
      },
    },
  },
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="disabled" disabled />
      <label htmlFor="disabled" className="text-sm font-medium opacity-70">Disabled</label>
    </div>
  ),
}

export const CheckedByDefault: Story = {
  parameters: {
    docs: {
      description: {
        story: "A switch that starts in the on state using `defaultChecked`.",
      },
    },
  },
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="checked" defaultChecked />
      <label htmlFor="checked" className="text-sm font-medium">Enabled by default</label>
    </div>
  ),
}

export const SettingsExample: Story = {
  parameters: {
    docs: {
      description: {
        story: "Switches used in a settings-style layout with labels and descriptions.",
      },
    },
  },
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
