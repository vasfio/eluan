import type { Meta, StoryObj } from "@storybook/react"
import { Paperclip, Globe } from "lucide-react"
import { AIPrompt, AIPromptInput, AIPromptActions, AIPromptFooter } from "./ai-prompt"
import { AISuggestions, AISuggestionItem } from "./ai-suggestions"

const meta: Meta<typeof AIPrompt> = {
  title: "Components/AI Prompt",
  component: AIPrompt,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A composable prompt input for AI interactions, featuring an auto-expanding textarea, an action bar with submit/stop controls, and an optional footer for caveats or model info.

**Sub-components:** \`AIPromptInput\`, \`AIPromptActions\`, \`AIPromptFooter\`

**Import**
\`\`\`tsx
import { AIPrompt, AIPromptInput, AIPromptActions, AIPromptFooter } from "@vasf/ragnar-core"
\`\`\`

**Usage**
\`\`\`tsx
<AIPrompt>
  <AIPromptInput placeholder="Ask me anything..." />
  <AIPromptActions onSubmit={() => {}} />
</AIPrompt>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["default", "compact"],
      description: "Controls the padding density of the prompt container.",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "Standard prompt with input, submit button, and additional action icons (attach, web).",
      },
    },
  },
  render: () => (
    <AIPrompt>
      <AIPromptInput placeholder="Ask me anything..." />
      <AIPromptActions onSubmit={() => {}}>
        <button type="button" className="inline-flex items-center justify-center rounded-md p-1.5 opacity-60 hover:opacity-100">
          <Paperclip className="h-4 w-4" />
        </button>
        <button type="button" className="inline-flex items-center justify-center rounded-md p-1.5 opacity-60 hover:opacity-100">
          <Globe className="h-4 w-4" />
        </button>
      </AIPromptActions>
    </AIPrompt>
  ),
}

export const Compact: Story = {
  parameters: {
    docs: {
      description: {
        story: "Compact size variant with reduced padding for space-constrained layouts.",
      },
    },
  },
  render: () => (
    <AIPrompt size="compact">
      <AIPromptInput placeholder="Quick question..." />
      <AIPromptActions onSubmit={() => {}} />
    </AIPrompt>
  ),
}

export const WithSuggestions: Story = {
  parameters: {
    docs: {
      description: {
        story: "Prompt paired with AISuggestions chips above the input for quick-start prompts.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-3">
      <AISuggestions>
        <AISuggestionItem>Write a blog post</AISuggestionItem>
        <AISuggestionItem>Summarize this document</AISuggestionItem>
        <AISuggestionItem>Generate code</AISuggestionItem>
      </AISuggestions>
      <AIPrompt>
        <AIPromptInput placeholder="Ask me anything..." />
        <AIPromptActions onSubmit={() => {}} />
      </AIPrompt>
    </div>
  ),
}

export const Loading: Story = {
  parameters: {
    docs: {
      description: {
        story: "Loading state that shows a stop button instead of submit, with the input disabled.",
      },
    },
  },
  render: () => (
    <AIPrompt loading>
      <AIPromptInput placeholder="Ask me anything..." value="Write a detailed analysis of Q4 revenue trends" disabled />
      <AIPromptActions onStop={() => {}} />
    </AIPrompt>
  ),
}

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: "Fully disabled prompt where all interactive elements are non-interactive.",
      },
    },
  },
  render: () => (
    <AIPrompt disabled>
      <AIPromptInput placeholder="Ask me anything..." />
      <AIPromptActions onSubmit={() => {}} />
    </AIPrompt>
  ),
}

export const WithFooter: Story = {
  parameters: {
    docs: {
      description: {
        story: "Prompt with an AIPromptFooter showing a caveat message below the action bar.",
      },
    },
  },
  render: () => (
    <AIPrompt>
      <AIPromptInput placeholder="Ask me anything..." />
      <AIPromptActions onSubmit={() => {}}>
        <button type="button" className="inline-flex items-center justify-center rounded-md p-1.5 opacity-60 hover:opacity-100">
          <Paperclip className="h-4 w-4" />
        </button>
      </AIPromptActions>
      <AIPromptFooter>
        AI may produce inaccurate information. Verify important details.
      </AIPromptFooter>
    </AIPrompt>
  ),
}
