import React from "react"
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ViewStyle,
  useColorScheme,
  Image,
  ScrollView,
} from "react-native"
import { fontSizes } from "@eluan/tokens"
import { sp, sz, curves, getSemanticColors } from "../utils/styles"

export interface MediaItem {
  /**
   * Unique identifier for the media
   */
  id: string
  /**
   * URI of the media
   */
  uri: string
  /**
   * Type of media
   */
  type: "image" | "video"
  /**
   * Duration in seconds (for video)
   */
  duration?: number
  /**
   * File name
   */
  fileName?: string
}

export interface MediaPickerProps {
  /**
   * Currently selected media items
   */
  selectedMedia: MediaItem[]
  /**
   * Callback when media selection changes
   */
  onSelectionChange: (media: MediaItem[]) => void
  /**
   * Maximum number of items that can be selected
   * @default 1
   */
  maxSelection?: number
  /**
   * Allowed media types
   * @default ["image", "video"]
   */
  allowedTypes?: ("image" | "video")[]
  /**
   * Callback to trigger native picker
   */
  onPickerPress: () => void
  /**
   * Callback to trigger camera
   */
  onCameraPress?: () => void
  /**
   * Placeholder text when no media selected
   */
  placeholder?: string
  /**
   * Style for the container
   */
  style?: ViewStyle
  /**
   * Whether the picker is disabled
   */
  disabled?: boolean
}

export function MediaPicker({
  selectedMedia,
  onSelectionChange,
  maxSelection = 1,
  onPickerPress,
  onCameraPress,
  placeholder = "Select media",
  style,
  disabled = false,
}: MediaPickerProps) {
  const colorScheme = useColorScheme() ?? "light"
  const colors = getSemanticColors(colorScheme)

  const backgroundColor = colors.actionSecondary.bg
  const borderColor = colors.container.border
  const textColor = colors.container.fg
  const mutedColor = colors.container.fgAlt

  const handleRemove = (id: string) => {
    onSelectionChange(selectedMedia.filter((item) => item.id !== id))
  }

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const canAddMore = selectedMedia.length < maxSelection

  return (
    <View style={[styles.container, style]}>
      {selectedMedia.length > 0 ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.mediaList}
        >
          {selectedMedia.map((item) => (
            <View key={item.id} style={styles.mediaItem}>
              <Image source={{ uri: item.uri }} style={styles.mediaImage} />
              {item.type === "video" && item.duration && (
                <View style={styles.durationBadge}>
                  <Text style={styles.durationText}>
                    {formatDuration(item.duration)}
                  </Text>
                </View>
              )}
              <Pressable
                style={styles.removeButton}
                onPress={() => handleRemove(item.id)}
                hitSlop={8}
              >
                <Text style={styles.removeButtonText}>×</Text>
              </Pressable>
            </View>
          ))}
          {canAddMore && (
            <Pressable
              style={[
                styles.addButton,
                { backgroundColor, borderColor },
                disabled && styles.disabled,
              ]}
              onPress={onPickerPress}
              disabled={disabled}
            >
              <Text style={[styles.addButtonIcon, { color: mutedColor }]}>+</Text>
            </Pressable>
          )}
        </ScrollView>
      ) : (
        <View style={styles.emptyState}>
          <Pressable
            style={[
              styles.pickerButton,
              { backgroundColor, borderColor },
              disabled && styles.disabled,
            ]}
            onPress={onPickerPress}
            disabled={disabled}
          >
            <Text style={[styles.pickerIcon, { color: mutedColor }]}>🖼</Text>
            <Text style={[styles.pickerText, { color: textColor }]}>
              {placeholder}
            </Text>
          </Pressable>
          {onCameraPress && (
            <Pressable
              style={[
                styles.cameraButton,
                { backgroundColor, borderColor },
                disabled && styles.disabled,
              ]}
              onPress={onCameraPress}
              disabled={disabled}
            >
              <Text style={[styles.cameraIcon, { color: mutedColor }]}>📷</Text>
            </Pressable>
          )}
        </View>
      )}
      {maxSelection > 1 && (
        <Text style={[styles.helperText, { color: mutedColor }]}>
          {selectedMedia.length}/{maxSelection} selected
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: sp.xxs,
  },
  mediaList: {
    gap: sp.xxs,
    paddingVertical: sp.xxs,
  },
  mediaItem: {
    position: "relative",
    width: 80,
    height: 80,
    borderRadius: curves.xs,
    overflow: "hidden",
  },
  mediaImage: {
    width: "100%",
    height: "100%",
  },
  durationBadge: {
    position: "absolute",
    bottom: 2,
    right: 2,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingHorizontal: sp.xxs,
    paddingVertical: sp.xxs,
    borderRadius: curves.xxs,
  },
  durationText: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "500",
  },
  removeButton: {
    position: "absolute",
    top: 2,
    right: 2,
    width: sz.xs,
    height: sz.xs,
    borderRadius: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    alignItems: "center",
    justifyContent: "center",
  },
  removeButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 18,
  },
  addButton: {
    width: 80,
    height: 80,
    borderRadius: curves.xs,
    borderWidth: 2,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonIcon: {
    fontSize: 32,
    fontWeight: "300",
  },
  emptyState: {
    flexDirection: "row",
    gap: sp.xxs,
  },
  pickerButton: {
    flex: 1,
    height: 100,
    borderRadius: curves.xs,
    borderWidth: 2,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    gap: sp.xxs,
  },
  pickerIcon: {
    fontSize: 32,
  },
  pickerText: {
    fontSize: fontSizes.sm,
    fontWeight: "500",
  },
  cameraButton: {
    width: 100,
    height: 100,
    borderRadius: curves.xs,
    borderWidth: 2,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
  },
  cameraIcon: {
    fontSize: 32,
  },
  disabled: {
    opacity: 0.5,
  },
  helperText: {
    fontSize: fontSizes.xs,
    textAlign: "center",
  },
})
