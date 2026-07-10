import type { Meta, StoryObj } from "@storybook/react"
import { Label } from "./form-label"
import { Input } from "./input"

const meta: Meta<typeof Label> = {
  title: "Components/Label",
  component: Label,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A label component with support for required indicators, optional badges, and hint text, paired with FormDescription and FormMessage sub-components.

**Import**
\`\`\`tsx
import { Label, FormDescription, FormMessage } from "@eluan/core"
\`\`\`

**Usage**
\`\`\`tsx
<Label htmlFor="email" required>Email</Label>
\`\`\`
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "A basic form label associated with a text input via htmlFor.",
      },
    },
  },
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="Enter your email" />
    </div>
  ),
}

export const Required: Story = {
  parameters: {
    docs: {
      description: {
        story: "Label with a required asterisk indicator appended after the text.",
      },
    },
  },
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="name" required>Name</Label>
      <Input id="name" placeholder="Enter your name" />
    </div>
  ),
}

export const WithDescription: Story = {
  parameters: {
    docs: {
      description: {
        story: "Form label paired with a description paragraph below the input.",
      },
    },
  },
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="username">Username</Label>
      <Input id="username" placeholder="Choose a username" />
      <p className="text-sm text-muted-foreground">This will be your public display name.</p>
    </div>
  ),
}

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: "Label styled for a disabled input field.",
      },
    },
  },
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="disabled-input" className="opacity-50 cursor-not-allowed">Disabled Field</Label>
      <Input id="disabled-input" disabled placeholder="Disabled" />
    </div>
  ),
}
