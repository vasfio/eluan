import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Kbd, KbdGroup, Shortcut } from "./kbd"

const meta: Meta<typeof Kbd> = {
  title: "Components/Kbd",
  component: Kbd,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      description: "Visual style of the key indicator. Options: `\"default\"` (raised with shadow), `\"outline\"` (border only), or `\"ghost\"` (no background).",
    },
    size: {
      description: "Size of the key indicator. Options: `\"sm\"`, `\"default\"`, or `\"lg\"`.",
    },
    keys: {
      description: "A key or key combination to display. Accepts a string like `\"cmd+k\"` or an array like `[\"cmd\", \"shift\", \"p\"]`. Keys are automatically mapped to their symbols.",
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
A keyboard key indicator that renders styled key cap representations, with automatic symbol mapping for modifier and special keys. Includes sub-components for key groups and common shortcuts.

**Import**
\`\`\`tsx
import { Kbd, KbdGroup, Shortcut } from "@eluan/core"
\`\`\`

**Usage**
\`\`\`tsx
<Kbd keys="cmd+k" />
<Shortcut shortcut="save" />
<KbdGroup>
  <Kbd>⌘</Kbd>
  <Kbd>K</Kbd>
</KbdGroup>
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
        story: "Basic Kbd rendering a single key symbol as children.",
      },
    },
  },
  render: () => <Kbd>⌘</Kbd>,
}

export const WithKeys: Story = {
  parameters: {
    docs: {
      description: {
        story: "Kbd using the `keys` prop with a string shortcut notation that auto-maps key names to symbols.",
      },
    },
  },
  render: () => <Kbd keys="cmd+k" />,
}

export const MultipleKeys: Story = {
  parameters: {
    docs: {
      description: {
        story: "Kbd using the `keys` prop with an array of key names for a three-key combination.",
      },
    },
  },
  render: () => <Kbd keys={["cmd", "shift", "p"]} />,
}

export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story: "Demonstrates the three visual variants: `default` (raised), `outline` (bordered), and `ghost` (minimal).",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-md)" }}>
      <Kbd variant="default">Ctrl</Kbd>
      <Kbd variant="outline">Ctrl</Kbd>
      <Kbd variant="ghost">Ctrl</Kbd>
    </div>
  ),
}

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: "Demonstrates the three available sizes: `sm`, `default`, and `lg`.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-md)" }}>
      <Kbd size="sm">⌘K</Kbd>
      <Kbd size="default">⌘K</Kbd>
      <Kbd size="lg">⌘K</Kbd>
    </div>
  ),
}

export const CommonShortcuts: Story = {
  parameters: {
    docs: {
      description: {
        story: "Uses the `Shortcut` sub-component with named `shortcut` presets (copy, paste, undo, redo, save, find) for platform-aware rendering.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
      {(
        [
          ["Copy", "copy"],
          ["Paste", "paste"],
          ["Undo", "undo"],
          ["Redo", "redo"],
          ["Save", "save"],
          ["Find", "find"],
        ] as const
      ).map(([label, shortcut]) => (
        <div key={shortcut} style={shortcutRow}>
          <span style={{ fontSize: "var(--font-size-sm)" }}>{label}</span>
          <Shortcut shortcut={shortcut} />
        </div>
      ))}
    </div>
  ),
}

const shortcutRow: React.CSSProperties = {
  alignItems: "center",
  display: "flex",
  justifyContent: "space-between",
  width: "16rem",
}

export const KeyGroup: Story = {
  parameters: {
    docs: {
      description: {
        story: "Uses `KbdGroup` to visually group multiple individual `Kbd` elements as a key combination.",
      },
    },
  },
  render: () => (
    <KbdGroup>
      <Kbd>⌘</Kbd>
      <Kbd>Shift</Kbd>
      <Kbd>P</Kbd>
    </KbdGroup>
  ),
}

export const InContext: Story = {
  parameters: {
    docs: {
      description: {
        story: "Kbd inline within a sentence of body text, showing how it integrates with surrounding content.",
      },
    },
  },
  render: () => (
    <div
      style={{
        alignItems: "center",
        color: "var(--container-fg-alt)",
        display: "flex",
        fontSize: "var(--font-size-sm)",
        gap: "var(--spacing-xs)",
      }}
    >
      Press <Kbd keys="cmd+k" /> to open command palette
    </div>
  ),
}
