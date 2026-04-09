import type { Meta, StoryObj } from "@storybook/react"
import { Paperclip, Globe } from "lucide-react"
import { AIPrompt, AIPromptInput, AIPromptActions, AIPromptFooter } from "./ai-prompt"
import { AISuggestions, AISuggestionItem } from "./ai-suggestions"

const meta: Meta<typeof AIPrompt> = {
  title: "AI/Wayfinders/AIPrompt",
  component: AIPrompt,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["default", "compact"],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
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
  render: () => (
    <AIPrompt size="compact">
      <AIPromptInput placeholder="Quick question..." />
      <AIPromptActions onSubmit={() => {}} />
    </AIPrompt>
  ),
}

export const WithSuggestions: Story = {
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
  render: () => (
    <AIPrompt loading>
      <AIPromptInput placeholder="Ask me anything..." value="Write a detailed analysis of Q4 revenue trends" disabled />
      <AIPromptActions onStop={() => {}} />
    </AIPrompt>
  ),
}

export const Disabled: Story = {
  render: () => (
    <AIPrompt disabled>
      <AIPromptInput placeholder="Ask me anything..." />
      <AIPromptActions onSubmit={() => {}} />
    </AIPrompt>
  ),
}

export const WithFooter: Story = {
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
