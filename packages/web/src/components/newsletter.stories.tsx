import type { Meta, StoryObj } from "@storybook/react"
import {
  Newsletter,
  NewsletterIcon,
  NewsletterTitle,
  NewsletterDescription,
  NewsletterForm,
  NewsletterInput,
  NewsletterDisclaimer,
} from "./newsletter"
import { Button } from "@frolda/ragnar-core"

const meta: Meta<typeof Newsletter> = {
  title: "Web/Newsletter",
  component: Newsletter,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Newsletter>
      <NewsletterTitle>Subscribe to our newsletter</NewsletterTitle>
      <NewsletterDescription>
        Get the latest news, updates, and tips delivered to your inbox.
      </NewsletterDescription>
      <NewsletterForm>
        <NewsletterInput placeholder="Enter your email" />
        <Button type="submit">Subscribe</Button>
      </NewsletterForm>
      <NewsletterDisclaimer>
        We respect your privacy. Unsubscribe at any time.
      </NewsletterDisclaimer>
    </Newsletter>
  ),
}

export const WithIcon: Story = {
  render: () => (
    <Newsletter variant="muted">
      <NewsletterIcon />
      <NewsletterTitle>Stay in the loop</NewsletterTitle>
      <NewsletterDescription>
        Join 10,000+ developers who get our weekly newsletter.
      </NewsletterDescription>
      <NewsletterForm>
        <NewsletterInput placeholder="you@example.com" />
        <Button type="submit">Join</Button>
      </NewsletterForm>
    </Newsletter>
  ),
}

export const Primary: Story = {
  render: () => (
    <Newsletter variant="primary">
      <NewsletterTitle>Never miss an update</NewsletterTitle>
      <NewsletterDescription>
        Subscribe to stay up to date with the latest features and releases.
      </NewsletterDescription>
      <NewsletterForm>
        <NewsletterInput placeholder="Enter your email" className="text-foreground" />
        <Button type="submit" variant="secondary">Subscribe</Button>
      </NewsletterForm>
    </Newsletter>
  ),
}

export const Gradient: Story = {
  render: () => (
    <Newsletter variant="gradient">
      <NewsletterTitle>Get early access</NewsletterTitle>
      <NewsletterDescription>
        Be the first to try new features and provide feedback.
      </NewsletterDescription>
      <NewsletterForm>
        <NewsletterInput placeholder="your@email.com" className="bg-white/10 border-white/20 text-white placeholder:text-white/60" />
        <Button type="submit" variant="secondary">Join Waitlist</Button>
      </NewsletterForm>
    </Newsletter>
  ),
}

export const Card: Story = {
  render: () => (
    <Newsletter variant="card">
      <NewsletterIcon />
      <NewsletterTitle>Weekly digest</NewsletterTitle>
      <NewsletterDescription>
        Curated content delivered every Friday.
      </NewsletterDescription>
      <NewsletterForm>
        <NewsletterInput placeholder="Email address" />
        <Button type="submit" className="w-full sm:w-auto">Subscribe</Button>
      </NewsletterForm>
      <NewsletterDisclaimer>
        No spam. Unsubscribe anytime.
      </NewsletterDisclaimer>
    </Newsletter>
  ),
}
