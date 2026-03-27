import React from "react";
import { View, Text, FlatList, SectionList, StyleSheet, useColorScheme, } from "react-native";
import { spacing, fontSizes } from "@ragnar/tokens";
export function ListItem({ title, subtitle, left, right, onPress, showSeparator = true, style, titleStyle, subtitleStyle, }) {
    const colorScheme = useColorScheme() ?? "light";
    const isDark = colorScheme === "dark";
    const textColor = isDark ? "#fafafa" : "#18181b";
    const subtitleColor = isDark ? "#a1a1aa" : "#71717a";
    const separatorColor = isDark ? "#27272a" : "#e4e4e7";
    const Container = onPress ? (require("react-native").Pressable) : View;
    return (<>
      <Container style={[styles.listItem, style]} onPress={onPress} android_ripple={onPress ? { color: isDark ? "#27272a" : "#f4f4f5" } : undefined}>
        {left && <View style={styles.listItemLeft}>{left}</View>}
        <View style={styles.listItemContent}>
          <Text style={[styles.listItemTitle, { color: textColor }, titleStyle]} numberOfLines={1}>
            {title}
          </Text>
          {subtitle && (<Text style={[styles.listItemSubtitle, { color: subtitleColor }, subtitleStyle]} numberOfLines={2}>
              {subtitle}
            </Text>)}
        </View>
        {right && <View style={styles.listItemRight}>{right}</View>}
      </Container>
      {showSeparator && (<View style={[
                styles.separator,
                { backgroundColor: separatorColor },
                left ? { marginLeft: 56 } : undefined,
            ]}/>)}
    </>);
}
export function SectionHeader({ title, style, titleStyle }) {
    const colorScheme = useColorScheme() ?? "light";
    const isDark = colorScheme === "dark";
    const backgroundColor = isDark ? "#18181b" : "#f4f4f5";
    const textColor = isDark ? "#a1a1aa" : "#71717a";
    return (<View style={[styles.sectionHeader, { backgroundColor }, style]}>
      <Text style={[styles.sectionHeaderText, { color: textColor }, titleStyle]}>
        {title.toUpperCase()}
      </Text>
    </View>);
}
export function NativeList({ data, renderItem, keyExtractor, emptyComponent, header, footer, showSeparators = true, style, contentContainerStyle, onEndReached, onEndReachedThreshold = 0.5, }) {
    const colorScheme = useColorScheme() ?? "light";
    const isDark = colorScheme === "dark";
    const separatorColor = isDark ? "#27272a" : "#e4e4e7";
    return (<FlatList data={data} renderItem={renderItem} keyExtractor={keyExtractor} style={style} contentContainerStyle={[
            styles.listContent,
            data.length === 0 && styles.emptyContent,
            contentContainerStyle,
        ]} ListEmptyComponent={emptyComponent ? () => <>{emptyComponent}</> : null} ListHeaderComponent={header ? () => <>{header}</> : null} ListFooterComponent={footer ? () => <>{footer}</> : null} ItemSeparatorComponent={showSeparators
            ? () => <View style={[styles.separator, { backgroundColor: separatorColor }]}/>
            : null} onEndReached={onEndReached} onEndReachedThreshold={onEndReachedThreshold}/>);
}
export function NativeSectionList({ sections, renderItem, keyExtractor, emptyComponent, stickySectionHeaders = true, style, contentContainerStyle, }) {
    const colorScheme = useColorScheme() ?? "light";
    const isDark = colorScheme === "dark";
    const separatorColor = isDark ? "#27272a" : "#e4e4e7";
    return (<SectionList sections={sections} renderItem={renderItem} keyExtractor={keyExtractor} renderSectionHeader={({ section }) => (<SectionHeader title={section.title ?? ""}/>)} style={style} contentContainerStyle={[
            styles.listContent,
            sections.length === 0 && styles.emptyContent,
            contentContainerStyle,
        ]} ListEmptyComponent={emptyComponent ? () => <>{emptyComponent}</> : null} stickySectionHeadersEnabled={stickySectionHeaders} ItemSeparatorComponent={() => (<View style={[styles.separator, { backgroundColor: separatorColor }]}/>)}/>);
}
const styles = StyleSheet.create({
    listContent: {
        flexGrow: 1,
    },
    emptyContent: {
        justifyContent: "center",
        alignItems: "center",
    },
    listItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: spacing[3],
        paddingHorizontal: spacing[4],
        minHeight: 56,
    },
    listItemLeft: {
        marginRight: spacing[3],
    },
    listItemContent: {
        flex: 1,
        justifyContent: "center",
    },
    listItemTitle: {
        fontSize: fontSizes.base,
        fontWeight: "500",
    },
    listItemSubtitle: {
        fontSize: fontSizes.sm,
        marginTop: 2,
    },
    listItemRight: {
        marginLeft: spacing[3],
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        marginLeft: spacing[4],
    },
    sectionHeader: {
        paddingVertical: spacing[2],
        paddingHorizontal: spacing[4],
    },
    sectionHeaderText: {
        fontSize: fontSizes.xs,
        fontWeight: "600",
        letterSpacing: 0.5,
    },
});
//# sourceMappingURL=NativeListLayout.js.map