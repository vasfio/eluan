import type { Meta, StoryObj } from "@storybook/react"
import { Testimonial, TestimonialGrid, TestimonialCarousel } from "./testimonial"

const meta: Meta<typeof Testimonial> = {
  title: "Web/Testimonial",
  component: Testimonial,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
Displays customer testimonials with author info, optional star ratings, and a quote icon.

**Import**
\`\`\`tsx
import { Testimonial, TestimonialGrid, TestimonialCarousel } from "@vasf/ragnar-web"
\`\`\`

**Usage**
\`\`\`tsx
<Testimonial
  variant="card"
  author={{ name: "Jane Doe", title: "CEO", company: "Acme" }}
  rating={5}
>
  "Great product!"
</Testimonial>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      description: "Visual style of the testimonial: default, card, minimal, or featured.",
    },
    rating: {
      description: "Star rating from 1 to 5.",
    },
    showQuoteIcon: {
      description: "Whether to show the decorative quote icon.",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: { docs: { description: { story: "A single testimonial in the default layout with a star rating." } } },
  render: () => (
    <div className="max-w-xl mx-auto">
      <Testimonial
        author={{
          name: "Sarah Johnson",
          title: "CEO",
          company: "TechCorp",
        }}
        rating={5}
      >
        "This product has completely transformed how our team works. The
        efficiency gains have been incredible and our customers love the
        new experience."
      </Testimonial>
    </div>
  ),
}

export const Card: Story = {
  parameters: { docs: { description: { story: "The card variant adds a bordered container with hover shadow." } } },
  render: () => (
    <div className="max-w-md mx-auto">
      <Testimonial
        variant="card"
        author={{
          name: "Michael Chen",
          title: "Product Manager",
          company: "StartupXYZ",
        }}
        rating={5}
      >
        "The best design system I've ever used. It saved us months of
        development time and the components are beautiful."
      </Testimonial>
    </div>
  ),
}

export const Featured: Story = {
  parameters: { docs: { description: { story: "A larger featured testimonial with extra padding for prominent display." } } },
  render: () => (
    <div className="max-w-3xl mx-auto">
      <Testimonial
        variant="featured"
        author={{
          name: "Emily Davis",
          title: "VP of Engineering",
          company: "Enterprise Inc",
        }}
        rating={5}
      >
        "We've tried many design systems before, but this one stands out.
        The attention to detail, accessibility, and developer experience
        is unmatched. Highly recommended for any serious project."
      </Testimonial>
    </div>
  ),
}

export const Grid: Story = {
  parameters: { docs: { description: { story: "Multiple testimonials arranged in a responsive 3-column grid using TestimonialGrid." } } },
  render: () => (
    <TestimonialGrid columns={3}>
      <Testimonial
        variant="card"
        author={{
          name: "Alex Smith",
          title: "Developer",
        }}
        rating={5}
      >
        "Incredible toolkit. Made my life so much easier."
      </Testimonial>
      <Testimonial
        variant="card"
        author={{
          name: "Jane Doe",
          title: "Designer",
        }}
        rating={5}
      >
        "Beautiful components that just work out of the box."
      </Testimonial>
      <Testimonial
        variant="card"
        author={{
          name: "Bob Wilson",
          title: "CTO",
        }}
        rating={4}
      >
        "Great documentation and excellent TypeScript support."
      </Testimonial>
    </TestimonialGrid>
  ),
}

export const Carousel: Story = {
  parameters: { docs: { description: { story: "An auto-playing carousel that rotates through testimonials with dot navigation." } } },
  render: () => (
    <TestimonialCarousel
      testimonials={[
        {
          content: "This has been a game-changer for our development workflow.",
          author: { name: "John Smith", title: "Senior Developer", company: "Tech Co" },
          rating: 5,
        },
        {
          content: "Beautiful, accessible components that saved us months of work.",
          author: { name: "Sarah Lee", title: "Product Lead", company: "Startup Inc" },
          rating: 5,
        },
        {
          content: "The best investment we've made in our tech stack.",
          author: { name: "Mike Johnson", title: "Engineering Manager" },
          rating: 5,
        },
      ]}
    />
  ),
}
