import type { Meta, StoryObj } from "@storybook/react"
import { AIRegenerate } from "./ai-regenerate"

const meta: Meta<typeof AIRegenerate> = {
  title: "AI/Prompt Actions/AIRegenerate",
  component: AIRegenerate,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const Loading: Story = {
  args: {
    loading: true,
  },
}

export const WithCount: Story = {
  args: {
    count: "2/4",
  },
}

export const Ghost: Story = {
  args: {
    variant: "ghost",
  },
}

export const Primary: Story = {
  args: {
    variant: "primary",
  },
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <AIRegenerate size="sm" />
      <AIRegenerate size="default" />
      <AIRegenerate size="lg" />
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <AIRegenerate variant="default" />
        <AIRegenerate variant="ghost" />
        <AIRegenerate variant="primary" />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <AIRegenerate variant="default" count="1/3" />
        <AIRegenerate variant="ghost" count="2/3" />
        <AIRegenerate variant="primary" count="3/3" />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <AIRegenerate variant="default" loading />
        <AIRegenerate variant="ghost" loading />
        <AIRegenerate variant="primary" loading />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <AIRegenerate variant="default" showDropdown />
        <AIRegenerate variant="ghost" showDropdown />
        <AIRegenerate variant="primary" showDropdown />
      </div>
    </div>
  ),
}
