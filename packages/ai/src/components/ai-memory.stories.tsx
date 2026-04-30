import type { Meta, StoryObj } from "@storybook/react"
import { AIMemory, AIMemoryItem } from "./ai-memory"

const meta: Meta<typeof AIMemory> = {
  title: "Components/AI Memory",
  component: AIMemory,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A list of saved AI memory entries that the model remembers about the user, with optional edit and delete actions per item.

**Import**
\`\`\`tsx
import { AIMemory, AIMemoryItem } from "@vasf/ragnar-ai"
\`\`\`

**Usage**
\`\`\`tsx
<AIMemory>
  <AIMemoryItem onEdit={() => {}} onDelete={() => {}}>
    Prefers TypeScript over JavaScript
  </AIMemoryItem>
</AIMemory>
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
        story: "Multiple memory entries with edit and delete actions shown on hover.",
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: "Memory items displaying when each entry was saved via the timestamp prop.",
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: "Empty state with no memory items.",
      },
    },
  },
  render: () => <AIMemory />,
}

export const Single: Story = {
  parameters: {
    docs: {
      description: {
        story: "A single memory item.",
      },
    },
  },
  render: () => (
    <AIMemory>
      <AIMemoryItem onEdit={() => {}} onDelete={() => {}}>
        Always respond in a concise, technical tone
      </AIMemoryItem>
    </AIMemory>
  ),
}
