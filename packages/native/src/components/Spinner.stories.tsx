import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { View, Text } from "react-native"
import { Spinner, DotsLoader, PulseLoader } from "./Spinner"
import { Button } from "./Button"

const meta: Meta<typeof Spinner> = {
  title: "Components/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
    },
    variant: {
      control: "select",
      options: ["default", "primary", "secondary", "destructive"],
    },
    native: {
      control: "boolean",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    size: "default",
    variant: "default",
  },
}

export const Sizes: Story = {
  render: () => (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 24 }}>
      <View style={{ alignItems: "center" }}>
        <Spinner size="sm" />
        <Text style={{ color: "#71717a", marginTop: 8, fontSize: 12 }}>Small</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Spinner size="default" />
        <Text style={{ color: "#71717a", marginTop: 8, fontSize: 12 }}>Default</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Spinner size="lg" />
        <Text style={{ color: "#71717a", marginTop: 8, fontSize: 12 }}>Large</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Spinner size={48} />
        <Text style={{ color: "#71717a", marginTop: 8, fontSize: 12 }}>48px</Text>
      </View>
    </View>
  ),
}

export const Variants: Story = {
  render: () => (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 24 }}>
      <View style={{ alignItems: "center" }}>
        <Spinner variant="default" />
        <Text style={{ color: "#71717a", marginTop: 8, fontSize: 12 }}>Default</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Spinner variant="primary" />
        <Text style={{ color: "#71717a", marginTop: 8, fontSize: 12 }}>Primary</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Spinner variant="secondary" />
        <Text style={{ color: "#71717a", marginTop: 8, fontSize: 12 }}>Secondary</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Spinner variant="destructive" />
        <Text style={{ color: "#71717a", marginTop: 8, fontSize: 12 }}>Destructive</Text>
      </View>
    </View>
  ),
}

export const CustomColor: Story = {
  render: () => (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 24 }}>
      <Spinner color="#8b5cf6" />
      <Spinner color="#ec4899" />
      <Spinner color="#14b8a6" />
      <Spinner color="#f97316" />
    </View>
  ),
}

export const Native: Story = {
  render: () => (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 24 }}>
      <View style={{ alignItems: "center" }}>
        <Spinner native size="sm" />
        <Text style={{ color: "#71717a", marginTop: 8, fontSize: 12 }}>Native Small</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Spinner native size="lg" />
        <Text style={{ color: "#71717a", marginTop: 8, fontSize: 12 }}>Native Large</Text>
      </View>
    </View>
  ),
}

export const DotsLoaders: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 24 }}>
        <View style={{ alignItems: "center" }}>
          <DotsLoader size="sm" />
          <Text style={{ color: "#71717a", marginTop: 8, fontSize: 12 }}>Small</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <DotsLoader size="default" />
          <Text style={{ color: "#71717a", marginTop: 8, fontSize: 12 }}>Default</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <DotsLoader size="lg" />
          <Text style={{ color: "#71717a", marginTop: 8, fontSize: 12 }}>Large</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 24 }}>
        <DotsLoader variant="default" />
        <DotsLoader variant="primary" />
        <DotsLoader variant="secondary" />
      </View>
    </View>
  ),
}

export const PulseLoaders: Story = {
  render: () => (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 32 }}>
      <PulseLoader size={32} />
      <PulseLoader size={48} />
      <PulseLoader size={64} color="#3b82f6" />
    </View>
  ),
}

export const InButton: Story = {
  render: () => (
    <View style={{ gap: 12, alignItems: "flex-start" }}>
      <Button disabled>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Spinner size="sm" color="#71717a" />
          <Text style={{ color: "#71717a", fontWeight: "500" }}>Loading...</Text>
        </View>
      </Button>

      <Button variant="secondary" disabled>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Spinner size="sm" />
          <Text style={{ fontWeight: "500" }}>Processing</Text>
        </View>
      </Button>
    </View>
  ),
}

export const LoadingState: Story = {
  render: () => (
    <View
      style={{
        padding: 32,
        backgroundColor: "#f4f4f5",
        borderRadius: 12,
        alignItems: "center",
        gap: 16,
      }}
    >
      <Spinner size="lg" />
      <Text style={{ color: "#71717a" }}>Loading content...</Text>
    </View>
  ),
}

export const Overlay: Story = {
  render: () => (
    <View style={{ position: "relative", height: 200 }}>
      <View
        style={{
          padding: 16,
          backgroundColor: "#f4f4f5",
          borderRadius: 12,
          height: "100%",
        }}
      >
        <Text style={{ color: "#18181b" }}>Content behind overlay</Text>
      </View>
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(255,255,255,0.8)",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 12,
        }}
      >
        <Spinner size="lg" />
      </View>
    </View>
  ),
}
