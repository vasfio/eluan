import type { Meta, StoryObj } from "@storybook/react"
import React, { useState } from "react"
import { View, Text } from "react-native"
import { RefreshableScrollView } from "./PullToRefresh"

const meta: Meta<typeof RefreshableScrollView> = {
  title: "Components/PullToRefresh",
  component: RefreshableScrollView,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof RefreshableScrollView>

const SampleContent = () => (
  <View style={{ gap: 12, padding: 16 }}>
    {Array.from({ length: 10 }, (_, i) => (
      <View
        key={i}
        style={{
          padding: 16,
          backgroundColor: "#f4f4f5",
          borderRadius: 8,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "500", color: "#18181b" }}>
          Item {i + 1}
        </Text>
        <Text style={{ fontSize: 14, color: "#71717a", marginTop: 4 }}>
          Pull down to refresh this list
        </Text>
      </View>
    ))}
  </View>
)

const DefaultStory = () => {
  const [refreshing, setRefreshing] = useState(false)
  const onRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 2000)
  }
  return (
    <View style={{ height: 400 }}>
      <RefreshableScrollView refreshing={refreshing} onRefresh={onRefresh}>
        <SampleContent />
      </RefreshableScrollView>
    </View>
  )
}

export const Default: Story = {
  render: () => <DefaultStory />,
}

export const Refreshing: Story = {
  render: () => (
    <View style={{ height: 400 }}>
      <RefreshableScrollView refreshing={true} onRefresh={() => {}}>
        <SampleContent />
      </RefreshableScrollView>
    </View>
  ),
}

export const WithTitle: Story = {
  render: () => (
    <View style={{ height: 400 }}>
      <RefreshableScrollView
        refreshing={false}
        onRefresh={() => {}}
        title="Pull to refresh"
      >
        <SampleContent />
      </RefreshableScrollView>
    </View>
  ),
}

export const CustomColor: Story = {
  render: () => (
    <View style={{ height: 400 }}>
      <RefreshableScrollView
        refreshing={false}
        onRefresh={() => {}}
        color="#8b5cf6"
      >
        <SampleContent />
      </RefreshableScrollView>
    </View>
  ),
}
