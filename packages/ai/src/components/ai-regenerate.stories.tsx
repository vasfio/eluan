import type { Meta, StoryObj } from "@storybook/react"
import { AIRegenerate } from "./ai-regenerate"

const meta: Meta<typeof AIRegenerate> = {
  title: "Components/AI Regenerate",
  component: AIRegenerate,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A button that lets users request a new AI-generated response, with optional loading state, iteration counter, and dropdown for additional regeneration options.

**Import**
\`\`\`tsx
import { AIRegenerate } from "@vasf/ragnar-ai"
\`\`\`

**Usage**
\`\`\`tsx
<AIRegenerate onRegenerate={() => handleRegenerate()} count="1/3" />
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      description: "Visual style of the regenerate button.",
    },
    size: {
      description: "Size of the button: `sm`, `default`, or `lg`.",
    },
    onRegenerate: {
      description: "Callback fired when regenerate is triggered.",
    },
    loading: {
      description: "Show a loading/spinning state on the icon.",
    },
    count: {
      description: 'Current iteration counter, e.g. `"1/4"`.',
    },
    showDropdown: {
      description: "Show a dropdown trigger for additional options.",
    },
    onDropdownClick: {
      description: "Callback fired when the dropdown trigger is clicked.",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const Loading: Story = {
  args: {
    loading: true,
  },
}

export const WithCount: Story = {
  args: {
    count: "2/4",
  },
}

export const Ghost: Story = {
  args: {
    variant: "ghost",
  },
}

export const Primary: Story = {
  args: {
    variant: "primary",
  },
}

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: "Displays the three available sizes: sm, default, and lg.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <AIRegenerate size="sm" />
      <AIRegenerate size="default" />
      <AIRegenerate size="lg" />
    </div>
  ),
}

export const AllVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: "Shows all variant, count, loading, and dropdown combinations in a grid.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <AIRegenerate variant="default" />
        <AIRegenerate variant="ghost" />
        <AIRegenerate variant="primary" />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <AIRegenerate variant="default" count="1/3" />
        <AIRegenerate variant="ghost" count="2/3" />
        <AIRegenerate variant="primary" count="3/3" />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <AIRegenerate variant="default" loading />
        <AIRegenerate variant="ghost" loading />
        <AIRegenerate variant="primary" loading />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <AIRegenerate variant="default" showDropdown />
        <AIRegenerate variant="ghost" showDropdown />
        <AIRegenerate variant="primary" showDropdown />
      </div>
    </div>
  ),
}
