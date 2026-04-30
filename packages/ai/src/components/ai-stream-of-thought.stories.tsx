import type { Meta, StoryObj } from "@storybook/react"
import { AIStreamOfThought, AIThoughtStep } from "./ai-stream-of-thought"

const meta: Meta<typeof AIStreamOfThought> = {
  title: "Components/AI Stream Of Thought",
  component: AIStreamOfThought,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A collapsible panel that reveals the AI's internal reasoning process, with support for streaming indicators, tool-step icons, and elapsed duration display.

**Import**
\`\`\`tsx
import { AIStreamOfThought, AIThoughtStep } from "@vasf/ragnar-ai"
\`\`\`

**Usage**
\`\`\`tsx
<AIStreamOfThought label="Thinking..." isStreaming defaultOpen>
  <AIThoughtStep tool="search">Searching knowledge base...</AIThoughtStep>
</AIStreamOfThought>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    label: {
      description: "Text shown on the collapsible trigger button.",
    },
    isStreaming: {
      description: "Whether to show animated dots indicating the AI is still thinking.",
    },
    defaultOpen: {
      description: "Whether the panel is open by default (uncontrolled).",
    },
    open: {
      description: "Controlled open state of the collapsible panel.",
    },
    onOpenChange: {
      description: "Callback when the open state changes.",
    },
    duration: {
      description: "Elapsed time string displayed on the right side of the trigger.",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "Collapsed thinking panel with plain text reasoning content.",
      },
    },
  },
  render: () => (
    <AIStreamOfThought label="Thinking...">
      <p style={{ fontSize: 14, margin: 0, padding: "4px 0" }}>
        The user is asking about transformer architectures. I should explain the
        self-attention mechanism and how it differs from recurrent approaches.
      </p>
    </AIStreamOfThought>
  ),
}

export const Open: Story = {
  parameters: {
    docs: {
      description: {
        story: "Panel opened by default via the defaultOpen prop.",
      },
    },
  },
  render: () => (
    <AIStreamOfThought label="Thought process" defaultOpen>
      <p style={{ fontSize: 14, margin: 0, padding: "4px 0" }}>
        Let me break this down step by step. The user wants to understand how
        neural networks learn. I need to cover backpropagation, gradient descent,
        and loss functions. I should keep the explanation accessible while still
        being technically accurate.
      </p>
    </AIStreamOfThought>
  ),
}

export const Streaming: Story = {
  parameters: {
    docs: {
      description: {
        story: "Active streaming state with animated dot indicators on the trigger.",
      },
    },
  },
  render: () => (
    <AIStreamOfThought label="Thinking..." isStreaming defaultOpen>
      <p style={{ fontSize: 14, margin: 0, padding: "4px 0" }}>
        I need to consider the context of this question. The user seems to be a
        developer looking for practical advice on deploying machine learning
        models. Let me think about the key considerations...
      </p>
    </AIStreamOfThought>
  ),
}

export const WithSteps: Story = {
  parameters: {
    docs: {
      description: {
        story: "Uses AIThoughtStep sub-components with tool icons (search, code, wrench).",
      },
    },
  },
  render: () => (
    <AIStreamOfThought label="Reasoning" defaultOpen>
      <AIThoughtStep tool="search">
        Searching knowledge base for relevant documentation
      </AIThoughtStep>
      <AIThoughtStep tool="code">
        Analyzing the provided code snippet for potential issues
      </AIThoughtStep>
      <AIThoughtStep tool="wrench">
        Applying fix to the configuration file
      </AIThoughtStep>
    </AIStreamOfThought>
  ),
}

export const WithDuration: Story = {
  parameters: {
    docs: {
      description: {
        story: "Displays elapsed duration on the right side of the trigger.",
      },
    },
  },
  render: () => (
    <AIStreamOfThought label="Thought process" duration="12.3s" defaultOpen>
      <p style={{ fontSize: 14, margin: 0, padding: "4px 0" }}>
        This was a complex multi-step reasoning task. I evaluated three possible
        approaches and selected the one with the best trade-off between
        performance and maintainability.
      </p>
    </AIStreamOfThought>
  ),
}
