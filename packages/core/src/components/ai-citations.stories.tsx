import type { Meta, StoryObj } from "@storybook/react"
import { AICitation, AICitationSource, AICitationList } from "./ai-citations"

const meta: Meta<typeof AICitation> = {
  title: "AI/Governors/AICitations",
  component: AICitation,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const InlineMarker: Story = {
  render: () => (
    <p style={{ fontSize: 14, lineHeight: 1.6 }}>
      Large language models are a type of neural network trained on vast amounts
      of text data <AICitation index={1} />. They use a transformer architecture
      that enables parallel processing of input tokens <AICitation index={2} />.
      Recent advances have significantly improved their reasoning capabilities{" "}
      <AICitation index={3} />.
    </p>
  ),
}

export const SourceCard: Story = {
  render: () => (
    <AICitationSource
      title="Attention Is All You Need"
      url="https://arxiv.org/abs/1706.03762"
      domain="arxiv.org"
      snippet="We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely."
    />
  ),
}

export const SourceList: Story = {
  render: () => (
    <AICitationList heading="Sources">
      <AICitationSource
        title="Transformer (machine learning model)"
        url="https://en.wikipedia.org/wiki/Transformer_(machine_learning_model)"
        domain="en.wikipedia.org"
        snippet="A transformer is a deep learning architecture based on the multi-head attention mechanism."
      />
      <AICitationSource
        title="Attention Is All You Need"
        url="https://arxiv.org/abs/1706.03762"
        domain="arxiv.org"
        snippet="We propose a new simple network architecture, the Transformer, based solely on attention mechanisms."
      />
      <AICitationSource
        title="AI achieves high-school-level math reasoning"
        url="https://www.nature.com/articles/d41586-025-00123-4"
        domain="nature.com"
        snippet="Language models can now solve competition-level mathematics problems with surprising accuracy."
      />
      <AICitationSource
        title="The Rise of Large Language Models"
        url="https://www.nytimes.com/2025/01/15/technology/large-language-models.html"
        domain="nytimes.com"
        snippet="A new generation of AI systems is reshaping how people interact with technology."
      />
    </AICitationList>
  ),
}

export const Complete: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <p style={{ fontSize: 14, lineHeight: 1.6 }}>
        The transformer architecture revolutionized natural language processing
        by introducing self-attention mechanisms <AICitation index={1} />. This
        allowed models to process entire sequences in parallel rather than
        sequentially, resulting in dramatic improvements in both training speed
        and performance <AICitation index={2} />. Today, transformer-based
        models power a wide range of applications from machine translation to
        code generation <AICitation index={3} />.
      </p>
      <AICitationList heading="Sources">
        <AICitationSource
          title="Attention Is All You Need"
          url="https://arxiv.org/abs/1706.03762"
          domain="arxiv.org"
          snippet="We propose a new simple network architecture, the Transformer, based solely on attention mechanisms."
        />
        <AICitationSource
          title="Transformer (machine learning model)"
          url="https://en.wikipedia.org/wiki/Transformer_(machine_learning_model)"
          domain="en.wikipedia.org"
          snippet="A transformer is a deep learning architecture based on the multi-head attention mechanism."
        />
        <AICitationSource
          title="The Rise of Large Language Models"
          url="https://www.nytimes.com/2025/01/15/technology/large-language-models.html"
          domain="nytimes.com"
          snippet="A new generation of AI systems is reshaping how people interact with technology."
        />
      </AICitationList>
    </div>
  ),
}
