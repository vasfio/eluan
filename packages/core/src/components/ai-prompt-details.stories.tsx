import type { Meta, StoryObj } from "@storybook/react"
import { AIPromptDetails, AIPromptDetailsItem } from "./ai-prompt-details"

const meta: Meta<typeof AIPromptDetails> = {
  title: "Components/AI Prompt Details",
  component: AIPromptDetails,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A collapsible section that reveals the prompt configuration or raw prompt text behind an AI response, with an optional copy-to-clipboard button.

**Sub-components:** \`AIPromptDetailsItem\`

**Import**
\`\`\`tsx
import { AIPromptDetails, AIPromptDetailsItem } from "@vasf/ragnar-core"
\`\`\`

**Usage**
\`\`\`tsx
<AIPromptDetails defaultOpen label="Prompt configuration" showCopy copyText="...">
  <AIPromptDetailsItem label="Model" value="Claude 3.5 Sonnet" />
  <AIPromptDetailsItem label="Temperature" value="0.7" />
</AIPromptDetails>
\`\`\`
        `,
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: "Uses AIPromptDetailsItem sub-components to display key-value metadata pairs.",
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: "Includes a copy button that copies the prompt text to the clipboard.",
      },
    },
  },
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
