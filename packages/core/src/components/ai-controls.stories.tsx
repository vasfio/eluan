import type { Meta, StoryObj } from "@storybook/react"
import { AIControls, AIControlButton } from "./ai-controls"

const meta: Meta<typeof AIControls> = {
  title: "Components/AI Controls",
  component: AIControls,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A toolbar of action buttons for controlling AI generation, with stop, pause, resume, and regenerate variants in multiple sizes.

**Import**
\`\`\`tsx
import { AIControls, AIControlButton } from "@vasf/ragnar-core"
\`\`\`

**Usage**
\`\`\`tsx
<AIControls>
  <AIControlButton variant="stop" />
  <AIControlButton variant="regenerate" />
</AIControls>
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
        story: "Basic controls with stop and regenerate buttons.",
      },
    },
  },
  render: () => (
    <AIControls>
      <AIControlButton variant="stop" />
      <AIControlButton variant="regenerate" />
    </AIControls>
  ),
}

export const AllActions: Story = {
  parameters: {
    docs: {
      description: {
        story: "All four control variants: stop, pause, resume, and regenerate.",
      },
    },
  },
  render: () => (
    <AIControls>
      <AIControlButton variant="stop" />
      <AIControlButton variant="pause" />
      <AIControlButton variant="resume" />
      <AIControlButton variant="regenerate" />
    </AIControls>
  ),
}

export const IconOnly: Story = {
  parameters: {
    docs: {
      description: {
        story: "Icon-only mode without text labels, using the iconOnly prop.",
      },
    },
  },
  render: () => (
    <AIControls>
      <AIControlButton variant="stop" iconOnly />
      <AIControlButton variant="pause" iconOnly />
      <AIControlButton variant="resume" iconOnly />
      <AIControlButton variant="regenerate" iconOnly />
    </AIControls>
  ),
}

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: "Control buttons in sm, default, and lg sizes.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <AIControls>
        <AIControlButton variant="stop" size="sm" />
        <AIControlButton variant="regenerate" size="sm" />
      </AIControls>
      <AIControls>
        <AIControlButton variant="stop" size="default" />
        <AIControlButton variant="regenerate" size="default" />
      </AIControls>
      <AIControls>
        <AIControlButton variant="stop" size="lg" />
        <AIControlButton variant="regenerate" size="lg" />
      </AIControls>
    </div>
  ),
}

export const Generating: Story = {
  parameters: {
    docs: {
      description: {
        story: "Typical state while AI is actively generating: only a stop button.",
      },
    },
  },
  render: () => (
    <AIControls>
      <AIControlButton variant="stop" />
    </AIControls>
  ),
}

export const Idle: Story = {
  parameters: {
    docs: {
      description: {
        story: "Typical idle state: only a regenerate button.",
      },
    },
  },
  render: () => (
    <AIControls>
      <AIControlButton variant="regenerate" />
    </AIControls>
  ),
}
