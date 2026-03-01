import type { Meta, StoryObj } from "@storybook/react";
import { PricingTable } from "@/components/pricing-table";

const meta: Meta<typeof PricingTable> = {
  title: "Marketing/PricingTable",
  component: PricingTable,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PricingTable>;

const plans = [
  {
    id: "free",
    name: "Free",
    price: 0,
    period: "month",
    description: "For individuals",
  },
  {
    id: "pro",
    name: "Pro",
    price: 29,
    period: "month",
    description: "For professionals",
    highlighted: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    description: "For large teams",
  },
];

const features = [
  {
    name: "Users",
    values: { free: "1", pro: "5", enterprise: "Unlimited" },
  },
  {
    name: "Storage",
    values: { free: "1 GB", pro: "50 GB", enterprise: "Unlimited" },
  },
  {
    name: "API Access",
    values: { free: false, pro: true, enterprise: true },
  },
  {
    name: "Custom Branding",
    values: { free: false, pro: true, enterprise: true },
  },
  {
    name: "Analytics",
    values: { free: "Basic", pro: "Advanced", enterprise: "Custom" },
  },
  {
    name: "Priority Support",
    values: { free: false, pro: true, enterprise: true },
  },
  {
    name: "SSO / SAML",
    values: { free: false, pro: false, enterprise: true },
  },
  {
    name: "SLA",
    values: { free: false, pro: false, enterprise: true },
  },
];

export const Default: Story = {
  args: {
    plans,
    features,
  },
};

export const TwoPlans: Story = {
  args: {
    plans: [
      {
        id: "starter",
        name: "Starter",
        price: 9,
        period: "month",
        description: "Perfect for side projects",
      },
      {
        id: "growth",
        name: "Growth",
        price: 49,
        period: "month",
        description: "For growing businesses",
        highlighted: true,
      },
    ],
    features: [
      {
        name: "Projects",
        values: { starter: "3", growth: "Unlimited" },
      },
      {
        name: "Team Members",
        values: { starter: "2", growth: "10" },
      },
      {
        name: "API Requests",
        values: { starter: "10k/mo", growth: "100k/mo" },
      },
      {
        name: "Webhooks",
        values: { starter: false, growth: true },
      },
      {
        name: "Custom Domain",
        values: { starter: false, growth: true },
      },
    ],
  },
};

export const CustomFeatureGroupTitle: Story = {
  args: {
    plans,
    features,
    featureGroupTitle: "What's included",
  },
};
