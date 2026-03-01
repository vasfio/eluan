import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { View, Text } from "react-native"
import {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonCard,
  SkeletonListItem,
  SkeletonGroup,
} from "./Skeleton"

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["text", "circular", "rectangular", "rounded"],
    },
    radius: {
      control: "select",
      options: [undefined, "sm", "md", "lg", "full"],
    },
    disableAnimation: {
      control: "boolean",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    width: "100%",
    height: 20,
  },
}

export const Variants: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <View>
        <Text style={{ color: "#71717a", marginBottom: 8 }}>Text</Text>
        <Skeleton variant="text" height={16} />
      </View>
      <View>
        <Text style={{ color: "#71717a", marginBottom: 8 }}>Circular</Text>
        <Skeleton variant="circular" width={48} height={48} />
      </View>
      <View>
        <Text style={{ color: "#71717a", marginBottom: 8 }}>Rectangular</Text>
        <Skeleton variant="rectangular" height={100} />
      </View>
      <View>
        <Text style={{ color: "#71717a", marginBottom: 8 }}>Rounded</Text>
        <Skeleton variant="rounded" height={100} />
      </View>
    </View>
  ),
}

export const CustomSizes: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Skeleton width={100} height={20} />
      <Skeleton width={200} height={20} />
      <Skeleton width="50%" height={20} />
      <Skeleton width="100%" height={40} />
    </View>
  ),
}

export const CustomRadius: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Skeleton radius="sm" height={40} />
      <Skeleton radius="md" height={40} />
      <Skeleton radius="lg" height={40} />
      <Skeleton radius="full" height={40} />
      <Skeleton radius={20} height={40} />
    </View>
  ),
}

export const NoAnimation: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Text style={{ color: "#71717a" }}>With animation (default)</Text>
      <Skeleton height={20} />
      <Text style={{ color: "#71717a", marginTop: 8 }}>Without animation</Text>
      <Skeleton height={20} disableAnimation />
    </View>
  ),
}

export const TextSkeleton: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      <View>
        <Text style={{ color: "#71717a", marginBottom: 8 }}>Default (3 lines)</Text>
        <SkeletonText />
      </View>
      <View>
        <Text style={{ color: "#71717a", marginBottom: 8 }}>Custom lines</Text>
        <SkeletonText lines={5} />
      </View>
      <View>
        <Text style={{ color: "#71717a", marginBottom: 8 }}>Custom last line width</Text>
        <SkeletonText lines={3} lastLineWidth="40%" />
      </View>
    </View>
  ),
}

export const AvatarSkeleton: Story = {
  render: () => (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
      <SkeletonAvatar size={32} />
      <SkeletonAvatar size={40} />
      <SkeletonAvatar size={48} />
      <SkeletonAvatar size={64} />
    </View>
  ),
}

export const CardSkeleton: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <SkeletonCard />
      <SkeletonCard hasImage={false} />
    </View>
  ),
}

export const ListItemSkeleton: Story = {
  render: () => (
    <View>
      <SkeletonListItem />
      <SkeletonListItem />
      <SkeletonListItem />
    </View>
  ),
}

export const ListItemVariants: Story = {
  render: () => (
    <View style={{ gap: 8 }}>
      <Text style={{ color: "#71717a", marginBottom: 8 }}>With avatar</Text>
      <SkeletonListItem hasAvatar />

      <Text style={{ color: "#71717a", marginTop: 16, marginBottom: 8 }}>Without avatar</Text>
      <SkeletonListItem hasAvatar={false} />

      <Text style={{ color: "#71717a", marginTop: 16, marginBottom: 8 }}>With trailing</Text>
      <SkeletonListItem hasTrailing />

      <Text style={{ color: "#71717a", marginTop: 16, marginBottom: 8 }}>Single line</Text>
      <SkeletonListItem lines={1} />
    </View>
  ),
}

export const SkeletonGroups: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      <View>
        <Text style={{ color: "#71717a", marginBottom: 8 }}>List Items Group</Text>
        <SkeletonGroup count={3}>
          <SkeletonListItem />
        </SkeletonGroup>
      </View>

      <View>
        <Text style={{ color: "#71717a", marginBottom: 8 }}>Cards Group</Text>
        <SkeletonGroup count={2} gap={12}>
          <SkeletonCard imageHeight={100} lines={2} />
        </SkeletonGroup>
      </View>
    </View>
  ),
}

export const ProfileSkeleton: Story = {
  render: () => (
    <View style={{ alignItems: "center", gap: 16 }}>
      <SkeletonAvatar size={96} />
      <Skeleton width={150} height={24} variant="text" />
      <Skeleton width={100} height={16} variant="text" />
      <View style={{ width: "100%", marginTop: 16 }}>
        <SkeletonText lines={3} />
      </View>
    </View>
  ),
}

export const DashboardSkeleton: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      {/* Stats row */}
      <View style={{ flexDirection: "row", gap: 12 }}>
        {[1, 2, 3].map((i) => (
          <View
            key={i}
            style={{
              flex: 1,
              padding: 16,
              backgroundColor: "#f4f4f5",
              borderRadius: 12,
            }}
          >
            <Skeleton width={60} height={12} variant="text" />
            <Skeleton width={80} height={28} variant="text" style={{ marginTop: 8 }} />
          </View>
        ))}
      </View>

      {/* Chart placeholder */}
      <Skeleton height={200} variant="rounded" />

      {/* Recent items */}
      <View>
        <Skeleton width={120} height={20} variant="text" style={{ marginBottom: 12 }} />
        <SkeletonGroup count={3}>
          <SkeletonListItem hasTrailing />
        </SkeletonGroup>
      </View>
    </View>
  ),
}

export const FeedSkeleton: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      {[1, 2].map((i) => (
        <View
          key={i}
          style={{
            padding: 16,
            backgroundColor: "#ffffff",
            borderRadius: 12,
            borderWidth: 1,
            borderColor: "#e4e4e7",
          }}
        >
          {/* Header */}
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
            <SkeletonAvatar size={40} />
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Skeleton width={120} height={14} variant="text" />
              <Skeleton width={80} height={12} variant="text" style={{ marginTop: 4 }} />
            </View>
          </View>

          {/* Content */}
          <SkeletonText lines={2} />

          {/* Image */}
          <Skeleton height={200} variant="rounded" style={{ marginTop: 12 }} />

          {/* Actions */}
          <View style={{ flexDirection: "row", gap: 24, marginTop: 12 }}>
            <Skeleton width={60} height={20} variant="rounded" />
            <Skeleton width={60} height={20} variant="rounded" />
            <Skeleton width={60} height={20} variant="rounded" />
          </View>
        </View>
      ))}
    </View>
  ),
}
