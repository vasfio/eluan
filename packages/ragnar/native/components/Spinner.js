import React, { useEffect, useRef } from "react";
import { View, StyleSheet, useColorScheme, Animated, Easing, ActivityIndicator, } from "react-native";
export function Spinner({ size = "default", variant = "default", color, style, native = false, }) {
    const colorScheme = useColorScheme() ?? "light";
    const isDark = colorScheme === "dark";
    const rotation = useRef(new Animated.Value(0)).current;
    const sizeMap = {
        sm: 16,
        default: 24,
        lg: 32,
    };
    const numericSize = typeof size === "number" ? size : sizeMap[size];
    const variantColors = {
        default: isDark ? "#fafafa" : "#18181b",
        primary: isDark ? "#3b82f6" : "#2563eb",
        secondary: isDark ? "#71717a" : "#a1a1aa",
        destructive: "#ef4444",
    };
    const spinnerColor = color || variantColors[variant];
    useEffect(() => {
        const loop = Animated.loop(Animated.timing(rotation, {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
        }));
        loop.start();
        return () => loop.stop();
    }, [rotation]);
    if (native) {
        return (<ActivityIndicator size={numericSize < 24 ? "small" : "large"} color={spinnerColor} style={style}/>);
    }
    const spin = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    });
    const strokeWidth = Math.max(2, numericSize / 8);
    return (<Animated.View style={[
            styles.container,
            {
                width: numericSize,
                height: numericSize,
                transform: [{ rotate: spin }],
            },
            style,
        ]} accessibilityRole="progressbar" accessibilityLabel="Loading">
      <View style={[
            styles.spinner,
            {
                width: numericSize,
                height: numericSize,
                borderRadius: numericSize / 2,
                borderWidth: strokeWidth,
                borderColor: isDark ? "#27272a" : "#e4e4e7",
                borderTopColor: spinnerColor,
            },
        ]}/>
    </Animated.View>);
}
export function DotsLoader({ size = "default", variant = "default", color, style, }) {
    const colorScheme = useColorScheme() ?? "light";
    const isDark = colorScheme === "dark";
    const dot1 = useRef(new Animated.Value(0)).current;
    const dot2 = useRef(new Animated.Value(0)).current;
    const dot3 = useRef(new Animated.Value(0)).current;
    const sizeMap = {
        sm: 6,
        default: 8,
        lg: 10,
    };
    const dotSize = sizeMap[size];
    const variantColors = {
        default: isDark ? "#fafafa" : "#18181b",
        primary: isDark ? "#3b82f6" : "#2563eb",
        secondary: isDark ? "#71717a" : "#a1a1aa",
    };
    const dotColor = color || variantColors[variant];
    useEffect(() => {
        const createAnimation = (dot, delay) => Animated.loop(Animated.sequence([
            Animated.delay(delay),
            Animated.timing(dot, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(dot, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ]));
        const anim1 = createAnimation(dot1, 0);
        const anim2 = createAnimation(dot2, 150);
        const anim3 = createAnimation(dot3, 300);
        anim1.start();
        anim2.start();
        anim3.start();
        return () => {
            anim1.stop();
            anim2.stop();
            anim3.stop();
        };
    }, [dot1, dot2, dot3]);
    const createDotStyle = (anim) => ({
        opacity: anim.interpolate({
            inputRange: [0, 1],
            outputRange: [0.3, 1],
        }),
        transform: [
            {
                scale: anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.8, 1.2],
                }),
            },
        ],
    });
    return (<View style={[styles.dotsContainer, style]}>
      <Animated.View style={[
            styles.dot,
            {
                width: dotSize,
                height: dotSize,
                borderRadius: dotSize / 2,
                backgroundColor: dotColor,
            },
            createDotStyle(dot1),
        ]}/>
      <Animated.View style={[
            styles.dot,
            {
                width: dotSize,
                height: dotSize,
                borderRadius: dotSize / 2,
                backgroundColor: dotColor,
            },
            createDotStyle(dot2),
        ]}/>
      <Animated.View style={[
            styles.dot,
            {
                width: dotSize,
                height: dotSize,
                borderRadius: dotSize / 2,
                backgroundColor: dotColor,
            },
            createDotStyle(dot3),
        ]}/>
    </View>);
}
export function PulseLoader({ size = 40, color, style, }) {
    const colorScheme = useColorScheme() ?? "light";
    const isDark = colorScheme === "dark";
    const scale = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(1)).current;
    const pulseColor = color || (isDark ? "#fafafa" : "#18181b");
    useEffect(() => {
        const animation = Animated.loop(Animated.parallel([
            Animated.timing(scale, {
                toValue: 1,
                duration: 1000,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 0,
                duration: 1000,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }),
        ]));
        animation.start();
        return () => animation.stop();
    }, [scale, opacity]);
    return (<View style={[styles.pulseContainer, { width: size, height: size }, style]}>
      <Animated.View style={[
            styles.pulse,
            {
                width: size,
                height: size,
                borderRadius: size / 2,
                backgroundColor: pulseColor,
                opacity,
                transform: [
                    {
                        scale: scale.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0.5, 1.5],
                        }),
                    },
                ],
            },
        ]}/>
      <View style={[
            styles.pulseCenter,
            {
                width: size / 3,
                height: size / 3,
                borderRadius: size / 6,
                backgroundColor: pulseColor,
            },
        ]}/>
    </View>);
}
const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
    spinner: {
    // Border spinner
    },
    dotsContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    dot: {
    // Individual dot
    },
    pulseContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    pulse: {
        position: "absolute",
    },
    pulseCenter: {
    // Center dot
    },
});
//# sourceMappingURL=Spinner.js.map