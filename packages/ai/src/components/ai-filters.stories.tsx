import type { Meta, StoryObj } from "@storybook/react"
import { Globe, GraduationCap, Newspaper, Code, Image } from "lucide-react"

import { AIFilters, AIFilterChip, AIFilterGroup } from "./ai-filters"

const meta: Meta<typeof AIFilters> = {
  title: "Components/AI Filters",
  component: AIFilters,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A flex-wrap container of toggleable filter chips for narrowing AI search results, composed of AIFilters, AIFilterChip, and AIFilterGroup sub-components.

**Import**
\`\`\`tsx
import { AIFilters, AIFilterChip, AIFilterGroup } from "@vasf/ragnar-ai"
\`\`\`

**Usage**
\`\`\`tsx
<AIFilters>
  <AIFilterChip selected>Web</AIFilterChip>
  <AIFilterChip>Academic</AIFilterChip>
</AIFilters>
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
        story: "Basic set of unselected filter chips.",
      },
    },
  },
  render: () => (
    <AIFilters>
      <AIFilterChip>Web</AIFilterChip>
      <AIFilterChip>Academic</AIFilterChip>
      <AIFilterChip>News</AIFilterChip>
      <AIFilterChip>Code</AIFilterChip>
      <AIFilterChip>Images</AIFilterChip>
    </AIFilters>
  ),
}

export const WithSelected: Story = {
  parameters: {
    docs: {
      description: {
        story: "Filter chips with some pre-selected via the selected prop.",
      },
    },
  },
  render: () => (
    <AIFilters>
      <AIFilterChip selected>Web</AIFilterChip>
      <AIFilterChip>Academic</AIFilterChip>
      <AIFilterChip selected>News</AIFilterChip>
      <AIFilterChip>Code</AIFilterChip>
      <AIFilterChip>Images</AIFilterChip>
    </AIFilters>
  ),
}

export const WithCounts: Story = {
  parameters: {
    docs: {
      description: {
        story: "Filter chips displaying result count badges.",
      },
    },
  },
  render: () => (
    <AIFilters>
      <AIFilterChip count={1240}>Web</AIFilterChip>
      <AIFilterChip count={87}>Academic</AIFilterChip>
      <AIFilterChip count={342}>News</AIFilterChip>
      <AIFilterChip count={56}>Code</AIFilterChip>
      <AIFilterChip count={203}>Images</AIFilterChip>
    </AIFilters>
  ),
}

export const Groups: Story = {
  parameters: {
    docs: {
      description: {
        story: "Filter chips organized into labeled AIFilterGroup sections.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <AIFilterGroup label="Sources">
        <AIFilterChip selected>Web</AIFilterChip>
        <AIFilterChip>Academic</AIFilterChip>
        <AIFilterChip selected>News</AIFilterChip>
      </AIFilterGroup>
      <AIFilterGroup label="Format">
        <AIFilterChip>Articles</AIFilterChip>
        <AIFilterChip selected>Code</AIFilterChip>
        <AIFilterChip>Images</AIFilterChip>
      </AIFilterGroup>
    </div>
  ),
}

export const WithIcons: Story = {
  parameters: {
    docs: {
      description: {
        story: "Filter chips with leading icons rendered before the label.",
      },
    },
  },
  render: () => (
    <AIFilters>
      <AIFilterChip icon={<Globe />}>Web</AIFilterChip>
      <AIFilterChip icon={<GraduationCap />}>Academic</AIFilterChip>
      <AIFilterChip icon={<Newspaper />}>News</AIFilterChip>
      <AIFilterChip icon={<Code />}>Code</AIFilterChip>
      <AIFilterChip icon={<Image />}>Images</AIFilterChip>
    </AIFilters>
  ),
}
