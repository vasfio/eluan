import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { DateTimePicker } from "./datetime-picker"

const meta: Meta<typeof DateTimePicker> = {
  title: "Components/Datetime Picker",
  component: DateTimePicker,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj

export const Default: Story = {
  args: {},
  render: () => {
    const [dateTime, setDateTime] = React.useState<Date | undefined>()
    return <DateTimePicker value={dateTime} onChange={setDateTime} />
  },
}

export const WithPreselected: Story = {
  args: {},
  render: () => {
    const [dateTime, setDateTime] = React.useState<Date | undefined>(new Date())
    return <DateTimePicker value={dateTime} onChange={setDateTime} />
  },
}

export const WithLabel: Story = {
  args: {},
  render: () => {
    const [dateTime, setDateTime] = React.useState<Date | undefined>()
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium">Event Date & Time</label>
        <DateTimePicker value={dateTime} onChange={setDateTime} />
      </div>
    )
  },
}
