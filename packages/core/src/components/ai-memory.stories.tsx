import type { Meta, StoryObj } from "@storybook/react"
import { AIMemory, AIMemoryItem } from "./ai-memory"

const meta: Meta<typeof AIMemory> = {
  title: "AI/Governors/AIMemory",
  component: AIMemory,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <AIMemory>
      <AIMemoryItem onEdit={() => {}} onDelete={() => {}}>
        Prefers TypeScript over JavaScript
      </AIMemoryItem>
      <AIMemoryItem onEdit={() => {}} onDelete={() => {}}>
        Works at a design agency
      </AIMemoryItem>
      <AIMemoryItem onEdit={() => {}} onDelete={() => {}}>
        Uses React and Next.js
      </AIMemoryItem>
    </AIMemory>
  ),
}

export const WithTimestamps: Story = {
  render: () => (
    <AIMemory>
      <AIMemoryItem
        timestamp="Saved 2 days ago"
        onEdit={() => {}}
        onDelete={() => {}}
      >
        Prefers TypeScript over JavaScript
      </AIMemoryItem>
      <AIMemoryItem
        timestamp="Saved 1 week ago"
        onEdit={() => {}}
        onDelete={() => {}}
      >
        Works at a design agency
      </AIMemoryItem>
      <AIMemoryItem
        timestamp="Saved 3 weeks ago"
        onEdit={() => {}}
        onDelete={() => {}}
      >
        Uses React and Next.js
      </AIMemoryItem>
    </AIMemory>
  ),
}

export const Empty: Story = {
  render: () => <AIMemory />,
}

export const Single: Story = {
  render: () => (
    <AIMemory>
      <AIMemoryItem onEdit={() => {}} onDelete={() => {}}>
        Always respond in a concise, technical tone
      </AIMemoryItem>
    </AIMemory>
  ),
}
