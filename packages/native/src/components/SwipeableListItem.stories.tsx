import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { View, Text } from "react-native"
import { SwipeableListItem, SwipeAction } from "./SwipeableListItem"

const meta: Meta<typeof SwipeableListItem> = {
  title: "Components/SwipeableListItem",
  component: SwipeableListItem,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

const deleteAction: SwipeAction = {
  key: "delete",
  label: "Delete",
  color: "#ef4444",
  onPress: () => {},
}

const archiveAction: SwipeAction = {
  key: "archive",
  label: "Archive",
  color: "#3b82f6",
  onPress: () => {},
}

const muteAction: SwipeAction = {
  key: "mute",
  label: "Mute",
  color: "#8b5cf6",
  onPress: () => {},
}

const ListItemContent = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <View style={{ padding: 16 }}>
    <Text style={{ fontSize: 16, fontWeight: "500", color: "#18181b" }}>
      {title}
    </Text>
    <Text style={{ fontSize: 14, color: "#71717a", marginTop: 4 }}>
      {subtitle}
    </Text>
  </View>
)

export const Default: Story = {
  args: {
    leftActions: [deleteAction],
    children: undefined,
  },
  render: (args) => (
    <SwipeableListItem {...args}>
      <ListItemContent
        title="Swipe me left"
        subtitle="Reveals a delete action on the right"
      />
    </SwipeableListItem>
  ),
}

export const LeftAndRightActions: Story = {
  render: () => (
    <SwipeableListItem
      leftActions={[deleteAction]}
      rightActions={[archiveAction]}
    >
      <ListItemContent
        title="Swipe both directions"
        subtitle="Left to delete, right to archive"
      />
    </SwipeableListItem>
  ),
}

export const MultipleActions: Story = {
  render: () => (
    <SwipeableListItem leftActions={[deleteAction, archiveAction, muteAction]}>
      <ListItemContent
        title="Multiple actions"
        subtitle="Swipe left to reveal three actions"
      />
    </SwipeableListItem>
  ),
}

export const InList: Story = {
  render: () => (
    <View style={{ gap: 1, backgroundColor: "#e4e4e7" }}>
      {["Inbox item 1", "Inbox item 2", "Inbox item 3"].map((title, i) => (
        <SwipeableListItem
          key={i}
          leftActions={[deleteAction]}
          rightActions={[archiveAction]}
        >
          <ListItemContent
            title={title}
            subtitle="Swipe to reveal actions"
          />
        </SwipeableListItem>
      ))}
    </View>
  ),
}

export const WithPress: Story = {
  render: () => (
    <SwipeableListItem
      leftActions={[deleteAction]}
      onPress={() => {}}
    >
      <ListItemContent
        title="Tap or swipe"
        subtitle="This item responds to both tap and swipe"
      />
    </SwipeableListItem>
  ),
}

export const Disabled: Story = {
  render: () => (
    <SwipeableListItem
      leftActions={[deleteAction]}
      disabled
    >
      <ListItemContent
        title="Disabled swipe"
        subtitle="Swiping is disabled on this item"
      />
    </SwipeableListItem>
  ),
}
