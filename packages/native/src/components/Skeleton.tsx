import React, { useEffect, useRef } from "react"
import {
  View,
  StyleSheet,
  ViewStyle,
  useColorScheme,
  Animated,
  Easing,
} from "react-native"
import { spacing, radius } from "@vasf/ragnar-tokens"

import type { DimensionValue } from "react-native"

export interface SkeletonProps {
  /** Width of the skeleton */
  width?: DimensionValue
  /** Height of the skeleton */
  height?: DimensionValue
  /** Border radius */
  radius?: number | "sm" | "md" | "lg" | "full"
  /** Shape variant */
  variant?: "text" | "circular" | "rectangular" | "rounded"
  /** Disable animation */
  disableAnimation?: boolean
  /** Container style */
  style?: ViewStyle
}

export function Skeleton({
  width = "100%",
  height = 20,
  radius,
  variant = "text",
  disableAnimation = false,
  style,
}: SkeletonProps) {
  const colorScheme = useColorScheme() ?? "light"
  const isDark = colorScheme === "dark"
  const shimmer = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (disableAnimation) return

    const animation = Animated.loop(
      Animated.timing(shimmer, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    )
    animation.start()
    return () => animation.stop()
  }, [shimmer, disableAnimation])

  const getRadius = () => {
    if (radius !== undefined) {
      if (typeof radius === "number") return radius
      const radiusMap = { sm: 4, md: 6, lg: 8, full: 9999 }
      return radiusMap[radius]
    }

    switch (variant) {
      case "circular":
        return 9999
      case "rounded":
        return 6
      case "rectangular":
        return 0
      case "text":
      default:
        return 4
    }
  }

  const getHeight = () => {
    if (height !== undefined) return height
    if (variant === "circular" && typeof width === "number") return width
    return 20
  }

  const themedStyles = {
    base: isDark ? "#27272a" : "#e4e4e7",
    shimmer: isDark ? "#3f3f46" : "#f4f4f5",
  }

  const shimmerTranslate = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 200],
  })

  return (
    <View
      style={[
        styles.container,
        {
          width,
          height: getHeight(),
          borderRadius: getRadius(),
          backgroundColor: themedStyles.base,
          overflow: "hidden",
        },
        style,
      ]}
    >
      {!disableAnimation && (
        <Animated.View
          style={[
            styles.shimmer,
            {
              backgroundColor: themedStyles.shimmer,
              transform: [{ translateX: shimmerTranslate }],
            },
          ]}
        />
      )}
    </View>
  )
}

// Pre-built skeleton components for common use cases
export interface SkeletonTextProps {
  /** Number of lines */
  lines?: number
  /** Line height */
  lineHeight?: number
  /** Gap between lines */
  gap?: number
  /** Last line width (percentage or number) */
  lastLineWidth?: DimensionValue
  /** Container style */
  style?: ViewStyle
}

export function SkeletonText({
  lines = 3,
  lineHeight = 16,
  gap = 8,
  lastLineWidth = "60%",
  style,
}: SkeletonTextProps) {
  return (
    <View style={[styles.textContainer, { gap }, style]}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          height={lineHeight}
          width={index === lines - 1 ? lastLineWidth : "100%"}
          variant="text"
        />
      ))}
    </View>
  )
}

export interface SkeletonAvatarProps {
  /** Size of the avatar */
  size?: number
  /** Container style */
  style?: ViewStyle
}

export function SkeletonAvatar({ size = 40, style }: SkeletonAvatarProps) {
  return (
    <Skeleton
      width={size}
      height={size}
      variant="circular"
      style={style}
    />
  )
}

export interface SkeletonCardProps {
  /** Show image placeholder */
  hasImage?: boolean
  /** Image height */
  imageHeight?: number
  /** Number of text lines */
  lines?: number
  /** Container style */
  style?: ViewStyle
}

export function SkeletonCard({
  hasImage = true,
  imageHeight = 160,
  lines = 3,
  style,
}: SkeletonCardProps) {
  const colorScheme = useColorScheme() ?? "light"
  const isDark = colorScheme === "dark"

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: isDark ? "#18181b" : "#ffffff",
          borderColor: isDark ? "#27272a" : "#e4e4e7",
        },
        style,
      ]}
    >
      {hasImage && (
        <Skeleton
          height={imageHeight}
          variant="rectangular"
          style={styles.cardImage}
        />
      )}
      <View style={styles.cardContent}>
        <Skeleton height={24} width="70%" variant="text" />
        <View style={styles.cardTextGap} />
        <SkeletonText lines={lines} />
      </View>
    </View>
  )
}

export interface SkeletonListItemProps {
  /** Show avatar */
  hasAvatar?: boolean
  /** Avatar size */
  avatarSize?: number
  /** Number of text lines */
  lines?: number
  /** Show trailing element */
  hasTrailing?: boolean
  /** Container style */
  style?: ViewStyle
}

export function SkeletonListItem({
  hasAvatar = true,
  avatarSize = 40,
  lines = 2,
  hasTrailing = false,
  style,
}: SkeletonListItemProps) {
  return (
    <View style={[styles.listItem, style]}>
      {hasAvatar && (
        <SkeletonAvatar size={avatarSize} style={styles.listItemAvatar} />
      )}
      <View style={styles.listItemContent}>
        <Skeleton height={16} width="60%" variant="text" />
        {lines > 1 && (
          <View style={styles.listItemTextGap}>
            <Skeleton height={14} width="80%" variant="text" />
          </View>
        )}
      </View>
      {hasTrailing && (
        <Skeleton
          width={60}
          height={32}
          variant="rounded"
          style={styles.listItemTrailing}
        />
      )}
    </View>
  )
}

// Skeleton group for loading multiple items
export interface SkeletonGroupProps {
  /** Number of items */
  count?: number
  /** Gap between items */
  gap?: number
  /** Item renderer */
  children: React.ReactNode
  /** Container style */
  style?: ViewStyle
}

export function SkeletonGroup({
  count = 3,
  gap = 16,
  children,
  style,
}: SkeletonGroupProps) {
  return (
    <View style={[{ gap }, style]}>
      {Array.from({ length: count }).map((_, index) => (
        <React.Fragment key={index}>{children}</React.Fragment>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  shimmer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 100,
    opacity: 0.5,
  },
  textContainer: {
    width: "100%",
  },
  card: {
    borderRadius: 8,
    borderWidth: 1,
    overflow: "hidden",
  },
  cardImage: {
    borderRadius: 0,
  },
  cardContent: {
    padding: 4,
  },
  cardTextGap: {
    height: 4,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 2,
  },
  listItemAvatar: {
    marginRight: 4,
  },
  listItemContent: {
    flex: 1,
  },
  listItemTextGap: {
    marginTop: 2,
  },
  listItemTrailing: {
    marginLeft: 2,
  },
})
