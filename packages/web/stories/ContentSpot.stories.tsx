import type { Meta, StoryObj } from "@storybook/react";
import {
  ContentSpot,
  ContentSpotEyebrow,
  ContentSpotTitle,
  ContentSpotDescription,
  ContentSpotActions,
} from "@/components/content-spot";
import { Button } from "@/components/button";

const meta: Meta<typeof ContentSpot> = {
  title: "Marketing/ContentSpot",
  component: ContentSpot,
  tags: ["autodocs"],
  argTypes: {
    layout: {
      control: "select",
      options: ["default", "left", "right"],
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg", "xl", "full"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ContentSpot>;

export const Default: Story = {
  render: () => (
    <ContentSpot>
      <ContentSpotEyebrow>Introducing</ContentSpotEyebrow>
      <ContentSpotTitle>Build better products faster</ContentSpotTitle>
      <ContentSpotDescription>
        Our platform helps teams collaborate more effectively and ship products
        that customers love. Start building today.
      </ContentSpotDescription>
      <ContentSpotActions>
        <Button size="lg">Get Started</Button>
        <Button size="lg" variant="outline">
          Learn More
        </Button>
      </ContentSpotActions>
    </ContentSpot>
  ),
};

export const LeftAligned: Story = {
  render: () => (
    <ContentSpot layout="left" size="lg">
      <ContentSpotEyebrow>Our Mission</ContentSpotEyebrow>
      <ContentSpotTitle>Empowering developers worldwide</ContentSpotTitle>
      <ContentSpotDescription>
        We believe in making development tools accessible to everyone. Our
        mission is to help developers build amazing things without barriers.
      </ContentSpotDescription>
      <ContentSpotActions>
        <Button>Join Us</Button>
      </ContentSpotActions>
    </ContentSpot>
  ),
};

export const LargeSize: Story = {
  render: () => (
    <ContentSpot size="xl">
      <ContentSpotTitle>
        The future of design systems is here
      </ContentSpotTitle>
      <ContentSpotDescription>
        Create consistent, beautiful interfaces across all your products with our
        comprehensive component library.
      </ContentSpotDescription>
    </ContentSpot>
  ),
};

export const WithoutEyebrow: Story = {
  render: () => (
    <ContentSpot>
      <ContentSpotTitle>Simple, powerful, flexible</ContentSpotTitle>
      <ContentSpotDescription>
        Everything you need to build modern web applications. No compromises.
      </ContentSpotDescription>
      <ContentSpotActions>
        <Button size="lg">Start Free Trial</Button>
      </ContentSpotActions>
    </ContentSpot>
  ),
};
