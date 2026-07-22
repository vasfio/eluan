import type { Meta, StoryObj } from "@storybook/react"
import { Switch } from "./switch"
import { Label } from "./form-label"

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
    <div
      style={{
        alignItems: "center",
        display: "flex",
        gap: "var(--spacing-sm)",
      }}
    >
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
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
    <div
      style={{
        alignItems: "center",
        display: "flex",
        gap: "var(--spacing-sm)",
      }}
    >
      <Switch id="disabled" disabled />
      <Label htmlFor="disabled">Disabled</Label>
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
    <div
      style={{
        alignItems: "center",
        display: "flex",
        gap: "var(--spacing-sm)",
      }}
    >
      <Switch id="checked" defaultChecked />
      <Label htmlFor="checked">Enabled by default</Label>
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-lg)",
        minWidth: "320px",
      }}
    >
      <div
        style={{
          alignItems: "center",
          display: "flex",
          gap: "var(--spacing-lg)",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-xxs)",
          }}
        >
          <Label htmlFor="marketing-emails">Marketing emails</Label>
          <p
            style={{
              color: "var(--container-fg-alt)",
              fontSize: "var(--font-size-xs)",
              margin: 0,
            }}
          >
            Receive emails about new products.
          </p>
        </div>
        <Switch id="marketing-emails" />
      </div>
      <div
        style={{
          alignItems: "center",
          display: "flex",
          gap: "var(--spacing-lg)",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-xxs)",
          }}
        >
          <Label htmlFor="security-emails">Security emails</Label>
          <p
            style={{
              color: "var(--container-fg-alt)",
              fontSize: "var(--font-size-xs)",
              margin: 0,
            }}
          >
            Receive emails about account activity.
          </p>
        </div>
        <Switch id="security-emails" defaultChecked />
      </div>
    </div>
  ),
}
