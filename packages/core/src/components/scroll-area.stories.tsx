import type { Meta, StoryObj } from "@storybook/react"
import { ScrollArea, ScrollBar } from "./scroll-area"
import { Separator } from "./separator"

const meta: Meta<typeof ScrollArea> = {
  title: "Components/Scroll Area",
  component: ScrollArea,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A custom scrollable container that provides consistent cross-browser scrollbar styling.

The component fills its parent, so give it a bounded box (fixed height and/or width) via a wrapper element.

**Import**
\`\`\`tsx
import { ScrollArea, ScrollBar } from "@eluan/core"
\`\`\`

**Usage**
\`\`\`tsx
<div style={{ height: "18rem", width: "12rem" }}>
  <ScrollArea>
    <div style={{ padding: "var(--spacing-md)" }}>Scrollable content here</div>
  </ScrollArea>
</div>
\`\`\`
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const tags = Array.from({ length: 50 }).map((_, i) => `Tag ${i + 1}`)

const surface = {
  borderColor: "var(--container-border)",
  borderStyle: "solid",
  borderWidth: 1,
  borderRadius: "var(--curves-md)",
  overflow: "hidden",
} as const

export const Vertical: Story = {
  parameters: {
    docs: {
      description: {
        story: "Displays a vertically scrollable list of tags inside a fixed-height container.",
      },
    },
  },
  render: () => (
    <div style={{ ...surface, height: "18rem", width: "12rem" }}>
      <ScrollArea>
        <div style={{ padding: "var(--spacing-md)" }}>
          <h4
            style={{
              marginTop: 0,
              marginBottom: "var(--spacing-md)",
              fontSize: "var(--font-size-sm)",
              fontWeight: 500,
              lineHeight: 1,
            }}
          >
            Tags
          </h4>
          {tags.map((tag) => (
            <div key={tag}>
              <div style={{ fontSize: "var(--font-size-sm)" }}>{tag}</div>
              <div style={{ marginBlock: "var(--spacing-sm)" }}>
                <Separator />
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  ),
}

export const Horizontal: Story = {
  parameters: {
    docs: {
      description: {
        story: "Demonstrates horizontal scrolling with a ScrollBar set to horizontal orientation.",
      },
    },
  },
  render: () => (
    <div style={{ ...surface, width: "24rem" }}>
      <ScrollArea>
        <div
          style={{
            display: "flex",
            width: "max-content",
            gap: "var(--spacing-md)",
            padding: "var(--spacing-md)",
          }}
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: "8rem",
                flexShrink: 0,
                borderColor: "var(--container-border)",
                borderStyle: "solid",
                borderWidth: 1,
                borderRadius: "var(--curves-md)",
                padding: "var(--spacing-md)",
              }}
            >
              <div style={{ fontSize: "var(--font-size-sm)", fontWeight: 500 }}>
                Item {i + 1}
              </div>
              <div
                style={{
                  fontSize: "var(--font-size-xs)",
                  color: "var(--container-fg-alt)",
                }}
              >
                Description
              </div>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  ),
}

export const Both: Story = {
  parameters: {
    docs: {
      description: {
        story: "Shows a scroll area with both vertical and horizontal scrolling enabled simultaneously.",
      },
    },
  },
  render: () => (
    <div style={{ ...surface, height: "18rem", width: "18rem" }}>
      <ScrollArea>
        <div style={{ padding: "var(--spacing-md)", width: "31.25rem" }}>
          <h4
            style={{
              marginTop: 0,
              marginBottom: "var(--spacing-md)",
              fontSize: "var(--font-size-sm)",
              fontWeight: 500,
            }}
          >
            Scrollable Content
          </h4>
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              style={{
                paddingBlock: "var(--spacing-sm)",
                fontSize: "var(--font-size-sm)",
              }}
            >
              This is a long line of text that will cause horizontal scrolling. Item {i + 1}
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  ),
}
