import type { Meta, StoryObj } from "@storybook/react"

import { AICostEstimate } from "./ai-cost-estimate"

const meta: Meta<typeof AICostEstimate> = {
  title: "AI/Tuners/AICostEstimate",
  component: AICostEstimate,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Inline: Story = {
  args: {
    variant: "inline",
    cost: "1,200",
    unit: "tokens",
  },
}

export const Detailed: Story = {
  args: {
    variant: "detailed",
    cost: "$0.032",
    breakdown: [
      { label: "Input tokens (850)", cost: "$0.012" },
      { label: "Output tokens (1,200)", cost: "$0.018" },
      { label: "System prompt", cost: "$0.002" },
    ],
  },
}

export const WithEstimated: Story = {
  args: {
    variant: "inline",
    cost: "2,500",
    unit: "tokens",
    estimated: true,
  },
}

export const ZapIcon: Story = {
  args: {
    variant: "inline",
    cost: "3",
    unit: "credits",
    icon: "zap",
  },
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <AICostEstimate
        variant="inline"
        cost="1,200"
        unit="tokens"
        estimated
      />
      <AICostEstimate
        variant="detailed"
        cost="$0.048"
        estimated
        breakdown={[
          { label: "Input tokens (1,200)", cost: "$0.018" },
          { label: "Output tokens (1,800)", cost: "$0.027" },
          { label: "System prompt", cost: "$0.003" },
        ]}
      />
    </div>
  ),
}
