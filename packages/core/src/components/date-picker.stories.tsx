import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { DatePicker } from "./date-picker"

const meta: Meta<typeof DatePicker> = {
  title: "Components/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj

export const Default: Story = {
  args: {},
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>()
    return <DatePicker value={date} onChange={setDate} />
  },
}

export const WithPreselected: Story = {
  args: {},
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    return <DatePicker value={date} onChange={setDate} />
  },
}

export const WithPlaceholder: Story = {
  args: {},
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>()
    return <DatePicker value={date} onChange={setDate} placeholder="Select a date..." />
  },
}

export const Disabled: Story = {
  args: {},
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>()
    return <DatePicker value={date} onChange={setDate} disabled />
  },
}
