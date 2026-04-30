import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import type { DateRange } from "react-day-picker"
import { Calendar } from "./calendar"

const meta: Meta<typeof Calendar> = {
  title: "Components/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A date picker calendar built on react-day-picker with month/year dropdown navigation, supporting single, multiple, and range date selection modes.

**Import**
\`\`\`tsx
import { Calendar } from "@vasf/ragnar-core"
\`\`\`

**Usage**
\`\`\`tsx
<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  className="w-fit rounded-md border"
/>
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
        story: "Single date selection mode with a pre-selected date.",
      },
    },
  },
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="w-fit rounded-md border"
      />
    )
  },
}

export const Multiple: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Multiple date selection mode allowing several individual dates to be chosen.",
      },
    },
  },
  render: () => {
    const [dates, setDates] = React.useState<Date[] | undefined>([])
    return (
      <Calendar
        mode="multiple"
        selected={dates}
        onSelect={setDates}
        className="w-fit rounded-md border"
      />
    )
  },
}

export const Range: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Range selection mode with two months displayed side by side for picking a start and end date.",
      },
    },
  },
  render: () => {
    const [range, setRange] = React.useState<DateRange | undefined>()
    return (
      <Calendar
        mode="range"
        selected={range}
        onSelect={setRange}
        className="w-fit rounded-md border"
        numberOfMonths={2}
      />
    )
  },
}