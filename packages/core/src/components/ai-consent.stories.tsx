import type { Meta, StoryObj } from "@storybook/react"
import { AIConsent } from "./ai-consent"

const meta: Meta<typeof AIConsent> = {
  title: "AI/Trust Builders/AIConsent",
  component: AIConsent,
  tags: ["autodocs"],
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
