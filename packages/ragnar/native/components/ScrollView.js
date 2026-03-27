import React from "react";
import { ScrollView as RNScrollView, StyleSheet, useColorScheme, View, Text, Animated, } from "react-native";
import { spacing, fontSizes } from "@ragnar/tokens";
export function ScrollView({ backgroundColor, showsIndicators = true, padding, paddingHorizontal, paddingVertical, children, style, contentContainerStyle, ...props }) {
    const colorScheme = useColorScheme() ?? "light";
    const isDark = colorScheme === "dark";
    const defaultBackgroundColor = backgroundColor ?? (isDark ? "#09090b" : "#ffffff");
    const contentPadding = {};
    if (padding !== undefined) {
        contentPadding.padding = padding;
    }
    if (paddingHorizontal !== undefined) {
        contentPadding.paddingHorizontal = paddingHorizontal;
    }
    if (paddingVertical !== undefined) {
        contentPadding.paddingVertical = paddingVertical;
    }
    return (<RNScrollView style={[{ backgroundColor: defaultBackgroundColor }, style]} contentContainerStyle={[styles.content, contentPadding, contentContainerStyle]} showsVerticalScrollIndicator={showsIndicators} showsHorizontalScrollIndicator={showsIndicators} {...props}>
      {children}
    </RNScrollView>);
}
export function KeyboardAwareScrollView({ extraScrollHeight = 20, ...props }) {
    // Note: For full keyboard awareness, consider using
    // react-native-keyboard-aware-scroll-view or similar
    return (<ScrollView keyboardShouldPersistTaps="handled" keyboardDismissMode="interactive" {...props}/>);
}
export function ScrollViewWithHeader({ header, stickyHeaderHeight = 100, fadeHeader = false, children, style, ...props }) {
    const scrollY = React.useRef(new Animated.Value(0)).current;
    const headerOpacity = fadeHeader
        ? scrollY.interpolate({
            inputRange: [0, stickyHeaderHeight],
            outputRange: [1, 0],
            extrapolate: "clamp",
        })
        : 1;
    return (<View style={[styles.container, style]}>
      <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
        {header}
      </Animated.View>
      <Animated.ScrollView onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })} scrollEventThrottle={16} {...props}>
        <View style={{ height: stickyHeaderHeight }}/>
        {children}
      </Animated.ScrollView>
    </View>);
}
export function HorizontalScrollView({ itemGap = spacing[4], snapToItems = false, itemWidth, children, contentContainerStyle, ...props }) {
    const childArray = React.Children.toArray(children);
    return (<ScrollView horizontal showsHorizontalScrollIndicator={false} decelerationRate={snapToItems ? "fast" : "normal"} snapToInterval={snapToItems && itemWidth ? itemWidth + itemGap : undefined} contentContainerStyle={[
            styles.horizontalContent,
            { gap: itemGap },
            contentContainerStyle,
        ]} {...props}>
      {childArray.map((child, index) => (<View key={index} style={itemWidth ? { width: itemWidth } : undefined}>
          {child}
        </View>))}
    </ScrollView>);
}
export function EmptyScrollView({ emptyTitle = "No content", emptyDescription, emptyComponent, isEmpty = false, children, contentContainerStyle, ...props }) {
    const colorScheme = useColorScheme() ?? "light";
    const isDark = colorScheme === "dark";
    const textColor = isDark ? "#a1a1aa" : "#71717a";
    if (isEmpty) {
        return (<ScrollView contentContainerStyle={[styles.emptyContainer, contentContainerStyle]} {...props}>
        {emptyComponent ?? (<View style={styles.emptyContent}>
            <Text style={[styles.emptyTitle, { color: textColor }]}>
              {emptyTitle}
            </Text>
            {emptyDescription && (<Text style={[styles.emptyDescription, { color: textColor }]}>
                {emptyDescription}
              </Text>)}
          </View>)}
      </ScrollView>);
    }
    return (<ScrollView contentContainerStyle={contentContainerStyle} {...props}>
      {children}
    </ScrollView>);
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
});
//# sourceMappingURL=ScrollView.js.map