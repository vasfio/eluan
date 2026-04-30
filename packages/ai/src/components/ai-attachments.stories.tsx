import type { Meta, StoryObj } from "@storybook/react"
import { AIAttachments, AIAttachmentItem, AIAttachmentAdd } from "./ai-attachments"

const meta: Meta<typeof AIAttachments> = {
  title: "Componentes/AI Attachments",
  component: AIAttachments,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A flex-wrap container for displaying file attachments in an AI prompt, composed of AIAttachments, AIAttachmentItem, and AIAttachmentAdd sub-components supporting image, document, code, audio, video, and generic file types.

**Import**
\`\`\`tsx
import { AIAttachments, AIAttachmentItem, AIAttachmentAdd } from "@vasf/ragnar-ai"
\`\`\`

**Usage**
\`\`\`tsx
<AIAttachments>
  <AIAttachmentItem filename="report.pdf" type="document" size="1.1 MB" onRemove={() => {}} />
  <AIAttachmentAdd />
</AIAttachments>
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
        story: "A basic set of attachment items showing image, document, and code file types.",
      },
    },
  },
  render: () => (
    <AIAttachments>
      <AIAttachmentItem filename="screenshot.png" type="image" size="2.4 MB" />
      <AIAttachmentItem filename="quarterly-report.pdf" type="document" size="1.1 MB" />
      <AIAttachmentItem filename="analysis.py" type="code" size="8 KB" />
    </AIAttachments>
  ),
}

export const WithAdd: Story = {
  parameters: {
    docs: {
      description: {
        story: "Attachment items with remove buttons and an AIAttachmentAdd button to add more files.",
      },
    },
  },
  render: () => (
    <AIAttachments>
      <AIAttachmentItem filename="screenshot.png" type="image" size="2.4 MB" onRemove={() => {}} />
      <AIAttachmentItem filename="quarterly-report.pdf" type="document" size="1.1 MB" onRemove={() => {}} />
      <AIAttachmentItem filename="analysis.py" type="code" size="8 KB" onRemove={() => {}} />
      <AIAttachmentAdd />
    </AIAttachments>
  ),
}

export const MixedTypes: Story = {
  parameters: {
    docs: {
      description: {
        story: "Shows all six supported file types: image, document, code, audio, video, and generic.",
      },
    },
  },
  render: () => (
    <AIAttachments>
      <AIAttachmentItem filename="photo.jpg" type="image" size="3.2 MB" />
      <AIAttachmentItem filename="report.pdf" type="document" size="540 KB" />
      <AIAttachmentItem filename="main.tsx" type="code" size="12 KB" />
      <AIAttachmentItem filename="podcast.mp3" type="audio" size="24 MB" />
      <AIAttachmentItem filename="demo.mp4" type="video" size="48 MB" />
      <AIAttachmentItem filename="archive.zip" type="generic" size="100 MB" />
    </AIAttachments>
  ),
}

export const Empty: Story = {
  parameters: {
    docs: {
      description: {
        story: "Empty state with only the add-file button.",
      },
    },
  },
  render: () => (
    <AIAttachments>
      <AIAttachmentAdd />
    </AIAttachments>
  ),
}
