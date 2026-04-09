import type { Meta, StoryObj } from "@storybook/react"
import {
  AIInlineAction,
  AIInlineActionButton,
  AIInlineActionSeparator,
  AIInlineActionImproveIcon,
  AIInlineActionExpandIcon,
  AIInlineActionShortenIcon,
  AIInlineActionTranslateIcon,
  AIInlineActionRewriteIcon,
} from "./ai-inline-action"

const meta: Meta<typeof AIInlineAction> = {
  title: "AI/Prompt Actions/AIInlineAction",
  component: AIInlineAction,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <AIInlineAction>
      <AIInlineActionButton icon={<AIInlineActionImproveIcon />}>
        Improve
      </AIInlineActionButton>
      <AIInlineActionButton icon={<AIInlineActionExpandIcon />}>
        Expand
      </AIInlineActionButton>
      <AIInlineActionButton icon={<AIInlineActionShortenIcon />}>
        Shorten
      </AIInlineActionButton>
      <AIInlineActionButton icon={<AIInlineActionTranslateIcon />}>
        Translate
      </AIInlineActionButton>
      <AIInlineActionButton icon={<AIInlineActionRewriteIcon />}>
        Rewrite
      </AIInlineActionButton>
    </AIInlineAction>
  ),
}

export const WithSeparators: Story = {
  render: () => (
    <AIInlineAction>
      <AIInlineActionButton icon={<AIInlineActionImproveIcon />}>
        Improve
      </AIInlineActionButton>
      <AIInlineActionButton icon={<AIInlineActionExpandIcon />}>
        Expand
      </AIInlineActionButton>
      <AIInlineActionSeparator />
      <AIInlineActionButton icon={<AIInlineActionShortenIcon />}>
        Shorten
      </AIInlineActionButton>
      <AIInlineActionButton icon={<AIInlineActionTranslateIcon />}>
        Translate
      </AIInlineActionButton>
      <AIInlineActionSeparator />
      <AIInlineActionButton icon={<AIInlineActionRewriteIcon />}>
        Rewrite
      </AIInlineActionButton>
    </AIInlineAction>
  ),
}

export const IconOnly: Story = {
  render: () => (
    <AIInlineAction>
      <AIInlineActionButton icon={<AIInlineActionImproveIcon />} aria-label="Improve" />
      <AIInlineActionButton icon={<AIInlineActionExpandIcon />} aria-label="Expand" />
      <AIInlineActionButton icon={<AIInlineActionShortenIcon />} aria-label="Shorten" />
      <AIInlineActionButton icon={<AIInlineActionTranslateIcon />} aria-label="Translate" />
      <AIInlineActionButton icon={<AIInlineActionRewriteIcon />} aria-label="Rewrite" />
    </AIInlineAction>
  ),
}

export const WithLabels: Story = {
  render: () => (
    <AIInlineAction>
      <AIInlineActionButton icon={<AIInlineActionImproveIcon />}>
        Improve writing
      </AIInlineActionButton>
      <AIInlineActionButton icon={<AIInlineActionExpandIcon />}>
        Expand content
      </AIInlineActionButton>
      <AIInlineActionButton icon={<AIInlineActionShortenIcon />}>
        Make it shorter
      </AIInlineActionButton>
      <AIInlineActionButton icon={<AIInlineActionTranslateIcon />}>
        Translate to Spanish
      </AIInlineActionButton>
      <AIInlineActionButton icon={<AIInlineActionRewriteIcon />}>
        Rewrite formally
      </AIInlineActionButton>
    </AIInlineAction>
  ),
}
