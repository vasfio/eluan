import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Input } from "./input"
import { Label } from "./form-label"

const fieldStackStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "var(--spacing-sm)",
  width: "100%",
}

const hintStyle: React.CSSProperties = {
  color: "var(--container-fg-alt)",
  fontSize: "var(--font-size-xs)",
  margin: 0,
}

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 288 }}>
        <Story />
      </div>
    ),
  ],
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
    <div style={fieldStackStyle}>
      <Label htmlFor="name">Name</Label>
      <Input id="name" placeholder="Jane Cooper" />
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
    <div style={fieldStackStyle}>
      <Label htmlFor="name-2">Name</Label>
      <Input id="name-2" placeholder="Jane Cooper" />
      <p style={hintStyle}>Enter your full name.</p>
    </div>
  ),
}

