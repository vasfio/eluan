import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Button } from "./button"

const meta: Meta<typeof Popover> = {
  title: "Components/Popover",
  component: Popover,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A floating panel that appears next to a trigger element, used to display rich interactive content such as forms or settings.

**Import**
\`\`\`tsx
import { Popover, PopoverTrigger, PopoverContent } from "@eluan/core"
\`\`\`

**Usage**
\`\`\`tsx
<Popover>
  <PopoverTrigger>Open</PopoverTrigger>
  <PopoverContent>Content goes here</PopoverContent>
</Popover>
\`\`\`
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "Popover with a form layout for editing dimensions, demonstrating rich interactive content.",
      },
    },
  },
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-xxs)" }}>
            <h4 style={{ fontSize: "var(--font-size-sm)", fontWeight: 500, margin: 0 }}>
              Dimensions
            </h4>
            <p style={{ fontSize: "var(--font-size-sm)", color: "var(--container-fg-alt)", margin: 0 }}>
              Set the dimensions for the layer.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", alignItems: "center", gap: "var(--spacing-sm)" }}>
              <label htmlFor="width" style={{ fontSize: "var(--font-size-sm)" }}>Width</label>
              <input id="width" defaultValue="100%" style={inputStyle} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", alignItems: "center", gap: "var(--spacing-sm)" }}>
              <label htmlFor="height" style={{ fontSize: "var(--font-size-sm)" }}>Height</label>
              <input id="height" defaultValue="25px" style={inputStyle} />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
}

const inputStyle: React.CSSProperties = {
  backgroundColor: "var(--container-bg)",
  borderColor: "var(--container-border)",
  borderRadius: "var(--curves-sm)",
  borderStyle: "solid",
  borderWidth: 1,
  boxSizing: "border-box",
  color: "var(--container-fg)",
  fontSize: "var(--font-size-sm)",
  height: "var(--size-md)",
  paddingInline: "var(--spacing-xs)",
  width: "100%",
}

export const Positions: Story = {
  parameters: {
    docs: {
      description: {
        story: "Demonstrates all four popover placement options using the `side` prop: top, right, bottom, and left.",
      },
    },
  },
  render: () => (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        gap: "var(--spacing-lg)",
        justifyContent: "center",
        minHeight: "24rem",
        padding: "var(--spacing-2xl)",
      }}
    >
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Top</Button>
        </PopoverTrigger>
        <PopoverContent side="top" avoidCollisions={false}>Popover on top</PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Right</Button>
        </PopoverTrigger>
        <PopoverContent side="right" avoidCollisions={false}>Popover on right</PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Bottom</Button>
        </PopoverTrigger>
        <PopoverContent side="bottom" avoidCollisions={false}>Popover on bottom</PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Left</Button>
        </PopoverTrigger>
        <PopoverContent side="left" avoidCollisions={false}>Popover on left</PopoverContent>
      </Popover>
    </div>
  ),
}
