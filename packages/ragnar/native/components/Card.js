import React from "react";
import { View, Text, StyleSheet, useColorScheme, } from "react-native";
import { spacing, radii } from "@ragnar/tokens";
export function Card({ children, style, ...props }) {
    const colorScheme = useColorScheme() ?? "light";
    const isDark = colorScheme === "dark";
    return (<View style={[
            styles.card,
            {
                backgroundColor: isDark ? "#09090b" : "#ffffff",
                borderColor: isDark ? "#27272a" : "#e4e4e7",
            },
            style,
        ]} {...props}>
      {children}
    </View>);
}
export function CardHeader({ children, style, ...props }) {
    return (<View style={[styles.header, style]} {...props}>
      {children}
    </View>);
}
export function CardTitle({ children, style, ...props }) {
    const colorScheme = useColorScheme() ?? "light";
    const isDark = colorScheme === "dark";
    return (<Text style={[
            styles.title,
            { color: isDark ? "#fafafa" : "#09090b" },
            style,
        ]} {...props}>
      {children}
    </Text>);
}
export function CardDescription({ children, style, ...props }) {
    const colorScheme = useColorScheme() ?? "light";
    const isDark = colorScheme === "dark";
    return (<Text style={[
            styles.description,
            { color: isDark ? "#a1a1aa" : "#71717a" },
            style,
        ]} {...props}>
      {children}
    </Text>);
}
export function CardContent({ children, style, ...props }) {
    return (<View style={[styles.content, style]} {...props}>
      {children}
    </View>);
}
export function CardFooter({ children, style, ...props }) {
    return (<View style={[styles.footer, style]} {...props}>
      {children}
    </View>);
}
const styles = StyleSheet.create({
    card: {
        borderRadius: radii.lg,
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    header: {
        flexDirection: "column",
        gap: spacing[1.5],
        padding: spacing[6],
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        lineHeight: 24,
        letterSpacing: -0.4,
    },
    description: {
        fontSize: 14,
        lineHeight: 20,
    },
    content: {
        padding: spacing[6],
        paddingTop: 0,
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        padding: spacing[6],
        paddingTop: 0,
    },
});
//# sourceMappingURL=Card.js.map