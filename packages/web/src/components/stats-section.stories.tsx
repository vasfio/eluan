import type { Meta, StoryObj } from "@storybook/react"
import {
  StatsSection,
  StatsHeader,
  StatsTitle,
  StatsDescription,
  StatsGrid,
  StatItem,
  StatValue,
  StatLabel,
  StatTrend,
} from "./stats-section"

const meta: Meta<typeof StatsSection> = {
  title: "Web/StatsSection",
  component: StatsSection,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A section for showcasing key metrics and statistics with composable sub-components for header, grid, values, labels, and trends.

**Import**
\`\`\`tsx
import { StatsSection, StatsHeader, StatsTitle, StatsDescription, StatsGrid, StatItem, StatValue, StatLabel, StatTrend } from "@vasf/ragnar-web"
\`\`\`

**Usage**
\`\`\`tsx
<StatsSection variant="default">
  <StatsGrid columns={4}>
    <StatItem>
      <StatValue>10M+</StatValue>
      <StatLabel>Downloads</StatLabel>
    </StatItem>
  </StatsGrid>
</StatsSection>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      description: "Background style: default, muted, primary, or dark.",
    },
    size: {
      description: "Vertical padding: sm, default, or lg.",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: { docs: { description: { story: "Default stats section with a header, description, and a 4-column stat grid." } } },
  render: () => (
    <StatsSection>
      <StatsHeader>
        <StatsTitle>Trusted by developers worldwide</StatsTitle>
        <StatsDescription>
          Our platform powers thousands of applications and serves millions of users.
        </StatsDescription>
      </StatsHeader>
      <StatsGrid>
        <StatItem>
          <StatValue>10M+</StatValue>
          <StatLabel>Downloads</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>50K+</StatValue>
          <StatLabel>Active Users</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>99.9%</StatValue>
          <StatLabel>Uptime</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>24/7</StatValue>
          <StatLabel>Support</StatLabel>
        </StatItem>
      </StatsGrid>
    </StatsSection>
  ),
}

export const Primary: Story = {
  parameters: { docs: { description: { story: "Primary-colored background variant for emphasis." } } },
  render: () => (
    <StatsSection variant="primary">
      <StatsGrid>
        <StatItem>
          <StatValue>500+</StatValue>
          <StatLabel>Components</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>100%</StatValue>
          <StatLabel>TypeScript</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>A11y</StatValue>
          <StatLabel>Accessible</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>MIT</StatValue>
          <StatLabel>Licensed</StatLabel>
        </StatItem>
      </StatsGrid>
    </StatsSection>
  ),
}

export const WithCards: Story = {
  parameters: { docs: { description: { story: "Stats displayed as bordered cards with trend indicators showing direction." } } },
  render: () => (
    <StatsSection>
      <StatsGrid columns={3}>
        <StatItem variant="card">
          <StatValue>$2.5M</StatValue>
          <StatLabel>Revenue</StatLabel>
          <StatTrend direction="up">+12% from last month</StatTrend>
        </StatItem>
        <StatItem variant="card">
          <StatValue>12,543</StatValue>
          <StatLabel>Customers</StatLabel>
          <StatTrend direction="up">+8% from last month</StatTrend>
        </StatItem>
        <StatItem variant="card">
          <StatValue>4.9</StatValue>
          <StatLabel>Average Rating</StatLabel>
          <StatTrend direction="neutral">Based on 2,341 reviews</StatTrend>
        </StatItem>
      </StatsGrid>
    </StatsSection>
  ),
}

export const Bordered: Story = {
  parameters: { docs: { description: { story: "Dark background with bordered stat items separated by vertical dividers." } } },
  render: () => (
    <StatsSection variant="dark">
      <StatsGrid columns={4}>
        <StatItem variant="bordered">
          <StatValue>15K+</StatValue>
          <StatLabel>Happy Customers</StatLabel>
        </StatItem>
        <StatItem variant="bordered">
          <StatValue>99%</StatValue>
          <StatLabel>Satisfaction Rate</StatLabel>
        </StatItem>
        <StatItem variant="bordered">
          <StatValue>45min</StatValue>
          <StatLabel>Avg Response Time</StatLabel>
        </StatItem>
        <StatItem variant="bordered">
          <StatValue>150+</StatValue>
          <StatLabel>Countries</StatLabel>
        </StatItem>
      </StatsGrid>
    </StatsSection>
  ),
}
