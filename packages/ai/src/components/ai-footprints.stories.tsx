import type { Meta, StoryObj } from "@storybook/react"
import { AIFootprints, AIFootprintStep } from "./ai-footprints"

const meta: Meta<typeof AIFootprints> = {
  title: "Components/AI Footprints",
  component: AIFootprints,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A timeline-based audit trail that logs each step an AI took to produce its output, with optional metadata and expandable details.

**Sub-components:** \`AIFootprintStep\`

**Import**
\`\`\`tsx
import { AIFootprints, AIFootprintStep } from "@vasf/ragnar-ai"
\`\`\`

**Usage**
\`\`\`tsx
<AIFootprints>
  <AIFootprintStep label="Received prompt" timestamp="10:32:01 AM" />
  <AIFootprintStep label="Generated response" metadata={{ model: "GPT-4o", tokens: "1,234" }} />
</AIFootprints>
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
        story: "Basic footprints trail with step labels only.",
      },
    },
  },
  render: () => (
    <AIFootprints>
      <AIFootprintStep label="Received prompt" />
      <AIFootprintStep label="Searched 3 sources" />
      <AIFootprintStep label="Generated response" />
      <AIFootprintStep label="Applied formatting" />
    </AIFootprints>
  ),
}

export const WithMetadata: Story = {
  parameters: {
    docs: {
      description: {
        story: "Each step displays key-value metadata pairs such as model name, token count, and latency.",
      },
    },
  },
  render: () => (
    <AIFootprints>
      <AIFootprintStep
        label="Received prompt"
        metadata={{ model: "GPT-4o", tokens: "128" }}
      />
      <AIFootprintStep
        label="Searched 3 sources"
        metadata={{ sources: "Web, Docs, KB", latency: "320ms" }}
      />
      <AIFootprintStep
        label="Generated response"
        metadata={{ model: "GPT-4o", tokens: "1,234" }}
      />
      <AIFootprintStep
        label="Applied formatting"
        metadata={{ format: "Markdown" }}
      />
    </AIFootprints>
  ),
}

export const Compact: Story = {
  parameters: {
    docs: {
      description: {
        story: "Compact variant that reduces spacing and hides metadata for a denser display.",
      },
    },
  },
  render: () => (
    <AIFootprints compact>
      <AIFootprintStep label="Received prompt" />
      <AIFootprintStep label="Searched 3 sources" />
      <AIFootprintStep label="Generated response" />
      <AIFootprintStep label="Applied formatting" />
    </AIFootprints>
  ),
}

export const WithTimestamps: Story = {
  parameters: {
    docs: {
      description: {
        story: "Steps annotated with timestamp strings to show when each action occurred.",
      },
    },
  },
  render: () => (
    <AIFootprints>
      <AIFootprintStep label="Received prompt" timestamp="10:32:01 AM" />
      <AIFootprintStep label="Searched 3 sources" timestamp="10:32:02 AM" />
      <AIFootprintStep label="Generated response" timestamp="10:32:04 AM" />
      <AIFootprintStep label="Applied formatting" timestamp="10:32:05 AM" />
    </AIFootprints>
  ),
}
