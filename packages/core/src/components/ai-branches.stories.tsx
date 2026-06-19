import type { Meta, StoryObj } from "@storybook/react"
import { AIBranches } from "./ai-branches"

const meta: Meta<typeof AIBranches> = {
  title: "Components/AI Branches",
  component: AIBranches,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A navigation control for browsing between multiple AI response branches, with previous/next buttons and a current/total counter.

**Import**
\`\`\`tsx
import { AIBranches } from "@vasf/ragnar-core"
\`\`\`

**Usage**
\`\`\`tsx
<AIBranches
  current={2}
  total={4}
  showIcon
  onPrevious={() => {}}
  onNext={() => {}}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      description: 'Layout density: `"default"` or `"compact"`.',
    },
    total: {
      description: "Total number of branches.",
    },
    current: {
      description: "Current active branch (1-based index).",
    },
    onPrevious: {
      description: "Callback when navigating to the previous branch.",
    },
    onNext: {
      description: "Callback when navigating to the next branch.",
    },
    onBranchSelect: {
      description: "Optional callback for branch selection via dropdown.",
    },
    showIcon: {
      description: "Whether to show a GitBranch icon prefix.",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    current: 2,
    total: 4,
    showIcon: true,
    onPrevious: () => {},
    onNext: () => {},
  },
}

export const Compact: Story = {
  args: {
    variant: "compact",
    current: 2,
    total: 4,
    showIcon: true,
    onPrevious: () => {},
    onNext: () => {},
  },
}

export const FirstBranch: Story = {
  args: {
    current: 1,
    total: 4,
    showIcon: true,
    onPrevious: () => {},
    onNext: () => {},
  },
}

export const LastBranch: Story = {
  args: {
    current: 4,
    total: 4,
    showIcon: true,
    onPrevious: () => {},
    onNext: () => {},
  },
}
