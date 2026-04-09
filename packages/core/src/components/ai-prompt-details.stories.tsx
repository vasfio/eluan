import type { Meta, StoryObj } from "@storybook/react"
import { AIPromptDetails, AIPromptDetailsItem } from "./ai-prompt-details"

const meta: Meta<typeof AIPromptDetails> = {
  title: "AI/Prompt Actions/AIPromptDetails",
  component: AIPromptDetails,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <p style={{ margin: 0, fontSize: "0.875rem" }}>
        Summarize the key findings from the quarterly report and highlight any
        trends that may impact next quarter's projections.
      </p>
    ),
  },
}

export const Open: Story = {
  args: {
    defaultOpen: true,
    children: (
      <p style={{ margin: 0, fontSize: "0.875rem" }}>
        Analyze the customer feedback data and identify the top three areas for
        improvement. Provide actionable recommendations for each area.
      </p>
    ),
  },
}

export const WithItems: Story = {
  args: {
    defaultOpen: true,
    label: "Prompt configuration",
  },
  render: (args) => (
    <AIPromptDetails {...args}>
      <AIPromptDetailsItem label="Model" value="Claude 3.5 Sonnet" />
      <AIPromptDetailsItem label="Temperature" value="0.7" />
      <AIPromptDetailsItem label="Max Tokens" value="4096" />
      <AIPromptDetailsItem label="Top P" value="0.95" />
      <AIPromptDetailsItem label="System Prompt" value="You are a helpful assistant." />
    </AIPromptDetails>
  ),
}

export const WithCopy: Story = {
  args: {
    defaultOpen: true,
    showCopy: true,
    copyText:
      "Summarize the key findings from the quarterly report and highlight any trends that may impact next quarter's projections.",
  },
  render: (args) => (
    <AIPromptDetails {...args}>
      <p style={{ margin: 0, fontSize: "0.875rem" }}>
        Summarize the key findings from the quarterly report and highlight any
        trends that may impact next quarter's projections.
      </p>
    </AIPromptDetails>
  ),
}
