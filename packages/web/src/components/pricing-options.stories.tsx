import type { Meta, StoryObj } from "@storybook/react"
import { PricingOptions } from "./pricing-options"

const meta: Meta<typeof PricingOptions> = {
  title: "Web/PricingOptions",
  component: PricingOptions,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

const pricingPlans = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for small projects",
    price: 9,
    period: "month",
    features: [
      "5 projects",
      "Up to 10 team members",
      "Basic analytics",
      "Email support",
    ],
    buttonText: "Start Free Trial",
  },
  {
    id: "pro",
    name: "Pro",
    description: "For growing teams",
    price: 29,
    period: "month",
    features: [
      "Unlimited projects",
      "Up to 50 team members",
      "Advanced analytics",
      "Priority support",
      "Custom integrations",
    ],
    highlighted: true,
    highlightLabel: "Most Popular",
    buttonText: "Start Free Trial",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large organizations",
    price: "Custom",
    features: [
      "Unlimited everything",
      "Dedicated account manager",
      "Custom SLA",
      "On-premise deployment",
      "Advanced security",
    ],
    buttonText: "Contact Sales",
  },
]

export const Default: Story = {
  render: () => <PricingOptions options={pricingPlans} />,
}

export const TwoColumns: Story = {
  render: () => (
    <PricingOptions
      columns={2}
      options={[
        {
          id: "monthly",
          name: "Monthly",
          price: 19,
          period: "month",
          features: [
            "All features included",
            "Cancel anytime",
            "Email support",
          ],
        },
        {
          id: "yearly",
          name: "Yearly",
          price: 190,
          originalPrice: 228,
          period: "year",
          features: [
            "All features included",
            "Save 17%",
            "Priority support",
          ],
          highlighted: true,
          highlightLabel: "Best Value",
        },
      ]}
    />
  ),
}

export const FourColumns: Story = {
  render: () => (
    <PricingOptions
      columns={4}
      options={[
        {
          id: "free",
          name: "Free",
          price: 0,
          period: "month",
          features: ["1 project", "Basic features"],
          buttonVariant: "outline",
        },
        {
          id: "starter",
          name: "Starter",
          price: 9,
          period: "month",
          features: ["5 projects", "Standard features"],
        },
        {
          id: "pro",
          name: "Pro",
          price: 29,
          period: "month",
          features: ["Unlimited projects", "All features"],
          highlighted: true,
          highlightLabel: "Popular",
        },
        {
          id: "enterprise",
          name: "Enterprise",
          price: "Custom",
          features: ["Custom everything", "Dedicated support"],
        },
      ]}
    />
  ),
}
