import type { Meta, StoryObj } from "@storybook/react"
import {
  AnnouncementBar,
  RotatingAnnouncementBar,
  CountdownAnnouncementBar,
} from "./announcement-bar"
import { Sparkles } from "lucide-react"

const meta: Meta<typeof AnnouncementBar> = {
  title: "Web/AnnouncementBar",
  component: AnnouncementBar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A top-of-page announcement bar with multiple color variants, optional dismiss button, icon, link, rotating messages, and countdown timer.

**Import**
\`\`\`tsx
import { AnnouncementBar, RotatingAnnouncementBar, CountdownAnnouncementBar } from "@vasf/ragnar-web"
\`\`\`

**Usage**
\`\`\`tsx
<AnnouncementBar variant="default" href="/sale" dismissible>
  20% off this week!
</AnnouncementBar>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      description: "Color variant: default, secondary, muted, success, warning, error, gradient, or dark.",
    },
    size: {
      description: "Bar height: sm, default, or lg.",
    },
    dismissible: {
      description: "Whether the bar can be dismissed with a close button.",
    },
    href: {
      description: "Makes the entire bar a clickable link.",
    },
    icon: {
      description: "Optional icon displayed before the text.",
    },
    isVisible: {
      description: "Controls visibility of the bar.",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: { docs: { description: { story: "Default dismissible announcement bar." } } },
  render: () => (
    <AnnouncementBar>
      🎉 New feature release! Check out our latest updates.
    </AnnouncementBar>
  ),
}

export const WithLink: Story = {
  parameters: { docs: { description: { story: "Clickable bar with an arrow icon indicating navigation." } } },
  render: () => (
    <AnnouncementBar href="#">
      Get 20% off your first order with code WELCOME20
    </AnnouncementBar>
  ),
}

export const WithIcon: Story = {
  parameters: { docs: { description: { story: "Announcement with a custom Sparkles icon." } } },
  render: () => (
    <AnnouncementBar icon={<Sparkles className="h-4 w-4" />}>
      Introducing our newest product line!
    </AnnouncementBar>
  ),
}

export const Variants: Story = {
  parameters: { docs: { description: { story: "All color variants displayed together." } } },
  render: () => (
    <div className="space-y-2">
      <AnnouncementBar variant="default" dismissible={false}>
        Default variant
      </AnnouncementBar>
      <AnnouncementBar variant="secondary" dismissible={false}>
        Secondary variant
      </AnnouncementBar>
      <AnnouncementBar variant="success" dismissible={false}>
        Success variant
      </AnnouncementBar>
      <AnnouncementBar variant="warning" dismissible={false}>
        Warning variant
      </AnnouncementBar>
      <AnnouncementBar variant="error" dismissible={false}>
        Error variant
      </AnnouncementBar>
      <AnnouncementBar variant="gradient" dismissible={false}>
        Gradient variant
      </AnnouncementBar>
      <AnnouncementBar variant="dark" dismissible={false}>
        Dark variant
      </AnnouncementBar>
    </div>
  ),
}

export const Sizes: Story = {
  parameters: { docs: { description: { story: "Small, default, and large size options." } } },
  render: () => (
    <div className="space-y-2">
      <AnnouncementBar size="sm" dismissible={false}>
        Small size announcement
      </AnnouncementBar>
      <AnnouncementBar size="default" dismissible={false}>
        Default size announcement
      </AnnouncementBar>
      <AnnouncementBar size="lg" dismissible={false}>
        Large size announcement
      </AnnouncementBar>
    </div>
  ),
}

export const Rotating: Story = {
  parameters: { docs: { description: { story: "RotatingAnnouncementBar cycles through multiple messages on a timer." } } },
  render: () => (
    <RotatingAnnouncementBar
      messages={[
        { text: "Free shipping on orders over $50!" },
        { text: "New arrivals are here!", href: "#" },
        { text: "Join our newsletter for 10% off" },
      ]}
      interval={3000}
      variant="gradient"
    />
  ),
}

export const Countdown: Story = {
  parameters: { docs: { description: { story: "CountdownAnnouncementBar with a live countdown timer to a target date." } } },
  render: () => (
    <CountdownAnnouncementBar
      targetDate={new Date(Date.now() + 24 * 60 * 60 * 1000)}
      prefix="Flash sale ends in"
      variant="error"
      href="#"
    />
  ),
}

export const NonDismissible: Story = {
  parameters: { docs: { description: { story: "A non-dismissible warning bar for critical notices." } } },
  render: () => (
    <AnnouncementBar dismissible={false} variant="warning">
      ⚠️ Scheduled maintenance on Sunday, 2 AM - 6 AM UTC
    </AnnouncementBar>
  ),
}
