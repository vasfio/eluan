import type { Meta, StoryObj } from "@storybook/react"
import { Banner } from "./banner"

const meta: Meta<typeof Banner> = {
  title: "Components/Banner",
  component: Banner,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A prominent message bar for displaying system-wide notifications, alerts, or status updates with multiple semantic variants and positioning options.

**Import**
\`\`\`tsx
import { Banner } from "@eluan/core"
\`\`\`

**Usage**
\`\`\`tsx
<Banner variant="informative" dismissible onDismiss={() => setVisible(false)}>
  New version available. Please refresh.
</Banner>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      description: "Visual style of the banner. Accepts `\"default\"`, `\"informative\"`, `\"positive\"`, `\"caution\"`, `\"destructive\"`, or `\"neutral\"`. Defaults to `\"informative\"`.",
    },
    position: {
      description: "Positioning strategy. Accepts `\"top\"`, `\"bottom\"` (fixed to viewport edges), or `\"inline\"` (relative). Defaults to `\"inline\"`.",
    },
    icon: {
      description: "Optional icon node rendered at the start of the banner.",
    },
    action: {
      description: "Optional action node (e.g. a button) rendered at the end of the banner.",
    },
    dismissible: {
      description: "When `true`, shows a close button to dismiss the banner. Defaults to `false`.",
    },
    onDismiss: {
      description: "Callback fired when the dismiss button is clicked.",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "Banner with the default variant (inverse background colors).",
      },
    },
  },
  render: () => (
    <Banner variant='default'>
      This is a default banner message.
    </Banner>
  ),
}

export const Info: Story = {
  parameters: {
    docs: {
      description: {
        story: "Informational banner using the informative variant.",
      },
    },
  },
  render: () => (
    <Banner variant="informative">
      This is an informational banner.
    </Banner>
  ),
}

export const Success: Story = {
  parameters: {
    docs: {
      description: {
        story: "Success banner indicating a completed operation.",
      },
    },
  },
  render: () => (
    <Banner variant="positive">
      Operation completed successfully!
    </Banner>
  ),
}

export const Warning: Story = {
  parameters: {
    docs: {
      description: {
        story: "Warning banner alerting users to potential issues.",
      },
    },
  },
  render: () => (
    <Banner variant="caution">
      Please be aware of this warning.
    </Banner>
  ),
}

export const Destructive: Story = {
  parameters: {
    docs: {
      description: {
        story: "Destructive/error banner for critical failure messages.",
      },
    },
  },
  render: () => (
    <Banner variant="destructive">
      An error occurred. Please try again.
    </Banner>
  ),
}

export const AllVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: "All five banner variants displayed together for visual comparison.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
      <Banner variant='default'>Default banner</Banner>
      <Banner variant="informative">Info banner</Banner>
      <Banner variant="positive">Success banner</Banner>
      <Banner variant="caution">Warning banner</Banner>
      <Banner variant="destructive">Destructive banner</Banner>
    </div>
  ),
}
