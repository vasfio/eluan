import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Rating } from "./rating"

const meta: Meta<typeof Rating> = {
  title: "Components/Rating",
  component: Rating,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState(3)
    return <Rating value={value} onChange={setValue} />
  },
}

export const ReadOnly: Story = {
  render: () => <Rating value={4} readonly />,
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Rating value={3} size="sm" readonly />
      <Rating value={3} size="default" readonly />
      <Rating value={3} size="lg" readonly />
    </div>
  ),
}

export const HalfStars: Story = {
  render: () => <Rating value={3.5} readonly precision={0.5} />,
}

export const CustomCount: Story = {
  render: () => {
    const [value, setValue] = React.useState(7)
    return <Rating value={value} onChange={setValue} max={10} />
  },
}

export const WithLabel: Story = {
  render: () => {
    const [value, setValue] = React.useState(4)
    return (
      <div className="flex items-center gap-2">
        <Rating value={value} onChange={setValue} />
        <span className="text-sm text-muted-foreground">{value} out of 5</span>
      </div>
    )
  },
}
