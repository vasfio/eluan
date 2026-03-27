import React from "react";
import { View, Text, StyleSheet, useColorScheme, } from "react-native";
import { spacing, fontSizes } from "@ragnar/tokens";
export function Separator({ orientation = "horizontal", decorative = true, style, }) {
    const colorScheme = useColorScheme() ?? "light";
    const isDark = colorScheme === "dark";
    const themedStyles = {
        separator: {
            backgroundColor: isDark ? "#27272a" : "#e4e4e7",
        },
    };
    return (<View style={[
            orientation === "horizontal"
                ? styles.horizontal
                : styles.vertical,
            themedStyles.separator,
            style,
        ]} accessibilityRole={decorative ? "none" : undefined}/>);
}
export function LabeledSeparator({ label, labelPosition = "center", labelStyle, style, }) {
    const colorScheme = useColorScheme() ?? "light";
    const isDark = colorScheme === "dark";
    const themedStyles = {
        line: {
            backgroundColor: isDark ? "#27272a" : "#e4e4e7",
        },
        label: {
            color: isDark ? "#71717a" : "#a1a1aa",
            backgroundColor: isDark ? "#09090b" : "#ffffff",
        },
    };
    return (<View style={[styles.labeledContainer, style]}>
      {labelPosition !== "left" && (<View style={[styles.line, themedStyles.line, styles.lineFlex]}/>)}
      <Text style={[
            styles.label,
            themedStyles.label,
            labelPosition === "left" && styles.labelLeft,
            labelPosition === "right" && styles.labelRight,
            labelStyle,
        ]}>
        {label}
      </Text>
      {labelPosition !== "right" && (<View style={[styles.line, themedStyles.line, styles.lineFlex]}/>)}
    </View>);
}
export function Divider({ inset, insetRight, style, ...props }) {
    const getInsetValue = (value) => {
        if (value === true)
            return spacing[4];
        if (typeof value === "number")
            return value;
        return 0;
    };
    const marginLeft = getInsetValue(inset);
    const marginRight = getInsetValue(insetRight);
    return (<Separator {...props} style={{ marginLeft, marginRight, ...style }}/>);
}
export function Spacer({ size = "md", flex = false, style, }) {
    const sizeMap = {
        xs: spacing[1],
        sm: spacing[2],
        md: spacing[4],
        lg: spacing[6],
        xl: spacing[8],
    };
    const numericSize = typeof size === "number" ? size : sizeMap[size];
    if (flex) {
        return <View style={[{ flex: 1 }, style]}/>;
    }
    return (<View style={[
            { width: numericSize, height: numericSize },
            style,
        ]}/>);
}
const styles = StyleSheet.create({
    horizontal: {
        height: 1,
        width: "100%",
    },
    vertical: {
        width: 1,
        height: "100%",
    },
    labeledContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
    },
    line: {
        height: 1,
    },
    lineFlex: {
        flex: 1,
    },
    label: {
        fontSize: fontSizes.sm,
        paddingHorizontal: spacing[3],
    },
    labelLeft: {
        paddingLeft: 0,
        paddingRight: spacing[3],
    },
    labelRight: {
        paddingLeft: spacing[3],
        paddingRight: 0,
    },
});
//# sourceMappingURL=Separator.js.map