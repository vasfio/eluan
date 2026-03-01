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
  render: () => <Rating value={4} readOnly />,
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Rating value={3} size="sm" readOnly />
      <Rating value={3} size="default" readOnly />
      <Rating value={3} size="lg" readOnly />
    </div>
  ),
}

export const HalfStars: Story = {
  render: () => <Rating value={3.5} readOnly allowHalf />,
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
