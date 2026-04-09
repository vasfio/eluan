import type { Meta, StoryObj } from "@storybook/react"
import { AIDraftIndicator } from "./ai-draft-indicator"

const meta: Meta<typeof AIDraftIndicator> = {
  title: "AI/Governors/AIDraftIndicator",
  component: AIDraftIndicator,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Draft: Story = {
  args: {
    mode: "draft",
    onModeChange: () => {},
  },
}

export const Final: Story = {
  args: {
    mode: "final",
    onModeChange: () => {},
  },
}

export const Compact: Story = {
  args: {
    variant: "compact",
    mode: "draft",
  },
}

export const CompactFinal: Story = {
  args: {
    variant: "compact",
    mode: "final",
  },
}

export const WithCost: Story = {
  args: {
    mode: "draft",
    showCost: true,
    cost: "~1,200 tokens",
    onModeChange: () => {},
  },
}
