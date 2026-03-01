import type { Meta, StoryObj } from "@storybook/react"
import React, { useState } from "react"
import { View, Text } from "react-native"
import { BottomTabBar } from "./BottomTabBar"

const meta: Meta<typeof BottomTabBar> = {
  title: "Components/BottomTabBar",
  component: BottomTabBar,
  tags: ["autodocs"],
  argTypes: {
    showLabels: {
      control: "boolean",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Simple icon component for stories
const Icon = ({ name, color }: { name: string; color: string }) => (
  <Text style={{ fontSize: 24, color }}>{name}</Text>
)

export const Default: Story = {
  render: function DefaultStory() {
    const [activeTab, setActiveTab] = useState("home")

    const tabs = [
      {
        key: "home",
        label: "Home",
        icon: ({ color }: { color: string }) => <Icon name="🏠" color={color} />,
      },
      {
        key: "search",
        label: "Search",
        icon: ({ color }: { color: string }) => <Icon name="🔍" color={color} />,
      },
      {
        key: "notifications",
        label: "Notifications",
        icon: ({ color }: { color: string }) => <Icon name="🔔" color={color} />,
      },
      {
        key: "profile",
        label: "Profile",
        icon: ({ color }: { color: string }) => <Icon name="👤" color={color} />,
      },
    ]

    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            padding: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "#71717a" }}>Active tab: {activeTab}</Text>
        </View>
        <BottomTabBar
          tabs={tabs}
          activeTab={activeTab}
          onTabPress={setActiveTab}
        />
      </View>
    )
  },
}

export const WithBadges: Story = {
  render: function WithBadgesStory() {
    const [activeTab, setActiveTab] = useState("inbox")

    const tabs = [
      {
        key: "inbox",
        label: "Inbox",
        icon: ({ color }: { color: string }) => <Icon name="📥" color={color} />,
        badge: 12,
      },
      {
        key: "sent",
        label: "Sent",
        icon: ({ color }: { color: string }) => <Icon name="📤" color={color} />,
      },
      {
        key: "drafts",
        label: "Drafts",
        icon: ({ color }: { color: string }) => <Icon name="📝" color={color} />,
        badge: 3,
      },
      {
        key: "trash",
        label: "Trash",
        icon: ({ color }: { color: string }) => <Icon name="🗑️" color={color} />,
      },
    ]

    return (
      <BottomTabBar
        tabs={tabs}
        activeTab={activeTab}
        onTabPress={setActiveTab}
      />
    )
  },
}

export const LargeBadge: Story = {
  render: function LargeBadgeStory() {
    const [activeTab, setActiveTab] = useState("messages")

    const tabs = [
      {
        key: "messages",
        label: "Messages",
        icon: ({ color }: { color: string }) => <Icon name="💬" color={color} />,
        badge: 150, // Shows as 99+
      },
      {
        key: "calls",
        label: "Calls",
        icon: ({ color }: { color: string }) => <Icon name="📞" color={color} />,
        badge: 5,
      },
      {
        key: "contacts",
        label: "Contacts",
        icon: ({ color }: { color: string }) => <Icon name="👥" color={color} />,
      },
    ]

    return (
      <BottomTabBar
        tabs={tabs}
        activeTab={activeTab}
        onTabPress={setActiveTab}
      />
    )
  },
}

export const WithoutLabels: Story = {
  render: function WithoutLabelsStory() {
    const [activeTab, setActiveTab] = useState("home")

    const tabs = [
      {
        key: "home",
        label: "Home",
        icon: ({ color }: { color: string }) => <Icon name="🏠" color={color} />,
      },
      {
        key: "discover",
        label: "Discover",
        icon: ({ color }: { color: string }) => <Icon name="🧭" color={color} />,
      },
      {
        key: "add",
        label: "Add",
        icon: ({ color }: { color: string }) => <Icon name="➕" color={color} />,
      },
      {
        key: "activity",
        label: "Activity",
        icon: ({ color }: { color: string }) => <Icon name="❤️" color={color} />,
        badge: 8,
      },
      {
        key: "profile",
        label: "Profile",
        icon: ({ color }: { color: string }) => <Icon name="👤" color={color} />,
      },
    ]

    return (
      <BottomTabBar
        tabs={tabs}
        activeTab={activeTab}
        onTabPress={setActiveTab}
        showLabels={false}
      />
    )
  },
}

export const ThreeTabs: Story = {
  render: function ThreeTabsStory() {
    const [activeTab, setActiveTab] = useState("feed")

    const tabs = [
      {
        key: "feed",
        label: "Feed",
        icon: ({ color }: { color: string }) => <Icon name="📰" color={color} />,
      },
      {
        key: "explore",
        label: "Explore",
        icon: ({ color }: { color: string }) => <Icon name="🔍" color={color} />,
      },
      {
        key: "settings",
        label: "Settings",
        icon: ({ color }: { color: string }) => <Icon name="⚙️" color={color} />,
      },
    ]

    return (
      <BottomTabBar
        tabs={tabs}
        activeTab={activeTab}
        onTabPress={setActiveTab}
      />
    )
  },
}

export const FiveTabs: Story = {
  render: function FiveTabsStory() {
    const [activeTab, setActiveTab] = useState("home")

    const tabs = [
      {
        key: "home",
        label: "Home",
        icon: ({ color }: { color: string }) => <Icon name="🏠" color={color} />,
      },
      {
        key: "search",
        label: "Search",
        icon: ({ color }: { color: string }) => <Icon name="🔍" color={color} />,
      },
      {
        key: "create",
        label: "Create",
        icon: ({ color }: { color: string }) => <Icon name="➕" color={color} />,
      },
      {
        key: "reels",
        label: "Reels",
        icon: ({ color }: { color: string }) => <Icon name="🎬" color={color} />,
      },
      {
        key: "profile",
        label: "Profile",
        icon: ({ color }: { color: string }) => <Icon name="👤" color={color} />,
      },
    ]

    return (
      <BottomTabBar
        tabs={tabs}
        activeTab={activeTab}
        onTabPress={setActiveTab}
      />
    )
  },
}

export const FullScreenExample: Story = {
  render: function FullScreenExampleStory() {
    const [activeTab, setActiveTab] = useState("home")

    const tabs = [
      {
        key: "home",
        label: "Home",
        icon: ({ color }: { color: string }) => <Icon name="🏠" color={color} />,
      },
      {
        key: "search",
        label: "Search",
        icon: ({ color }: { color: string }) => <Icon name="🔍" color={color} />,
      },
      {
        key: "cart",
        label: "Cart",
        icon: ({ color }: { color: string }) => <Icon name="🛒" color={color} />,
        badge: 3,
      },
      {
        key: "profile",
        label: "Profile",
        icon: ({ color }: { color: string }) => <Icon name="👤" color={color} />,
      },
    ]

    const content: Record<string, { title: string; description: string }> = {
      home: { title: "Home", description: "Welcome to our app!" },
      search: { title: "Search", description: "Find products, brands, and more" },
      cart: { title: "Cart", description: "You have 3 items in your cart" },
      profile: { title: "Profile", description: "Manage your account settings" },
    }

    return (
      <View style={{ height: 400, backgroundColor: "#f4f4f5" }}>
        <View
          style={{
            flex: 1,
            padding: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#18181b" }}>
            {content[activeTab].title}
          </Text>
          <Text style={{ color: "#71717a", marginTop: 8 }}>
            {content[activeTab].description}
          </Text>
        </View>
        <BottomTabBar
          tabs={tabs}
          activeTab={activeTab}
          onTabPress={setActiveTab}
        />
      </View>
    )
  },
}
