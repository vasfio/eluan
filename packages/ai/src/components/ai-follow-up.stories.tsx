import type { Meta, StoryObj } from "@storybook/react"
import { AIFollowUp, AIFollowUpItem } from "./ai-follow-up"

const meta: Meta<typeof AIFollowUp> = {
  title: "Components/AI Follow Up",
  component: AIFollowUp,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A container for suggested follow-up questions or actions after an AI response, available in list, cards, and chips layout variants.

**Import**
\`\`\`tsx
import { AIFollowUp, AIFollowUpItem } from "@vasf/ragnar-ai"
\`\`\`

**Usage**
\`\`\`tsx
<AIFollowUp variant="list" heading="Suggested follow-ups">
  <AIFollowUpItem variant="list">Tell me more</AIFollowUpItem>
</AIFollowUp>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      description: 'Layout style: `"list"`, `"cards"`, or `"chips"`.',
    },
    heading: {
      description: "Optional heading text displayed above the follow-up items.",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "List-style follow-up suggestions with arrow icons.",
      },
    },
  },
  render: () => (
    <AIFollowUp variant="list">
      <AIFollowUpItem variant="list">
        How does this compare to competitors?
      </AIFollowUpItem>
      <AIFollowUpItem variant="list">
        Can you explain the methodology?
      </AIFollowUpItem>
      <AIFollowUpItem variant="list">
        What are the limitations of this approach?
      </AIFollowUpItem>
    </AIFollowUp>
  ),
}

export const Cards: Story = {
  parameters: {
    docs: {
      description: {
        story: "Card-style layout with bordered items stacked vertically.",
      },
    },
  },
  render: () => (
    <AIFollowUp variant="cards">
      <AIFollowUpItem variant="cards">
        What are the potential risks involved?
      </AIFollowUpItem>
      <AIFollowUpItem variant="cards">
        Can you provide more recent data?
      </AIFollowUpItem>
      <AIFollowUpItem variant="cards">
        How would this work at scale?
      </AIFollowUpItem>
    </AIFollowUp>
  ),
}

export const Chips: Story = {
  parameters: {
    docs: {
      description: {
        story: "Chip-style layout with compact, inline follow-up options.",
      },
    },
  },
  render: () => (
    <AIFollowUp variant="chips">
      <AIFollowUpItem variant="chips">Tell me more</AIFollowUpItem>
      <AIFollowUpItem variant="chips">Simplify this</AIFollowUpItem>
      <AIFollowUpItem variant="chips">Give examples</AIFollowUpItem>
      <AIFollowUpItem variant="chips">Compare alternatives</AIFollowUpItem>
    </AIFollowUp>
  ),
}

export const WithHeading: Story = {
  parameters: {
    docs: {
      description: {
        story: "List variant with an optional heading above the items.",
      },
    },
  },
  render: () => (
    <AIFollowUp variant="list" heading="Suggested follow-ups">
      <AIFollowUpItem variant="list">
        How does this compare to competitors?
      </AIFollowUpItem>
      <AIFollowUpItem variant="list">
        Can you explain the methodology?
      </AIFollowUpItem>
      <AIFollowUpItem variant="list">
        What are the limitations of this approach?
      </AIFollowUpItem>
    </AIFollowUp>
  ),
}

export const AllVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: "Shows all three layout variants (list, cards, chips) with headings.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <AIFollowUp variant="list" heading="List">
        <AIFollowUpItem variant="list">
          How does this compare to competitors?
        </AIFollowUpItem>
        <AIFollowUpItem variant="list">
          Can you explain the methodology?
        </AIFollowUpItem>
        <AIFollowUpItem variant="list">
          What are the limitations of this approach?
        </AIFollowUpItem>
      </AIFollowUp>

      <AIFollowUp variant="cards" heading="Cards">
        <AIFollowUpItem variant="cards">
          What are the potential risks involved?
        </AIFollowUpItem>
        <AIFollowUpItem variant="cards">
          Can you provide more recent data?
        </AIFollowUpItem>
        <AIFollowUpItem variant="cards">
          How would this work at scale?
        </AIFollowUpItem>
      </AIFollowUp>

      <AIFollowUp variant="chips" heading="Chips">
        <AIFollowUpItem variant="chips">Tell me more</AIFollowUpItem>
        <AIFollowUpItem variant="chips">Simplify this</AIFollowUpItem>
        <AIFollowUpItem variant="chips">Give examples</AIFollowUpItem>
        <AIFollowUpItem variant="chips">Compare alternatives</AIFollowUpItem>
      </AIFollowUp>
    </div>
  ),
}
