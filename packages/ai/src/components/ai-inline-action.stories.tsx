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
  title: "Components/AI Inline Action",
  component: AIInlineAction,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A floating toolbar of quick AI actions (improve, expand, shorten, translate, rewrite) that appears inline next to selected content, with optional separators between button groups.

**Sub-components:** \`AIInlineActionButton\`, \`AIInlineActionSeparator\`

**Import**
\`\`\`tsx
import {
  AIInlineAction,
  AIInlineActionButton,
  AIInlineActionSeparator,
  AIInlineActionImproveIcon,
  AIInlineActionExpandIcon,
  AIInlineActionShortenIcon,
  AIInlineActionTranslateIcon,
  AIInlineActionRewriteIcon,
} from "@vasf/ragnar-ai"
\`\`\`

**Usage**
\`\`\`tsx
<AIInlineAction>
  <AIInlineActionButton icon={<AIInlineActionImproveIcon />}>Improve</AIInlineActionButton>
  <AIInlineActionSeparator />
  <AIInlineActionButton icon={<AIInlineActionRewriteIcon />}>Rewrite</AIInlineActionButton>
</AIInlineAction>
\`\`\`
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "Default toolbar with all five action buttons showing both icon and label.",
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: "Toolbar with vertical separators grouping related actions.",
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: "Compact icon-only buttons with aria-labels for accessibility.",
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: "Buttons with longer descriptive labels like 'Improve writing' and 'Translate to Spanish'.",
      },
    },
  },
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
