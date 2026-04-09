import type { Meta, StoryObj } from "@storybook/react"
import { AIVariations, AIVariationItem } from "./ai-variations"

const meta: Meta<typeof AIVariations> = {
  title: "AI/Governors/AIVariations",
  component: AIVariations,
  tags: ["autodocs"],
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
