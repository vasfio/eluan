import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { MultiSelect } from "./multi-select"

const meta: Meta<typeof MultiSelect> = {
  title: "Components/MultiSelect",
  component: MultiSelect,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A multi-selection dropdown built on Command and Popover, displaying selected items as removable badges with built-in search filtering.

**Import**
\`\`\`tsx
import { MultiSelect } from "@vasf/ragnar-core"
\`\`\`

**Usage**
\`\`\`tsx
<MultiSelect
  options={[
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
  ]}
  value={selected}
  onChange={setSelected}
  placeholder="Select frameworks..."
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    options: {
      description: "Array of selectable option objects with value, label, and optional disabled flag.",
    },
    value: {
      description: "Array of currently selected option values.",
    },
    onChange: {
      description: "Callback fired with the updated array of selected values when selection changes.",
    },
    placeholder: {
      description: "Placeholder text shown when no items are selected. Defaults to `\"Select items...\"`.",
    },
    searchPlaceholder: {
      description: "Placeholder text for the search input inside the dropdown. Defaults to `\"Search...\"`.",
    },
    emptyMessage: {
      description: "Message displayed when no options match the search query. Defaults to `\"No items found.\"`.",
    },
    disabled: {
      description: "When `true`, the entire select is non-interactive. Defaults to `false`.",
    },
    maxDisplayedItems: {
      description: "Maximum number of badge chips displayed before showing a +N overflow indicator. Defaults to `4`.",
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: "Empty multi-select ready for the user to pick from a list of framework options.",
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: "Multi-select initialized with React and Next.js pre-selected, shown as badge chips.",
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: "Multi-select demonstrating the built-in search/filter functionality in the dropdown.",
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: "Multi-select with guidance text indicating a maximum of 3 selections allowed.",
      },
    },
  },
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
