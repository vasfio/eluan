import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Avatar, AvatarImage, AvatarFallback, AvatarWithStatus, AvatarBadge, AvatarStatus } from "./avatar"

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A circular image element representing a user or entity, with fallback initials, notification badges, and online status indicators.

**Sub-components:** \`AvatarImage\`, \`AvatarFallback\`, \`AvatarBadge\`, \`AvatarStatus\`, \`AvatarWithStatus\`

**Import**
\`\`\`tsx
import { Avatar, AvatarImage, AvatarFallback, AvatarBadge, AvatarStatus, AvatarWithStatus } from "@eluan/core"
\`\`\`

**Usage**
\`\`\`tsx
<Avatar>
  <AvatarImage src="https://example.com/avatar.png" alt="User" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
\`\`\`
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const WithImage: Story = {
  parameters: {
    docs: {
      description: {
        story: "An avatar displaying a portrait image with a fallback in case the image fails to load.",
      },
    },
  },
  render: () => (
    <Avatar>
      <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=face" alt="Alex Morgan" />
      <AvatarFallback>AM</AvatarFallback>
    </Avatar>
  ),
}

export const Fallback: Story = {
  parameters: {
    docs: {
      description: {
        story: "An avatar showing the fallback initials when the image source is unavailable.",
      },
    },
  },
  render: () => (
    <Avatar>
      <AvatarImage src="" alt="User" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
}

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: "Avatars at different sizes (SM, MD, LG, XL) using className overrides.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-md)" }}>
      {/* Avatar sizes track --size-lg; override it per wrapper to scale */}
      <div style={{ "--size-lg": "2rem" } as React.CSSProperties}>
        <Avatar>
          <AvatarFallback>SM</AvatarFallback>
        </Avatar>
      </div>
      <Avatar>
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
      <div style={{ "--size-lg": "3.5rem" } as React.CSSProperties}>
        <Avatar>
          <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=112&h=112&fit=crop&crop=face" alt="Sarah" />
          <AvatarFallback>LG</AvatarFallback>
        </Avatar>
      </div>
      <div style={{ "--size-lg": "5rem" } as React.CSSProperties}>
        <Avatar>
          <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=face" alt="Marcus" />
          <AvatarFallback>XL</AvatarFallback>
        </Avatar>
      </div>
    </div>
  ),
}

export const Group: Story = {
  parameters: {
    docs: {
      description: {
        story: "Multiple avatars stacked with negative margin to form an overlapping group.",
      },
    },
  },
  render: () => {
    const ring: React.CSSProperties = {
      display: "inline-flex",
      borderRadius: "var(--radius-radius-full)",
      boxShadow: "0 0 0 2px var(--backgrounds-primary)",
    }
    const overlap: React.CSSProperties = { ...ring, marginLeft: "calc(var(--spacing-md) * -1)" }
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={ring}>
          <Avatar>
            <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=face" alt="Alex" />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
        </span>
        <span style={overlap}>
          <Avatar>
            <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face" alt="Sarah" />
            <AvatarFallback>B</AvatarFallback>
          </Avatar>
        </span>
        <span style={overlap}>
          <Avatar>
            <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" alt="Marcus" />
            <AvatarFallback>C</AvatarFallback>
          </Avatar>
        </span>
        <span style={overlap}>
          <Avatar>
            <AvatarFallback>+3</AvatarFallback>
          </Avatar>
        </span>
      </div>
    )
  },
}

export const WithNotificationBadge: Story = {
  parameters: {
    docs: {
      description: {
        story: "An avatar with a microdot notification badge (top-right) and a live status badge (bottom-right) using the Badge component's microdot size variant.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-xl)" }}>
      {/* Notification dot */}
      <AvatarWithStatus>
        <Avatar>
          <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=face" alt="Alex Morgan" />
          <AvatarFallback>AM</AvatarFallback>
        </Avatar>
        <AvatarBadge position="top-right" />
      </AvatarWithStatus>

      {/* Live indicator */}
      <AvatarWithStatus>
        <Avatar>
          <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face" alt="Sarah Chen" />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
        <AvatarStatus status="online" />
      </AvatarWithStatus>

      {/* Both badges */}
      <AvatarWithStatus>
        <Avatar>
          <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" alt="Marcus Lee" />
          <AvatarFallback>ML</AvatarFallback>
        </Avatar>
        <AvatarBadge position="top-right" />
        <AvatarStatus status="online" />
      </AvatarWithStatus>
    </div>
  ),
}

export const WithStatusIndicator: Story = {
  parameters: {
    docs: {
      description: {
        story: "Avatars using the built-in AvatarStatus component for online/offline/busy/away presence indicators.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-xl)" }}>
      <AvatarWithStatus>
        <Avatar>
          <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=face" alt="Alex" />
          <AvatarFallback>AM</AvatarFallback>
        </Avatar>
        <AvatarStatus status="online" />
      </AvatarWithStatus>

      <AvatarWithStatus>
        <Avatar>
          <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face" alt="Sarah" />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
        <AvatarStatus status="busy" />
      </AvatarWithStatus>

      <AvatarWithStatus>
        <Avatar>
          <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" alt="Marcus" />
          <AvatarFallback>ML</AvatarFallback>
        </Avatar>
        <AvatarStatus status="away" />
      </AvatarWithStatus>

      <AvatarWithStatus>
        <Avatar>
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <AvatarStatus status="offline" />
      </AvatarWithStatus>
    </div>
  ),
}

export const WithCountBadge: Story = {
  parameters: {
    docs: {
      description: {
        story: "Avatars using AvatarBadge to display notification counts.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-xl)" }}>
      <AvatarWithStatus>
        <Avatar>
          <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=face" alt="Alex" />
          <AvatarFallback>AM</AvatarFallback>
        </Avatar>
        <AvatarBadge count={3} />
      </AvatarWithStatus>

      <AvatarWithStatus>
        <Avatar>
          <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face" alt="Sarah" />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
        <AvatarBadge count={128} />
      </AvatarWithStatus>
    </div>
  ),
}
