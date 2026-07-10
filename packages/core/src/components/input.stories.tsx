import type { Meta, StoryObj } from "@storybook/react"
import { Input } from "./input"

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "search", "tel", "url"],
      description: "The HTML input type. Automatically shows a leading icon for `email`, `password`, `search`, `tel`, and `url` types.",
    },
    disabled: {
      control: "boolean",
      description: "Disables the input, preventing user interaction.",
    },
    icon: {
      description: "A custom leading icon element. Overrides the auto-icon for the input type.",
    },
    trailing: {
      description: "A trailing element (e.g. a button or icon) displayed at the end of the input.",
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
A text input field with automatic type-based leading icons, optional custom icons, trailing elements, and a built-in password visibility toggle.

**Import**
\`\`\`tsx
import { Input } from "@eluan/core"
\`\`\`

**Usage**
\`\`\`tsx
<Input type="email" placeholder="Enter your email..." />
\`\`\`
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
}

export const Disabled: Story = {
  args: {
    placeholder: "Disabled input",
    disabled: true,
  },
}

export const WithLabel: Story = {
  parameters: {
    docs: {
      description: {
        story: "An input paired with a label element for accessibility.",
      },
    },
  },
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <label htmlFor="email" className="text-sm font-medium">Email</label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  ),
}

export const WithHelperText: Story = {
  parameters: {
    docs: {
      description: {
        story: "An input with a label and helper text below for additional guidance.",
      },
    },
  },
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <label htmlFor="email-2" className="text-sm font-medium">Email</label>
      <Input type="email" id="email-2" placeholder="Email" />
      <p className="text-sm text-muted-foreground">Enter your email address.</p>
    </div>
  ),
}

