import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { RichText } from "./rich-text"

const meta: Meta<typeof RichText> = {
  title: "Components/RichText",
  component: RichText,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState("")
    return (
      <div className="max-w-2xl">
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
  render: () => {
    const [value, setValue] = React.useState(
      "<h2>Welcome to Rich Text Editor</h2><p>This is a <strong>rich text editor</strong> with support for:</p><ul><li>Bold and italic text</li><li>Headings</li><li>Lists</li><li>And more!</li></ul>"
    )
    return (
      <div className="max-w-2xl">
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
  render: () => {
    const [value, setValue] = React.useState("")
    return (
      <div className="max-w-2xl">
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
  render: () => (
    <div className="max-w-2xl">
      <RichText
        value="<p>This editor is disabled. You cannot edit this content.</p>"
        disabled
      />
    </div>
  ),
}
