import type { Meta, StoryObj } from "@storybook/react"
import { AIFollowUp, AIFollowUpItem } from "./ai-follow-up"

const meta: Meta<typeof AIFollowUp> = {
  title: "AI/Prompt Actions/AIFollowUp",
  component: AIFollowUp,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
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
