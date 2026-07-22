import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Textarea } from "./textarea"
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

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 288 }}>
        <Story />
      </div>
    ),
  ],
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
    <div style={fieldStackStyle}>
      <Label htmlFor="message">Your message</Label>
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
    <div style={fieldStackStyle}>
      <Label htmlFor="message-2">Your message</Label>
      <Textarea placeholder="Type your message here." id="message-2" />
      <p style={hintStyle}>Your message will be copied to the support team.</p>
    </div>
  ),
}
