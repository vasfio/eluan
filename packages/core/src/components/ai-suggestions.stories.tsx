import type { Meta, StoryObj } from "@storybook/react"
import { Sparkles, MessageSquare, Code, Image } from "lucide-react"
import { AISuggestions, AISuggestionItem } from "./ai-suggestions"

const meta: Meta<typeof AISuggestions> = {
  title: "Components/AI Suggestions",
  component: AISuggestions,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A container for clickable suggestion chips that offer quick-start prompts or actions, with support for multiple visual variants, sizes, icons, and grid layout.

**Sub-components:** \`AISuggestionItem\`

**Import**
\`\`\`tsx
import { AISuggestions, AISuggestionItem } from "@vasf/ragnar-core"
\`\`\`

**Usage**
\`\`\`tsx
<AISuggestions>
  <AISuggestionItem>Write a blog post</AISuggestionItem>
  <AISuggestionItem variant="filled">Summarize text</AISuggestionItem>
</AISuggestions>
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
        story: "Default outlined suggestion chips in a flex-wrap layout.",
      },
    },
  },
  render: () => (
    <AISuggestions>
      <AISuggestionItem>Write a blog post</AISuggestionItem>
      <AISuggestionItem>Summarize this document</AISuggestionItem>
      <AISuggestionItem>Translate to Spanish</AISuggestionItem>
      <AISuggestionItem>Generate a report</AISuggestionItem>
      <AISuggestionItem>Explain this concept</AISuggestionItem>
    </AISuggestions>
  ),
}

export const Filled: Story = {
  parameters: {
    docs: {
      description: {
        story: "Filled variant with a subtle background color on each chip.",
      },
    },
  },
  render: () => (
    <AISuggestions>
      <AISuggestionItem variant="filled">Write a blog post</AISuggestionItem>
      <AISuggestionItem variant="filled">Summarize this document</AISuggestionItem>
      <AISuggestionItem variant="filled">Translate to Spanish</AISuggestionItem>
      <AISuggestionItem variant="filled">Generate a report</AISuggestionItem>
    </AISuggestions>
  ),
}

export const Ghost: Story = {
  parameters: {
    docs: {
      description: {
        story: "Ghost variant with no border or background, just text.",
      },
    },
  },
  render: () => (
    <AISuggestions>
      <AISuggestionItem variant="ghost">Write a blog post</AISuggestionItem>
      <AISuggestionItem variant="ghost">Summarize this document</AISuggestionItem>
      <AISuggestionItem variant="ghost">Translate to Spanish</AISuggestionItem>
      <AISuggestionItem variant="ghost">Generate a report</AISuggestionItem>
    </AISuggestions>
  ),
}

export const WithIcons: Story = {
  parameters: {
    docs: {
      description: {
        story: "Suggestion chips with leading icons for visual context.",
      },
    },
  },
  render: () => (
    <AISuggestions>
      <AISuggestionItem icon={<Sparkles className="h-4 w-4" />}>
        Brainstorm ideas
      </AISuggestionItem>
      <AISuggestionItem icon={<MessageSquare className="h-4 w-4" />}>
        Draft a message
      </AISuggestionItem>
      <AISuggestionItem icon={<Code className="h-4 w-4" />}>
        Generate code
      </AISuggestionItem>
      <AISuggestionItem icon={<Image className="h-4 w-4" />}>
        Describe an image
      </AISuggestionItem>
    </AISuggestions>
  ),
}

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: "Comparison of sm, default, and lg size variants.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <p className="mb-2 text-xs font-medium opacity-60">Small</p>
        <AISuggestions>
          <AISuggestionItem size="sm">Write a blog post</AISuggestionItem>
          <AISuggestionItem size="sm">Summarize text</AISuggestionItem>
          <AISuggestionItem size="sm">Translate</AISuggestionItem>
        </AISuggestions>
      </div>
      <div>
        <p className="mb-2 text-xs font-medium opacity-60">Default</p>
        <AISuggestions>
          <AISuggestionItem>Write a blog post</AISuggestionItem>
          <AISuggestionItem>Summarize text</AISuggestionItem>
          <AISuggestionItem>Translate</AISuggestionItem>
        </AISuggestions>
      </div>
      <div>
        <p className="mb-2 text-xs font-medium opacity-60">Large</p>
        <AISuggestions>
          <AISuggestionItem size="lg">Write a blog post</AISuggestionItem>
          <AISuggestionItem size="lg">Summarize text</AISuggestionItem>
          <AISuggestionItem size="lg">Translate</AISuggestionItem>
        </AISuggestions>
      </div>
    </div>
  ),
}

export const AllVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: "Side-by-side comparison of default, filled, and ghost variants.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <p className="mb-2 text-xs font-medium opacity-60">Default</p>
        <AISuggestions>
          <AISuggestionItem>Write a blog post</AISuggestionItem>
          <AISuggestionItem>Summarize text</AISuggestionItem>
          <AISuggestionItem>Translate</AISuggestionItem>
        </AISuggestions>
      </div>
      <div>
        <p className="mb-2 text-xs font-medium opacity-60">Filled</p>
        <AISuggestions>
          <AISuggestionItem variant="filled">Write a blog post</AISuggestionItem>
          <AISuggestionItem variant="filled">Summarize text</AISuggestionItem>
          <AISuggestionItem variant="filled">Translate</AISuggestionItem>
        </AISuggestions>
      </div>
      <div>
        <p className="mb-2 text-xs font-medium opacity-60">Ghost</p>
        <AISuggestions>
          <AISuggestionItem variant="ghost">Write a blog post</AISuggestionItem>
          <AISuggestionItem variant="ghost">Summarize text</AISuggestionItem>
          <AISuggestionItem variant="ghost">Translate</AISuggestionItem>
        </AISuggestions>
      </div>
    </div>
  ),
}
