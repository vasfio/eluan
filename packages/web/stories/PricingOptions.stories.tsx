import type { Meta, StoryObj } from "@storybook/react";
import { PricingOptions } from "@/components/pricing-options";

const meta: Meta<typeof PricingOptions> = {
  title: "Marketing/PricingOptions",
  component: PricingOptions,
  tags: ["autodocs"],
  argTypes: {
    columns: {
      control: "select",
      options: [2, 3, 4],
    },
  },
};

export default meta;
type Story = StoryObj<typeof PricingOptions>;

const defaultOptions = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for trying things out",
    price: 0,
    period: "month",
    features: [
      "Up to 3 projects",
      "Basic analytics",
      "Community support",
      "1 GB storage",
    ],
    buttonText: "Get Started",
    buttonVariant: "outline" as const,
  },
  {
    id: "pro",
    name: "Pro",
    description: "For professionals and small teams",
    price: 29,
    period: "month",
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "Priority support",
      "50 GB storage",
      "Custom integrations",
      "API access",
    ],
    highlighted: true,
    highlightLabel: "Most Popular",
    buttonText: "Start Free Trial",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large organizations",
    price: 99,
    period: "month",
    features: [
      "Everything in Pro",
      "Unlimited storage",
      "Dedicated support",
      "Custom SLA",
      "SSO / SAML",
      "Audit logs",
      "Custom contracts",
    ],
    buttonText: "Contact Sales",
    buttonVariant: "outline" as const,
  },
];

export const Default: Story = {
  args: {
    options: defaultOptions,
    columns: 3,
  },
};

export const TwoColumns: Story = {
  args: {
    options: [
      {
        id: "monthly",
        name: "Monthly",
        description: "Pay as you go",
        price: 19,
        period: "month",
        features: [
          "All features included",
          "Cancel anytime",
          "No commitment",
          "Full support",
        ],
        buttonText: "Subscribe Monthly",
        buttonVariant: "outline" as const,
      },
      {
        id: "yearly",
        name: "Yearly",
        description: "Save 20% with annual billing",
        price: 15,
        originalPrice: 19,
        period: "month",
        features: [
          "All features included",
          "2 months free",
          "Priority support",
          "Early access to features",
        ],
        highlighted: true,
        highlightLabel: "Best Value",
        buttonText: "Subscribe Yearly",
      },
    ],
    columns: 2,
  },
};

export const FourColumns: Story = {
  args: {
    options: [
      {
        id: "hobby",
        name: "Hobby",
        price: 0,
        period: "month",
        features: ["1 project", "Basic features"],
        buttonText: "Start Free",
        buttonVariant: "outline" as const,
      },
      {
        id: "starter",
        name: "Starter",
        price: 12,
        period: "month",
        features: ["5 projects", "All features", "Email support"],
        buttonText: "Get Started",
        buttonVariant: "outline" as const,
      },
      {
        id: "pro",
        name: "Pro",
        price: 36,
        period: "month",
        features: ["20 projects", "All features", "Priority support", "API"],
        highlighted: true,
        highlightLabel: "Popular",
        buttonText: "Go Pro",
      },
      {
        id: "enterprise",
        name: "Enterprise",
        price: 99,
        period: "month",
        features: ["Unlimited", "All features", "Dedicated support", "SLA"],
        buttonText: "Contact Us",
        buttonVariant: "outline" as const,
      },
    ],
    columns: 4,
  },
};

export const WithDiscounts: Story = {
  args: {
    options: [
      {
        id: "basic",
        name: "Basic",
        price: 19,
        originalPrice: 29,
        period: "month",
        features: [
          "All core features",
          "Up to 10 users",
          "5 GB storage",
          "Basic support",
        ],
        buttonText: "Choose Basic",
      },
      {
        id: "premium",
        name: "Premium",
        price: 49,
        originalPrice: 79,
        period: "month",
        features: [
          "Everything in Basic",
          "Unlimited users",
          "100 GB storage",
          "Priority support",
          "Advanced analytics",
        ],
        highlighted: true,
        highlightLabel: "38% Off",
        buttonText: "Choose Premium",
      },
      {
        id: "ultimate",
        name: "Ultimate",
        price: 99,
        originalPrice: 149,
        period: "month",
        features: [
          "Everything in Premium",
          "Unlimited storage",
          "24/7 support",
          "Custom integrations",
          "Dedicated manager",
        ],
        buttonText: "Choose Ultimate",
      },
    ],
    columns: 3,
  },
};
