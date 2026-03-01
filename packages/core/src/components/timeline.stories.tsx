import type { Meta, StoryObj } from "@storybook/react"
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineBody,
  TimelineTitle,
  TimelineDescription,
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
        <TimelineConnector />
        <TimelineHeader>
          <TimelineIcon />
          <TimelineTitle>Order Placed</TimelineTitle>
        </TimelineHeader>
        <TimelineBody>
          <TimelineDescription>Your order has been placed successfully.</TimelineDescription>
        </TimelineBody>
      </TimelineItem>
      <TimelineItem>
        <TimelineConnector />
        <TimelineHeader>
          <TimelineIcon />
          <TimelineTitle>Processing</TimelineTitle>
        </TimelineHeader>
        <TimelineBody>
          <TimelineDescription>We are preparing your order.</TimelineDescription>
        </TimelineBody>
      </TimelineItem>
      <TimelineItem>
        <TimelineConnector />
        <TimelineHeader>
          <TimelineIcon />
          <TimelineTitle>Shipped</TimelineTitle>
        </TimelineHeader>
        <TimelineBody>
          <TimelineDescription>Your order is on its way.</TimelineDescription>
        </TimelineBody>
      </TimelineItem>
      <TimelineItem>
        <TimelineHeader>
          <TimelineIcon />
          <TimelineTitle>Delivered</TimelineTitle>
        </TimelineHeader>
        <TimelineBody>
          <TimelineDescription>Package has been delivered.</TimelineDescription>
        </TimelineBody>
      </TimelineItem>
    </Timeline>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <Timeline orientation="horizontal">
      <TimelineItem>
        <TimelineConnector />
        <TimelineHeader>
          <TimelineIcon />
          <TimelineTitle>Step 1</TimelineTitle>
        </TimelineHeader>
      </TimelineItem>
      <TimelineItem>
        <TimelineConnector />
        <TimelineHeader>
          <TimelineIcon />
          <TimelineTitle>Step 2</TimelineTitle>
        </TimelineHeader>
      </TimelineItem>
      <TimelineItem>
        <TimelineConnector />
        <TimelineHeader>
          <TimelineIcon />
          <TimelineTitle>Step 3</TimelineTitle>
        </TimelineHeader>
      </TimelineItem>
      <TimelineItem>
        <TimelineHeader>
          <TimelineIcon />
          <TimelineTitle>Complete</TimelineTitle>
        </TimelineHeader>
      </TimelineItem>
    </Timeline>
  ),
}
