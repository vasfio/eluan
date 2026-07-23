import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import { Button } from "./button"

const meta: Meta<typeof HoverCard> = {
  title: "Components/Hover Card",
  component: HoverCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A popup card that appears on hover, designed to preview content behind a link or element without requiring a click.

**Import**
\`\`\`tsx
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@eluan/core"
\`\`\`

**Usage**
\`\`\`tsx
<HoverCard>
  <HoverCardTrigger asChild>
    <a href="#">@username</a>
  </HoverCardTrigger>
  <HoverCardContent>
    <p>Preview content here</p>
  </HoverCardContent>
</HoverCard>
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
        story: "A hover card showing a user profile with avatar, name, and join date.",
      },
    },
  },
  render: () => (
    <div style={storyWrapper}>
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="ghost">@nextjs</Button>
        </HoverCardTrigger>
        <HoverCardContent>
          <div style={{ display: "flex", gap: "var(--spacing-md)" }}>
            <Avatar>
              <AvatarImage src="https://github.com/vercel.png" />
              <AvatarFallback>VC</AvatarFallback>
            </Avatar>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-xxs)" }}>
              <h4 style={{ fontSize: "var(--font-size-sm)", fontWeight: 600, margin: 0 }}>@nextjs</h4>
              <p style={{ fontSize: "var(--font-size-sm)", margin: 0 }}>
                The React Framework – created and maintained by @vercel.
              </p>
              <div style={{ alignItems: "center", display: "flex", paddingTop: "var(--spacing-xs)" }}>
                <span style={{ fontSize: "var(--font-size-xs)", color: "var(--container-fg-alt)" }}>
                  Joined December 2021
                </span>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
}

// Top-left padded wrapper (no centering) so the card visibly hangs off its
// trigger; the extra bottom room keeps the opened card from being clipped.
const storyWrapper: React.CSSProperties = {
  paddingTop: "var(--spacing-lg)",
  paddingInline: "var(--spacing-lg)",
  paddingBottom: 200,
}

export const Simple: Story = {
  parameters: {
    docs: {
      description: {
        story: "A minimal hover card with plain text content.",
      },
    },
  },
  render: () => (
    <div style={storyWrapper}>
      <HoverCard>
        <HoverCardTrigger asChild>
          <span
            style={{
              cursor: "pointer",
              fontSize: "var(--font-size-sm)",
              fontWeight: 500,
              textDecorationLine: "underline",
            }}
          >
            Hover me
          </span>
        </HoverCardTrigger>
        <HoverCardContent>
          <p style={{ fontSize: "var(--font-size-sm)", margin: 0 }}>
            This is a simple hover card with some content.
          </p>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
}
