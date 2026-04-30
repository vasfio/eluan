import type { Meta, StoryObj } from "@storybook/react"
import { ToggleGroup, ToggleGroupItem } from "./toggle-group"

const meta: Meta<typeof ToggleGroup> = {
  title: "Components/Toggle Group",
  component: ToggleGroup,
  tags: ["autodocs"],
  argTypes: {
    type: {
      description: "Selection mode: \"single\" allows one active item, \"multiple\" allows many.",
    },
    variant: {
      description: "Visual style variant: \"default\" or \"outline\".",
    },
    size: {
      description: "Size of the toggle items.",
    },
    disabled: {
      description: "Whether the entire toggle group is disabled.",
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
A group of toggle buttons that supports single or multiple selection, with variant and size options.

**Import**
\`\`\`tsx
import { ToggleGroup, ToggleGroupItem } from "@vasf/ragnar-core"
\`\`\`

**Usage**
\`\`\`tsx
<ToggleGroup type="single">
  <ToggleGroupItem value="left">L</ToggleGroupItem>
  <ToggleGroupItem value="center">C</ToggleGroupItem>
  <ToggleGroupItem value="right">R</ToggleGroupItem>
</ToggleGroup>
\`\`\`
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "A single-selection toggle group for text alignment options.",
      },
    },
  },
  render: () => (
    <ToggleGroup type="single">
      <ToggleGroupItem value="left" aria-label="Align left">L</ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">C</ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">R</ToggleGroupItem>
    </ToggleGroup>
  ),
}

export const Multiple: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "A multi-selection toggle group for text formatting (bold, italic, underline).",
      },
    },
  },
  render: () => (
    <ToggleGroup type="multiple">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">B</ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">I</ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">U</ToggleGroupItem>
    </ToggleGroup>
  ),
}

export const Outline: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "A toggle group using the \"outline\" variant style.",
      },
    },
  },
  render: () => (
    <ToggleGroup type="single" variant="outline">
      <ToggleGroupItem value="a">A</ToggleGroupItem>
      <ToggleGroupItem value="b">B</ToggleGroupItem>
      <ToggleGroupItem value="c">C</ToggleGroupItem>
    </ToggleGroup>
  ),
}

export const Disabled: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "A toggle group in the disabled state, preventing interaction with all items.",
      },
    },
  },
  render: () => (
    <ToggleGroup type="single" disabled>
      <ToggleGroupItem value="a">A</ToggleGroupItem>
      <ToggleGroupItem value="b">B</ToggleGroupItem>
      <ToggleGroupItem value="c">C</ToggleGroupItem>
    </ToggleGroup>
  ),
}
