import type { Meta, StoryObj } from "@storybook/react"
import { AIDisclosure } from "./ai-disclosure"

const meta: Meta<typeof AIDisclosure> = {
  title: "AI/Trust Builders/AIDisclosure",
  component: AIDisclosure,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: "badge",
    action: "generated",
  },
}

export const Label: Story = {
  args: {
    variant: "label",
    action: "generated",
  },
}

export const Tag: Story = {
  args: {
    variant: "tag",
    action: "generated",
  },
}

export const Compact: Story = {
  args: {
    variant: "compact",
    action: "generated",
  },
}

export const Actions: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <AIDisclosure variant="badge" action="generated" />
      <AIDisclosure variant="badge" action="edited" />
      <AIDisclosure variant="badge" action="summarized" />
      <AIDisclosure variant="badge" action="suggested" />
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <AIDisclosure variant="badge" action="generated" />
      <AIDisclosure variant="label" action="generated" />
      <AIDisclosure variant="tag" action="generated" />
      <AIDisclosure variant="compact" action="generated" />
    </div>
  ),
}
