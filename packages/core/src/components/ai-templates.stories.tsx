import type { Meta, StoryObj } from "@storybook/react"
import { FileText, Code, Mail, Presentation } from "lucide-react"
import { AITemplates, AITemplateCard } from "./ai-templates"

const meta: Meta<typeof AITemplates> = {
  title: "Components/AI Templates",
  component: AITemplates,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A grid of clickable template cards that let users jump-start AI workflows with pre-defined prompts, supporting icons, descriptions, and tags.

**Sub-components:** \`AITemplateCard\`

**Import**
\`\`\`tsx
import { AITemplates, AITemplateCard } from "@vasf/ragnar-core"
\`\`\`

**Usage**
\`\`\`tsx
<AITemplates columns={3}>
  <AITemplateCard
    icon={<FileText className="h-5 w-5" />}
    title="Write a Blog Post"
    description="Generate a well-structured article on any topic."
    tags={["Content", "Writing"]}
  />
</AITemplates>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    columns: {
      control: "select",
      options: [2, 3, 4],
      description: "Number of grid columns (2, 3, or 4).",
    },
    gap: {
      control: "select",
      options: ["sm", "default", "lg"],
      description: "Spacing between template cards.",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "Standard 3-column template grid with icons, descriptions, and tags.",
      },
    },
  },
  render: () => (
    <AITemplates>
      <AITemplateCard
        icon={<FileText className="h-5 w-5" />}
        title="Write a Blog Post"
        description="Generate a well-structured article on any topic with an introduction, key points, and conclusion."
        tags={["Content", "Writing"]}
      />
      <AITemplateCard
        icon={<Code className="h-5 w-5" />}
        title="Generate Code"
        description="Scaffold functions, components, or entire modules in your preferred programming language."
        tags={["Development", "Code"]}
      />
      <AITemplateCard
        icon={<Mail className="h-5 w-5" />}
        title="Draft an Email"
        description="Compose professional emails for outreach, follow-ups, or internal communications."
        tags={["Email", "Communication"]}
      />
      <AITemplateCard
        icon={<Presentation className="h-5 w-5" />}
        title="Create a Pitch Deck"
        description="Build a compelling presentation outline with key slides and talking points."
        tags={["Presentation", "Strategy"]}
      />
    </AITemplates>
  ),
}

export const Compact: Story = {
  parameters: {
    docs: {
      description: {
        story: "Compact variant with reduced padding and hidden descriptions, showing only title and tags.",
      },
    },
  },
  render: () => (
    <AITemplates>
      <AITemplateCard
        variant="compact"
        icon={<FileText className="h-5 w-5" />}
        title="Write a Blog Post"
        description="This description is hidden in compact mode."
        tags={["Content"]}
      />
      <AITemplateCard
        variant="compact"
        icon={<Code className="h-5 w-5" />}
        title="Generate Code"
        description="This description is hidden in compact mode."
        tags={["Development"]}
      />
      <AITemplateCard
        variant="compact"
        icon={<Mail className="h-5 w-5" />}
        title="Draft an Email"
        description="This description is hidden in compact mode."
        tags={["Email"]}
      />
      <AITemplateCard
        variant="compact"
        icon={<Presentation className="h-5 w-5" />}
        title="Create a Pitch Deck"
        description="This description is hidden in compact mode."
        tags={["Presentation"]}
      />
    </AITemplates>
  ),
}

export const WithIcons: Story = {
  parameters: {
    docs: {
      description: {
        story: "2-column layout with icons, full descriptions, and tags on each card.",
      },
    },
  },
  render: () => (
    <AITemplates columns={2}>
      <AITemplateCard
        icon={<FileText className="h-5 w-5" />}
        title="Summarize a Document"
        description="Extract key points and generate a concise summary from any long-form text."
        tags={["Analysis", "Text"]}
      />
      <AITemplateCard
        icon={<Code className="h-5 w-5" />}
        title="Refactor Code"
        description="Improve code quality, readability, and performance with AI-driven suggestions."
        tags={["Development", "Refactoring"]}
      />
      <AITemplateCard
        icon={<Mail className="h-5 w-5" />}
        title="Newsletter Template"
        description="Create engaging newsletter content with personalized sections and CTAs."
        tags={["Marketing", "Email"]}
      />
      <AITemplateCard
        icon={<Presentation className="h-5 w-5" />}
        title="Quarterly Review Slides"
        description="Auto-generate a quarterly business review deck from your data and highlights."
        tags={["Business", "Presentation"]}
      />
    </AITemplates>
  ),
}
