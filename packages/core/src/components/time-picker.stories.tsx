import type { Meta, StoryObj } from "@storybook/react"
import { TimePicker, TimePickerInput } from "./time-picker"

const meta: Meta<typeof TimePicker> = {
  title: "Core/TimePicker",
  component: TimePicker,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-[200px]">
      <TimePicker onChange={(value) => console.log("Time:", value)} />
    </div>
  ),
}

export const TwelveHourFormat: Story = {
  render: () => (
    <div className="w-[200px]">
      <TimePicker format="12" onChange={(value) => console.log("Time:", value)} />
    </div>
  ),
}

export const TwentyFourHourFormat: Story = {
  render: () => (
    <div className="w-[200px]">
      <TimePicker format="24" onChange={(value) => console.log("Time:", value)} />
    </div>
  ),
}

export const WithMinuteStep: Story = {
  render: () => (
    <div className="w-[200px] space-y-2">
      <p className="text-sm text-muted-foreground">15-minute intervals</p>
      <TimePicker minuteStep={15} onChange={(value) => console.log("Time:", value)} />
    </div>
  ),
}

export const WithDefaultValue: Story = {
  render: () => (
    <div className="w-[200px]">
      <TimePicker value="14:30" format="24" onChange={(value) => console.log("Time:", value)} />
    </div>
  ),
}

export const SimpleInput: Story = {
  render: () => (
    <div className="w-[200px] space-y-2">
      <p className="text-sm text-muted-foreground">Simple text input</p>
      <TimePickerInput placeholder="HH:MM" onChange={(value) => console.log("Time:", value)} />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="w-[200px]">
      <TimePicker disabled />
    </div>
  ),
}
