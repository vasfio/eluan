import type { Meta, StoryObj } from "@storybook/react"
import { Pill } from "./pill"

const meta: Meta<typeof Pill> = {
  title: "Components/Pill",
  component: Pill,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Pill>Default</Pill>,
}

export const Variants: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Pill variant="default">Default</Pill>
      <Pill variant="secondary">Secondary</Pill>
      <Pill variant="outline">Outline</Pill>
      <Pill variant="success">Success</Pill>
      <Pill variant="warning">Warning</Pill>
      <Pill variant="destructive">Destructive</Pill>
    </div>
  ),
}

export const Removable: Story = {
  render: () => (
    <div className="flex gap-2">
      <Pill onRemove={() => alert("Removed!")}>Removable</Pill>
      <Pill variant="secondary" onRemove={() => alert("Removed!")}>Click X</Pill>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Pill size="sm">Small</Pill>
      <Pill size="default">Default</Pill>
      <Pill size="lg">Large</Pill>
    </div>
  ),
}
