import type { Meta, StoryObj } from "@storybook/react"
import { AINudge } from "./ai-nudge"

const meta: Meta<typeof AINudge> = {
  title: "Components/AI Nudge",
  component: AINudge,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A contextual hint component for AI feature discovery, available as an inline banner, floating tooltip, or subtle text with an icon.

**Import**
\`\`\`tsx
import { AINudge } from "@vasf/ragnar-ai"
\`\`\`

**Usage**
\`\`\`tsx
<AINudge variant="inline" dismissible onDismiss={() => {}}>
  AI can help you write this section. Try asking for a draft.
</AINudge>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["inline", "floating", "subtle"],
      description: "Visual style of the nudge: inline banner, floating tooltip, or subtle text.",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "Default inline nudge with a Sparkles icon and text content.",
      },
    },
  },
  render: () => (
    <AINudge>
      AI can help you write this section. Try asking for a draft.
    </AINudge>
  ),
}

export const Floating: Story = {
  parameters: {
    docs: {
      description: {
        story: "Floating variant positioned absolutely within a relative container, with shadow.",
      },
    },
  },
  render: () => (
    <div className="relative h-32">
      <AINudge variant="floating" style={{ bottom: 16, right: 16 }}>
        AI suggestions available for this field.
      </AINudge>
    </div>
  ),
}

export const Subtle: Story = {
  parameters: {
    docs: {
      description: {
        story: "Subtle variant with muted text and no border or background.",
      },
    },
  },
  render: () => (
    <AINudge variant="subtle">
      Tip: AI can summarize this content for you.
    </AINudge>
  ),
}

export const WithAction: Story = {
  parameters: {
    docs: {
      description: {
        story: "Nudge with a custom action element (button) on the right side.",
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: "Nudge with a dismiss (X) button that calls onDismiss when clicked.",
      },
    },
  },
  render: () => (
    <AINudge dismissible onDismiss={() => {}}>
      AI can auto-complete this form based on your previous entries.
    </AINudge>
  ),
}

export const AllVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: "Side-by-side comparison of inline, floating, and subtle variants.",
      },
    },
  },
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
