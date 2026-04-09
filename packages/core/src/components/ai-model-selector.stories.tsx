import type { Meta, StoryObj } from "@storybook/react"

import { AIModelSelector } from "./ai-model-selector"

const meta: Meta<typeof AIModelSelector> = {
  title: "AI/Tuners/AIModelSelector",
  component: AIModelSelector,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

const baseModels = [
  { value: "gpt-4o", name: "GPT-4o" },
  { value: "claude-3.5", name: "Claude 3.5 Sonnet" },
  { value: "gemini-pro", name: "Gemini Pro" },
  { value: "llama-3", name: "Llama 3" },
]

export const Default: Story = {
  args: {
    models: baseModels,
    value: "gpt-4o",
  },
}

export const WithBadges: Story = {
  args: {
    models: [
      { value: "gpt-4o", name: "GPT-4o", badge: "Pro" },
      { value: "claude-3.5", name: "Claude 3.5 Sonnet", badge: "New" },
      { value: "gemini-pro", name: "Gemini Pro", badge: "Free" },
      { value: "llama-3", name: "Llama 3", badge: "Open" },
    ],
    value: "claude-3.5",
  },
}

export const WithDescriptions: Story = {
  args: {
    models: [
      {
        value: "gpt-4o",
        name: "GPT-4o",
        description: "Best for complex reasoning and multi-step tasks",
      },
      {
        value: "claude-3.5",
        name: "Claude 3.5 Sonnet",
        description: "Fast, accurate, and great for coding",
      },
      {
        value: "gemini-pro",
        name: "Gemini Pro",
        description: "Strong multimodal understanding",
      },
      {
        value: "llama-3",
        name: "Llama 3",
        description: "Open-source, self-hostable model",
      },
    ],
    value: "gpt-4o",
  },
}

export const Small: Story = {
  args: {
    models: baseModels,
    value: "gemini-pro",
    size: "sm",
  },
}

export const Disabled: Story = {
  args: {
    models: [
      { value: "gpt-4o", name: "GPT-4o" },
      { value: "claude-3.5", name: "Claude 3.5 Sonnet" },
      { value: "gemini-pro", name: "Gemini Pro", disabled: true },
      { value: "llama-3", name: "Llama 3" },
    ],
    value: "gpt-4o",
  },
}
