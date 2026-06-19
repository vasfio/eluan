import type { Meta, StoryObj } from "@storybook/react"
import { AIGallery, AIGalleryItem } from "./ai-gallery"

const meta: Meta<typeof AIGallery> = {
  title: "Components/AI Gallery",
  component: AIGallery,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A responsive grid for showcasing AI-generated content cards with optional images, descriptions, metadata, and action buttons.

**Sub-components:** \`AIGalleryItem\`

**Import**
\`\`\`tsx
import { AIGallery, AIGalleryItem } from "@vasf/ragnar-core"
\`\`\`

**Usage**
\`\`\`tsx
<AIGallery columns={3} gap="default">
  <AIGalleryItem title="Blog Post" description="AI-generated article" metadata="Text" onAction={() => {}} />
  <AIGalleryItem title="Product Image" description="Realistic product shot" metadata="Image" />
</AIGallery>
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
      description: "Spacing between gallery items.",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const placeholderColors = [
  "#6366f1",
  "#8b5cf6",
  "#a855f7",
  "#ec4899",
  "#f43f5e",
  "#f97316",
]

const Placeholder = ({ color, label }: { color: string; label: string }) => (
  <div
    className="flex aspect-video w-full items-center justify-center text-xs font-medium text-white"
    style={{ backgroundColor: color }}
  >
    {label}
  </div>
)

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "Default 3-column gallery with title, description, and metadata on each item.",
      },
    },
  },
  render: () => (
    <AIGallery>
      <AIGalleryItem
        title="Blog Post Draft"
        description="AI-generated blog post about sustainable technology"
        metadata="Text"
      >
        <Placeholder color={placeholderColors[0]} label="Blog Post" />
      </AIGalleryItem>
      <AIGalleryItem
        title="Product Description"
        description="Compelling copy for an e-commerce listing"
        metadata="Text"
      >
        <Placeholder color={placeholderColors[1]} label="Product Copy" />
      </AIGalleryItem>
      <AIGalleryItem
        title="Social Media Graphics"
        description="Set of branded social posts for a campaign"
        metadata="Image"
      >
        <Placeholder color={placeholderColors[2]} label="Social Media" />
      </AIGalleryItem>
      <AIGalleryItem
        title="Data Visualization"
        description="Interactive chart of quarterly sales figures"
        metadata="Chart"
      >
        <Placeholder color={placeholderColors[3]} label="Data Viz" />
      </AIGalleryItem>
      <AIGalleryItem
        title="Email Template"
        description="Responsive newsletter template with dynamic content"
        metadata="Email"
      >
        <Placeholder color={placeholderColors[4]} label="Email" />
      </AIGalleryItem>
      <AIGalleryItem
        title="Landing Page"
        description="Conversion-optimized landing page layout"
        metadata="Web"
      >
        <Placeholder color={placeholderColors[5]} label="Landing Page" />
      </AIGalleryItem>
    </AIGallery>
  ),
}

export const TwoColumns: Story = {
  parameters: {
    docs: {
      description: {
        story: "Gallery with a 2-column layout for wider item cards.",
      },
    },
  },
  render: () => (
    <AIGallery columns={2}>
      <AIGalleryItem
        title="Write a Blog Post"
        description="Generate a well-structured article on any topic"
        metadata="Content"
      >
        <Placeholder color={placeholderColors[0]} label="Blog" />
      </AIGalleryItem>
      <AIGalleryItem
        title="Generate Product Images"
        description="Create realistic product photography with AI"
        metadata="Image"
      >
        <Placeholder color={placeholderColors[1]} label="Product" />
      </AIGalleryItem>
      <AIGalleryItem
        title="Analyze Sales Data"
        description="Turn raw numbers into actionable insights"
        metadata="Analytics"
      >
        <Placeholder color={placeholderColors[2]} label="Analytics" />
      </AIGalleryItem>
      <AIGalleryItem
        title="Draft Marketing Copy"
        description="Persuasive copy for ads and campaigns"
        metadata="Marketing"
      >
        <Placeholder color={placeholderColors[3]} label="Marketing" />
      </AIGalleryItem>
    </AIGallery>
  ),
}

export const FourColumns: Story = {
  parameters: {
    docs: {
      description: {
        story: "Compact 4-column gallery with minimal content per item.",
      },
    },
  },
  render: () => (
    <AIGallery columns={4}>
      <AIGalleryItem title="Blog Post" metadata="Text">
        <Placeholder color={placeholderColors[0]} label="Blog" />
      </AIGalleryItem>
      <AIGalleryItem title="Product Shot" metadata="Image">
        <Placeholder color={placeholderColors[1]} label="Product" />
      </AIGalleryItem>
      <AIGalleryItem title="Sales Report" metadata="Data">
        <Placeholder color={placeholderColors[2]} label="Report" />
      </AIGalleryItem>
      <AIGalleryItem title="Email Draft" metadata="Email">
        <Placeholder color={placeholderColors[3]} label="Email" />
      </AIGalleryItem>
    </AIGallery>
  ),
}

export const WithActions: Story = {
  parameters: {
    docs: {
      description: {
        story: "Gallery items with action buttons in the footer using custom labels like 'Use template' and 'Try now'.",
      },
    },
  },
  render: () => (
    <AIGallery>
      <AIGalleryItem
        title="Write a Blog Post"
        description="Generate a well-structured article on any topic"
        metadata="Content"
        actionLabel="Use template"
        onAction={() => {}}
      >
        <Placeholder color={placeholderColors[0]} label="Blog" />
      </AIGalleryItem>
      <AIGalleryItem
        title="Generate Product Images"
        description="Create realistic product photography with AI"
        metadata="Image"
        actionLabel="Try now"
        onAction={() => {}}
      >
        <Placeholder color={placeholderColors[1]} label="Product" />
      </AIGalleryItem>
      <AIGalleryItem
        title="Analyze Sales Data"
        description="Turn raw numbers into actionable insights"
        metadata="Analytics"
        actionLabel="Try now"
        onAction={() => {}}
      >
        <Placeholder color={placeholderColors[2]} label="Analytics" />
      </AIGalleryItem>
      <AIGalleryItem
        title="Draft Marketing Copy"
        description="Persuasive copy for ads and campaigns"
        metadata="Marketing"
        actionLabel="Use template"
        onAction={() => {}}
      >
        <Placeholder color={placeholderColors[3]} label="Marketing" />
      </AIGalleryItem>
      <AIGalleryItem
        title="Code Review"
        description="AI-powered code analysis and suggestions"
        metadata="Dev"
        actionLabel="Try now"
        onAction={() => {}}
      >
        <Placeholder color={placeholderColors[4]} label="Code" />
      </AIGalleryItem>
      <AIGalleryItem
        title="Slide Deck"
        description="Generate presentation slides from a brief"
        metadata="Presentation"
        actionLabel="Use template"
        onAction={() => {}}
      >
        <Placeholder color={placeholderColors[5]} label="Slides" />
      </AIGalleryItem>
    </AIGallery>
  ),
}
