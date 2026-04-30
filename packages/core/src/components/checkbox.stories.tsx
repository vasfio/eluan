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
import { Checkbox } from "@vasf/ragnar-core"
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
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
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
    <div className="flex items-center space-x-2">
      <Checkbox id="disabled" disabled />
      <label
        htmlFor="disabled"
        className="text-sm font-medium leading-none opacity-70"
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
    <div className="flex items-center space-x-2">
      <Checkbox id="checked" defaultChecked />
      <label
        htmlFor="checked"
        className="text-sm font-medium leading-none"
      >
        Checked by default
      </label>
    </div>
  ),
}

export const MultipleCheckboxes: Story = {
  parameters: {
    docs: {
      description: {
        story: "A group of checkboxes for selecting multiple options from a list.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center space-x-2">
        <Checkbox id="option1" />
        <label htmlFor="option1" className="text-sm font-medium">Option 1</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="option2" />
        <label htmlFor="option2" className="text-sm font-medium">Option 2</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="option3" />
        <label htmlFor="option3" className="text-sm font-medium">Option 3</label>
      </div>
    </div>
  ),
}
