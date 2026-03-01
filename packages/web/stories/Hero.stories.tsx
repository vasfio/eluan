import type { Meta, StoryObj } from "@storybook/react";
import {
  Hero,
  HeroBadge,
  HeroTitle,
  HeroSubtitle,
  HeroActions,
  HeroImage,
} from "@/components/hero";
import { Button } from "@/components/button";

const meta: Meta<typeof Hero> = {
  title: "Marketing/Hero",
  component: Hero,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "default", "lg", "full"],
    },
    align: {
      control: "select",
      options: ["left", "center", "right"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Hero>;

export const Default: Story = {
  render: () => (
    <Hero>
      <HeroBadge>New Release v2.0</HeroBadge>
      <HeroTitle>Build amazing products with our platform</HeroTitle>
      <HeroSubtitle>
        The all-in-one solution for modern teams. Ship faster, collaborate
        better, and delight your customers.
      </HeroSubtitle>
      <HeroActions>
        <Button size="lg">Start Free Trial</Button>
        <Button size="lg" variant="outline">
          Book a Demo
        </Button>
      </HeroActions>
    </Hero>
  ),
};

export const WithImage: Story = {
  render: () => (
    <Hero size="lg">
      <HeroBadge>Trusted by 10,000+ teams</HeroBadge>
      <HeroTitle>The future of team collaboration</HeroTitle>
      <HeroSubtitle>
        Streamline your workflow with our intuitive platform designed for
        modern teams.
      </HeroSubtitle>
      <HeroActions>
        <Button size="lg">Get Started Free</Button>
        <Button size="lg" variant="ghost">
          Watch Demo
        </Button>
      </HeroActions>
      <HeroImage>
        <div className="aspect-video rounded-xl border bg-muted shadow-2xl" />
      </HeroImage>
    </Hero>
  ),
};

export const LeftAligned: Story = {
  render: () => (
    <Hero align="left">
      <HeroTitle>Developer tools that just work</HeroTitle>
      <HeroSubtitle>
        Stop fighting your tools and start building. Our platform gets out of
        your way so you can focus on what matters.
      </HeroSubtitle>
      <HeroActions className="justify-start">
        <Button size="lg">View Documentation</Button>
        <Button size="lg" variant="outline">
          GitHub
        </Button>
      </HeroActions>
    </Hero>
  ),
};

export const FullHeight: Story = {
  render: () => (
    <Hero size="full">
      <HeroTitle>Welcome to the future</HeroTitle>
      <HeroSubtitle>
        Experience the next generation of web applications.
      </HeroSubtitle>
      <HeroActions>
        <Button size="lg">Explore Now</Button>
      </HeroActions>
    </Hero>
  ),
};

export const SmallHero: Story = {
  render: () => (
    <Hero size="sm">
      <HeroTitle className="text-2xl sm:text-3xl md:text-4xl">
        Simple pricing for everyone
      </HeroTitle>
      <HeroSubtitle className="text-base sm:text-lg">
        No hidden fees. No surprises. Cancel anytime.
      </HeroSubtitle>
    </Hero>
  ),
};

export const WithBackgroundGradient: Story = {
  render: () => (
    <Hero className="bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <HeroBadge>Launch Week 2024</HeroBadge>
      <HeroTitle>Introducing our biggest update yet</HeroTitle>
      <HeroSubtitle>
        Packed with new features, performance improvements, and a fresh new
        look.
      </HeroSubtitle>
      <HeroActions>
        <Button size="lg">See What's New</Button>
        <Button size="lg" variant="outline">
          Read Announcement
        </Button>
      </HeroActions>
    </Hero>
  ),
};
