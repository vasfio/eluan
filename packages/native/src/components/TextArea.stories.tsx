import type { Meta, StoryObj } from "@storybook/react"
import React, { useState } from "react"
import { View, Text } from "react-native"
import { TextArea } from "./TextArea"
import { Button } from "./Button"

const meta: Meta<typeof TextArea> = {
  title: "Components/TextArea",
  component: TextArea,
  tags: ["autodocs"],
  argTypes: {
    rows: {
      control: { type: "range", min: 2, max: 10, step: 1 },
    },
    maxLength: {
      control: "number",
    },
    showCount: {
      control: "boolean",
    },
    autoGrow: {
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
    placeholder: "Enter your message...",
    rows: 4,
  },
}

export const WithLabel: Story = {
  args: {
    label: "Description",
    placeholder: "Tell us more about your project...",
  },
}

export const WithHelperText: Story = {
  args: {
    label: "Bio",
    placeholder: "Write a short bio...",
    helperText: "This will be displayed on your public profile.",
  },
}

export const WithError: Story = {
  args: {
    label: "Message",
    placeholder: "Enter your message...",
    error: "Message is required",
  },
}

export const WithCharacterCount: Story = {
  render: function CharacterCountStory() {
    const [value, setValue] = useState("")
    return (
      <TextArea
        label="Tweet"
        placeholder="What's happening?"
        value={value}
        onChangeText={setValue}
        maxLength={280}
        showCount
      />
    )
  },
}

export const RowSizes: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <TextArea label="2 Rows" rows={2} placeholder="Small textarea..." />
      <TextArea label="4 Rows" rows={4} placeholder="Default textarea..." />
      <TextArea label="6 Rows" rows={6} placeholder="Large textarea..." />
    </View>
  ),
}

export const AutoGrow: Story = {
  render: function AutoGrowStory() {
    const [value, setValue] = useState("")
    return (
      <View style={{ gap: 16 }}>
        <TextArea
          label="Auto-growing TextArea"
          placeholder="Start typing and watch it grow..."
          value={value}
          onChangeText={setValue}
          autoGrow
          rows={2}
          maxHeight={200}
          helperText="This textarea will grow as you type"
        />
        <Text style={{ color: "#71717a", fontSize: 12 }}>
          Lines: {(value.match(/\n/g) || []).length + 1}
        </Text>
      </View>
    )
  },
}

export const Disabled: Story = {
  args: {
    label: "Disabled TextArea",
    placeholder: "You can't edit this...",
    disabled: true,
    value: "This content is read-only and cannot be edited.",
  },
}

export const ContactForm: Story = {
  render: function ContactFormStory() {
    const [name] = useState("")
    const [message, setMessage] = useState("")

    return (
      <View style={{ gap: 16 }}>
        <View>
          <Text style={{ fontSize: 18, fontWeight: "600", color: "#18181b", marginBottom: 4 }}>
            Contact Us
          </Text>
          <Text style={{ color: "#71717a", marginBottom: 16 }}>
            We'd love to hear from you. Send us a message!
          </Text>
        </View>

        <View
          style={{
            height: 44,
            borderWidth: 1,
            borderColor: "#e4e4e7",
            borderRadius: 8,
            paddingHorizontal: 12,
            justifyContent: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Text style={{ color: "#71717a" }}>Name:</Text>
            <Text style={{ color: "#18181b" }}>{name || "Enter name..."}</Text>
          </View>
        </View>

        <TextArea
          label="Message"
          placeholder="How can we help you?"
          value={message}
          onChangeText={setMessage}
          rows={5}
          maxLength={500}
          showCount
        />

        <Button disabled={!name || !message}>Send Message</Button>
      </View>
    )
  },
}

export const FeedbackForm: Story = {
  render: function FeedbackFormStory() {
    const [feedback, setFeedback] = useState("")
    const [submitted, setSubmitted] = useState(false)

    if (submitted) {
      return (
        <View
          style={{
            padding: 24,
            backgroundColor: "#dcfce7",
            borderRadius: 12,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 24, marginBottom: 8 }}>✓</Text>
          <Text style={{ fontWeight: "600", color: "#166534" }}>Thank you!</Text>
          <Text style={{ color: "#166534", marginTop: 4 }}>
            Your feedback has been submitted.
          </Text>
        </View>
      )
    }

    return (
      <View
        style={{
          padding: 20,
          backgroundColor: "#f4f4f5",
          borderRadius: 12,
          gap: 16,
        }}
      >
        <View>
          <Text style={{ fontSize: 16, fontWeight: "600", color: "#18181b" }}>
            How was your experience?
          </Text>
          <Text style={{ color: "#71717a", marginTop: 4 }}>
            Your feedback helps us improve
          </Text>
        </View>

        <TextArea
          placeholder="Tell us what you think..."
          value={feedback}
          onChangeText={setFeedback}
          rows={4}
          autoGrow
        />

        <Button
          disabled={feedback.length < 10}
          onPress={() => setSubmitted(true)}
        >
          Submit Feedback
        </Button>

        {feedback.length > 0 && feedback.length < 10 && (
          <Text style={{ color: "#f59e0b", fontSize: 12 }}>
            Please write at least 10 characters
          </Text>
        )}
      </View>
    )
  },
}

export const CodeInput: Story = {
  render: function CodeInputStory() {
    const [code, setCode] = useState(`function hello() {\n  console.log("Hello, World!");\n}`)

    return (
      <View style={{ gap: 12 }}>
        <TextArea
          label="Code Snippet"
          value={code}
          onChangeText={setCode}
          rows={6}
          style={{
            fontFamily: "monospace",
            fontSize: 14,
          }}
          autoGrow
          maxHeight={300}
        />
        <View
          style={{
            padding: 12,
            backgroundColor: "#18181b",
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "#71717a", fontSize: 12, marginBottom: 4 }}>
            Preview:
          </Text>
          <Text style={{ color: "#fafafa", fontFamily: "monospace", fontSize: 12 }}>
            {code}
          </Text>
        </View>
      </View>
    )
  },
}

export const NotesTaking: Story = {
  render: function NotesStory() {
    const [notes, setNotes] = useState("")
    const wordCount = notes.trim() ? notes.trim().split(/\s+/).length : 0

    return (
      <View style={{ gap: 12 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text style={{ fontSize: 16, fontWeight: "600", color: "#18181b" }}>
            Notes
          </Text>
          <Text style={{ color: "#71717a", fontSize: 12 }}>
            {wordCount} words
          </Text>
        </View>

        <TextArea
          placeholder="Start writing your notes..."
          value={notes}
          onChangeText={setNotes}
          rows={8}
          autoGrow
          maxHeight={400}
        />

        <View style={{ flexDirection: "row", gap: 8 }}>
          <Button variant="outline" size="sm" onPress={() => setNotes("")}>
            Clear
          </Button>
          <Button size="sm">Save Notes</Button>
        </View>
      </View>
    )
  },
}
