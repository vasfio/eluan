import type { Meta, StoryObj } from "@storybook/react"
import { AIAttachments, AIAttachmentItem, AIAttachmentAdd } from "./ai-attachments"

const meta: Meta<typeof AIAttachments> = {
  title: "AI/Prompt Actions/AIAttachments",
  component: AIAttachments,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <AIAttachments>
      <AIAttachmentItem filename="screenshot.png" type="image" size="2.4 MB" />
      <AIAttachmentItem filename="quarterly-report.pdf" type="document" size="1.1 MB" />
      <AIAttachmentItem filename="analysis.py" type="code" size="8 KB" />
    </AIAttachments>
  ),
}

export const WithAdd: Story = {
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
  render: () => (
    <AIAttachments>
      <AIAttachmentAdd />
    </AIAttachments>
  ),
}
