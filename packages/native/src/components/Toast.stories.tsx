import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { View, Text } from "react-native"
import { Toast } from "./Toast"
import { Button } from "./Button"

const meta: Meta<typeof Toast> = {
  title: "Components/Toast",
  component: Toast,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "success", "warning", "destructive", "info"],
    },
    duration: {
      control: "number",
    },
  },
  decorators: [
    (Story) => (
      <View style={{ minHeight: 200, padding: 16 }}>
        <Story />
      </View>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    id: "toast-1",
    title: "Default Toast",
    description: "This is a default toast message.",
    duration: 0, // Don't auto-dismiss in stories
  },
}

export const Variants: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Toast
        id="default"
        title="Default"
        description="This is a default toast message."
        variant="default"
        duration={0}
      />
      <Toast
        id="success"
        title="Success"
        description="Your changes have been saved."
        variant="success"
        duration={0}
      />
      <Toast
        id="warning"
        title="Warning"
        description="Please review your input."
        variant="warning"
        duration={0}
      />
      <Toast
        id="destructive"
        title="Error"
        description="Something went wrong."
        variant="destructive"
        duration={0}
      />
      <Toast
        id="info"
        title="Info"
        description="Here's some useful information."
        variant="info"
        duration={0}
      />
    </View>
  ),
}

export const WithAction: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Toast
        id="action-1"
        title="Message Sent"
        description="Your message has been sent successfully."
        variant="success"
        duration={0}
        action={{
          label: "Undo",
          onPress: () => console.log("Undo pressed"),
        }}
      />
      <Toast
        id="action-2"
        title="Item Deleted"
        description="The item has been moved to trash."
        variant="default"
        duration={0}
        action={{
          label: "Restore",
          onPress: () => console.log("Restore pressed"),
        }}
      />
    </View>
  ),
}

export const TitleOnly: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Toast
        id="title-1"
        title="Settings saved"
        variant="success"
        duration={0}
      />
      <Toast
        id="title-2"
        title="Connection lost"
        variant="destructive"
        duration={0}
      />
    </View>
  ),
}

export const LongContent: Story = {
  render: () => (
    <Toast
      id="long"
      title="Update Available"
      description="A new version of the app is available. Please update to get the latest features and bug fixes. This update includes performance improvements and new customization options."
      variant="info"
      duration={0}
      action={{
        label: "Update",
        onPress: () => console.log("Update pressed"),
      }}
    />
  ),
}

export const Interactive: Story = {
  render: function InteractiveToastStory() {
    const [toasts, setToasts] = React.useState<Array<{ id: string; title: string; variant: "success" | "destructive" | "warning" | "info" }>>([])

    const addToast = (variant: "success" | "destructive" | "warning" | "info") => {
      const messages = {
        success: "Action completed successfully!",
        destructive: "An error occurred.",
        warning: "Please check your input.",
        info: "Here's some information.",
      }
      const newToast = {
        id: `toast-${Date.now()}`,
        title: messages[variant],
        variant,
      }
      setToasts([...toasts, newToast])
    }

    const removeToast = (id: string) => {
      setToasts(toasts.filter((t) => t.id !== id))
    }

    return (
      <View style={{ gap: 16 }}>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
          <Button size="sm" onPress={() => addToast("success")}>Success</Button>
          <Button size="sm" variant="destructive" onPress={() => addToast("destructive")}>Error</Button>
          <Button size="sm" variant="secondary" onPress={() => addToast("warning")}>Warning</Button>
          <Button size="sm" variant="outline" onPress={() => addToast("info")}>Info</Button>
        </View>

        <View style={{ gap: 8 }}>
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              id={toast.id}
              title={toast.title}
              variant={toast.variant}
              duration={3000}
              onDismiss={() => removeToast(toast.id)}
            />
          ))}
        </View>
      </View>
    )
  },
}

export const WithProvider: Story = {
  render: () => (
    <View style={{ padding: 16 }}>
      <Text style={{ color: "#71717a", marginBottom: 16 }}>
        The ToastProvider component manages toast state and positioning.
        Use the useToast hook to show toasts from anywhere in your app.
      </Text>
      <View
        style={{
          padding: 16,
          backgroundColor: "#f4f4f5",
          borderRadius: 8,
        }}
      >
        <Text style={{ fontFamily: "monospace", fontSize: 12, color: "#18181b" }}>
{`import { ToastProvider, useToast } from './Toast'

function App() {
  return (
    <ToastProvider position="top">
      <MyComponent />
    </ToastProvider>
  )
}

function MyComponent() {
  const { addToast } = useToast()

  const handleClick = () => {
    addToast({
      title: "Success!",
      variant: "success",
    })
  }

  return <Button onPress={handleClick}>Show Toast</Button>
}`}
        </Text>
      </View>
    </View>
  ),
}
