import type { Meta, StoryObj } from "@storybook/react"
import { AIVariations, AIVariationItem } from "./ai-variations"

const meta: Meta<typeof AIVariations> = {
  title: "Components/AI Variations",
  component: AIVariations,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A grid layout for presenting multiple AI-generated alternatives that users can select between, with optional regeneration controls.

**Sub-components:** \`AIVariationItem\`

**Import**
\`\`\`tsx
import { AIVariations, AIVariationItem } from "@vasf/ragnar-ai"
\`\`\`

**Usage**
\`\`\`tsx
<AIVariations columns={2}>
  <AIVariationItem selected onSelect={() => {}}>Option A content</AIVariationItem>
  <AIVariationItem onSelect={() => {}}>Option B content</AIVariationItem>
</AIVariations>
\`\`\`
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const Placeholder = ({
  color,
  label,
}: {
  color: string
  label?: string
}) => (
  <div
    style={{
      backgroundColor: color,
      borderRadius: 4,
      height: 96,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 13,
      color: "#555",
    }}
  >
    {label ?? "Variation content"}
  </div>
)

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "Basic 2-column grid of variation items with select buttons.",
      },
    },
  },
  render: () => (
    <AIVariations columns={2}>
      <AIVariationItem>
        <Placeholder color="#e0f2fe" />
      </AIVariationItem>
      <AIVariationItem>
        <Placeholder color="#fce7f3" />
      </AIVariationItem>
      <AIVariationItem>
        <Placeholder color="#dcfce7" />
      </AIVariationItem>
      <AIVariationItem>
        <Placeholder color="#fef9c3" />
      </AIVariationItem>
    </AIVariations>
  ),
}

export const ThreeColumns: Story = {
  parameters: {
    docs: {
      description: {
        story: "Variations displayed in a 3-column layout.",
      },
    },
  },
  render: () => (
    <AIVariations columns={3}>
      <AIVariationItem>
        <Placeholder color="#e0f2fe" label="Variation 1" />
      </AIVariationItem>
      <AIVariationItem>
        <Placeholder color="#fce7f3" label="Variation 2" />
      </AIVariationItem>
      <AIVariationItem>
        <Placeholder color="#dcfce7" label="Variation 3" />
      </AIVariationItem>
    </AIVariations>
  ),
}

export const WithSelection: Story = {
  parameters: {
    docs: {
      description: {
        story: "Demonstrates the selected state with a ring highlight on the chosen item.",
      },
    },
  },
  render: () => (
    <AIVariations columns={2}>
      <AIVariationItem selected>
        <Placeholder color="#e0f2fe" label="Selected" />
      </AIVariationItem>
      <AIVariationItem>
        <Placeholder color="#fce7f3" label="Not selected" />
      </AIVariationItem>
      <AIVariationItem>
        <Placeholder color="#dcfce7" label="Not selected" />
      </AIVariationItem>
      <AIVariationItem>
        <Placeholder color="#fef9c3" label="Not selected" />
      </AIVariationItem>
    </AIVariations>
  ),
}

export const WithLabels: Story = {
  parameters: {
    docs: {
      description: {
        story: "Items with labels and regenerate buttons for individual re-generation of each variation.",
      },
    },
  },
  render: () => (
    <AIVariations columns={2}>
      <AIVariationItem label="Option A" onRegenerate={() => {}}>
        <Placeholder color="#e0f2fe" label="Option A" />
      </AIVariationItem>
      <AIVariationItem label="Option B" onRegenerate={() => {}}>
        <Placeholder color="#fce7f3" label="Option B" />
      </AIVariationItem>
      <AIVariationItem label="Option C" onRegenerate={() => {}}>
        <Placeholder color="#dcfce7" label="Option C" />
      </AIVariationItem>
      <AIVariationItem label="Option D" onRegenerate={() => {}}>
        <Placeholder color="#fef9c3" label="Option D" />
      </AIVariationItem>
    </AIVariations>
  ),
}
