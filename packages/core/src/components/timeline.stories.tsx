import type { Meta, StoryObj } from "@storybook/react"
import {
  Timeline,
  TimelineItem,
  TimelineLine,
  TimelineDot,
  TimelineContent,
  TimelineHeader,
  TimelineTitle,
  TimelineDescription,
  TimelineHorizontal,
  TimelineHorizontalItem,
  TimelineHorizontalLine,
} from "./timeline"

const meta: Meta<typeof Timeline> = {
  title: "Components/Timeline",
  component: Timeline,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Timeline>
      <TimelineItem>
        <TimelineLine />
        <TimelineHeader>
          <TimelineDot variant="filled" />
          <TimelineTitle>Order Placed</TimelineTitle>
        </TimelineHeader>
        <TimelineContent>
          <TimelineDescription>Your order has been placed successfully.</TimelineDescription>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineLine />
        <TimelineHeader>
          <TimelineDot variant="filled" />
          <TimelineTitle>Processing</TimelineTitle>
        </TimelineHeader>
        <TimelineContent>
          <TimelineDescription>We are preparing your order.</TimelineDescription>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineLine />
        <TimelineHeader>
          <TimelineDot />
          <TimelineTitle>Shipped</TimelineTitle>
        </TimelineHeader>
        <TimelineContent>
          <TimelineDescription>Your order is on its way.</TimelineDescription>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineHeader>
          <TimelineDot />
          <TimelineTitle>Delivered</TimelineTitle>
        </TimelineHeader>
        <TimelineContent>
          <TimelineDescription>Package has been delivered.</TimelineDescription>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  ),
}

export const WithVariants: Story = {
  render: () => (
    <Timeline>
      <TimelineItem variant="success">
        <TimelineLine />
        <TimelineHeader>
          <TimelineDot variant="filled" />
          <TimelineTitle>Completed</TimelineTitle>
        </TimelineHeader>
        <TimelineContent>
          <TimelineDescription>This step was completed successfully.</TimelineDescription>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem variant="warning">
        <TimelineLine variant="dashed" />
        <TimelineHeader>
          <TimelineDot />
          <TimelineTitle>Pending Review</TimelineTitle>
        </TimelineHeader>
        <TimelineContent>
          <TimelineDescription>Awaiting approval.</TimelineDescription>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem variant="error">
        <TimelineHeader>
          <TimelineDot variant="outline" />
          <TimelineTitle>Failed</TimelineTitle>
        </TimelineHeader>
        <TimelineContent>
          <TimelineDescription>Something went wrong.</TimelineDescription>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <TimelineHorizontal>
      {["Step 1", "Step 2", "Step 3", "Complete"].map((label, i, arr) => (
        <TimelineHorizontalItem key={label} className="flex-1">
          {i < arr.length - 1 && <TimelineHorizontalLine />}
          <TimelineDot variant="filled" className="relative" />
          <span className="mt-2 text-sm font-medium">{label}</span>
        </TimelineHorizontalItem>
      ))}
    </TimelineHorizontal>
  ),
}
