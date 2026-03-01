import type { Meta, StoryObj } from "@storybook/react"
import {
  GradientText,
  GradientHeading,
  GradientBorder,
  GradientBackground,
  GradientDivider,
  GradientBlob,
} from "./gradient-text"

const meta: Meta<typeof GradientText> = {
  title: "Web/GradientText",
  component: GradientText,
  // Disable autodocs - animated backgrounds/blobs cause memory issues when pre-rendered
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="space-y-4 p-8">
      <p className="text-4xl font-bold">
        Build <GradientText>beautiful</GradientText> interfaces
      </p>
    </div>
  ),
}

export const Presets: Story = {
  render: () => (
    <div className="space-y-4 p-8 text-4xl font-bold">
      <p><GradientText gradient="primary">Primary Gradient</GradientText></p>
      <p><GradientText gradient="rainbow">Rainbow Gradient</GradientText></p>
      <p><GradientText gradient="sunset">Sunset Gradient</GradientText></p>
      <p><GradientText gradient="ocean">Ocean Gradient</GradientText></p>
      <p><GradientText gradient="forest">Forest Gradient</GradientText></p>
      <p><GradientText gradient="fire">Fire Gradient</GradientText></p>
      <p><GradientText gradient="aurora">Aurora Gradient</GradientText></p>
      <p><GradientText gradient="neon">Neon Gradient</GradientText></p>
      <p><GradientText gradient="gold">Gold Gradient</GradientText></p>
      <p><GradientText gradient="silver">Silver Gradient</GradientText></p>
    </div>
  ),
}

export const CustomGradient: Story = {
  render: () => (
    <div className="p-8">
      <p className="text-4xl font-bold">
        <GradientText gradient="custom" customGradient="from-pink-500 via-red-500 to-yellow-500">
          Custom Gradient Colors
        </GradientText>
      </p>
    </div>
  ),
}

export const Headings: Story = {
  render: () => (
    <div className="space-y-4 p-8">
      <GradientHeading level={1} gradient="rainbow">
        Heading Level 1
      </GradientHeading>
      <GradientHeading level={2} gradient="ocean">
        Heading Level 2
      </GradientHeading>
      <GradientHeading level={3} gradient="sunset">
        Heading Level 3
      </GradientHeading>
      <GradientHeading level={4} gradient="neon">
        Heading Level 4
      </GradientHeading>
    </div>
  ),
}

export const Border: Story = {
  render: () => (
    <div className="space-y-4 p-8">
      <GradientBorder>
        <div className="p-6">
          <h3 className="font-semibold">Gradient Border Card</h3>
          <p className="text-muted-foreground mt-2">
            This card has a beautiful gradient border effect.
          </p>
        </div>
      </GradientBorder>
      <GradientBorder gradient="from-cyan-500 via-blue-500 to-indigo-500" borderWidth={3}>
        <div className="p-6">
          <h3 className="font-semibold">Custom Gradient Border</h3>
          <p className="text-muted-foreground mt-2">
            With custom colors and thicker border.
          </p>
        </div>
      </GradientBorder>
    </div>
  ),
}

export const Divider: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      <div>
        <p className="text-center mb-4">Default Divider</p>
        <GradientDivider />
      </div>
      <div>
        <p className="text-center mb-4">Custom Gradient Divider</p>
        <GradientDivider gradient="from-transparent via-pink-500 to-transparent" />
      </div>
      <div>
        <p className="text-center mb-4">Ocean Gradient Divider</p>
        <GradientDivider gradient="from-cyan-500 via-blue-500 to-indigo-500" />
      </div>
    </div>
  ),
}

export const Background: Story = {
  render: () => (
    <div className="relative h-[300px] rounded-xl overflow-hidden">
      <GradientBackground />
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Animated Background</h2>
          <p className="mt-2 text-muted-foreground">
            Subtle gradient animation in the background
          </p>
        </div>
      </div>
    </div>
  ),
}

export const Blobs: Story = {
  render: () => (
    <div className="relative h-[400px] rounded-xl overflow-hidden bg-background">
      <GradientBlob color="bg-purple-500/30" className="top-0 left-0" />
      <GradientBlob color="bg-blue-500/30" className="bottom-0 right-0" size="md" />
      <GradientBlob color="bg-pink-500/30" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size="xl" blur="lg" />
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Gradient Blobs</h2>
          <p className="mt-2 text-muted-foreground">
            Decorative blurred gradient elements
          </p>
        </div>
      </div>
    </div>
  ),
}

export const AnimatedText: Story = {
  render: () => (
    <div className="p-8 text-4xl font-bold">
      <GradientText gradient="rainbow" animate="shimmer">
        Shimmer Animation Effect
      </GradientText>
    </div>
  ),
}
