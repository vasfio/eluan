import type { Meta, StoryObj } from "@storybook/react"
import { Progress } from "./progress"

const meta: Meta<typeof Progress> = {
  title: "Components/Progress",
  component: Progress,
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100 },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: 60,
  },
}

export const Empty: Story = {
  args: {
    value: 0,
  },
}

export const Full: Story = {
  args: {
    value: 100,
  },
}

export const Indeterminate: Story = {
  render: () => (
    <Progress className="w-[60%]" />
  ),
}

export const AllValues: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">0%</p>
        <Progress value={0} />
      </div>
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">25%</p>
        <Progress value={25} />
      </div>
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">50%</p>
        <Progress value={50} />
      </div>
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">75%</p>
        <Progress value={75} />
      </div>
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">100%</p>
        <Progress value={100} />
      </div>
    </div>
  ),
}
