import type { Meta, StoryObj } from "@storybook/react"
import {
  ComparisonSection,
  ComparisonHeader,
  ComparisonTitle,
  ComparisonDescription,
  ComparisonTable,
  ComparisonTableInner,
  ComparisonTableHead,
  ComparisonTableBody,
  ComparisonTableRow,
  ComparisonHeaderCell,
  ComparisonCell,
  ComparisonFeatureCell,
  ComparisonCheck,
  ComparisonX,
  ComparisonPlanHeader,
  ComparisonPlanName,
  ComparisonPlanPrice,
  ComparisonCategory,
} from "./comparison-table"

const meta: Meta<typeof ComparisonSection> = {
  title: "Web/ComparisonTable",
  component: ComparisonSection,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <ComparisonSection>
      <ComparisonHeader>
        <ComparisonTitle>Compare Plans</ComparisonTitle>
        <ComparisonDescription>
          Choose the plan that's right for you.
        </ComparisonDescription>
      </ComparisonHeader>
      <ComparisonTable>
        <ComparisonTableInner>
          <ComparisonTableHead>
            <ComparisonTableRow>
              <ComparisonHeaderCell>Features</ComparisonHeaderCell>
              <ComparisonHeaderCell>
                <ComparisonPlanHeader>
                  <ComparisonPlanName>Starter</ComparisonPlanName>
                  <ComparisonPlanPrice>$9/mo</ComparisonPlanPrice>
                </ComparisonPlanHeader>
              </ComparisonHeaderCell>
              <ComparisonHeaderCell highlight>
                <ComparisonPlanHeader>
                  <ComparisonPlanName>Pro</ComparisonPlanName>
                  <ComparisonPlanPrice>$29/mo</ComparisonPlanPrice>
                </ComparisonPlanHeader>
              </ComparisonHeaderCell>
              <ComparisonHeaderCell>
                <ComparisonPlanHeader>
                  <ComparisonPlanName>Enterprise</ComparisonPlanName>
                  <ComparisonPlanPrice>Custom</ComparisonPlanPrice>
                </ComparisonPlanHeader>
              </ComparisonHeaderCell>
            </ComparisonTableRow>
          </ComparisonTableHead>
          <ComparisonTableBody>
            <ComparisonCategory>Core Features</ComparisonCategory>
            <ComparisonTableRow>
              <ComparisonFeatureCell>Unlimited projects</ComparisonFeatureCell>
              <ComparisonCell><ComparisonX /></ComparisonCell>
              <ComparisonCell highlight><ComparisonCheck /></ComparisonCell>
              <ComparisonCell><ComparisonCheck /></ComparisonCell>
            </ComparisonTableRow>
            <ComparisonTableRow>
              <ComparisonFeatureCell>Team members</ComparisonFeatureCell>
              <ComparisonCell>5</ComparisonCell>
              <ComparisonCell highlight>25</ComparisonCell>
              <ComparisonCell>Unlimited</ComparisonCell>
            </ComparisonTableRow>
            <ComparisonTableRow>
              <ComparisonFeatureCell>Storage</ComparisonFeatureCell>
              <ComparisonCell>10 GB</ComparisonCell>
              <ComparisonCell highlight>100 GB</ComparisonCell>
              <ComparisonCell>Unlimited</ComparisonCell>
            </ComparisonTableRow>
            <ComparisonCategory>Advanced Features</ComparisonCategory>
            <ComparisonTableRow>
              <ComparisonFeatureCell>API Access</ComparisonFeatureCell>
              <ComparisonCell><ComparisonX /></ComparisonCell>
              <ComparisonCell highlight><ComparisonCheck /></ComparisonCell>
              <ComparisonCell><ComparisonCheck /></ComparisonCell>
            </ComparisonTableRow>
            <ComparisonTableRow>
              <ComparisonFeatureCell>Custom domain</ComparisonFeatureCell>
              <ComparisonCell><ComparisonX /></ComparisonCell>
              <ComparisonCell highlight><ComparisonCheck /></ComparisonCell>
              <ComparisonCell><ComparisonCheck /></ComparisonCell>
            </ComparisonTableRow>
            <ComparisonTableRow>
              <ComparisonFeatureCell>SSO</ComparisonFeatureCell>
              <ComparisonCell><ComparisonX /></ComparisonCell>
              <ComparisonCell highlight><ComparisonX /></ComparisonCell>
              <ComparisonCell><ComparisonCheck /></ComparisonCell>
            </ComparisonTableRow>
            <ComparisonCategory>Support</ComparisonCategory>
            <ComparisonTableRow>
              <ComparisonFeatureCell>Email support</ComparisonFeatureCell>
              <ComparisonCell><ComparisonCheck /></ComparisonCell>
              <ComparisonCell highlight><ComparisonCheck /></ComparisonCell>
              <ComparisonCell><ComparisonCheck /></ComparisonCell>
            </ComparisonTableRow>
            <ComparisonTableRow>
              <ComparisonFeatureCell>Priority support</ComparisonFeatureCell>
              <ComparisonCell><ComparisonX /></ComparisonCell>
              <ComparisonCell highlight><ComparisonCheck /></ComparisonCell>
              <ComparisonCell><ComparisonCheck /></ComparisonCell>
            </ComparisonTableRow>
            <ComparisonTableRow>
              <ComparisonFeatureCell>Dedicated account manager</ComparisonFeatureCell>
              <ComparisonCell><ComparisonX /></ComparisonCell>
              <ComparisonCell highlight><ComparisonX /></ComparisonCell>
              <ComparisonCell><ComparisonCheck /></ComparisonCell>
            </ComparisonTableRow>
          </ComparisonTableBody>
        </ComparisonTableInner>
      </ComparisonTable>
    </ComparisonSection>
  ),
}
