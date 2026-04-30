import type { Meta, StoryObj } from "@storybook/react"
import { AICitation, AICitationSource, AICitationList } from "./ai-citations"

const meta: Meta<typeof AICitation> = {
  title: "Components/AI Citations",
  component: AICitation,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
Inline citation markers and source cards for attributing AI-generated content to its references, composed of AICitation, AICitationSource, and AICitationList sub-components.

**Import**
\`\`\`tsx
import { AICitation, AICitationSource, AICitationList } from "@vasf/ragnar-ai"
\`\`\`

**Usage**
\`\`\`tsx
<p>
  Transformers revolutionized NLP <AICitation index={1} />.
</p>
<AICitationList heading="Sources">
  <AICitationSource title="Attention Is All You Need" domain="arxiv.org" />
</AICitationList>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    index: {
      description: "The citation number displayed in the inline badge.",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const InlineMarker: Story = {
  parameters: {
    docs: {
      description: {
        story: "Shows inline superscript citation markers within a paragraph of text.",
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: "A single AICitationSource card displaying title, domain, and snippet.",
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: "Multiple source cards grouped under an AICitationList with a heading.",
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: "Full example combining inline citation markers within text and a source list below.",
      },
    },
  },
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
