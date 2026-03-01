import type { Meta, StoryObj } from "@storybook/react"
import {
  ContentSpot,
  ContentSpotEyebrow,
  ContentSpotTitle,
  ContentSpotDescription,
  ContentSpotActions,
} from "./content-spot"
import { Button } from "@ragnar/core"

const meta: Meta<typeof ContentSpot> = {
  title: "Web/ContentSpot",
  component: ContentSpot,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <ContentSpot>
      <ContentSpotEyebrow>Introducing</ContentSpotEyebrow>
      <ContentSpotTitle>A better way to build</ContentSpotTitle>
      <ContentSpotDescription>
        Create stunning websites and applications with our comprehensive
        design system. Built for developers who value quality.
      </ContentSpotDescription>
      <ContentSpotActions>
        <Button size="lg">Get Started</Button>
        <Button size="lg" variant="outline">Learn More</Button>
      </ContentSpotActions>
    </ContentSpot>
  ),
}

export const LeftAligned: Story = {
  render: () => (
    <ContentSpot layout="left">
      <ContentSpotEyebrow>Our Mission</ContentSpotEyebrow>
      <ContentSpotTitle>Empowering developers worldwide</ContentSpotTitle>
      <ContentSpotDescription>
        We believe in making development faster, more enjoyable, and more
        accessible to everyone. Our tools help teams ship better products.
      </ContentSpotDescription>
      <ContentSpotActions>
        <Button>Join Us</Button>
      </ContentSpotActions>
    </ContentSpot>
  ),
}

export const LargeSize: Story = {
  render: () => (
    <ContentSpot size="xl">
      <ContentSpotEyebrow>Enterprise Ready</ContentSpotEyebrow>
      <ContentSpotTitle>Built for scale</ContentSpotTitle>
      <ContentSpotDescription>
        From startups to Fortune 500 companies, our platform scales with your
        needs. Enterprise-grade security and support included.
      </ContentSpotDescription>
      <ContentSpotActions>
        <Button size="lg">Contact Sales</Button>
        <Button size="lg" variant="outline">View Case Studies</Button>
      </ContentSpotActions>
    </ContentSpot>
  ),
}
