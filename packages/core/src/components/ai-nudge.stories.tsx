import type { Meta, StoryObj } from "@storybook/react"
import { AINudge } from "./ai-nudge"

const meta: Meta<typeof AINudge> = {
  title: "AI/Wayfinders/AINudge",
  component: AINudge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["inline", "floating", "subtle"],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <AINudge>
      AI can help you write this section. Try asking for a draft.
    </AINudge>
  ),
}

export const Floating: Story = {
  render: () => (
    <div className="relative h-32">
      <AINudge variant="floating" style={{ bottom: 16, right: 16 }}>
        AI suggestions available for this field.
      </AINudge>
    </div>
  ),
}

export const Subtle: Story = {
  render: () => (
    <AINudge variant="subtle">
      Tip: AI can summarize this content for you.
    </AINudge>
  ),
}

export const WithAction: Story = {
  render: () => (
    <AINudge
      action={
        <button
          type="button"
          className="rounded-md border border-current px-2 py-0.5 text-xs font-medium transition-colors hover:bg-black/5"
        >
          Try it
        </button>
      }
    >
      Let AI generate a first draft for you.
    </AINudge>
  ),
}

export const Dismissible: Story = {
  render: () => (
    <AINudge dismissible onDismiss={() => {}}>
      AI can auto-complete this form based on your previous entries.
    </AINudge>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <p className="mb-2 text-xs font-medium opacity-60">Inline</p>
        <AINudge>
          AI can help you write this section. Try asking for a draft.
        </AINudge>
      </div>
      <div>
        <p className="mb-2 text-xs font-medium opacity-60">Floating</p>
        <div className="relative h-20">
          <AINudge variant="floating" style={{ bottom: 8, left: 0 }}>
            AI suggestions available for this field.
          </AINudge>
        </div>
      </div>
      <div>
        <p className="mb-2 text-xs font-medium opacity-60">Subtle</p>
        <AINudge variant="subtle">
          Tip: AI can summarize this content for you.
        </AINudge>
      </div>
    </div>
  ),
}
