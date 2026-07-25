import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { View, Text } from "react-native"
import { MediaPicker, MediaItem } from "./MediaPicker"

const meta: Meta<typeof MediaPicker> = {
  title: "Components/MediaPicker",
  component: MediaPicker,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

const sampleMedia: MediaItem[] = [
  {
    id: "1",
    uri: "https://picsum.photos/200",
    type: "image",
    fileName: "photo1.jpg",
  },
  {
    id: "2",
    uri: "https://picsum.photos/201",
    type: "image",
    fileName: "photo2.jpg",
  },
  {
    id: "3",
    uri: "https://picsum.photos/202",
    type: "video",
    duration: 125,
    fileName: "clip.mp4",
  },
]

export const Default: Story = {
  args: {
    selectedMedia: [],
    onSelectionChange: () => {},
    onPickerPress: () => {},
  },
}

export const WithCamera: Story = {
  args: {
    selectedMedia: [],
    onSelectionChange: () => {},
    onPickerPress: () => {},
    onCameraPress: () => {},
    placeholder: "Choose a photo",
  },
}

export const WithSelectedMedia: Story = {
  args: {
    selectedMedia: sampleMedia.slice(0, 2),
    onSelectionChange: () => {},
    onPickerPress: () => {},
    maxSelection: 5,
  },
}

export const SingleSelection: Story = {
  args: {
    selectedMedia: sampleMedia.slice(0, 1),
    onSelectionChange: () => {},
    onPickerPress: () => {},
    maxSelection: 1,
  },
}

export const Disabled: Story = {
  args: {
    selectedMedia: [],
    onSelectionChange: () => {},
    onPickerPress: () => {},
    onCameraPress: () => {},
    disabled: true,
    placeholder: "Picker disabled",
  },
}

export const MultipleSelection: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Text style={{ fontSize: 14, color: "#71717a" }}>
        Select up to 5 items
      </Text>
      <MediaPicker
        selectedMedia={sampleMedia}
        onSelectionChange={() => {}}
        onPickerPress={() => {}}
        maxSelection={5}
      />
    </View>
  ),
}
