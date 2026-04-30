import type { Meta, StoryObj } from "@storybook/react"
import {
  SocialProof,
  AvatarStack,
  StarRating,
  TrustBadges,
  TrustBadge,
  CustomerCount,
  SocialProofBanner,
  FeaturedIn,
} from "./social-proof"

const meta: Meta<typeof SocialProof> = {
  title: "Web/SocialProof",
  component: SocialProof,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A collection of social proof primitives including avatar stacks, star ratings, trust badges, customer counts, banners, and "featured in" sections.

**Import**
\`\`\`tsx
import { SocialProof, AvatarStack, StarRating, TrustBadges, TrustBadge, CustomerCount, SocialProofBanner, FeaturedIn } from "@vasf/ragnar-web"
\`\`\`

**Usage**
\`\`\`tsx
<SocialProof>
  <AvatarStack max={4} total={127}>
    <img src="/avatar1.jpg" />
  </AvatarStack>
  <StarRating rating={4.8} reviewCount={2341} />
</SocialProof>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    size: {
      description: "Text size: sm, default, or lg.",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const AvatarPlaceholder = ({ name }: { name: string }) => (
  <div className="h-full w-full flex items-center justify-center bg-primary/10 text-xs font-medium text-primary">
    {name.charAt(0)}
  </div>
)

export const WithAvatarStack: Story = {
  parameters: { docs: { description: { story: "An overlapping avatar stack with a remaining count and descriptive text." } } },
  render: () => (
    <SocialProof>
      <AvatarStack max={4} total={127}>
        <AvatarPlaceholder name="Alice" />
        <AvatarPlaceholder name="Bob" />
        <AvatarPlaceholder name="Charlie" />
        <AvatarPlaceholder name="Diana" />
        <AvatarPlaceholder name="Eve" />
      </AvatarStack>
      <span className="text-muted-foreground">
        Join 127+ happy customers
      </span>
    </SocialProof>
  ),
}

export const WithStarRating: Story = {
  parameters: { docs: { description: { story: "Star ratings in different sizes with review counts and optional value display." } } },
  render: () => (
    <div className="space-y-4">
      <StarRating rating={4.8} reviewCount={2341} />
      <StarRating rating={4.5} size="lg" />
      <StarRating rating={3.5} showValue={false} size="sm" />
    </div>
  ),
}

export const WithTrustBadges: Story = {
  parameters: { docs: { description: { story: "Trust badges with shield icons for shipping, returns, and security." } } },
  render: () => (
    <TrustBadges>
      <TrustBadge label="Free shipping" />
      <TrustBadge label="30-day returns" />
      <TrustBadge label="Secure checkout" />
      <TrustBadge label="24/7 support" />
    </TrustBadges>
  ),
}

export const CustomerCountDisplay: Story = {
  parameters: { docs: { description: { story: "Customer count displays in different sizes with custom labels." } } },
  render: () => (
    <div className="space-y-4">
      <CustomerCount count={10000} />
      <CustomerCount count={50000} label="active users" size="lg" />
      <CustomerCount count={99} label="five-star reviews" size="sm" />
    </div>
  ),
}

export const Banner: Story = {
  parameters: { docs: { description: { story: "A horizontal banner combining avatar stack, star rating, and trust badge." } } },
  render: () => (
    <SocialProofBanner>
      <AvatarStack size="sm" max={3}>
        <AvatarPlaceholder name="A" />
        <AvatarPlaceholder name="B" />
        <AvatarPlaceholder name="C" />
      </AvatarStack>
      <StarRating rating={4.9} reviewCount={1234} size="sm" />
      <TrustBadge label="Verified reviews" />
    </SocialProofBanner>
  ),
}

export const FeaturedInSection: Story = {
  parameters: { docs: { description: { story: "A 'Featured in' section with grayscale publication logos." } } },
  render: () => (
    <FeaturedIn title="As seen in">
      <div className="flex h-8 w-24 items-center justify-center rounded bg-muted text-xs font-medium">
        TechCrunch
      </div>
      <div className="flex h-8 w-24 items-center justify-center rounded bg-muted text-xs font-medium">
        Forbes
      </div>
      <div className="flex h-8 w-24 items-center justify-center rounded bg-muted text-xs font-medium">
        Wired
      </div>
      <div className="flex h-8 w-24 items-center justify-center rounded bg-muted text-xs font-medium">
        The Verge
      </div>
    </FeaturedIn>
  ),
}

export const CombinedProof: Story = {
  parameters: { docs: { description: { story: "All social proof elements combined: avatar stack, rating, and compliance badges." } } },
  render: () => (
    <div className="space-y-8">
      <SocialProof>
        <AvatarStack max={5} total={250}>
          <AvatarPlaceholder name="A" />
          <AvatarPlaceholder name="B" />
          <AvatarPlaceholder name="C" />
          <AvatarPlaceholder name="D" />
          <AvatarPlaceholder name="E" />
        </AvatarStack>
        <div>
          <StarRating rating={4.9} size="sm" />
          <p className="text-sm text-muted-foreground mt-1">
            Trusted by 250+ companies worldwide
          </p>
        </div>
      </SocialProof>
      <TrustBadges>
        <TrustBadge label="SOC 2 Certified" />
        <TrustBadge label="GDPR Compliant" />
        <TrustBadge label="99.9% Uptime" />
      </TrustBadges>
    </div>
  ),
}
