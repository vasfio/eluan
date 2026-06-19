import type { Meta, StoryObj } from "@storybook/react"
import { AIConsent } from "./ai-consent"

const meta: Meta<typeof AIConsent> = {
  title: "Components/AI Consent",
  component: AIConsent,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A permission prompt that asks users to allow or deny AI access to their data, available in card, banner, and dialog variants with optional item lists.

**Import**
\`\`\`tsx
import { AIConsent } from "@vasf/ragnar-core"
\`\`\`

**Usage**
\`\`\`tsx
<AIConsent
  variant="card"
  description="Allow AI to access your documents?"
  items={["Your recent documents", "Browsing history"]}
  onAllow={() => {}}
  onDeny={() => {}}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      description: 'Display mode: `"card"`, `"banner"`, or `"dialog"`.',
    },
    title: {
      description: "Consent title displayed at the top.",
    },
    description: {
      description: "Description of what the AI will do.",
    },
    items: {
      description: "List of data items that will be used, rendered as a bullet list.",
    },
    onAllow: {
      description: "Callback fired when the user clicks Allow.",
    },
    onDeny: {
      description: "Callback fired when the user clicks Deny.",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: "card",
    description: "Allow AI to access your documents?",
    onAllow: () => {},
    onDeny: () => {},
  },
}

export const WithItems: Story = {
  args: {
    variant: "card",
    description: "The AI assistant will use the following data:",
    items: ["Your recent documents", "Browsing history", "Saved preferences"],
    onAllow: () => {},
    onDeny: () => {},
  },
}

export const Banner: Story = {
  args: {
    variant: "banner",
    description: "Allow AI to access your documents?",
    onAllow: () => {},
    onDeny: () => {},
  },
}

export const Dialog: Story = {
  args: {
    variant: "dialog",
    description: "Allow AI to access your documents?",
    items: ["Your recent documents", "Browsing history", "Saved preferences"],
    onAllow: () => {},
    onDeny: () => {},
  },
}
