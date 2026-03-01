import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { DatePicker } from "./date-picker"

const meta: Meta<typeof DatePicker> = {
  title: "Components/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date>()
    return <DatePicker date={date} onDateChange={setDate} />
  },
}

export const WithPreselected: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date>(new Date())
    return <DatePicker date={date} onDateChange={setDate} />
  },
}

export const WithPlaceholder: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date>()
    return <DatePicker date={date} onDateChange={setDate} placeholder="Select a date..." />
  },
}

export const Disabled: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date>()
    return <DatePicker date={date} onDateChange={setDate} disabled />
  },
}
