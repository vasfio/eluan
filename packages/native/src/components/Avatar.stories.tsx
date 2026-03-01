import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { View, Text } from "react-native"
import { Avatar, AvatarGroup } from "./Avatar"

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "default", "lg", "xl"],
    },
    shape: {
      control: "select",
      options: ["circle", "square"],
    },
    status: {
      control: "select",
      options: [undefined, "online", "offline", "busy", "away"],
    },
    bordered: {
      control: "boolean",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    fallback: "John Doe",
    size: "default",
    shape: "circle",
  },
}

export const WithImage: Story = {
  args: {
    uri: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    alt: "User avatar",
    size: "default",
  },
}

export const Sizes: Story = {
  render: () => (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
      <Avatar fallback="JD" size="xs" />
      <Avatar fallback="JD" size="sm" />
      <Avatar fallback="JD" size="default" />
      <Avatar fallback="JD" size="lg" />
      <Avatar fallback="JD" size="xl" />
      <Avatar fallback="JD" size={80} />
    </View>
  ),
}

export const Shapes: Story = {
  render: () => (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
      <Avatar fallback="JD" shape="circle" size="lg" />
      <Avatar fallback="JD" shape="square" size="lg" />
    </View>
  ),
}

export const WithStatus: Story = {
  render: () => (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
      <Avatar fallback="Online" status="online" size="lg" />
      <Avatar fallback="Away" status="away" size="lg" />
      <Avatar fallback="Busy" status="busy" size="lg" />
      <Avatar fallback="Off" status="offline" size="lg" />
    </View>
  ),
}

export const Bordered: Story = {
  render: () => (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
      <Avatar fallback="JD" bordered size="lg" />
      <Avatar fallback="AB" bordered size="lg" shape="square" />
      <Avatar fallback="CD" bordered status="online" size="lg" />
    </View>
  ),
}

export const Fallbacks: Story = {
  render: () => (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
      <Avatar fallback="John Doe" size="lg" />
      <Avatar fallback="Alice Bob Charlie" size="lg" />
      <Avatar fallback="X" size="lg" />
      <Avatar size="lg" />
    </View>
  ),
}

export const Group: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      <View>
        <Text style={{ color: "#71717a", marginBottom: 8 }}>Default (max 4)</Text>
        <AvatarGroup>
          <Avatar fallback="A" />
          <Avatar fallback="B" />
          <Avatar fallback="C" />
          <Avatar fallback="D" />
          <Avatar fallback="E" />
          <Avatar fallback="F" />
        </AvatarGroup>
      </View>

      <View>
        <Text style={{ color: "#71717a", marginBottom: 8 }}>Max 3</Text>
        <AvatarGroup max={3}>
          <Avatar fallback="A" />
          <Avatar fallback="B" />
          <Avatar fallback="C" />
          <Avatar fallback="D" />
          <Avatar fallback="E" />
        </AvatarGroup>
      </View>

      <View>
        <Text style={{ color: "#71717a", marginBottom: 8 }}>Large size</Text>
        <AvatarGroup size="lg">
          <Avatar fallback="A" />
          <Avatar fallback="B" />
          <Avatar fallback="C" />
        </AvatarGroup>
      </View>

      <View>
        <Text style={{ color: "#71717a", marginBottom: 8 }}>Small size</Text>
        <AvatarGroup size="sm">
          <Avatar fallback="A" />
          <Avatar fallback="B" />
          <Avatar fallback="C" />
          <Avatar fallback="D" />
          <Avatar fallback="E" />
        </AvatarGroup>
      </View>
    </View>
  ),
}

export const UserList: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      {[
        { name: "John Doe", email: "john@example.com", status: "online" as const },
        { name: "Alice Smith", email: "alice@example.com", status: "away" as const },
        { name: "Bob Johnson", email: "bob@example.com", status: "busy" as const },
        { name: "Carol White", email: "carol@example.com", status: "offline" as const },
      ].map((user) => (
        <View
          key={user.email}
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 12,
            backgroundColor: "#f4f4f5",
            borderRadius: 8,
          }}
        >
          <Avatar fallback={user.name} status={user.status} />
          <View style={{ marginLeft: 12 }}>
            <Text style={{ fontWeight: "500", color: "#18181b" }}>{user.name}</Text>
            <Text style={{ fontSize: 12, color: "#71717a" }}>{user.email}</Text>
          </View>
        </View>
      ))}
    </View>
  ),
}
