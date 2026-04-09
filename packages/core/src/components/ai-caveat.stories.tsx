import type { Meta, StoryObj } from "@storybook/react"
import { AICaveat } from "./ai-caveat"

const meta: Meta<typeof AICaveat> = {
  title: "AI/Trust Builders/AICaveat",
  component: AICaveat,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: "subtle",
    children: "AI can make mistakes. Verify important information.",
  },
}

export const Bordered: Story = {
  args: {
    variant: "bordered",
    children: "AI can make mistakes. Verify important information.",
  },
}

export const Warning: Story = {
  args: {
    variant: "warning",
    children:
      "This model may produce inaccurate results for medical advice.",
  },
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <AICaveat variant="subtle">
        AI can make mistakes. Verify important information.
      </AICaveat>
      <AICaveat variant="bordered">
        AI can make mistakes. Verify important information.
      </AICaveat>
      <AICaveat variant="warning">
        This model may produce inaccurate results for medical advice.
      </AICaveat>
    </div>
  ),
}
