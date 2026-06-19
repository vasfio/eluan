import type { Meta, StoryObj } from "@storybook/react"
import { AISharedVision } from "./ai-shared-vision"

const meta: Meta<typeof AISharedVision> = {
  title: "Components/AI Shared Vision",
  component: AISharedVision,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A wrapper that visually indicates when AI is actively working on shared content, using a glow ring, animated border, or badge overlay.

**Import**
\`\`\`tsx
import { AISharedVision } from "@vasf/ragnar-core"
\`\`\`

**Usage**
\`\`\`tsx
<AISharedVision variant="glow" active label="AI is editing...">
  <YourContent />
</AISharedVision>
\`\`\`
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const PlaceholderCard = () => (
  <div
    style={{
      padding: "var(--spacing-md)",
      background: "var(--container-bg-alt)",
      borderRadius: "var(--curves-md)",
      minHeight: 120,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "var(--container-fg-alt)",
      fontSize: "var(--font-size-sm)",
    }}
  >
    Shared document content
  </div>
)

export const Glow: Story = {
  parameters: {
    docs: {
      description: {
        story: "Glow variant showing a pulsing ring around the content when AI is active.",
      },
    },
  },
  args: {
    variant: "glow",
    active: true,
  },
  render: (args) => (
    <AISharedVision {...args}>
      <PlaceholderCard />
    </AISharedVision>
  ),
}

export const Border: Story = {
  parameters: {
    docs: {
      description: {
        story: "Border variant that uses a pulsing border instead of a ring.",
      },
    },
  },
  args: {
    variant: "border",
    active: true,
  },
  render: (args) => (
    <AISharedVision {...args}>
      <PlaceholderCard />
    </AISharedVision>
  ),
}

export const Badge: Story = {
  parameters: {
    docs: {
      description: {
        story: "Badge variant that displays a floating informative badge with a pinging dot indicator.",
      },
    },
  },
  args: {
    variant: "badge",
    active: true,
    label: "AI Active",
  },
  render: (args) => (
    <div style={{ padding: 24 }}>
      <AISharedVision {...args}>
        <PlaceholderCard />
      </AISharedVision>
    </div>
  ),
}

export const Inactive: Story = {
  parameters: {
    docs: {
      description: {
        story: "Inactive state where no visual indicators are shown.",
      },
    },
  },
  args: {
    variant: "glow",
    active: false,
  },
  render: (args) => (
    <AISharedVision {...args}>
      <PlaceholderCard />
    </AISharedVision>
  ),
}

export const WithLabel: Story = {
  parameters: {
    docs: {
      description: {
        story: "Active glow variant with a text label below the content indicating AI status.",
      },
    },
  },
  args: {
    variant: "glow",
    active: true,
    label: "AI is editing...",
  },
  render: (args) => (
    <AISharedVision {...args}>
      <PlaceholderCard />
    </AISharedVision>
  ),
}
