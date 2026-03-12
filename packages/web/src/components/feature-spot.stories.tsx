import type { Meta, StoryObj } from "@storybook/react"
import {
  FeatureSpot,
  FeatureSpotHeader,
  FeatureSpotTitle,
  FeatureSpotDescription,
  FeatureSpotGrid,
  FeatureSpotItem,
  FeatureSpotItemTitle,
  FeatureSpotItemDescription,
  FeatureSpotSplit,
  FeatureSpotContent,
  FeatureSpotMedia,
} from "./feature-spot"
import { Zap, Shield, Palette, Globe, Sparkles, Code } from "lucide-react"
import { Button } from "@frolda/ragnar-core"

const meta: Meta<typeof FeatureSpot> = {
  title: "Web/FeatureSpot",
  component: FeatureSpot,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Grid: Story = {
  render: () => (
    <FeatureSpot>
      <FeatureSpotHeader>
        <FeatureSpotTitle>Everything you need to build modern apps</FeatureSpotTitle>
        <FeatureSpotDescription>
          Our comprehensive toolkit provides all the components and utilities
          you need to ship faster.
        </FeatureSpotDescription>
      </FeatureSpotHeader>
      <FeatureSpotGrid>
        <FeatureSpotItem icon={<Zap className="h-6 w-6" />}>
          <FeatureSpotItemTitle>Lightning Fast</FeatureSpotItemTitle>
          <FeatureSpotItemDescription>
            Optimized for performance with minimal bundle size and zero runtime overhead.
          </FeatureSpotItemDescription>
        </FeatureSpotItem>
        <FeatureSpotItem icon={<Shield className="h-6 w-6" />}>
          <FeatureSpotItemTitle>Fully Accessible</FeatureSpotItemTitle>
          <FeatureSpotItemDescription>
            Built with accessibility in mind, following WCAG guidelines out of the box.
          </FeatureSpotItemDescription>
        </FeatureSpotItem>
        <FeatureSpotItem icon={<Palette className="h-6 w-6" />}>
          <FeatureSpotItemTitle>Customizable</FeatureSpotItemTitle>
          <FeatureSpotItemDescription>
            Easily theme and customize components to match your brand identity.
          </FeatureSpotItemDescription>
        </FeatureSpotItem>
        <FeatureSpotItem icon={<Globe className="h-6 w-6" />}>
          <FeatureSpotItemTitle>Cross-Platform</FeatureSpotItemTitle>
          <FeatureSpotItemDescription>
            Works seamlessly across web and React Native applications.
          </FeatureSpotItemDescription>
        </FeatureSpotItem>
        <FeatureSpotItem icon={<Sparkles className="h-6 w-6" />}>
          <FeatureSpotItemTitle>Modern Design</FeatureSpotItemTitle>
          <FeatureSpotItemDescription>
            Beautiful, modern components designed for today's applications.
          </FeatureSpotItemDescription>
        </FeatureSpotItem>
        <FeatureSpotItem icon={<Code className="h-6 w-6" />}>
          <FeatureSpotItemTitle>Developer Experience</FeatureSpotItemTitle>
          <FeatureSpotItemDescription>
            TypeScript-first with excellent IDE support and documentation.
          </FeatureSpotItemDescription>
        </FeatureSpotItem>
      </FeatureSpotGrid>
    </FeatureSpot>
  ),
}

export const SplitLayout: Story = {
  render: () => (
    <FeatureSpot>
      <FeatureSpotSplit>
        <FeatureSpotContent>
          <FeatureSpotTitle as="h2">Build faster with pre-built components</FeatureSpotTitle>
          <FeatureSpotDescription className="mt-4">
            Stop reinventing the wheel. Our component library provides everything
            you need to build beautiful, accessible interfaces in record time.
          </FeatureSpotDescription>
          <div className="mt-6 space-y-4">
            <div className="flex items-start gap-3">
              <Zap className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium">50+ Components</h4>
                <p className="text-sm text-muted-foreground">Ready to use out of the box</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium">Fully Tested</h4>
                <p className="text-sm text-muted-foreground">100% test coverage</p>
              </div>
            </div>
          </div>
          <Button className="mt-6">Get Started</Button>
        </FeatureSpotContent>
        <FeatureSpotMedia>
          <div className="aspect-video rounded-xl border bg-muted flex items-center justify-center text-muted-foreground">
            Feature Image
          </div>
        </FeatureSpotMedia>
      </FeatureSpotSplit>
    </FeatureSpot>
  ),
}

export const ReverseSplit: Story = {
  render: () => (
    <FeatureSpot>
      <FeatureSpotSplit reverse>
        <FeatureSpotContent>
          <FeatureSpotTitle as="h2">Designed for developers</FeatureSpotTitle>
          <FeatureSpotDescription className="mt-4">
            Our API is intuitive and well-documented, making it easy to get started
            and customize to your needs.
          </FeatureSpotDescription>
          <Button className="mt-6" variant="outline">View Documentation</Button>
        </FeatureSpotContent>
        <FeatureSpotMedia>
          <div className="aspect-video rounded-xl border bg-muted flex items-center justify-center text-muted-foreground">
            Code Example
          </div>
        </FeatureSpotMedia>
      </FeatureSpotSplit>
    </FeatureSpot>
  ),
}
