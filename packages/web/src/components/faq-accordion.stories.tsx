import type { Meta, StoryObj } from "@storybook/react"
import {
  FAQSection,
  FAQHeader,
  FAQTitle,
  FAQDescription,
  FAQList,
  FAQItem,
  FAQItemCard,
  FAQQuestion,
  FAQAnswer,
  FAQContact,
} from "./faq-accordion"
import { Button } from "@vasf/ragnar-core"

const meta: Meta<typeof FAQSection> = {
  title: "Web/FAQAccordion",
  component: FAQSection,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A composable FAQ accordion section with collapsible question/answer items, available in default, separated, and card variants.

**Import**
\`\`\`tsx
import { FAQSection, FAQHeader, FAQTitle, FAQDescription, FAQList, FAQItem, FAQItemCard, FAQQuestion, FAQAnswer, FAQContact } from "@vasf/ragnar-web"
\`\`\`

**Usage**
\`\`\`tsx
<FAQSection>
  <FAQHeader>
    <FAQTitle>FAQ</FAQTitle>
  </FAQHeader>
  <FAQList>
    <FAQItem>
      <FAQQuestion>Question?</FAQQuestion>
      <FAQAnswer>Answer.</FAQAnswer>
    </FAQItem>
  </FAQList>
</FAQSection>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    size: {
      description: "Vertical padding: sm, default, or lg.",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const faqs = [
  {
    question: "What is included in the free plan?",
    answer: "The free plan includes access to basic features, 3 projects, and community support. Perfect for personal projects and learning.",
  },
  {
    question: "Can I upgrade or downgrade my plan?",
    answer: "Yes, you can change your plan at any time. Upgrades are effective immediately, and downgrades take effect at the end of your billing period.",
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 30-day money-back guarantee on all paid plans. If you're not satisfied, contact our support team for a full refund.",
  },
  {
    question: "Is there a discount for annual billing?",
    answer: "Yes! Save up to 20% when you choose annual billing. The discount is applied automatically at checkout.",
  },
  {
    question: "How do I cancel my subscription?",
    answer: "You can cancel your subscription at any time from your account settings. Your access will continue until the end of your billing period.",
  },
]

export const Default: Story = {
  parameters: { docs: { description: { story: "Full FAQ section with divider-style items, header, and a contact link." } } },
  render: () => (
    <FAQSection>
      <FAQHeader>
        <FAQTitle>Frequently Asked Questions</FAQTitle>
        <FAQDescription>
          Everything you need to know about our product and billing.
        </FAQDescription>
      </FAQHeader>
      <FAQList>
        {faqs.map((faq, index) => (
          <FAQItem key={index} defaultOpen={index === 0}>
            <FAQQuestion>{faq.question}</FAQQuestion>
            <FAQAnswer>{faq.answer}</FAQAnswer>
          </FAQItem>
        ))}
      </FAQList>
      <FAQContact>
        <p className="text-muted-foreground">
          Still have questions?{" "}
          <a href="#" className="text-primary hover:underline">
            Contact our support team
          </a>
        </p>
      </FAQContact>
    </FAQSection>
  ),
}

export const CardStyle: Story = {
  parameters: { docs: { description: { story: "Card-styled FAQ items with bordered containers." } } },
  render: () => (
    <FAQSection>
      <FAQHeader>
        <FAQTitle>Common Questions</FAQTitle>
      </FAQHeader>
      <FAQList variant="cards">
        {faqs.slice(0, 4).map((faq, index) => (
          <FAQItemCard key={index}>
            <FAQQuestion>{faq.question}</FAQQuestion>
            <FAQAnswer>{faq.answer}</FAQAnswer>
          </FAQItemCard>
        ))}
      </FAQList>
    </FAQSection>
  ),
}

export const WithContactButton: Story = {
  parameters: { docs: { description: { story: "FAQ with a contact support button below the question list." } } },
  render: () => (
    <FAQSection>
      <FAQHeader>
        <FAQTitle>Need help?</FAQTitle>
        <FAQDescription>
          Find answers to common questions below.
        </FAQDescription>
      </FAQHeader>
      <FAQList maxWidth="md">
        {faqs.slice(0, 3).map((faq, index) => (
          <FAQItem key={index}>
            <FAQQuestion>{faq.question}</FAQQuestion>
            <FAQAnswer>{faq.answer}</FAQAnswer>
          </FAQItem>
        ))}
      </FAQList>
      <FAQContact>
        <p className="mb-4 text-muted-foreground">
          Can't find what you're looking for?
        </p>
        <Button>Contact Support</Button>
      </FAQContact>
    </FAQSection>
  ),
}
