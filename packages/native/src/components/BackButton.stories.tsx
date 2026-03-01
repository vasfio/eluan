import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { View, Text } from "react-native"
import { BackButton } from "./BackButton"

const meta: Meta<typeof BackButton> = {
  title: "Components/BackButton",
  component: BackButton,
  tags: ["autodocs"],
  argTypes: {
    showLabel: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: "Back",
    onPress: () => console.log("Back pressed"),
  },
}

export const WithLabel: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <BackButton showLabel label="Back" onPress={() => {}} />
      <BackButton showLabel label="Settings" onPress={() => {}} />
      <BackButton showLabel label="Home" onPress={() => {}} />
    </View>
  ),
}

export const WithoutLabel: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <BackButton showLabel={false} onPress={() => {}} />
    </View>
  ),
}

export const Disabled: Story = {
  args: {
    label: "Back",
    disabled: true,
  },
}

export const CustomIcon: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <BackButton
        label="Close"
        icon={<Text style={{ color: "#3b82f6", fontSize: 20 }}>✕</Text>}
        onPress={() => {}}
      />
      <BackButton
        label="Cancel"
        icon={<Text style={{ color: "#3b82f6", fontSize: 18 }}>←</Text>}
        onPress={() => {}}
      />
    </View>
  ),
}

export const InNavigation: Story = {
  render: () => (
    <View
      style={{
        backgroundColor: "#f4f4f5",
        padding: 16,
        borderRadius: 12,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <BackButton label="Back" showLabel onPress={() => {}} />
        <Text style={{ fontSize: 16, fontWeight: "600", color: "#18181b" }}>
          Page Title
        </Text>
        <View style={{ width: 60 }} />
      </View>

      <View
        style={{
          backgroundColor: "#ffffff",
          padding: 16,
          borderRadius: 8,
          minHeight: 200,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "#71717a" }}>Page content goes here</Text>
      </View>
    </View>
  ),
}
