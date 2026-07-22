import type { Meta, StoryObj } from "@storybook/react"
import { Checkbox } from "./checkbox"

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "boolean",
      description: "The controlled checked state of the checkbox.",
    },
    defaultChecked: {
      control: "boolean",
      description: "The default checked state when uncontrolled.",
    },
    disabled: {
      control: "boolean",
      description: "Disables the checkbox, preventing user interaction.",
    },
    onCheckedChange: {
      description: "Callback fired when the checked state changes.",
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
A toggle control that allows users to select or deselect an option, built on Radix UI Checkbox primitive.

**Import**
\`\`\`tsx
import { Checkbox } from "@eluan/core"
\`\`\`

**Usage**
\`\`\`tsx
<Checkbox id="terms" />
<label htmlFor="terms">Accept terms</label>
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
        story: "A checkbox paired with a label for accessibility.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-sm)" }}>
      <Checkbox id="terms" />
      <label htmlFor="terms" style={{ fontSize: "var(--font-size-sm)", fontWeight: 500 }}>
        Accept terms and conditions
      </label>
    </div>
  ),
}

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: "A disabled checkbox that cannot be interacted with.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-sm)" }}>
      <Checkbox id="disabled" disabled />
      <label
        htmlFor="disabled"
        style={{ fontSize: "var(--font-size-sm)", fontWeight: 500, opacity: 0.7 }}
      >
        Disabled checkbox
      </label>
    </div>
  ),
}

export const CheckedByDefault: Story = {
  parameters: {
    docs: {
      description: {
        story: "A checkbox that starts in the checked state using `defaultChecked`.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-sm)" }}>
      <Checkbox id="checked" defaultChecked />
      <label htmlFor="checked" style={{ fontSize: "var(--font-size-sm)", fontWeight: 500 }}>
        Checked by default
      </label>
    </div>
  ),
}
