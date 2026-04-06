import type { Meta, StoryObj } from "@storybook/react"
import { TimePicker, NativeTimeInput } from "./time-picker"

const meta: Meta<typeof TimePicker> = {
  title: "Components/Time Picker",
  component: TimePicker,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-[260px]">
      <TimePicker onChange={(value) => console.log("Time:", value)} />
    </div>
  ),
}

export const TwelveHourFormat: Story = {
  render: () => (
    <div className="w-[300px]">
      <TimePicker format="12" onChange={(value) => console.log("Time:", value)} />
    </div>
  ),
}

export const TwentyFourHourFormat: Story = {
  render: () => (
    <div className="w-[260px]">
      <TimePicker format="24" onChange={(value) => console.log("Time:", value)} />
    </div>
  ),
}

export const WithDefaultValue: Story = {
  render: () => (
    <div className="w-[260px]">
      <TimePicker value="14:30" format="24" onChange={(value) => console.log("Time:", value)} />
    </div>
  ),
}

export const NativeInput: Story = {
  render: () => (
    <div className="w-[200px] space-y-2">
      <p className="text-sm text-muted-foreground">Native browser time input</p>
      <NativeTimeInput />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="w-[260px]">
      <TimePicker disabled />
    </div>
  ),
}
