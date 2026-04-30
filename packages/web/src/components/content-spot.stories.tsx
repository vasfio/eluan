import type { Meta, StoryObj } from "@storybook/react"
import {
  ContentSpot,
  ContentSpotEyebrow,
  ContentSpotTitle,
  ContentSpotDescription,
  ContentSpotActions,
} from "./content-spot"
import { Button } from "@vasf/ragnar-core"

const meta: Meta<typeof ContentSpot> = {
  title: "Web/ContentSpot",
  component: ContentSpot,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A content spotlight section with eyebrow text, title, description, and action buttons, supporting centered, left, and right layouts.

**Import**
\`\`\`tsx
import { ContentSpot, ContentSpotEyebrow, ContentSpotTitle, ContentSpotDescription, ContentSpotActions } from "@vasf/ragnar-web"
\`\`\`

**Usage**
\`\`\`tsx
<ContentSpot layout="left" size="lg">
  <ContentSpotEyebrow>New</ContentSpotEyebrow>
  <ContentSpotTitle>Title</ContentSpotTitle>
  <ContentSpotDescription>Description text.</ContentSpotDescription>
  <ContentSpotActions>
    <Button>Action</Button>
  </ContentSpotActions>
</ContentSpot>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    layout: {
      description: "Text alignment: default (center), left, or right.",
    },
    size: {
      description: "Vertical padding and text size: sm, default, lg, xl, or full.",
    },
    container: {
      description: "Whether to wrap content in a centered container.",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: { docs: { description: { story: "Center-aligned content spot with eyebrow, title, description, and two action buttons." } } },
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
  parameters: { docs: { description: { story: "Left-aligned layout variant for asymmetric page designs." } } },
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
  parameters: { docs: { description: { story: "Extra-large size with increased vertical padding and text scale." } } },
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
