import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { DatePicker } from "./date-picker"

const meta: Meta<typeof DatePicker> = {
  title: "Components/Date Picker",
  component: DatePicker,
  tags: ["autodocs"],
  argTypes: {
    value: {
      description: "The currently selected date.",
    },
    onValueChange: {
      description: "Callback fired when a date is selected or cleared.",
    },
    placeholder: {
      description: "Placeholder text shown when no date is selected.",
    },
    disabled: {
      description: "Whether the date picker trigger button is disabled.",
    },
    dateFormat: {
      description: "A date-fns format string for displaying the selected date (defaults to \"PPP\").",
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
A popover-based date picker that lets users select a single date from a calendar.

**Import**
\`\`\`tsx
import { DatePicker } from "@eluan/core"
\`\`\`

**Usage**
\`\`\`tsx
<DatePicker value={date} onValueChange={setDate} />
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
        story: "A date picker with no initial value, showing the default placeholder.",
      },
    },
  },
  render: function DefaultStory() {
    const [date, setDate] = React.useState<Date | undefined>()
    return (
      <div style={{ maxWidth: 288 }}>
        <DatePicker value={date} onValueChange={setDate} />
      </div>
    )
  },
}

export const WithPreselected: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "A date picker initialized with today's date already selected.",
      },
    },
  },
  render: function WithPreselectedStory() {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    return (
      <div style={{ maxWidth: 288 }}>
        <DatePicker value={date} onValueChange={setDate} />
      </div>
    )
  },
}

export const WithPlaceholder: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "A date picker with a custom placeholder string.",
      },
    },
  },
  render: function WithPlaceholderStory() {
    const [date, setDate] = React.useState<Date | undefined>()
    return (
      <div style={{ maxWidth: 288 }}>
        <DatePicker value={date} onValueChange={setDate} placeholder="Select a date..." />
      </div>
    )
  },
}

export const Disabled: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "A date picker in the disabled state, preventing user interaction.",
      },
    },
  },
  render: function DisabledStory() {
    const [date, setDate] = React.useState<Date | undefined>()
    return (
      <div style={{ maxWidth: 288 }}>
        <DatePicker value={date} onValueChange={setDate} disabled />
      </div>
    )
  },
}

export const WideTrigger: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          "The popover matches the trigger width, and the calendar is fluid — a wider trigger stretches the 7-column grid and each day cell to fill it.",
      },
    },
  },
  render: function WideTriggerStory() {
    const [date, setDate] = React.useState<Date | undefined>()
    return (
      <div style={{ maxWidth: 440 }}>
        <DatePicker value={date} onValueChange={setDate} />
      </div>
    )
  },
}
