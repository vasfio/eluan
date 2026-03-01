import type { Meta, StoryObj } from "@storybook/react";
import {
  Testimonial,
  TestimonialGrid,
  TestimonialCarousel,
} from "@/components/testimonial";

const meta: Meta<typeof Testimonial> = {
  title: "Marketing/Testimonial",
  component: Testimonial,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "card", "minimal", "featured"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Testimonial>;

export const Default: Story = {
  args: {
    author: {
      name: "Sarah Johnson",
      title: "CEO",
      company: "TechCorp",
      avatar: "https://i.pravatar.cc/100?img=1",
    },
    rating: 5,
    children:
      "This product has completely transformed how our team works. The efficiency gains have been remarkable, and the support team is incredibly responsive.",
  },
};

export const WithCard: Story = {
  args: {
    variant: "card",
    author: {
      name: "Michael Chen",
      title: "CTO",
      company: "StartupXYZ",
      avatar: "https://i.pravatar.cc/100?img=3",
    },
    rating: 5,
    children:
      "The best investment we've made in our infrastructure. The platform is intuitive, powerful, and the team behind it truly cares about their customers.",
  },
};

export const Featured: Story = {
  args: {
    variant: "featured",
    author: {
      name: "Emily Davis",
      title: "Product Manager",
      company: "BigCo",
      avatar: "https://i.pravatar.cc/100?img=5",
    },
    rating: 5,
    children:
      "We've tried many solutions before, but this one stands out for its simplicity and power. It has become an essential part of our workflow.",
  },
};

export const Minimal: Story = {
  args: {
    variant: "minimal",
    showQuoteIcon: false,
    author: {
      name: "Alex Thompson",
      title: "Founder",
      company: "IndieHacker",
    },
    children:
      "Simple, elegant, and effective. Everything we needed and nothing we didn't.",
  },
};

export const WithoutRating: Story = {
  args: {
    author: {
      name: "David Wilson",
      title: "VP of Engineering",
      company: "Enterprise Inc",
      avatar: "https://i.pravatar.cc/100?img=8",
    },
    children:
      "The documentation is exceptional and the API is a joy to work with. Our developers were productive from day one.",
  },
};

export const Grid: Story = {
  render: () => (
    <TestimonialGrid columns={3}>
      <Testimonial
        variant="card"
        author={{
          name: "Sarah Johnson",
          title: "CEO",
          company: "TechCorp",
          avatar: "https://i.pravatar.cc/100?img=1",
        }}
        rating={5}
      >
        Absolutely love this product. It has made our team so much more
        productive.
      </Testimonial>
      <Testimonial
        variant="card"
        author={{
          name: "Michael Chen",
          title: "CTO",
          company: "StartupXYZ",
          avatar: "https://i.pravatar.cc/100?img=3",
        }}
        rating={5}
      >
        The best tool we've added to our stack this year. Highly recommend it.
      </Testimonial>
      <Testimonial
        variant="card"
        author={{
          name: "Emily Davis",
          title: "Designer",
          company: "CreativeStudio",
          avatar: "https://i.pravatar.cc/100?img=5",
        }}
        rating={4}
      >
        Beautiful design and great user experience. A pleasure to use every day.
      </Testimonial>
    </TestimonialGrid>
  ),
};

export const TwoColumnGrid: Story = {
  render: () => (
    <TestimonialGrid columns={2}>
      <Testimonial
        variant="card"
        author={{
          name: "James Brown",
          title: "Developer",
          company: "DevShop",
          avatar: "https://i.pravatar.cc/100?img=11",
        }}
        rating={5}
      >
        The API documentation is top-notch. Integration was a breeze.
      </Testimonial>
      <Testimonial
        variant="card"
        author={{
          name: "Lisa Park",
          title: "Product Lead",
          company: "ProductCo",
          avatar: "https://i.pravatar.cc/100?img=9",
        }}
        rating={5}
      >
        Our customers love the experience we've built with this platform.
      </Testimonial>
    </TestimonialGrid>
  ),
};

export const Carousel: Story = {
  render: () => (
    <TestimonialCarousel
      testimonials={[
        {
          content:
            "This has been a game-changer for our organization. The results speak for themselves.",
          author: {
            name: "Sarah Johnson",
            title: "CEO",
            company: "TechCorp",
            avatar: "https://i.pravatar.cc/100?img=1",
          },
          rating: 5,
        },
        {
          content:
            "Outstanding product with even better support. They truly care about their customers.",
          author: {
            name: "Michael Chen",
            title: "CTO",
            company: "StartupXYZ",
            avatar: "https://i.pravatar.cc/100?img=3",
          },
          rating: 5,
        },
        {
          content:
            "We've seen a 40% increase in productivity since switching to this platform.",
          author: {
            name: "Emily Davis",
            title: "Operations Director",
            company: "BigCo",
            avatar: "https://i.pravatar.cc/100?img=5",
          },
          rating: 5,
        },
      ]}
      autoPlay={false}
    />
  ),
};
