import type { Meta, StoryObj } from "@storybook/react"
import { AICaveat } from "./ai-caveat"

const meta: Meta<typeof AICaveat> = {
  title: "Components/AI Caveat",
  component: AICaveat,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A small disclaimer or warning message reminding users that AI output may be inaccurate, available in subtle, bordered, and warning variants.

**Import**
\`\`\`tsx
import { AICaveat } from "@vasf/ragnar-ai"
\`\`\`

**Usage**
\`\`\`tsx
<AICaveat variant="subtle">AI can make mistakes. Verify important information.</AICaveat>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      description: 'Visual style: `"subtle"`, `"bordered"`, or `"warning"`.',
    },
    icon: {
      description: "Override the default AlertTriangle icon with a custom React node.",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: "subtle",
    children: "AI can make mistakes. Verify important information.",
  },
}

export const Bordered: Story = {
  args: {
    variant: "bordered",
    children: "AI can make mistakes. Verify important information.",
  },
}

export const Warning: Story = {
  args: {
    variant: "warning",
    children:
      "This model may produce inaccurate results for medical advice.",
  },
}

export const AllVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: "Displays all three variants: subtle, bordered, and warning.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <AICaveat variant="subtle">
        AI can make mistakes. Verify important information.
      </AICaveat>
      <AICaveat variant="bordered">
        AI can make mistakes. Verify important information.
      </AICaveat>
      <AICaveat variant="warning">
        This model may produce inaccurate results for medical advice.
      </AICaveat>
    </div>
  ),
}
