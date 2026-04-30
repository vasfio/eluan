import type { Meta, StoryObj } from "@storybook/react"
import {
  CTASection,
  CTAContent,
  CTATitle,
  CTADescription,
  CTAActions,
  CTACard,
} from "./cta-section"
import { Button } from "@vasf/ragnar-core"

const meta: Meta<typeof CTASection> = {
  title: "Web/CTASection",
  component: CTASection,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A call-to-action section with composable title, description, and action buttons, available in default, muted, primary, gradient, dark, and bordered variants.

**Import**
\`\`\`tsx
import { CTASection, CTAContent, CTATitle, CTADescription, CTAActions, CTACard } from "@vasf/ragnar-web"
\`\`\`

**Usage**
\`\`\`tsx
<CTASection variant="primary">
  <CTAContent>
    <CTATitle>Get started</CTATitle>
    <CTADescription>Try it free.</CTADescription>
    <CTAActions>
      <Button>Sign Up</Button>
    </CTAActions>
  </CTAContent>
</CTASection>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      description: "Background style: default, muted, primary, gradient, dark, or bordered.",
    },
    size: {
      description: "Vertical padding: sm, default, or lg.",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: { docs: { description: { story: "Default CTA with centered title, description, and two action buttons." } } },
  render: () => (
    <CTASection>
      <CTAContent>
        <CTATitle>Ready to get started?</CTATitle>
        <CTADescription>
          Join thousands of developers building better products with our platform.
          Start your free trial today.
        </CTADescription>
        <CTAActions className="justify-center">
          <Button size="lg">Start Free Trial</Button>
          <Button size="lg" variant="outline">Talk to Sales</Button>
        </CTAActions>
      </CTAContent>
    </CTASection>
  ),
}

export const Primary: Story = {
  parameters: { docs: { description: { story: "Primary-colored background for high-visibility placement." } } },
  render: () => (
    <CTASection variant="primary">
      <CTAContent>
        <CTATitle>Start building today</CTATitle>
        <CTADescription>
          Get access to all features for 14 days. No credit card required.
        </CTADescription>
        <CTAActions className="justify-center">
          <Button size="lg" variant="secondary">Get Started Free</Button>
        </CTAActions>
      </CTAContent>
    </CTASection>
  ),
}

export const Gradient: Story = {
  parameters: { docs: { description: { story: "Gradient background with light-styled buttons." } } },
  render: () => (
    <CTASection variant="gradient">
      <CTAContent>
        <CTATitle>Transform your workflow</CTATitle>
        <CTADescription>
          Experience the power of modern development tools. Ship faster, build better.
        </CTADescription>
        <CTAActions className="justify-center">
          <Button size="lg" variant="secondary">Try It Now</Button>
          <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
            Learn More
          </Button>
        </CTAActions>
      </CTAContent>
    </CTASection>
  ),
}

export const Split: Story = {
  parameters: { docs: { description: { story: "Split layout with title/description on the left and actions on the right." } } },
  render: () => (
    <CTASection>
      <CTAContent align="split" maxWidth="full">
        <div>
          <CTATitle>Ready to dive in?</CTATitle>
          <CTADescription className="mt-2">
            Start your free trial today.
          </CTADescription>
        </div>
        <CTAActions>
          <Button size="lg">Get Started</Button>
          <Button size="lg" variant="outline">Learn More</Button>
        </CTAActions>
      </CTAContent>
    </CTASection>
  ),
}

export const WithCard: Story = {
  parameters: { docs: { description: { story: "CTA wrapped in a card container over a muted background." } } },
  render: () => (
    <CTASection variant="muted">
      <CTACard>
        <CTAContent>
          <CTATitle>Subscribe to our newsletter</CTATitle>
          <CTADescription>
            Get the latest updates, tips, and resources delivered straight to your inbox.
          </CTADescription>
          <div className="mt-8 flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md border bg-background"
            />
            <Button>Subscribe</Button>
          </div>
        </CTAContent>
      </CTACard>
    </CTASection>
  ),
}
