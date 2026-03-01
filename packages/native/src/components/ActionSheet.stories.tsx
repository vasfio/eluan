import type { Meta, StoryObj } from "@storybook/react"
import React, { useState } from "react"
import { View, Text } from "react-native"
import { ActionSheet, useActionSheet } from "./ActionSheet"
import { Button } from "./Button"

const meta: Meta<typeof ActionSheet> = {
  title: "Components/ActionSheet",
  component: ActionSheet,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: function DefaultStory() {
    const [visible, setVisible] = useState(false)

    return (
      <View>
        <Button onPress={() => setVisible(true)}>Open Action Sheet</Button>

        <ActionSheet
          visible={visible}
          onClose={() => setVisible(false)}
          title="Select Option"
          options={[
            { key: "edit", label: "Edit", onPress: () => console.log("Edit") },
            { key: "share", label: "Share", onPress: () => console.log("Share") },
            { key: "duplicate", label: "Duplicate", onPress: () => console.log("Duplicate") },
          ]}
        />
      </View>
    )
  },
}

export const WithTitleAndMessage: Story = {
  render: function WithTitleAndMessageStory() {
    const [visible, setVisible] = useState(false)

    return (
      <View>
        <Button onPress={() => setVisible(true)}>Show Action Sheet</Button>

        <ActionSheet
          visible={visible}
          onClose={() => setVisible(false)}
          title="Delete Item"
          message="Are you sure you want to delete this item? This action cannot be undone."
          options={[
            {
              key: "delete",
              label: "Delete",
              destructive: true,
              onPress: () => console.log("Delete"),
            },
          ]}
          cancelLabel="Cancel"
        />
      </View>
    )
  },
}

export const WithIcons: Story = {
  render: function WithIconsStory() {
    const [visible, setVisible] = useState(false)

    return (
      <View>
        <Button onPress={() => setVisible(true)}>File Options</Button>

        <ActionSheet
          visible={visible}
          onClose={() => setVisible(false)}
          title="File Actions"
          options={[
            {
              key: "download",
              label: "Download",
              icon: <Text style={{ fontSize: 18 }}>⬇️</Text>,
              onPress: () => console.log("Download"),
            },
            {
              key: "share",
              label: "Share",
              icon: <Text style={{ fontSize: 18 }}>🔗</Text>,
              onPress: () => console.log("Share"),
            },
            {
              key: "rename",
              label: "Rename",
              icon: <Text style={{ fontSize: 18 }}>✏️</Text>,
              onPress: () => console.log("Rename"),
            },
            {
              key: "move",
              label: "Move to folder",
              icon: <Text style={{ fontSize: 18 }}>📁</Text>,
              onPress: () => console.log("Move"),
            },
            {
              key: "delete",
              label: "Delete",
              icon: <Text style={{ fontSize: 18 }}>🗑️</Text>,
              destructive: true,
              onPress: () => console.log("Delete"),
            },
          ]}
        />
      </View>
    )
  },
}

export const WithDescriptions: Story = {
  render: function WithDescriptionsStory() {
    const [visible, setVisible] = useState(false)

    return (
      <View>
        <Button onPress={() => setVisible(true)}>Share Options</Button>

        <ActionSheet
          visible={visible}
          onClose={() => setVisible(false)}
          title="Share"
          options={[
            {
              key: "public",
              label: "Public",
              description: "Anyone with the link can view",
              onPress: () => console.log("Public"),
            },
            {
              key: "restricted",
              label: "Restricted",
              description: "Only people with access can view",
              onPress: () => console.log("Restricted"),
            },
            {
              key: "private",
              label: "Private",
              description: "Only you can view",
              onPress: () => console.log("Private"),
            },
          ]}
        />
      </View>
    )
  },
}

export const WithDisabledOptions: Story = {
  render: function WithDisabledOptionsStory() {
    const [visible, setVisible] = useState(false)

    return (
      <View>
        <Button onPress={() => setVisible(true)}>Account Options</Button>

        <ActionSheet
          visible={visible}
          onClose={() => setVisible(false)}
          title="Account"
          options={[
            {
              key: "profile",
              label: "Edit Profile",
              onPress: () => console.log("Edit Profile"),
            },
            {
              key: "security",
              label: "Security Settings",
              onPress: () => console.log("Security"),
            },
            {
              key: "upgrade",
              label: "Upgrade to Pro",
              description: "Already on Pro plan",
              disabled: true,
              onPress: () => console.log("Upgrade"),
            },
            {
              key: "logout",
              label: "Sign Out",
              destructive: true,
              onPress: () => console.log("Sign Out"),
            },
          ]}
        />
      </View>
    )
  },
}

export const DestructiveActions: Story = {
  render: function DestructiveActionsStory() {
    const [visible, setVisible] = useState(false)

    return (
      <View>
        <Button variant="destructive" onPress={() => setVisible(true)}>
          Delete Account
        </Button>

        <ActionSheet
          visible={visible}
          onClose={() => setVisible(false)}
          title="Delete Account"
          message="This will permanently delete your account and all associated data. This action cannot be undone."
          options={[
            {
              key: "export",
              label: "Export my data first",
              onPress: () => console.log("Export"),
            },
            {
              key: "delete",
              label: "Delete my account",
              destructive: true,
              onPress: () => console.log("Delete account"),
            },
          ]}
          cancelLabel="Keep my account"
        />
      </View>
    )
  },
}

export const PhotoOptions: Story = {
  render: function PhotoOptionsStory() {
    const [visible, setVisible] = useState(false)

    return (
      <View>
        <Button onPress={() => setVisible(true)}>Change Profile Photo</Button>

        <ActionSheet
          visible={visible}
          onClose={() => setVisible(false)}
          options={[
            {
              key: "camera",
              label: "Take Photo",
              icon: <Text style={{ fontSize: 18 }}>📷</Text>,
              onPress: () => console.log("Camera"),
            },
            {
              key: "library",
              label: "Choose from Library",
              icon: <Text style={{ fontSize: 18 }}>🖼️</Text>,
              onPress: () => console.log("Library"),
            },
            {
              key: "remove",
              label: "Remove Photo",
              icon: <Text style={{ fontSize: 18 }}>🗑️</Text>,
              destructive: true,
              onPress: () => console.log("Remove"),
            },
          ]}
        />
      </View>
    )
  },
}

export const UseHook: Story = {
  render: function UseHookStory() {
    const { show, ActionSheet } = useActionSheet()

    const handleShowSheet = () => {
      show({
        title: "Hook-based Action Sheet",
        message: "This action sheet is managed by the useActionSheet hook",
        options: [
          { key: "option1", label: "Option 1", onPress: () => console.log("Option 1") },
          { key: "option2", label: "Option 2", onPress: () => console.log("Option 2") },
          { key: "option3", label: "Option 3", onPress: () => console.log("Option 3") },
        ],
      })
    }

    return (
      <View>
        <Button onPress={handleShowSheet}>Show via Hook</Button>
        <ActionSheet />
      </View>
    )
  },
}

export const MultipleSheets: Story = {
  render: function MultipleSheetsStory() {
    const [activeSheet, setActiveSheet] = useState<string | null>(null)

    return (
      <View style={{ gap: 12 }}>
        <Button onPress={() => setActiveSheet("share")}>Share Options</Button>
        <Button onPress={() => setActiveSheet("edit")}>Edit Options</Button>
        <Button variant="destructive" onPress={() => setActiveSheet("delete")}>
          Delete Options
        </Button>

        <ActionSheet
          visible={activeSheet === "share"}
          onClose={() => setActiveSheet(null)}
          title="Share"
          options={[
            { key: "copy", label: "Copy Link" },
            { key: "email", label: "Email" },
            { key: "message", label: "Message" },
          ]}
        />

        <ActionSheet
          visible={activeSheet === "edit"}
          onClose={() => setActiveSheet(null)}
          title="Edit"
          options={[
            { key: "rename", label: "Rename" },
            { key: "move", label: "Move" },
            { key: "duplicate", label: "Duplicate" },
          ]}
        />

        <ActionSheet
          visible={activeSheet === "delete"}
          onClose={() => setActiveSheet(null)}
          title="Are you sure?"
          message="This cannot be undone."
          options={[
            { key: "delete", label: "Delete", destructive: true },
          ]}
        />
      </View>
    )
  },
}
