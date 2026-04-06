import type { Meta, StoryObj } from "@storybook/react"
import { ToggleGroup, ToggleGroupItem } from "./toggle-group"

const meta: Meta<typeof ToggleGroup> = {
  title: "Components/Toggle Group",
  component: ToggleGroup,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj

export const Default: Story = {
  args: {},
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
  render: () => (
    <ToggleGroup type="single" variant="outline">
      <ToggleGroupItem value="a">A</ToggleGroupItem>
      <ToggleGroupItem value="b">B</ToggleGroupItem>
      <ToggleGroupItem value="c">C</ToggleGroupItem>
    </ToggleGroup>
  ),
}

export const Sizes: Story = {
  args: {},
  render: () => (
    <div className="flex flex-col gap-4">
      <ToggleGroup type="single" size="sm">
        <ToggleGroupItem value="a">S</ToggleGroupItem>
        <ToggleGroupItem value="b">M</ToggleGroupItem>
        <ToggleGroupItem value="c">L</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup type="single" size="default">
        <ToggleGroupItem value="a">S</ToggleGroupItem>
        <ToggleGroupItem value="b">M</ToggleGroupItem>
        <ToggleGroupItem value="c">L</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup type="single" size="lg">
        <ToggleGroupItem value="a">S</ToggleGroupItem>
        <ToggleGroupItem value="b">M</ToggleGroupItem>
        <ToggleGroupItem value="c">L</ToggleGroupItem>
      </ToggleGroup>
    </div>
  ),
}

export const Disabled: Story = {
  args: {},
  render: () => (
    <ToggleGroup type="single" disabled>
      <ToggleGroupItem value="a">A</ToggleGroupItem>
      <ToggleGroupItem value="b">B</ToggleGroupItem>
      <ToggleGroupItem value="c">C</ToggleGroupItem>
    </ToggleGroup>
  ),
}
