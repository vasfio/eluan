import type { Meta, StoryObj } from "@storybook/react"
import { Textarea } from "./textarea"

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A multi-line text input field for collecting longer-form text content from users.

**Import**
\`\`\`tsx
import { Textarea } from "@eluan/core"
\`\`\`

**Usage**
\`\`\`tsx
<Textarea placeholder="Type your message here." />
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
    placeholder: "Type your message here.",
  },
}

export const Disabled: Story = {
  args: {
    placeholder: "Disabled textarea",
    disabled: true,
  },
}

export const WithLabel: Story = {
  parameters: {
    docs: {
      description: {
        story: "Textarea paired with a label element for accessibility and form context.",
      },
    },
  },
  render: () => (
    <div className="grid w-full gap-1.5">
      <label htmlFor="message" className="text-sm font-medium">Your message</label>
      <Textarea placeholder="Type your message here." id="message" />
    </div>
  ),
}

export const WithHelperText: Story = {
  parameters: {
    docs: {
      description: {
        story: "Textarea with both a label and helper text providing additional guidance to the user.",
      },
    },
  },
  render: () => (
    <div className="grid w-full gap-1.5">
      <label htmlFor="message-2" className="text-sm font-medium">Your message</label>
      <Textarea placeholder="Type your message here." id="message-2" />
      <p className="text-sm text-muted-foreground">Your message will be copied to the support team.</p>
    </div>
  ),
}
