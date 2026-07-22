import type { Meta, StoryObj } from "@storybook/react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip"
import { Button } from "./button"

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A popup that displays additional information when hovering over or focusing on a trigger element.

**Import**
\`\`\`tsx
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@eluan/core"
\`\`\`

**Usage**
\`\`\`tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>Hover me</TooltipTrigger>
    <TooltipContent>Tooltip text</TooltipContent>
  </Tooltip>
</TooltipProvider>
\`\`\`
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div
      style={{
        padding: "var(--spacing-4xl) var(--spacing-xl) var(--spacing-xl)",
      }}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Basic tooltip that appears on hover with default positioning.",
      },
    },
  },
}

export const Positions: Story = {
  parameters: {
    docs: {
      description: {
        story: "Demonstrates all four tooltip placement options using the `side` prop: top, right, bottom, and left.",
      },
    },
  },
  render: () => (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-lg)",
        padding: "var(--spacing-4xl)",
      }}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost">Top</Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>Tooltip on top</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost">Right</Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>Tooltip on right</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost">Bottom</Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Tooltip on bottom</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost">Left</Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Tooltip on left</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
}

export const WithIcon: Story = {
  parameters: {
    docs: {
      description: {
        story: "Tooltip attached to an icon button, useful for providing accessible labels on icon-only controls.",
      },
    },
  },
  render: () => (
    <div
      style={{
        padding: "var(--spacing-4xl) var(--spacing-xl) var(--spacing-xl)",
      }}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon">
            <span style={{ fontSize: "var(--font-size-lg)" }}>?</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Need help? Click for more info.</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
}
