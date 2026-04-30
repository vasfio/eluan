import type { Meta, StoryObj } from "@storybook/react"
import {
  Quote,
  QuoteText,
  QuoteAuthor,
  QuoteAuthorAvatar,
  QuoteAuthorInfo,
  QuoteAuthorName,
  QuoteAuthorTitle,
} from "./quote"

const meta: Meta<typeof Quote> = {
  title: "Web/Quote",
  component: Quote,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A blockquote component with composable author info, available in default (border-left), centered, card, and minimal variants.

**Import**
\`\`\`tsx
import { Quote, QuoteText, QuoteAuthor, QuoteAuthorAvatar, QuoteAuthorInfo, QuoteAuthorName, QuoteAuthorTitle } from "@vasf/ragnar-web"
\`\`\`

**Usage**
\`\`\`tsx
<Quote variant="card">
  <QuoteText>Great product!</QuoteText>
  <QuoteAuthor>
    <QuoteAuthorInfo>
      <QuoteAuthorName>Jane Doe</QuoteAuthorName>
      <QuoteAuthorTitle>CEO, Acme</QuoteAuthorTitle>
    </QuoteAuthorInfo>
  </QuoteAuthor>
</Quote>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      description: "Visual style: default (border-left), centered, card, or minimal.",
    },
    size: {
      description: "Text size: sm, default, or lg.",
    },
    showIcon: {
      description: "Whether to show a decorative quote icon (only in centered variant).",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: { docs: { description: { story: "Default variant with a left border accent and author avatar." } } },
  render: () => (
    <div className="max-w-2xl mx-auto">
      <Quote>
        <QuoteText>
          The only way to do great work is to love what you do. If you haven't
          found it yet, keep looking. Don't settle.
        </QuoteText>
        <QuoteAuthor>
          <QuoteAuthorAvatar />
          <QuoteAuthorInfo>
            <QuoteAuthorName>Steve Jobs</QuoteAuthorName>
            <QuoteAuthorTitle>Co-founder, Apple Inc.</QuoteAuthorTitle>
          </QuoteAuthorInfo>
        </QuoteAuthor>
      </Quote>
    </div>
  ),
}

export const Centered: Story = {
  parameters: { docs: { description: { story: "Centered text layout with a quote icon above." } } },
  render: () => (
    <div className="max-w-3xl mx-auto">
      <Quote variant="centered" showIcon>
        <QuoteText size="lg">
          Design is not just what it looks like and feels like. Design is how
          it works.
        </QuoteText>
        <QuoteAuthor className="justify-center">
          <QuoteAuthorInfo className="text-center">
            <QuoteAuthorName>Steve Jobs</QuoteAuthorName>
            <QuoteAuthorTitle>Co-founder, Apple Inc.</QuoteAuthorTitle>
          </QuoteAuthorInfo>
        </QuoteAuthor>
      </Quote>
    </div>
  ),
}

export const Card: Story = {
  parameters: { docs: { description: { story: "Card variant with a border, background, and shadow." } } },
  render: () => (
    <div className="max-w-xl mx-auto">
      <Quote variant="card">
        <QuoteText>
          Simplicity is the ultimate sophistication. When you start looking at
          a problem, it seems really simple because you don't understand its
          complexity.
        </QuoteText>
        <QuoteAuthor>
          <QuoteAuthorAvatar />
          <QuoteAuthorInfo>
            <QuoteAuthorName>Leonardo da Vinci</QuoteAuthorName>
            <QuoteAuthorTitle>Artist & Inventor</QuoteAuthorTitle>
          </QuoteAuthorInfo>
        </QuoteAuthor>
      </Quote>
    </div>
  ),
}

export const Minimal: Story = {
  parameters: { docs: { description: { story: "Minimal variant with no decorative elements." } } },
  render: () => (
    <div className="max-w-xl mx-auto">
      <Quote variant="minimal">
        <QuoteText size="sm">
          "Move fast and break things. Unless you are breaking stuff, you are
          not moving fast enough."
        </QuoteText>
        <QuoteAuthor>
          <QuoteAuthorInfo>
            <QuoteAuthorName>Mark Zuckerberg</QuoteAuthorName>
          </QuoteAuthorInfo>
        </QuoteAuthor>
      </Quote>
    </div>
  ),
}
