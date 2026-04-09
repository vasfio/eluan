import type { Meta, StoryObj } from "@storybook/react"
import { AIStreamOfThought, AIThoughtStep } from "./ai-stream-of-thought"

const meta: Meta<typeof AIStreamOfThought> = {
  title: "AI/Governors/AIStreamOfThought",
  component: AIStreamOfThought,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
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
