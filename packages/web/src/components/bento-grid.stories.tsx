import type { Meta, StoryObj } from "@storybook/react"
import {
  BentoGrid,
  BentoCard,
  BentoCardIcon,
  BentoCardTitle,
  BentoCardDescription,
  BentoCardLink,
  BentoCardBadge,
  BentoGridPreset,
} from "./bento-grid"
import { Zap, Shield, Palette, Globe, Code, Sparkles } from "lucide-react"

const meta: Meta<typeof BentoGrid> = {
  title: "Web/BentoGrid",
  component: BentoGrid,
  // Disable autodocs - many cards rendering can cause performance issues
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <BentoGrid>
      <BentoCard span={2}>
        <BentoCardIcon>
          <Zap className="h-6 w-6" />
        </BentoCardIcon>
        <BentoCardTitle>Lightning Fast</BentoCardTitle>
        <BentoCardDescription>
          Optimized for performance with minimal bundle size and zero runtime overhead.
        </BentoCardDescription>
        <BentoCardLink />
      </BentoCard>
      <BentoCard>
        <BentoCardIcon>
          <Shield className="h-6 w-6" />
        </BentoCardIcon>
        <BentoCardTitle>Secure</BentoCardTitle>
        <BentoCardDescription>
          Built with security best practices.
        </BentoCardDescription>
      </BentoCard>
      <BentoCard>
        <BentoCardIcon>
          <Palette className="h-6 w-6" />
        </BentoCardIcon>
        <BentoCardTitle>Customizable</BentoCardTitle>
        <BentoCardDescription>
          Easy to theme and customize.
        </BentoCardDescription>
      </BentoCard>
      <BentoCard span={2}>
        <BentoCardIcon>
          <Globe className="h-6 w-6" />
        </BentoCardIcon>
        <BentoCardTitle>Cross-Platform</BentoCardTitle>
        <BentoCardDescription>
          Works seamlessly across web and React Native applications.
        </BentoCardDescription>
        <BentoCardLink>Explore platforms</BentoCardLink>
      </BentoCard>
    </BentoGrid>
  ),
}

export const WithBadges: Story = {
  render: () => (
    <BentoGrid columns={3}>
      <BentoCard span={2} rowSpan={2} size="lg">
        <BentoCardBadge>New</BentoCardBadge>
        <BentoCardIcon>
          <Sparkles className="h-6 w-6" />
        </BentoCardIcon>
        <BentoCardTitle>AI-Powered Features</BentoCardTitle>
        <BentoCardDescription>
          Leverage the power of artificial intelligence to automate your workflow
          and boost productivity. Our AI assistant helps you write better code faster.
        </BentoCardDescription>
        <BentoCardLink>Try it now</BentoCardLink>
      </BentoCard>
      <BentoCard>
        <BentoCardBadge>Beta</BentoCardBadge>
        <BentoCardIcon>
          <Code className="h-6 w-6" />
        </BentoCardIcon>
        <BentoCardTitle>Code Generation</BentoCardTitle>
        <BentoCardDescription>
          Generate boilerplate code instantly.
        </BentoCardDescription>
      </BentoCard>
      <BentoCard>
        <BentoCardIcon>
          <Zap className="h-6 w-6" />
        </BentoCardIcon>
        <BentoCardTitle>Fast Builds</BentoCardTitle>
        <BentoCardDescription>
          Lightning-fast build times.
        </BentoCardDescription>
      </BentoCard>
    </BentoGrid>
  ),
}

export const GhostVariant: Story = {
  render: () => (
    <BentoGrid columns={2}>
      <BentoCard variant="ghost">
        <BentoCardIcon>
          <Zap className="h-6 w-6" />
        </BentoCardIcon>
        <BentoCardTitle>Performance</BentoCardTitle>
        <BentoCardDescription>
          Optimized for speed and efficiency.
        </BentoCardDescription>
      </BentoCard>
      <BentoCard variant="ghost">
        <BentoCardIcon>
          <Shield className="h-6 w-6" />
        </BentoCardIcon>
        <BentoCardTitle>Security</BentoCardTitle>
        <BentoCardDescription>
          Enterprise-grade security built-in.
        </BentoCardDescription>
      </BentoCard>
      <BentoCard variant="ghost">
        <BentoCardIcon>
          <Palette className="h-6 w-6" />
        </BentoCardIcon>
        <BentoCardTitle>Design</BentoCardTitle>
        <BentoCardDescription>
          Beautiful, modern interface.
        </BentoCardDescription>
      </BentoCard>
      <BentoCard variant="ghost">
        <BentoCardIcon>
          <Globe className="h-6 w-6" />
        </BentoCardIcon>
        <BentoCardTitle>Global</BentoCardTitle>
        <BentoCardDescription>
          Available worldwide.
        </BentoCardDescription>
      </BentoCard>
    </BentoGrid>
  ),
}

export const DottedVariant: Story = {
  render: () => (
    <BentoGrid columns={3}>
      <BentoCard variant="dotted" span={2}>
        <BentoCardIcon>
          <Sparkles className="h-6 w-6" />
        </BentoCardIcon>
        <BentoCardTitle>Premium Features</BentoCardTitle>
        <BentoCardDescription>
          Unlock the full potential of our platform with premium features.
        </BentoCardDescription>
        <BentoCardLink>Learn more</BentoCardLink>
      </BentoCard>
      <BentoCard variant="dotted">
        <BentoCardIcon>
          <Code className="h-6 w-6" />
        </BentoCardIcon>
        <BentoCardTitle>Developer Tools</BentoCardTitle>
        <BentoCardDescription>
          Powerful tools for developers.
        </BentoCardDescription>
      </BentoCard>
    </BentoGrid>
  ),
}

export const PresetLayouts: Story = {
  render: () => (
    <BentoGridPreset layout="featured">
      <BentoCard span={2} rowSpan={2} size="lg">
        <BentoCardIcon>
          <Sparkles className="h-6 w-6" />
        </BentoCardIcon>
        <BentoCardTitle>Featured</BentoCardTitle>
        <BentoCardDescription>
          This card spans multiple rows and columns.
        </BentoCardDescription>
      </BentoCard>
      <BentoCard>
        <BentoCardTitle>Card 1</BentoCardTitle>
        <BentoCardDescription>Small card</BentoCardDescription>
      </BentoCard>
      <BentoCard>
        <BentoCardTitle>Card 2</BentoCardTitle>
        <BentoCardDescription>Small card</BentoCardDescription>
      </BentoCard>
      <BentoCard>
        <BentoCardTitle>Card 3</BentoCardTitle>
        <BentoCardDescription>Small card</BentoCardDescription>
      </BentoCard>
    </BentoGridPreset>
  ),
}
