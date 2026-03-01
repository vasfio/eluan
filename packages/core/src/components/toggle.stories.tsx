import type { Meta, StoryObj } from "@storybook/react"
import { Toggle } from "./toggle"

const meta: Meta<typeof Toggle> = {
  title: "Components/Toggle",
  component: Toggle,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Toggle aria-label="Toggle italic">B</Toggle>,
}

export const Outline: Story = {
  render: () => <Toggle variant="outline" aria-label="Toggle italic">B</Toggle>,
}

export const WithText: Story = {
  render: () => <Toggle aria-label="Toggle bold">Bold</Toggle>,
}

export const Disabled: Story = {
  render: () => <Toggle disabled aria-label="Toggle">Disabled</Toggle>,
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Toggle size="sm" aria-label="Toggle small">S</Toggle>
      <Toggle size="default" aria-label="Toggle default">M</Toggle>
      <Toggle size="lg" aria-label="Toggle large">L</Toggle>
    </div>
  ),
}

export const Pressed: Story = {
  render: () => <Toggle defaultPressed aria-label="Toggle pressed">Pressed</Toggle>,
}
