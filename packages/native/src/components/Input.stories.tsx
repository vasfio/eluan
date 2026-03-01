import type { Meta, StoryObj } from "@storybook/react"
import React, { useState } from "react"
import { View, Text } from "react-native"
import { Input, PasswordInput, SearchInput } from "./Input"

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
}

export const WithLabel: Story = {
  args: {
    label: "Email",
    placeholder: "you@example.com",
  },
}

export const WithHelperText: Story = {
  args: {
    label: "Username",
    placeholder: "Enter your username",
    helperText: "This will be your public display name.",
  },
}

export const WithError: Story = {
  args: {
    label: "Email",
    placeholder: "you@example.com",
    error: "Please enter a valid email address.",
    defaultValue: "invalid-email",
  },
}

export const Disabled: Story = {
  args: {
    label: "Disabled Input",
    placeholder: "You can't edit this",
    disabled: true,
    defaultValue: "Disabled value",
  },
}

export const WithIcons: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Input
        label="Email"
        placeholder="you@example.com"
        leftElement={<Text style={{ color: "#71717a" }}>📧</Text>}
      />
      <Input
        label="Amount"
        placeholder="0.00"
        leftElement={<Text style={{ color: "#71717a" }}>$</Text>}
        keyboardType="decimal-pad"
      />
      <Input
        label="Website"
        placeholder="example.com"
        leftElement={<Text style={{ color: "#71717a" }}>🌐</Text>}
        rightElement={<Text style={{ color: "#71717a" }}>✓</Text>}
      />
    </View>
  ),
}

export const Password: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <PasswordInput
        label="Password"
        placeholder="Enter your password"
      />
      <PasswordInput
        label="Confirm Password"
        placeholder="Confirm your password"
        showToggle={true}
      />
    </View>
  ),
}

export const Search: Story = {
  render: function SearchStory() {
    const [value, setValue] = useState("")

    return (
      <View style={{ gap: 16 }}>
        <SearchInput
          placeholder="Search..."
          value={value}
          onChangeText={setValue}
          onClear={() => setValue("")}
          onSearch={(text) => console.log("Searching:", text)}
        />
        <Text style={{ color: "#71717a", fontSize: 12 }}>
          Current value: {value || "(empty)"}
        </Text>
      </View>
    )
  },
}

export const FormExample: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Input
        label="Full Name"
        placeholder="John Doe"
      />
      <Input
        label="Email Address"
        placeholder="john@example.com"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Input
        label="Phone Number"
        placeholder="+1 (555) 000-0000"
        keyboardType="phone-pad"
      />
      <PasswordInput
        label="Password"
        placeholder="Create a password"
        helperText="Must be at least 8 characters"
      />
    </View>
  ),
}

export const Sizes: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Input
        placeholder="Default size input"
        containerStyle={{ minHeight: 44 }}
      />
      <Input
        placeholder="Larger input with more padding"
        style={{ paddingVertical: 16, fontSize: 18 }}
      />
    </View>
  ),
}
