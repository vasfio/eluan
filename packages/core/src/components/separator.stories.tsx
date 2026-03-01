import type { Meta, StoryObj } from "@storybook/react"
import { Separator } from "./separator"

const meta: Meta<typeof Separator> = {
  title: "Components/Separator",
  component: Separator,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  render: () => (
    <div>
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
        <p className="text-sm text-muted-foreground">
          An open-source UI component library.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div className="flex h-5 items-center space-x-4 text-sm">
      <div>Blog</div>
      <Separator orientation="vertical" />
      <div>Docs</div>
      <Separator orientation="vertical" />
      <div>Source</div>
    </div>
  ),
}

export const InList: Story = {
  render: () => (
    <div className="w-[300px]">
      <div className="py-3">
        <p className="text-sm font-medium">Item 1</p>
        <p className="text-xs text-muted-foreground">Description for item 1</p>
      </div>
      <Separator />
      <div className="py-3">
        <p className="text-sm font-medium">Item 2</p>
        <p className="text-xs text-muted-foreground">Description for item 2</p>
      </div>
      <Separator />
      <div className="py-3">
        <p className="text-sm font-medium">Item 3</p>
        <p className="text-xs text-muted-foreground">Description for item 3</p>
      </div>
    </div>
  ),
}
