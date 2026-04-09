import type { Meta, StoryObj } from "@storybook/react"
import { AIBranches } from "./ai-branches"

const meta: Meta<typeof AIBranches> = {
  title: "AI/Governors/AIBranches",
  component: AIBranches,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    current: 2,
    total: 4,
    showIcon: true,
    onPrevious: () => {},
    onNext: () => {},
  },
}

export const Compact: Story = {
  args: {
    variant: "compact",
    current: 2,
    total: 4,
    showIcon: true,
    onPrevious: () => {},
    onNext: () => {},
  },
}

export const FirstBranch: Story = {
  args: {
    current: 1,
    total: 4,
    showIcon: true,
    onPrevious: () => {},
    onNext: () => {},
  },
}

export const LastBranch: Story = {
  args: {
    current: 4,
    total: 4,
    showIcon: true,
    onPrevious: () => {},
    onNext: () => {},
  },
}
