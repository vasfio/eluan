import * as React from "react"
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
import { Separator } from "@eluan/core"
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
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-md)" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-xxs)" }}>
        <h4 style={{ fontSize: "var(--font-size-base)", fontWeight: 500, margin: 0 }}>
          Radix Primitives
        </h4>
        <p style={{ fontSize: "var(--font-size-sm)", color: "var(--container-fg-alt)", margin: 0 }}>
          An open-source UI component library.
        </p>
      </div>
      <Separator />
      <div style={inlineNav}>
        <span>Blog</span>
        <Separator orientation="vertical" />
        <span>Docs</span>
        <Separator orientation="vertical" />
        <span>Source</span>
      </div>
    </div>
  ),
}

const inlineNav: React.CSSProperties = {
  alignItems: "center",
  display: "flex",
  fontSize: "var(--font-size-sm)",
  gap: "var(--spacing-md)",
  height: "var(--size-xs)",
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
    <div style={inlineNav}>
      <span>Blog</span>
      <Separator orientation="vertical" />
      <span>Docs</span>
      <Separator orientation="vertical" />
      <span>Source</span>
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
    <div style={{ maxWidth: "20rem" }}>
      <div style={listItem}>
        <p style={listTitle}>Item 1</p>
        <p style={listDesc}>Description for item 1</p>
      </div>
      <Separator />
      <div style={listItem}>
        <p style={listTitle}>Item 2</p>
        <p style={listDesc}>Description for item 2</p>
      </div>
      <Separator />
      <div style={listItem}>
        <p style={listTitle}>Item 3</p>
        <p style={listDesc}>Description for item 3</p>
      </div>
    </div>
  ),
}

const listItem: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "var(--spacing-xxs)",
  paddingBlock: "var(--spacing-sm)",
}

const listTitle: React.CSSProperties = {
  fontSize: "var(--font-size-sm)",
  fontWeight: 500,
  margin: 0,
}

const listDesc: React.CSSProperties = {
  color: "var(--container-fg-alt)",
  fontSize: "var(--font-size-xs)",
  margin: 0,
}
