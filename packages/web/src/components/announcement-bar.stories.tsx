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
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <AnnouncementBar>
      🎉 New feature release! Check out our latest updates.
    </AnnouncementBar>
  ),
}

export const WithLink: Story = {
  render: () => (
    <AnnouncementBar href="#">
      Get 20% off your first order with code WELCOME20
    </AnnouncementBar>
  ),
}

export const WithIcon: Story = {
  render: () => (
    <AnnouncementBar icon={<Sparkles className="h-4 w-4" />}>
      Introducing our newest product line!
    </AnnouncementBar>
  ),
}

export const Variants: Story = {
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
  render: () => (
    <AnnouncementBar dismissible={false} variant="warning">
      ⚠️ Scheduled maintenance on Sunday, 2 AM - 6 AM UTC
    </AnnouncementBar>
  ),
}
