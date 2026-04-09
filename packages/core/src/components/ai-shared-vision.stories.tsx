import type { Meta, StoryObj } from "@storybook/react"
import { AISharedVision } from "./ai-shared-vision"

const meta: Meta<typeof AISharedVision> = {
  title: "AI/Governors/AISharedVision",
  component: AISharedVision,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

const PlaceholderCard = () => (
  <div
    style={{
      padding: "var(--spacing-md)",
      background: "var(--container-bg-alt)",
      borderRadius: "var(--curves-md)",
      minHeight: 120,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "var(--container-fg-alt)",
      fontSize: "var(--font-size-sm)",
    }}
  >
    Shared document content
  </div>
)

export const Glow: Story = {
  args: {
    variant: "glow",
    active: true,
  },
  render: (args) => (
    <AISharedVision {...args}>
      <PlaceholderCard />
    </AISharedVision>
  ),
}

export const Border: Story = {
  args: {
    variant: "border",
    active: true,
  },
  render: (args) => (
    <AISharedVision {...args}>
      <PlaceholderCard />
    </AISharedVision>
  ),
}

export const Badge: Story = {
  args: {
    variant: "badge",
    active: true,
    label: "AI Active",
  },
  render: (args) => (
    <div style={{ padding: 24 }}>
      <AISharedVision {...args}>
        <PlaceholderCard />
      </AISharedVision>
    </div>
  ),
}

export const Inactive: Story = {
  args: {
    variant: "glow",
    active: false,
  },
  render: (args) => (
    <AISharedVision {...args}>
      <PlaceholderCard />
    </AISharedVision>
  ),
}

export const WithLabel: Story = {
  args: {
    variant: "glow",
    active: true,
    label: "AI is editing...",
  },
  render: (args) => (
    <AISharedVision {...args}>
      <PlaceholderCard />
    </AISharedVision>
  ),
}
