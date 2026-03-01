import type { Meta, StoryObj } from "@storybook/react"
import {
  Marquee,
  MarqueeItem,
  VerticalMarquee,
  MarqueeTestimonial,
  MarqueeTestimonialContent,
  MarqueeTestimonialAuthor,
  MarqueeTestimonialAvatar,
  MarqueeTestimonialInfo,
  MarqueeTestimonialName,
  MarqueeTestimonialRole,
} from "./marquee"

const meta: Meta<typeof Marquee> = {
  title: "Web/Marquee",
  component: Marquee,
  // Disable autodocs - infinite CSS animations cause memory issues when pre-rendered
}

export default meta
type Story = StoryObj<typeof meta>

const LogoPlaceholder = ({ name }: { name: string }) => (
  <div className="flex h-12 w-32 items-center justify-center rounded border bg-card text-sm font-medium">
    {name}
  </div>
)

export const Default: Story = {
  render: () => (
    <Marquee>
      <MarqueeItem>
        <LogoPlaceholder name="Company A" />
      </MarqueeItem>
      <MarqueeItem>
        <LogoPlaceholder name="Company B" />
      </MarqueeItem>
      <MarqueeItem>
        <LogoPlaceholder name="Company C" />
      </MarqueeItem>
      <MarqueeItem>
        <LogoPlaceholder name="Company D" />
      </MarqueeItem>
      <MarqueeItem>
        <LogoPlaceholder name="Company E" />
      </MarqueeItem>
      <MarqueeItem>
        <LogoPlaceholder name="Company F" />
      </MarqueeItem>
    </Marquee>
  ),
}

export const ReverseDirection: Story = {
  render: () => (
    <Marquee direction="right" duration={30}>
      <MarqueeItem>
        <LogoPlaceholder name="Brand 1" />
      </MarqueeItem>
      <MarqueeItem>
        <LogoPlaceholder name="Brand 2" />
      </MarqueeItem>
      <MarqueeItem>
        <LogoPlaceholder name="Brand 3" />
      </MarqueeItem>
      <MarqueeItem>
        <LogoPlaceholder name="Brand 4" />
      </MarqueeItem>
      <MarqueeItem>
        <LogoPlaceholder name="Brand 5" />
      </MarqueeItem>
    </Marquee>
  ),
}

export const NoFade: Story = {
  render: () => (
    <Marquee variant="default" duration={20}>
      <MarqueeItem>
        <LogoPlaceholder name="Partner A" />
      </MarqueeItem>
      <MarqueeItem>
        <LogoPlaceholder name="Partner B" />
      </MarqueeItem>
      <MarqueeItem>
        <LogoPlaceholder name="Partner C" />
      </MarqueeItem>
      <MarqueeItem>
        <LogoPlaceholder name="Partner D" />
      </MarqueeItem>
    </Marquee>
  ),
}

export const Testimonials: Story = {
  render: () => (
    <Marquee duration={60} gap={24}>
      <MarqueeTestimonial>
        <MarqueeTestimonialContent>
          "This product has completely transformed our workflow. Highly recommended!"
        </MarqueeTestimonialContent>
        <MarqueeTestimonialAuthor>
          <MarqueeTestimonialAvatar alt="John D" />
          <MarqueeTestimonialInfo>
            <MarqueeTestimonialName>John Doe</MarqueeTestimonialName>
            <MarqueeTestimonialRole>CEO at TechCorp</MarqueeTestimonialRole>
          </MarqueeTestimonialInfo>
        </MarqueeTestimonialAuthor>
      </MarqueeTestimonial>
      <MarqueeTestimonial>
        <MarqueeTestimonialContent>
          "The best developer experience I've ever had. Love the documentation!"
        </MarqueeTestimonialContent>
        <MarqueeTestimonialAuthor>
          <MarqueeTestimonialAvatar alt="Jane S" />
          <MarqueeTestimonialInfo>
            <MarqueeTestimonialName>Jane Smith</MarqueeTestimonialName>
            <MarqueeTestimonialRole>Lead Developer</MarqueeTestimonialRole>
          </MarqueeTestimonialInfo>
        </MarqueeTestimonialAuthor>
      </MarqueeTestimonial>
      <MarqueeTestimonial>
        <MarqueeTestimonialContent>
          "Incredible toolkit. Saved us months of development time."
        </MarqueeTestimonialContent>
        <MarqueeTestimonialAuthor>
          <MarqueeTestimonialAvatar alt="Bob W" />
          <MarqueeTestimonialInfo>
            <MarqueeTestimonialName>Bob Wilson</MarqueeTestimonialName>
            <MarqueeTestimonialRole>CTO at StartupXYZ</MarqueeTestimonialRole>
          </MarqueeTestimonialInfo>
        </MarqueeTestimonialAuthor>
      </MarqueeTestimonial>
    </Marquee>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div className="h-[400px]">
      <VerticalMarquee duration={20}>
        <MarqueeTestimonial className="w-full">
          <MarqueeTestimonialContent>
            "Amazing product! Can't imagine working without it."
          </MarqueeTestimonialContent>
          <MarqueeTestimonialAuthor>
            <MarqueeTestimonialAvatar alt="Alice" />
            <MarqueeTestimonialInfo>
              <MarqueeTestimonialName>Alice Johnson</MarqueeTestimonialName>
              <MarqueeTestimonialRole>Designer</MarqueeTestimonialRole>
            </MarqueeTestimonialInfo>
          </MarqueeTestimonialAuthor>
        </MarqueeTestimonial>
        <MarqueeTestimonial className="w-full">
          <MarqueeTestimonialContent>
            "The components are beautiful and easy to use."
          </MarqueeTestimonialContent>
          <MarqueeTestimonialAuthor>
            <MarqueeTestimonialAvatar alt="Mike" />
            <MarqueeTestimonialInfo>
              <MarqueeTestimonialName>Mike Chen</MarqueeTestimonialName>
              <MarqueeTestimonialRole>Developer</MarqueeTestimonialRole>
            </MarqueeTestimonialInfo>
          </MarqueeTestimonialAuthor>
        </MarqueeTestimonial>
        <MarqueeTestimonial className="w-full">
          <MarqueeTestimonialContent>
            "Best investment we've made for our design system."
          </MarqueeTestimonialContent>
          <MarqueeTestimonialAuthor>
            <MarqueeTestimonialAvatar alt="Sarah" />
            <MarqueeTestimonialInfo>
              <MarqueeTestimonialName>Sarah Lee</MarqueeTestimonialName>
              <MarqueeTestimonialRole>Product Manager</MarqueeTestimonialRole>
            </MarqueeTestimonialInfo>
          </MarqueeTestimonialAuthor>
        </MarqueeTestimonial>
      </VerticalMarquee>
    </div>
  ),
}
