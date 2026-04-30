import type { Meta, StoryObj } from "@storybook/react"
import { AIDisclosure } from "./ai-disclosure"

const meta: Meta<typeof AIDisclosure> = {
  title: "Components/AI Disclosure",
  component: AIDisclosure,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A label or badge that discloses content as AI-generated, AI-edited, AI-summarized, or AI-suggested, available in badge, label, tag, and compact variants.

**Import**
\`\`\`tsx
import { AIDisclosure } from "@vasf/ragnar-ai"
\`\`\`

**Usage**
\`\`\`tsx
<AIDisclosure variant="badge" action="generated" />
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      description: 'Visual style: `"badge"`, `"label"`, `"tag"`, or `"compact"` (icon-only with tooltip).',
    },
    action: {
      description: 'Predefined action label: `"generated"`, `"edited"`, `"summarized"`, or `"suggested"`.',
    },
    icon: {
      description: "Override the default Sparkles icon with a custom React node.",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: "badge",
    action: "generated",
  },
}

export const Label: Story = {
  args: {
    variant: "label",
    action: "generated",
  },
}

export const Tag: Story = {
  args: {
    variant: "tag",
    action: "generated",
  },
}

export const Compact: Story = {
  args: {
    variant: "compact",
    action: "generated",
  },
}

export const Actions: Story = {
  parameters: {
    docs: {
      description: {
        story: "Shows all four predefined action labels: generated, edited, summarized, and suggested.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <AIDisclosure variant="badge" action="generated" />
      <AIDisclosure variant="badge" action="edited" />
      <AIDisclosure variant="badge" action="summarized" />
      <AIDisclosure variant="badge" action="suggested" />
    </div>
  ),
}

export const AllVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: "Displays all four visual variants: badge, label, tag, and compact.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <AIDisclosure variant="badge" action="generated" />
      <AIDisclosure variant="label" action="generated" />
      <AIDisclosure variant="tag" action="generated" />
      <AIDisclosure variant="compact" action="generated" />
    </div>
  ),
}
