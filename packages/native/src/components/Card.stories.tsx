import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { View, Text } from "react-native"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./Card"
import { Button } from "./Button"

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card style={{ width: 350 }}>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <Text style={{ color: "#71717a" }}>
          This is the card content area where you can put any content you want.
        </Text>
      </CardContent>
      <CardFooter>
        <Button size="sm">Action</Button>
      </CardFooter>
    </Card>
  ),
}

export const Simple: Story = {
  render: () => (
    <Card style={{ width: 350, padding: 16 }}>
      <Text style={{ fontSize: 16, color: "#18181b" }}>
        A simple card with just some text content.
      </Text>
    </Card>
  ),
}

export const WithImage: Story = {
  render: () => (
    <Card style={{ width: 350 }}>
      <View
        style={{
          height: 200,
          backgroundColor: "#e4e4e7",
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "#71717a" }}>Image Placeholder</Text>
      </View>
      <CardHeader>
        <CardTitle>Featured Image</CardTitle>
        <CardDescription>A card with an image at the top.</CardDescription>
      </CardHeader>
      <CardContent>
        <Text style={{ color: "#71717a" }}>
          Additional content below the image.
        </Text>
      </CardContent>
    </Card>
  ),
}

export const Interactive: Story = {
  render: () => (
    <Card style={{ width: 350 }}>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Manage your notification preferences.</CardDescription>
      </CardHeader>
      <CardContent>
        <View style={{ gap: 12 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text style={{ color: "#18181b" }}>Push Notifications</Text>
            <Text style={{ color: "#71717a" }}>Enabled</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text style={{ color: "#18181b" }}>Email Notifications</Text>
            <Text style={{ color: "#71717a" }}>Disabled</Text>
          </View>
        </View>
      </CardContent>
      <CardFooter style={{ gap: 8 }}>
        <Button variant="outline" size="sm">Cancel</Button>
        <Button size="sm">Save Changes</Button>
      </CardFooter>
    </Card>
  ),
}

export const Stats: Story = {
  render: () => (
    <View style={{ flexDirection: "row", gap: 16, flexWrap: "wrap" }}>
      <Card style={{ width: 160, padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "#18181b" }}>2,420</Text>
        <Text style={{ color: "#71717a", marginTop: 4 }}>Total Users</Text>
        <Text style={{ color: "#22c55e", fontSize: 12, marginTop: 8 }}>↑ 12%</Text>
      </Card>
      <Card style={{ width: 160, padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "#18181b" }}>$45,231</Text>
        <Text style={{ color: "#71717a", marginTop: 4 }}>Revenue</Text>
        <Text style={{ color: "#22c55e", fontSize: 12, marginTop: 8 }}>↑ 8.2%</Text>
      </Card>
    </View>
  ),
}

export const Product: Story = {
  render: () => (
    <Card style={{ width: 280 }}>
      <View
        style={{
          height: 180,
          backgroundColor: "#f4f4f5",
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 48 }}>👟</Text>
      </View>
      <CardHeader>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
          <View>
            <CardTitle>Running Shoes</CardTitle>
            <CardDescription>Comfort fit, all terrains</CardDescription>
          </View>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#18181b" }}>$129</Text>
        </View>
      </CardHeader>
      <CardFooter>
        <Button style={{ flex: 1 }}>Add to Cart</Button>
      </CardFooter>
    </Card>
  ),
}
