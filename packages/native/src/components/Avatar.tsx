import React, { useState } from "react"
import {
  View,
  Image,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ImageSourcePropType,
  useColorScheme,
} from "react-native"
import { radii, fontSizes } from "@vasf/ragnar-tokens"

export interface AvatarProps {
  /** Image source (uri or require) */
  source?: ImageSourcePropType
  /** Image URI string (alternative to source) */
  uri?: string
  /** Alt text for accessibility */
  alt?: string
  /** Fallback text (usually initials) */
  fallback?: string
  /** Size of the avatar */
  size?: "xs" | "sm" | "default" | "lg" | "xl" | number
  /** Shape of the avatar */
  shape?: "circle" | "square"
  /** Container style */
  style?: ViewStyle
  /** Text style for fallback */
  textStyle?: TextStyle
  /** Online status indicator */
  status?: "online" | "offline" | "busy" | "away"
  /** Show border */
  bordered?: boolean
}

export function Avatar({
  source,
  uri,
  alt,
  fallback,
  size = "default",
  shape = "circle",
  style,
  textStyle,
  status,
  bordered = false,
}: AvatarProps) {
  const colorScheme = useColorScheme() ?? "light"
  const isDark = colorScheme === "dark"
  const [imageError, setImageError] = useState(false)

  const sizeMap = {
    xs: 24,
    sm: 32,
    default: 40,
    lg: 48,
    xl: 64,
  }

  const numericSize = typeof size === "number" ? size : sizeMap[size]
  const fontSize =
    numericSize < 32
      ? fontSizes.xs
      : numericSize < 48
      ? fontSizes.sm
      : fontSizes.base

  const statusSizeMap = {
    xs: 6,
    sm: 8,
    default: 10,
    lg: 12,
    xl: 14,
  }

  const statusSize = typeof size === "number" ? Math.max(8, numericSize * 0.25) : statusSizeMap[size]

  const statusColors = {
    online: "#22c55e",
    offline: "#71717a",
    busy: "#ef4444",
    away: "#f59e0b",
  }

  const themedStyles = {
    container: {
      backgroundColor: isDark ? "#27272a" : "#e4e4e7",
      borderColor: isDark ? "#3f3f46" : "#d4d4d8",
    },
    text: {
      color: isDark ? "#a1a1aa" : "#71717a",
    },
  }

  const imageSource = source || (uri ? { uri } : undefined)
  const showFallback = !imageSource || imageError

  const getInitials = (text: string) => {
    return text
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <View
      style={[
        styles.container,
        themedStyles.container,
        {
          width: numericSize,
          height: numericSize,
          borderRadius: shape === "circle" ? numericSize / 2 : radii.md,
        },
        bordered && styles.bordered,
        style,
      ]}
      accessibilityLabel={alt}
      accessibilityRole="image"
    >
      {showFallback ? (
        <Text
          style={[
            styles.text,
            themedStyles.text,
            { fontSize },
            textStyle,
          ]}
        >
          {fallback ? getInitials(fallback) : "?"}
        </Text>
      ) : (
        <Image
          source={imageSource}
          style={[
            styles.image,
            {
              width: numericSize,
              height: numericSize,
              borderRadius: shape === "circle" ? numericSize / 2 : radii.md,
            },
          ]}
          onError={() => setImageError(true)}
          accessibilityLabel={alt}
        />
      )}
      {status && (
        <View
          style={[
            styles.status,
            {
              width: statusSize,
              height: statusSize,
              borderRadius: statusSize / 2,
              backgroundColor: statusColors[status],
              right: shape === "circle" ? 0 : -2,
              bottom: shape === "circle" ? 0 : -2,
            },
          ]}
        />
      )}
    </View>
  )
}

// Avatar group for stacked avatars
export interface AvatarGroupProps {
  /** Avatars to display */
  children: React.ReactNode
  /** Maximum number of avatars to show */
  max?: number
  /** Size of avatars */
  size?: AvatarProps["size"]
  /** Overlap amount (negative spacing) */
  overlap?: number
  /** Container style */
  style?: ViewStyle
}

export function AvatarGroup({
  children,
  max = 4,
  size = "default",
  overlap = -8,
  style,
}: AvatarGroupProps) {
  const colorScheme = useColorScheme() ?? "light"
  const isDark = colorScheme === "dark"

  const childArray = React.Children.toArray(children)
  const visibleChildren = childArray.slice(0, max)
  const remainingCount = childArray.length - max

  const sizeMap = {
    xs: 24,
    sm: 32,
    default: 40,
    lg: 48,
    xl: 64,
  }

  const numericSize = typeof size === "number" ? size : sizeMap[size]

  return (
    <View style={[styles.group, style]}>
      {visibleChildren.map((child, index) => (
        <View
          key={index}
          style={[
            styles.groupItem,
            { marginLeft: index > 0 ? overlap : 0, zIndex: visibleChildren.length - index },
          ]}
        >
          {React.isValidElement(child)
            ? React.cloneElement(child as React.ReactElement<AvatarProps>, {
                size,
                bordered: true,
              })
            : child}
        </View>
      ))}
      {remainingCount > 0 && (
        <View
          style={[
            styles.groupItem,
            { marginLeft: overlap, zIndex: 0 },
          ]}
        >
          <View
            style={[
              styles.remaining,
              {
                width: numericSize,
                height: numericSize,
                borderRadius: numericSize / 2,
                backgroundColor: isDark ? "#27272a" : "#e4e4e7",
              },
            ]}
          >
            <Text
              style={[
                styles.remainingText,
                { color: isDark ? "#a1a1aa" : "#71717a" },
              ]}
            >
              +{remainingCount}
            </Text>
          </View>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  bordered: {
    borderWidth: 2,
  },
  image: {
    resizeMode: "cover",
  },
  text: {
    fontWeight: "600",
  },
  status: {
    position: "absolute",
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  group: {
    flexDirection: "row",
    alignItems: "center",
  },
  groupItem: {
    // Individual avatar in group
  },
  remaining: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  remainingText: {
    fontSize: fontSizes.xs,
    fontWeight: "600",
  },
})
