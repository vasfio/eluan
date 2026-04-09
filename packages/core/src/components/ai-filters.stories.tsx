import type { Meta, StoryObj } from "@storybook/react"
import { Globe, GraduationCap, Newspaper, Code, Image } from "lucide-react"

import { AIFilters, AIFilterChip, AIFilterGroup } from "./ai-filters"

const meta: Meta<typeof AIFilters> = {
  title: "AI/Tuners/AIFilters",
  component: AIFilters,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
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
