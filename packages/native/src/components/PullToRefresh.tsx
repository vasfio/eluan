import React from "react"
import {
  RefreshControl,
  ScrollView,
  FlatList,
  SectionList,
  StyleSheet,
  ViewStyle,
  useColorScheme,
  ScrollViewProps,
  FlatListProps,
  SectionListProps,
} from "react-native"

export interface PullToRefreshProps {
  /**
   * Whether the refresh is currently in progress
   */
  refreshing: boolean
  /**
   * Callback when refresh is triggered
   */
  onRefresh: () => void
  /**
   * Color of the refresh indicator
   */
  color?: string
  /**
   * Background color of the refresh indicator (iOS only)
   */
  backgroundColor?: string
  /**
   * Title shown below the refresh indicator (iOS only)
   */
  title?: string
}

/**
 * Hook to create a RefreshControl with consistent styling
 */
export function usePullToRefresh({
  refreshing,
  onRefresh,
  color,
  backgroundColor,
  title,
}: PullToRefreshProps) {
  const colorScheme = useColorScheme() ?? "light"
  const isDark = colorScheme === "dark"

  const defaultColor = color ?? (isDark ? "#60a5fa" : "#3b82f6")
  const defaultBackgroundColor = backgroundColor ?? (isDark ? "#18181b" : "#ffffff")

  return (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      colors={[defaultColor]} // Android
      tintColor={defaultColor} // iOS
      progressBackgroundColor={defaultBackgroundColor} // Android
      title={title} // iOS
      titleColor={isDark ? "#a1a1aa" : "#71717a"} // iOS
    />
  )
}

// ============================================
// RefreshableScrollView
// ============================================

export interface RefreshableScrollViewProps
  extends Omit<ScrollViewProps, "refreshControl">,
    PullToRefreshProps {
  /**
   * Content container style
   */
  contentContainerStyle?: ViewStyle
}

export function RefreshableScrollView({
  refreshing,
  onRefresh,
  color,
  backgroundColor,
  title,
  children,
  style,
  contentContainerStyle,
  ...props
}: RefreshableScrollViewProps) {
  const refreshControl = usePullToRefresh({
    refreshing,
    onRefresh,
    color,
    backgroundColor,
    title,
  })

  return (
    <ScrollView
      style={style}
      contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
      refreshControl={refreshControl}
      {...props}
    >
      {children}
    </ScrollView>
  )
}

// ============================================
// RefreshableFlatList
// ============================================

export interface RefreshableFlatListProps<T>
  extends Omit<FlatListProps<T>, "refreshControl" | "refreshing" | "onRefresh"> {
  /**
   * Whether the refresh is currently in progress
   */
  refreshing: boolean
  /**
   * Callback when refresh is triggered
   */
  onRefresh: () => void
  /**
   * Color of the refresh indicator
   */
  color?: string
  /**
   * Background color of the refresh indicator (iOS only)
   */
  backgroundColor?: string
  /**
   * Title shown below the refresh indicator (iOS only)
   */
  title?: string
}

export function RefreshableFlatList<T>({
  refreshing,
  onRefresh,
  color,
  backgroundColor,
  title,
  style,
  contentContainerStyle,
  ...props
}: RefreshableFlatListProps<T>) {
  const refreshControl = usePullToRefresh({
    refreshing,
    onRefresh,
    color,
    backgroundColor,
    title,
  })

  return (
    <FlatList
      style={style}
      contentContainerStyle={[styles.listContent, contentContainerStyle]}
      refreshControl={refreshControl}
      {...props}
    />
  )
}

// ============================================
// RefreshableSectionList
// ============================================

export interface RefreshableSectionListProps<T, S>
  extends Omit<SectionListProps<T, S>, "refreshControl" | "refreshing" | "onRefresh"> {
  /**
   * Whether the refresh is currently in progress
   */
  refreshing: boolean
  /**
   * Callback when refresh is triggered
   */
  onRefresh: () => void
  /**
   * Color of the refresh indicator
   */
  color?: string
  /**
   * Background color of the refresh indicator (iOS only)
   */
  backgroundColor?: string
  /**
   * Title shown below the refresh indicator (iOS only)
   */
  title?: string
}

export function RefreshableSectionList<T, S>({
  refreshing,
  onRefresh,
  color,
  backgroundColor,
  title,
  style,
  contentContainerStyle,
  ...props
}: RefreshableSectionListProps<T, S>) {
  const refreshControl = usePullToRefresh({
    refreshing,
    onRefresh,
    color,
    backgroundColor,
    title,
  })

  return (
    <SectionList
      style={style}
      contentContainerStyle={[styles.listContent, contentContainerStyle]}
      refreshControl={refreshControl}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  listContent: {
    flexGrow: 1,
  },
})
