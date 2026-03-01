import type { Meta, StoryObj } from "@storybook/react"
import { PricingTable } from "./pricing-table"

const meta: Meta<typeof PricingTable> = {
  title: "Web/PricingTable",
  component: PricingTable,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

const plans = [
  { id: "free", name: "Free", price: 0, period: "month" },
  { id: "pro", name: "Pro", price: 19, period: "month", highlighted: true },
  { id: "enterprise", name: "Enterprise", price: 49, period: "month" },
]

const features = [
  {
    name: "Projects",
    values: { free: "3", pro: "Unlimited", enterprise: "Unlimited" },
  },
  {
    name: "Team members",
    values: { free: "1", pro: "10", enterprise: "Unlimited" },
  },
  {
    name: "Storage",
    values: { free: "1 GB", pro: "50 GB", enterprise: "500 GB" },
  },
  {
    name: "API access",
    values: { free: false, pro: true, enterprise: true },
  },
  {
    name: "Priority support",
    values: { free: false, pro: true, enterprise: true },
  },
  {
    name: "Custom integrations",
    values: { free: false, pro: false, enterprise: true },
  },
  {
    name: "SSO",
    values: { free: false, pro: false, enterprise: true },
  },
  {
    name: "SLA",
    values: { free: false, pro: false, enterprise: true },
  },
]

export const Default: Story = {
  render: () => <PricingTable plans={plans} features={features} />,
}

export const CustomTitle: Story = {
  render: () => (
    <PricingTable
      plans={plans}
      features={features}
      featureGroupTitle="Compare Plans"
    />
  ),
}
