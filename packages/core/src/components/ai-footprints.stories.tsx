import type { Meta, StoryObj } from "@storybook/react"
import { AIFootprints, AIFootprintStep } from "./ai-footprints"

const meta: Meta<typeof AIFootprints> = {
  title: "AI/Trust Builders/AIFootprints",
  component: AIFootprints,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
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
  render: () => (
    <AIFootprints>
      <AIFootprintStep label="Received prompt" timestamp="10:32:01 AM" />
      <AIFootprintStep label="Searched 3 sources" timestamp="10:32:02 AM" />
      <AIFootprintStep label="Generated response" timestamp="10:32:04 AM" />
      <AIFootprintStep label="Applied formatting" timestamp="10:32:05 AM" />
    </AIFootprints>
  ),
}
