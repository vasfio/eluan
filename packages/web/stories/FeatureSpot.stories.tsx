import type { Meta, StoryObj } from "@storybook/react";
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
} from "@/components/feature-spot";
import { Button } from "@/components/button";
import { Zap, Shield, Globe, Sparkles, Clock, Users } from "lucide-react";

const meta: Meta<typeof FeatureSpot> = {
  title: "Marketing/FeatureSpot",
  component: FeatureSpot,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FeatureSpot>;

export const GridLayout: Story = {
  render: () => (
    <FeatureSpot>
      <FeatureSpotHeader>
        <FeatureSpotTitle>Everything you need to succeed</FeatureSpotTitle>
        <FeatureSpotDescription>
          Our platform comes with all the tools you need to build, launch, and
          grow your product.
        </FeatureSpotDescription>
      </FeatureSpotHeader>
      <FeatureSpotGrid columns={3}>
        <FeatureSpotItem icon={<Zap className="h-6 w-6" />}>
          <FeatureSpotItemTitle>Lightning Fast</FeatureSpotItemTitle>
          <FeatureSpotItemDescription>
            Built for speed from the ground up. Experience sub-second load times
            across all features.
          </FeatureSpotItemDescription>
        </FeatureSpotItem>
        <FeatureSpotItem icon={<Shield className="h-6 w-6" />}>
          <FeatureSpotItemTitle>Enterprise Security</FeatureSpotItemTitle>
          <FeatureSpotItemDescription>
            Bank-grade encryption and security measures to keep your data safe
            and compliant.
          </FeatureSpotItemDescription>
        </FeatureSpotItem>
        <FeatureSpotItem icon={<Globe className="h-6 w-6" />}>
          <FeatureSpotItemTitle>Global Scale</FeatureSpotItemTitle>
          <FeatureSpotItemDescription>
            Deploy to any region with automatic scaling and load balancing built
            in.
          </FeatureSpotItemDescription>
        </FeatureSpotItem>
        <FeatureSpotItem icon={<Sparkles className="h-6 w-6" />}>
          <FeatureSpotItemTitle>AI Powered</FeatureSpotItemTitle>
          <FeatureSpotItemDescription>
            Leverage the power of AI to automate tasks and gain insights from
            your data.
          </FeatureSpotItemDescription>
        </FeatureSpotItem>
        <FeatureSpotItem icon={<Clock className="h-6 w-6" />}>
          <FeatureSpotItemTitle>Real-time Updates</FeatureSpotItemTitle>
          <FeatureSpotItemDescription>
            See changes instantly with our real-time synchronization across all
            devices.
          </FeatureSpotItemDescription>
        </FeatureSpotItem>
        <FeatureSpotItem icon={<Users className="h-6 w-6" />}>
          <FeatureSpotItemTitle>Team Collaboration</FeatureSpotItemTitle>
          <FeatureSpotItemDescription>
            Work together seamlessly with built-in collaboration tools and
            permissions.
          </FeatureSpotItemDescription>
        </FeatureSpotItem>
      </FeatureSpotGrid>
    </FeatureSpot>
  ),
};

export const TwoColumns: Story = {
  render: () => (
    <FeatureSpot>
      <FeatureSpotHeader>
        <FeatureSpotTitle>Why choose us?</FeatureSpotTitle>
        <FeatureSpotDescription>
          We've thought of everything so you don't have to.
        </FeatureSpotDescription>
      </FeatureSpotHeader>
      <FeatureSpotGrid columns={2}>
        <FeatureSpotItem icon={<Zap className="h-6 w-6" />}>
          <FeatureSpotItemTitle>Instant Setup</FeatureSpotItemTitle>
          <FeatureSpotItemDescription>
            Get started in minutes with our one-click deployment and intuitive
            onboarding process.
          </FeatureSpotItemDescription>
        </FeatureSpotItem>
        <FeatureSpotItem icon={<Shield className="h-6 w-6" />}>
          <FeatureSpotItemTitle>Always Secure</FeatureSpotItemTitle>
          <FeatureSpotItemDescription>
            Your data is protected with industry-leading security practices and
            regular audits.
          </FeatureSpotItemDescription>
        </FeatureSpotItem>
      </FeatureSpotGrid>
    </FeatureSpot>
  ),
};

export const SplitLayout: Story = {
  render: () => (
    <FeatureSpot>
      <FeatureSpotSplit>
        <FeatureSpotContent>
          <FeatureSpotTitle>
            Powerful analytics at your fingertips
          </FeatureSpotTitle>
          <FeatureSpotDescription>
            Gain deep insights into your business with our comprehensive
            analytics dashboard. Track key metrics, identify trends, and make
            data-driven decisions with confidence.
          </FeatureSpotDescription>
          <div className="flex gap-4">
            <Button>Learn More</Button>
            <Button variant="outline">View Demo</Button>
          </div>
        </FeatureSpotContent>
        <FeatureSpotMedia>
          <div className="aspect-video rounded-lg border bg-muted" />
        </FeatureSpotMedia>
      </FeatureSpotSplit>
    </FeatureSpot>
  ),
};

export const SplitLayoutReversed: Story = {
  render: () => (
    <FeatureSpot>
      <FeatureSpotSplit reverse>
        <FeatureSpotContent>
          <FeatureSpotTitle>Seamless integrations</FeatureSpotTitle>
          <FeatureSpotDescription>
            Connect with the tools you already use. Our platform integrates with
            hundreds of popular apps and services to streamline your workflow.
          </FeatureSpotDescription>
          <div className="flex gap-4">
            <Button>Browse Integrations</Button>
          </div>
        </FeatureSpotContent>
        <FeatureSpotMedia>
          <div className="aspect-video rounded-lg border bg-muted" />
        </FeatureSpotMedia>
      </FeatureSpotSplit>
    </FeatureSpot>
  ),
};

export const FourColumns: Story = {
  render: () => (
    <FeatureSpot>
      <FeatureSpotHeader>
        <FeatureSpotTitle>Platform highlights</FeatureSpotTitle>
      </FeatureSpotHeader>
      <FeatureSpotGrid columns={4}>
        <FeatureSpotItem icon={<Zap className="h-6 w-6" />}>
          <FeatureSpotItemTitle>Fast</FeatureSpotItemTitle>
          <FeatureSpotItemDescription>
            Optimized for speed
          </FeatureSpotItemDescription>
        </FeatureSpotItem>
        <FeatureSpotItem icon={<Shield className="h-6 w-6" />}>
          <FeatureSpotItemTitle>Secure</FeatureSpotItemTitle>
          <FeatureSpotItemDescription>
            Enterprise-grade security
          </FeatureSpotItemDescription>
        </FeatureSpotItem>
        <FeatureSpotItem icon={<Globe className="h-6 w-6" />}>
          <FeatureSpotItemTitle>Global</FeatureSpotItemTitle>
          <FeatureSpotItemDescription>
            Available worldwide
          </FeatureSpotItemDescription>
        </FeatureSpotItem>
        <FeatureSpotItem icon={<Users className="h-6 w-6" />}>
          <FeatureSpotItemTitle>Collaborative</FeatureSpotItemTitle>
          <FeatureSpotItemDescription>
            Built for teams
          </FeatureSpotItemDescription>
        </FeatureSpotItem>
      </FeatureSpotGrid>
    </FeatureSpot>
  ),
};
