import React from "react"
import {
  ScrollView as RNScrollView,
  StyleSheet,
  ViewStyle,
  ScrollViewProps as RNScrollViewProps,
  useColorScheme,
  View,
  Text,
  Animated,
} from "react-native"
import { spacing, fontSizes } from "@frolda/ragnar-tokens"

export interface ScrollViewProps extends RNScrollViewProps {
  /**
   * Background color (defaults to theme background)
   */
  backgroundColor?: string
  /**
   * Whether to show scroll indicators
   * @default true
   */
  showsIndicators?: boolean
  /**
   * Padding for the content
   */
  padding?: number
  /**
   * Horizontal padding for the content
   */
  paddingHorizontal?: number
  /**
   * Vertical padding for the content
   */
  paddingVertical?: number
}

export function ScrollView({
  backgroundColor,
  showsIndicators = true,
  padding,
  paddingHorizontal,
  paddingVertical,
  children,
  style,
  contentContainerStyle,
  ...props
}: ScrollViewProps) {
  const colorScheme = useColorScheme() ?? "light"
  const isDark = colorScheme === "dark"

  const defaultBackgroundColor = backgroundColor ?? (isDark ? "#09090b" : "#ffffff")

  const contentPadding: ViewStyle = {}
  if (padding !== undefined) {
    contentPadding.padding = padding
  }
  if (paddingHorizontal !== undefined) {
    contentPadding.paddingHorizontal = paddingHorizontal
  }
  if (paddingVertical !== undefined) {
    contentPadding.paddingVertical = paddingVertical
  }

  return (
    <RNScrollView
      style={[{ backgroundColor: defaultBackgroundColor }, style]}
      contentContainerStyle={[styles.content, contentPadding, contentContainerStyle]}
      showsVerticalScrollIndicator={showsIndicators}
      showsHorizontalScrollIndicator={showsIndicators}
      {...props}
    >
      {children}
    </RNScrollView>
  )
}

// ============================================
// KeyboardAwareScrollView
// ============================================

export interface KeyboardAwareScrollViewProps extends ScrollViewProps {
  /**
   * Extra height to add when keyboard is visible
   * @default 20
   */
  extraScrollHeight?: number
}

export function KeyboardAwareScrollView({
  extraScrollHeight = 20,
  ...props
}: KeyboardAwareScrollViewProps) {
  // Note: For full keyboard awareness, consider using
  // react-native-keyboard-aware-scroll-view or similar
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="interactive"
      {...props}
    />
  )
}

// ============================================
// ScrollViewWithHeader (Sticky header support)
// ============================================

export interface ScrollViewWithHeaderProps extends ScrollViewProps {
  /**
   * Header component to render
   */
  header: React.ReactNode
  /**
   * Height at which the header becomes sticky
   * @default 100
   */
  stickyHeaderHeight?: number
  /**
   * Whether the header should fade as user scrolls
   * @default false
   */
  fadeHeader?: boolean
}

export function ScrollViewWithHeader({
  header,
  stickyHeaderHeight = 100,
  fadeHeader = false,
  children,
  style,
  ...props
}: ScrollViewWithHeaderProps) {
  const scrollY = React.useRef(new Animated.Value(0)).current

  const headerOpacity = fadeHeader
    ? scrollY.interpolate({
        inputRange: [0, stickyHeaderHeight],
        outputRange: [1, 0],
        extrapolate: "clamp",
      })
    : 1

  return (
    <View style={[styles.container, style]}>
      <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
        {header}
      </Animated.View>
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        {...props}
      >
        <View style={{ height: stickyHeaderHeight }} />
        {children}
      </Animated.ScrollView>
    </View>
  )
}

// ============================================
// HorizontalScrollView
// ============================================

export interface HorizontalScrollViewProps extends Omit<ScrollViewProps, "horizontal"> {
  /**
   * Gap between items
   * @default 16
   */
  itemGap?: number
  /**
   * Whether to snap to items
   * @default false
   */
  snapToItems?: boolean
  /**
   * Width of each item (required for snapping)
   */
  itemWidth?: number
}

export function HorizontalScrollView({
  itemGap = spacing[4],
  snapToItems = false,
  itemWidth,
  children,
  contentContainerStyle,
  ...props
}: HorizontalScrollViewProps) {
  const childArray = React.Children.toArray(children)

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      decelerationRate={snapToItems ? "fast" : "normal"}
      snapToInterval={snapToItems && itemWidth ? itemWidth + itemGap : undefined}
      contentContainerStyle={[
        styles.horizontalContent,
        { gap: itemGap },
        contentContainerStyle,
      ]}
      {...props}
    >
      {childArray.map((child, index) => (
        <View key={index} style={itemWidth ? { width: itemWidth } : undefined}>
          {child}
        </View>
      ))}
    </ScrollView>
  )
}

// ============================================
// EmptyScrollView (with empty state)
// ============================================

export interface EmptyScrollViewProps extends ScrollViewProps {
  /**
   * Content to show when there are no children
   */
  emptyTitle?: string
  /**
   * Description for empty state
   */
  emptyDescription?: string
  /**
   * Custom empty component
   */
  emptyComponent?: React.ReactNode
  /**
   * Whether the scroll view is empty
   */
  isEmpty?: boolean
}

export function EmptyScrollView({
  emptyTitle = "No content",
  emptyDescription,
  emptyComponent,
  isEmpty = false,
  children,
  contentContainerStyle,
  ...props
}: EmptyScrollViewProps) {
  const colorScheme = useColorScheme() ?? "light"
  const isDark = colorScheme === "dark"

  const textColor = isDark ? "#a1a1aa" : "#71717a"

  if (isEmpty) {
    return (
      <ScrollView
        contentContainerStyle={[styles.emptyContainer, contentContainerStyle]}
        {...props}
      >
        {emptyComponent ?? (
          <View style={styles.emptyContent}>
            <Text style={[styles.emptyTitle, { color: textColor }]}>
              {emptyTitle}
            </Text>
            {emptyDescription && (
              <Text style={[styles.emptyDescription, { color: textColor }]}>
                {emptyDescription}
              </Text>
            )}
          </View>
        )}
      </ScrollView>
    )
  }

  return (
    <ScrollView contentContainerStyle={contentContainerStyle} {...props}>
      {children}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  horizontalContent: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    flexDirection: "row",
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContent: {
    alignItems: "center",
    padding: spacing[4],
  },
  emptyTitle: {
    fontSize: fontSizes.lg,
    fontWeight: "600",
    textAlign: "center",
  },
  emptyDescription: {
    fontSize: fontSizes.sm,
    textAlign: "center",
    marginTop: spacing[2],
  },
})
