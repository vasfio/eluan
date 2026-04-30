import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { DateTimePicker } from "./datetime-picker"

const meta: Meta<typeof DateTimePicker> = {
  title: "Components/Datetime Picker",
  component: DateTimePicker,
  tags: ["autodocs"],
  argTypes: {
    value: {
      description: "The currently selected date and time.",
    },
    onChange: {
      description: "Callback fired when the date or time changes.",
    },
    placeholder: {
      description: "Placeholder text shown when no date/time is selected.",
    },
    disabled: {
      description: "Whether the picker trigger button is disabled.",
    },
    showSeconds: {
      description: "Whether to display a seconds input in the time selector.",
    },
    use24Hour: {
      description: "Whether to use 24-hour format instead of 12-hour AM/PM.",
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
A combined date and time picker that lets users select a date from a calendar and set a time using input fields.

**Import**
\`\`\`tsx
import { DateTimePicker } from "@vasf/ragnar-core"
\`\`\`

**Usage**
\`\`\`tsx
<DateTimePicker value={dateTime} onChange={setDateTime} />
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
        story: "A datetime picker with no initial value, showing the default placeholder.",
      },
    },
  },
  render: () => {
    const [dateTime, setDateTime] = React.useState<Date | undefined>()
    return <DateTimePicker value={dateTime} onChange={setDateTime} />
  },
}

export const WithPreselected: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "A datetime picker initialized with the current date and time.",
      },
    },
  },
  render: () => {
    const [dateTime, setDateTime] = React.useState<Date | undefined>(new Date())
    return <DateTimePicker value={dateTime} onChange={setDateTime} />
  },
}

export const WithLabel: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "A datetime picker paired with an external label element.",
      },
    },
  },
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
