import type { Meta, StoryObj } from "@storybook/react"
import { Skeleton } from "./skeleton"

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  argTypes: {
    width: {
      description: "Width of the placeholder. Numbers are treated as pixels. Defaults to `100%`.",
    },
    height: {
      description: "Height of the placeholder. Numbers are treated as pixels. Defaults to `var(--size-xxs)`.",
    },
    radius: {
      description: "Border radius override, e.g. `var(--radius-radius-full)` for a circle.",
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
A placeholder animation component used to indicate loading content before data is available.

**Import**
\`\`\`tsx
import { Skeleton } from "@eluan/core"
\`\`\`

**Usage**
\`\`\`tsx
<Skeleton width="12rem" height="1rem" />
<Skeleton width="3rem" height="3rem" radius="var(--radius-radius-full)" />
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
        story: "A single skeleton line element.",
      },
    },
  },
  render: () => <Skeleton width="12rem" height="1rem" radius="var(--radius-radius-full)" />,
}

export const Card: Story = {
  parameters: {
    docs: {
      description: {
        story: "A skeleton layout mimicking a card with an image area and two text lines.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
      <Skeleton width="15rem" height="8rem" radius="var(--curves-lg)" />
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-xs)" }}>
        <Skeleton width="15rem" height="1rem" />
        <Skeleton width="12rem" height="1rem" />
      </div>
    </div>
  ),
}

export const Profile: Story = {
  parameters: {
    docs: {
      description: {
        story: "A skeleton layout mimicking a user profile with a circular avatar and text lines.",
      },
    },
  },
  render: () => (
    <div style={{ alignItems: "center", display: "flex", gap: "var(--spacing-md)" }}>
      <Skeleton width="3rem" height="3rem" radius="var(--radius-radius-full)" />
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-xs)" }}>
        <Skeleton width="15rem" height="1rem" />
        <Skeleton width="12rem" height="1rem" />
      </div>
    </div>
  ),
}

export const TextBlock: Story = {
  parameters: {
    docs: {
      description: {
        story: "A skeleton representing a block of text with three lines of varying width.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-xs)", width: "20rem" }}>
      <Skeleton width="100%" height="1rem" />
      <Skeleton width="100%" height="1rem" />
      <Skeleton width="75%" height="1rem" />
    </div>
  ),
}

export const ListItems: Story = {
  parameters: {
    docs: {
      description: {
        story: "A skeleton layout for a list with circular avatars and text placeholders per row.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-md)", width: "20rem" }}>
      {[1, 2, 3].map((i) => (
        <div key={i} style={{ alignItems: "center", display: "flex", gap: "var(--spacing-md)" }}>
          <Skeleton width="2.5rem" height="2.5rem" radius="var(--radius-radius-full)" />
          <div style={{ display: "flex", flex: 1, flexDirection: "column", gap: "var(--spacing-xs)" }}>
            <Skeleton width="50%" height="1rem" />
            <Skeleton width="75%" height="0.75rem" />
          </div>
        </div>
      ))}
    </div>
  ),
}

export const Table: Story = {
  parameters: {
    docs: {
      description: {
        story: "A skeleton layout for a data table with a header row and four body rows.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)", width: "32rem" }}>
      <div style={{ display: "flex", gap: "var(--spacing-md)" }}>
        {[1, 2, 3, 4].map((c) => (
          <div key={c} style={{ flex: 1 }}>
            <Skeleton width="100%" height="1.5rem" />
          </div>
        ))}
      </div>
      {[1, 2, 3, 4].map((r) => (
        <div key={r} style={{ display: "flex", gap: "var(--spacing-md)" }}>
          {[1, 2, 3, 4].map((c) => (
            <div key={c} style={{ flex: 1 }}>
              <Skeleton width="100%" height="2rem" />
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
}
