import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { RichText } from "./rich-text"

const meta: Meta<typeof RichText> = {
  title: "Components/Rich Text",
  component: RichText,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A rich text editor built on TipTap with a formatting toolbar supporting bold, italic, strikethrough, code, headings, lists, blockquotes, and undo/redo.

**Import**
\`\`\`tsx
import { RichText } from "@eluan/core"
\`\`\`

**Usage**
\`\`\`tsx
<RichText
  value={value}
  onChange={setValue}
  placeholder="Start typing..."
  minHeight="150px"
/>
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
        story: "An empty rich text editor with placeholder text and full toolbar.",
      },
    },
  },
  render: () => {
    const [value, setValue] = React.useState("")
    return (
      <div style={{ maxWidth: "42rem" }}>
        <RichText
          value={value}
          onChange={setValue}
          placeholder="Start typing..."
        />
      </div>
    )
  },
}

export const WithInitialContent: Story = {
  parameters: {
    docs: {
      description: {
        story: "Editor pre-populated with HTML content including headings, bold text, and a list.",
      },
    },
  },
  render: () => {
    const [value, setValue] = React.useState(
      "<h2>Welcome to Rich Text Editor</h2><p>This is a <strong>rich text editor</strong> with support for:</p><ul><li>Bold and italic text</li><li>Headings</li><li>Lists</li><li>And more!</li></ul>"
    )
    return (
      <div style={{ maxWidth: "42rem" }}>
        <RichText
          value={value}
          onChange={setValue}
          placeholder="Start typing..."
        />
      </div>
    )
  },
}

export const CustomMinHeight: Story = {
  parameters: {
    docs: {
      description: {
        story: "Editor with a custom minimum height of 300px for longer-form content.",
      },
    },
  },
  render: () => {
    const [value, setValue] = React.useState("")
    return (
      <div style={{ maxWidth: "42rem" }}>
        <RichText
          value={value}
          onChange={setValue}
          placeholder="Write your blog post..."
          minHeight="300px"
        />
      </div>
    )
  },
}

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: "A disabled editor that displays content but prevents editing.",
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: "42rem" }}>
      <RichText
        value="<p>This editor is disabled. You cannot edit this content.</p>"
        disabled
      />
    </div>
  ),
}
