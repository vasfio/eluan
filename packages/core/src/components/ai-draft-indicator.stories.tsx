import type { Meta, StoryObj } from "@storybook/react"
import { AIDraftIndicator } from "./ai-draft-indicator"

const meta: Meta<typeof AIDraftIndicator> = {
  title: "Components/AI Draft Indicator",
  component: AIDraftIndicator,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A toggle indicator that distinguishes between draft and final AI output modes, available as a full toggle group or a compact badge.

**Import**
\`\`\`tsx
import { AIDraftIndicator } from "@vasf/ragnar-core"
\`\`\`

**Usage**
\`\`\`tsx
<AIDraftIndicator mode="draft" onModeChange={(mode) => setMode(mode)} />
\`\`\`
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Draft: Story = {
  args: {
    mode: "draft",
    onModeChange: () => {},
  },
}

export const Final: Story = {
  args: {
    mode: "final",
    onModeChange: () => {},
  },
}

export const Compact: Story = {
  args: {
    variant: "compact",
    mode: "draft",
  },
}

export const CompactFinal: Story = {
  args: {
    variant: "compact",
    mode: "final",
  },
}

export const WithCost: Story = {
  args: {
    mode: "draft",
    showCost: true,
    cost: "~1,200 tokens",
    onModeChange: () => {},
  },
}
