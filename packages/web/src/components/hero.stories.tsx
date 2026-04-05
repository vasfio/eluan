import type { Meta, StoryObj } from "@storybook/react"
import { Hero, HeroBadge, HeroTitle, HeroSubtitle, HeroActions, HeroImage } from "./hero"
import { Button } from "@ragnar/core"

const meta: Meta<typeof Hero> = {
  title: "Web/Hero",
  component: Hero,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Hero>
      <HeroBadge>New Release</HeroBadge>
      <HeroTitle>Build beautiful websites faster than ever</HeroTitle>
      <HeroSubtitle>
        A complete design system with components for React and React Native.
        Ship faster with pre-built, accessible UI components.
      </HeroSubtitle>
      <HeroActions>
        <Button size="lg">Get Started</Button>
        <Button size="lg" variant="outline">Learn More</Button>
      </HeroActions>
    </Hero>
  ),
}

export const LeftAligned: Story = {
  render: () => (
    <Hero align="left">
      <HeroBadge>Introducing Ragnar</HeroBadge>
      <HeroTitle>The modern design system for web and mobile</HeroTitle>
      <HeroSubtitle>
        Build consistent, accessible interfaces across platforms with our
        comprehensive component library.
      </HeroSubtitle>
      <HeroActions className="justify-start">
        <Button size="lg">Start Building</Button>
        <Button size="lg" variant="outline">View Docs</Button>
      </HeroActions>
    </Hero>
  ),
}

export const FullHeight: Story = {
  render: () => (
    <Hero size="full">
      <HeroBadge>Welcome</HeroBadge>
      <HeroTitle>Your product, beautifully presented</HeroTitle>
      <HeroSubtitle>
        Create stunning landing pages with minimal effort using our
        pre-designed sections and components.
      </HeroSubtitle>
      <HeroActions>
        <Button size="lg">Get Started Free</Button>
      </HeroActions>
    </Hero>
  ),
}

export const WithImage: Story = {
  render: () => (
    <Hero>
      <HeroBadge>Version 2.0</HeroBadge>
      <HeroTitle>Reimagined from the ground up</HeroTitle>
      <HeroSubtitle>
        Experience the next generation of design systems with improved
        performance, accessibility, and developer experience.
      </HeroSubtitle>
      <HeroActions>
        <Button size="lg">Explore Now</Button>
        <Button size="lg" variant="outline">Watch Demo</Button>
      </HeroActions>
      <HeroImage>
        <div className="aspect-video w-full rounded-xl border bg-muted flex items-center justify-center text-muted-foreground">
          Product Screenshot
        </div>
      </HeroImage>
    </Hero>
  ),
}
