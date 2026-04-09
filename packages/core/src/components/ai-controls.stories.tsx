import type { Meta, StoryObj } from "@storybook/react"
import { AIControls, AIControlButton } from "./ai-controls"

const meta: Meta<typeof AIControls> = {
  title: "AI/Governors/AIControls",
  component: AIControls,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <AIControls>
      <AIControlButton variant="stop" />
      <AIControlButton variant="regenerate" />
    </AIControls>
  ),
}

export const AllActions: Story = {
  render: () => (
    <AIControls>
      <AIControlButton variant="stop" />
      <AIControlButton variant="pause" />
      <AIControlButton variant="resume" />
      <AIControlButton variant="regenerate" />
    </AIControls>
  ),
}

export const IconOnly: Story = {
  render: () => (
    <AIControls>
      <AIControlButton variant="stop" iconOnly />
      <AIControlButton variant="pause" iconOnly />
      <AIControlButton variant="resume" iconOnly />
      <AIControlButton variant="regenerate" iconOnly />
    </AIControls>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <AIControls>
        <AIControlButton variant="stop" size="sm" />
        <AIControlButton variant="regenerate" size="sm" />
      </AIControls>
      <AIControls>
        <AIControlButton variant="stop" size="default" />
        <AIControlButton variant="regenerate" size="default" />
      </AIControls>
      <AIControls>
        <AIControlButton variant="stop" size="lg" />
        <AIControlButton variant="regenerate" size="lg" />
      </AIControls>
    </div>
  ),
}

export const Generating: Story = {
  render: () => (
    <AIControls>
      <AIControlButton variant="stop" />
    </AIControls>
  ),
}

export const Idle: Story = {
  render: () => (
    <AIControls>
      <AIControlButton variant="regenerate" />
    </AIControls>
  ),
}
