import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { DateTimePicker } from "./datetime-picker"

const meta: Meta<typeof DateTimePicker> = {
  title: "Components/DateTimePicker",
  component: DateTimePicker,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [dateTime, setDateTime] = React.useState<Date>()
    return <DateTimePicker value={dateTime} onChange={setDateTime} />
  },
}

export const WithPreselected: Story = {
  render: () => {
    const [dateTime, setDateTime] = React.useState<Date>(new Date())
    return <DateTimePicker value={dateTime} onChange={setDateTime} />
  },
}

export const WithLabel: Story = {
  render: () => {
    const [dateTime, setDateTime] = React.useState<Date>()
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium">Event Date & Time</label>
        <DateTimePicker value={dateTime} onChange={setDateTime} />
      </div>
    )
  },
}
