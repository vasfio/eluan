import type { Meta, StoryObj } from "@storybook/react"
import { Separator } from "./separator"

const meta: Meta<typeof Separator> = {
  title: "Components/Separator",
  component: Separator,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "The orientation of the separator line. Defaults to `horizontal`.",
    },
    decorative: {
      control: "boolean",
      description: "When `true`, the separator is purely visual and hidden from screen readers. Defaults to `true`.",
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
A thin line used to visually divide content into sections, supporting both horizontal and vertical orientations, built on Radix UI Separator primitive.

**Import**
\`\`\`tsx
import { Separator } from "@vasf/ragnar-core"
\`\`\`

**Usage**
\`\`\`tsx
<Separator />
<Separator orientation="vertical" />
\`\`\`
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  parameters: {
    docs: {
      description: {
        story: "A horizontal separator dividing a heading from an inline navigation, combined with vertical separators between nav items.",
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: "Vertical separators used between inline text items.",
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: "Horizontal separators used between list items to visually divide rows.",
      },
    },
  },
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
