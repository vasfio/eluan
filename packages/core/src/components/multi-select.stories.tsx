import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { MultiSelect } from "./multi-select"

const meta: Meta<typeof MultiSelect> = {
  title: "Components/MultiSelect",
  component: MultiSelect,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

const options = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "solid", label: "Solid" },
  { value: "next", label: "Next.js" },
  { value: "nuxt", label: "Nuxt" },
]

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string[]>([])
    return (
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        placeholder="Select frameworks..."
      />
    )
  },
}

export const WithPreselected: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string[]>(["react", "next"])
    return (
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        placeholder="Select frameworks..."
      />
    )
  },
}

export const Searchable: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string[]>([])
    return (
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        placeholder="Search and select..."
      />
    )
  },
}

export const MaxSelections: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string[]>([])
    return (
      <div className="space-y-2">
        <MultiSelect
          options={options}
          value={selected}
          onChange={setSelected}
          placeholder="Select up to 3..."
        />
        <p className="text-sm text-muted-foreground">Maximum 3 selections allowed</p>
      </div>
    )
  },
}
