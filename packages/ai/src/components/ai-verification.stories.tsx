import type { Meta, StoryObj } from "@storybook/react"
import { AIVerification } from "./ai-verification"

const meta: Meta<typeof AIVerification> = {
  title: "Components/AI Verification",
  component: AIVerification,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A confirmation prompt that asks users to approve, reject, or edit an AI-proposed action before it executes, available as an inline card or a modal dialog.

**Sub-components:** \`AIVerificationActions\`

**Import**
\`\`\`tsx
import { AIVerification } from "@vasf/ragnar-ai"
\`\`\`

**Usage**
\`\`\`tsx
<AIVerification
  title="Send email to 12 contacts"
  description="This will send a personalized follow-up email."
  onApprove={() => {}}
  onReject={() => {}}
/>
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
    title: "Send email to 12 contacts",
    description:
      "This action will send a personalized follow-up email to all 12 contacts in your outreach list.",
    onApprove: () => {},
    onReject: () => {},
  },
}

export const Modal: Story = {
  args: {
    variant: "modal",
    title: "Deploy model to production",
    description:
      "This will replace the current production model with the newly fine-tuned version.",
    onApprove: () => {},
    onReject: () => {},
  },
}

export const WithEdit: Story = {
  args: {
    title: "Summarize quarterly report",
    description:
      "The AI will generate a 500-word executive summary from the uploaded financial data.",
    onApprove: () => {},
    onReject: () => {},
    onEdit: () => {},
  },
}

export const Loading: Story = {
  args: {
    title: "Processing batch inference",
    description:
      "Running sentiment analysis on 2,400 customer reviews. This may take a moment.",
    loading: true,
    onApprove: () => {},
    onReject: () => {},
  },
}
