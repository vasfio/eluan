import type { Meta, StoryObj } from "@storybook/react";
import {
  Quote,
  QuoteText,
  QuoteAuthor,
  QuoteAuthorAvatar,
  QuoteAuthorInfo,
  QuoteAuthorName,
  QuoteAuthorTitle,
} from "@/components/quote";

const meta: Meta<typeof Quote> = {
  title: "Marketing/Quote",
  component: Quote,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "centered", "card", "minimal"],
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Quote>;

export const Default: Story = {
  render: () => (
    <Quote>
      <QuoteText>
        This product has completely transformed how our team works. The
        efficiency gains have been remarkable, and the support team is
        incredibly responsive.
      </QuoteText>
      <QuoteAuthor>
        <QuoteAuthorAvatar
          src="https://i.pravatar.cc/100?img=1"
          alt="Sarah Johnson"
        />
        <QuoteAuthorInfo>
          <QuoteAuthorName>Sarah Johnson</QuoteAuthorName>
          <QuoteAuthorTitle>CEO at TechCorp</QuoteAuthorTitle>
        </QuoteAuthorInfo>
      </QuoteAuthor>
    </Quote>
  ),
};

export const Centered: Story = {
  render: () => (
    <Quote variant="centered" showIcon>
      <QuoteText size="lg">
        The best investment we've made in our infrastructure. Period.
      </QuoteText>
      <QuoteAuthor className="justify-center">
        <QuoteAuthorAvatar
          src="https://i.pravatar.cc/100?img=3"
          alt="Michael Chen"
        />
        <QuoteAuthorInfo className="text-center">
          <QuoteAuthorName>Michael Chen</QuoteAuthorName>
          <QuoteAuthorTitle>CTO at StartupXYZ</QuoteAuthorTitle>
        </QuoteAuthorInfo>
      </QuoteAuthor>
    </Quote>
  ),
};

export const Card: Story = {
  render: () => (
    <div className="max-w-lg">
      <Quote variant="card">
        <QuoteText>
          We've tried many solutions before, but this one stands out for its
          simplicity and power. Highly recommended for any growing team.
        </QuoteText>
        <QuoteAuthor>
          <QuoteAuthorAvatar
            src="https://i.pravatar.cc/100?img=5"
            alt="Emily Davis"
          />
          <QuoteAuthorInfo>
            <QuoteAuthorName>Emily Davis</QuoteAuthorName>
            <QuoteAuthorTitle>Product Manager at BigCo</QuoteAuthorTitle>
          </QuoteAuthorInfo>
        </QuoteAuthor>
      </Quote>
    </div>
  ),
};

export const Minimal: Story = {
  render: () => (
    <Quote variant="minimal">
      <QuoteText>
        Simple, elegant, and effective. Everything we needed and nothing we
        didn't.
      </QuoteText>
      <QuoteAuthor>
        <QuoteAuthorInfo>
          <QuoteAuthorName>Alex Thompson</QuoteAuthorName>
          <QuoteAuthorTitle>Founder at IndieHacker</QuoteAuthorTitle>
        </QuoteAuthorInfo>
      </QuoteAuthor>
    </Quote>
  ),
};

export const LargeSize: Story = {
  render: () => (
    <Quote variant="centered" showIcon>
      <QuoteText size="lg">
        A game-changer for our business.
      </QuoteText>
      <QuoteAuthor className="justify-center">
        <QuoteAuthorInfo className="text-center">
          <QuoteAuthorName>David Wilson</QuoteAuthorName>
          <QuoteAuthorTitle>VP of Engineering</QuoteAuthorTitle>
        </QuoteAuthorInfo>
      </QuoteAuthor>
    </Quote>
  ),
};

export const SmallSize: Story = {
  render: () => (
    <Quote>
      <QuoteText size="sm">
        Great product, great team, great results. What more could you ask for?
      </QuoteText>
      <QuoteAuthor>
        <QuoteAuthorInfo>
          <QuoteAuthorName>Lisa Park</QuoteAuthorName>
          <QuoteAuthorTitle>Designer</QuoteAuthorTitle>
        </QuoteAuthorInfo>
      </QuoteAuthor>
    </Quote>
  ),
};

export const WithoutAvatar: Story = {
  render: () => (
    <Quote>
      <QuoteText>
        The documentation alone is worth the price. Everything is clearly
        explained and easy to follow.
      </QuoteText>
      <QuoteAuthor>
        <QuoteAuthorInfo>
          <QuoteAuthorName>James Brown</QuoteAuthorName>
          <QuoteAuthorTitle>Senior Developer at DevShop</QuoteAuthorTitle>
        </QuoteAuthorInfo>
      </QuoteAuthor>
    </Quote>
  ),
};
