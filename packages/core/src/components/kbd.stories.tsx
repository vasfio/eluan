import type { Meta, StoryObj } from "@storybook/react"
import { Kbd, KbdGroup, Shortcut } from "./kbd"

const meta: Meta<typeof Kbd> = {
  title: "Components/Kbd",
  component: Kbd,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Kbd>⌘</Kbd>,
}

export const WithKeys: Story = {
  render: () => <Kbd keys="cmd+k" />,
}

export const MultipleKeys: Story = {
  render: () => <Kbd keys={["cmd", "shift", "p"]} />,
}

export const Variants: Story = {
  render: () => (
    <div className="flex gap-4">
      <Kbd variant="default">Ctrl</Kbd>
      <Kbd variant="outline">Ctrl</Kbd>
      <Kbd variant="ghost">Ctrl</Kbd>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Kbd size="sm">⌘K</Kbd>
      <Kbd size="default">⌘K</Kbd>
      <Kbd size="lg">⌘K</Kbd>
    </div>
  ),
}

export const CommonShortcuts: Story = {
  render: () => (
    <div className="space-y-2">
      <div className="flex items-center justify-between w-64">
        <span className="text-sm">Copy</span>
        <Shortcut shortcut="copy" />
      </div>
      <div className="flex items-center justify-between w-64">
        <span className="text-sm">Paste</span>
        <Shortcut shortcut="paste" />
      </div>
      <div className="flex items-center justify-between w-64">
        <span className="text-sm">Undo</span>
        <Shortcut shortcut="undo" />
      </div>
      <div className="flex items-center justify-between w-64">
        <span className="text-sm">Redo</span>
        <Shortcut shortcut="redo" />
      </div>
      <div className="flex items-center justify-between w-64">
        <span className="text-sm">Save</span>
        <Shortcut shortcut="save" />
      </div>
      <div className="flex items-center justify-between w-64">
        <span className="text-sm">Find</span>
        <Shortcut shortcut="find" />
      </div>
    </div>
  ),
}

export const KeyGroup: Story = {
  render: () => (
    <KbdGroup>
      <Kbd>⌘</Kbd>
      <Kbd>Shift</Kbd>
      <Kbd>P</Kbd>
    </KbdGroup>
  ),
}

export const InContext: Story = {
  render: () => (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      Press <Kbd keys="cmd+k" /> to open command palette
    </div>
  ),
}
