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
}

export default meta
type Story = StoryObj<typeof meta>

const AvatarPlaceholder = ({ name }: { name: string }) => (
  <div className="h-full w-full flex items-center justify-center bg-primary/10 text-xs font-medium text-primary">
    {name.charAt(0)}
  </div>
)

export const WithAvatarStack: Story = {
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
  render: () => (
    <div className="space-y-4">
      <StarRating rating={4.8} reviewCount={2341} />
      <StarRating rating={4.5} size="lg" />
      <StarRating rating={3.5} showValue={false} size="sm" />
    </div>
  ),
}

export const WithTrustBadges: Story = {
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
  render: () => (
    <div className="space-y-4">
      <CustomerCount count={10000} />
      <CustomerCount count={50000} label="active users" size="lg" />
      <CustomerCount count={99} label="five-star reviews" size="sm" />
    </div>
  ),
}

export const Banner: Story = {
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
