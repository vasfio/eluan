import type { Meta, StoryObj } from "@storybook/react"
import React, { useState } from "react"
import { View, Text } from "react-native"
import { Switch, LabeledSwitch } from "./Switch"

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
    },
    labelPosition: {
      control: "select",
      options: ["left", "right"],
    },
    disabled: {
      control: "boolean",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: function SwitchStory() {
    const [checked, setChecked] = useState(false)
    return <Switch checked={checked} onCheckedChange={setChecked} />
  },
}

export const WithLabel: Story = {
  render: function SwitchWithLabelStory() {
    const [checked, setChecked] = useState(false)
    return (
      <Switch
        checked={checked}
        onCheckedChange={setChecked}
        label="Enable notifications"
      />
    )
  },
}

export const WithDescription: Story = {
  render: function SwitchWithDescriptionStory() {
    const [checked, setChecked] = useState(true)
    return (
      <Switch
        checked={checked}
        onCheckedChange={setChecked}
        label="Dark mode"
        description="Use dark theme across the app"
      />
    )
  },
}

export const Sizes: Story = {
  render: function SwitchSizesStory() {
    const [small, setSmall] = useState(true)
    const [medium, setMedium] = useState(true)
    const [large, setLarge] = useState(true)

    return (
      <View style={{ gap: 16 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <Text style={{ width: 60, color: "#71717a" }}>Small</Text>
          <Switch size="sm" checked={small} onCheckedChange={setSmall} />
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <Text style={{ width: 60, color: "#71717a" }}>Default</Text>
          <Switch size="default" checked={medium} onCheckedChange={setMedium} />
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <Text style={{ width: 60, color: "#71717a" }}>Large</Text>
          <Switch size="lg" checked={large} onCheckedChange={setLarge} />
        </View>
      </View>
    )
  },
}

export const LabelPositions: Story = {
  render: function LabelPositionsStory() {
    const [left, setLeft] = useState(true)
    const [right, setRight] = useState(false)

    return (
      <View style={{ gap: 16 }}>
        <Switch
          checked={left}
          onCheckedChange={setLeft}
          label="Label on left"
          labelPosition="left"
        />
        <Switch
          checked={right}
          onCheckedChange={setRight}
          label="Label on right"
          labelPosition="right"
        />
      </View>
    )
  },
}

export const Disabled: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Switch
        checked={false}
        disabled
        label="Disabled (off)"
      />
      <Switch
        checked={true}
        disabled
        label="Disabled (on)"
      />
    </View>
  ),
}

export const LabeledSwitchExample: Story = {
  render: function LabeledSwitchStory() {
    const [checked, setChecked] = useState(false)
    return (
      <View style={{ gap: 16 }}>
        <LabeledSwitch
          checked={checked}
          onCheckedChange={setChecked}
        />
        <LabeledSwitch
          checked={checked}
          onCheckedChange={setChecked}
          offLabel="Disabled"
          onLabel="Enabled"
        />
      </View>
    )
  },
}

export const SettingsExample: Story = {
  render: function SettingsStory() {
    const [notifications, setNotifications] = useState(true)
    const [emails, setEmails] = useState(false)
    const [marketing, setMarketing] = useState(false)
    const [analytics, setAnalytics] = useState(true)

    return (
      <View style={{ gap: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "600", color: "#18181b" }}>
          Notification Settings
        </Text>

        <View style={{ gap: 16 }}>
          <Switch
            checked={notifications}
            onCheckedChange={setNotifications}
            label="Push Notifications"
            description="Receive push notifications on your device"
          />

          <Switch
            checked={emails}
            onCheckedChange={setEmails}
            label="Email Notifications"
            description="Receive updates via email"
          />

          <Switch
            checked={marketing}
            onCheckedChange={setMarketing}
            label="Marketing Emails"
            description="Receive promotional content and offers"
          />

          <Switch
            checked={analytics}
            onCheckedChange={setAnalytics}
            label="Analytics"
            description="Help improve our app with anonymous usage data"
          />
        </View>
      </View>
    )
  },
}
