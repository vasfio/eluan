import type { Meta, StoryObj } from "@storybook/react"
import { AIActionPlan, AIActionPlanStep } from "./ai-action-plan"

const meta: Meta<typeof AIActionPlan> = {
  title: "AI/Governors/AIActionPlan",
  component: AIActionPlan,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <AIActionPlan>
      <AIActionPlanStep status="complete" title="Gather context" />
      <AIActionPlanStep status="complete" title="Parse user query" />
      <AIActionPlanStep status="running" title="Generate response" />
      <AIActionPlanStep status="queued" title="Format output" isLast />
    </AIActionPlan>
  ),
}

export const AllStatuses: Story = {
  render: () => (
    <AIActionPlan>
      <AIActionPlanStep status="complete" title="Completed step" />
      <AIActionPlanStep status="running" title="Running step" />
      <AIActionPlanStep status="queued" title="Queued step" />
      <AIActionPlanStep status="error" title="Error step" />
      <AIActionPlanStep status="awaiting" title="Awaiting step" isLast />
    </AIActionPlan>
  ),
}

export const WithDescriptions: Story = {
  render: () => (
    <AIActionPlan>
      <AIActionPlanStep
        status="complete"
        title="Authenticate user"
        description="Verified API key and user permissions"
      />
      <AIActionPlanStep
        status="running"
        title="Fetch external data"
        description="Querying the knowledge base for relevant documents"
      />
      <AIActionPlanStep
        status="queued"
        title="Summarize findings"
        description="Will condense results into a concise answer"
        isLast
      />
    </AIActionPlan>
  ),
}

export const InProgress: Story = {
  render: () => (
    <AIActionPlan>
      <AIActionPlanStep
        status="complete"
        title="Search web"
        description="Found 12 relevant results"
        duration="2.1s"
      />
      <AIActionPlanStep
        status="complete"
        title="Analyze results"
        description="Ranked sources by relevance"
        duration="1.4s"
      />
      <AIActionPlanStep
        status="running"
        title="Generate response"
        description="Synthesizing information from top sources"
      />
      <AIActionPlanStep
        status="queued"
        title="Format output"
        description="Apply markdown formatting and citations"
        isLast
      />
    </AIActionPlan>
  ),
}
