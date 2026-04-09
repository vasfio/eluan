import React from "react"
import {
  View,
  Text,
  StyleSheet,
  ViewProps,
  TextProps,
  useColorScheme,
} from "react-native"
import { sp, curves, getSemanticColors } from "../utils/styles"

export interface CardProps extends ViewProps {
  children: React.ReactNode
}

export function Card({ children, style, ...props }: CardProps) {
  const colorScheme = useColorScheme() ?? "light"
  const colors = getSemanticColors(colorScheme)

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.container.bg,
          borderColor: colors.container.borderAlt,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  )
}

export interface CardHeaderProps extends ViewProps {
  children: React.ReactNode
}

export function CardHeader({ children, style, ...props }: CardHeaderProps) {
  return (
    <View style={[styles.header, style]} {...props}>
      {children}
    </View>
  )
}

export interface CardTitleProps extends TextProps {
  children: React.ReactNode
}

export function CardTitle({ children, style, ...props }: CardTitleProps) {
  const colorScheme = useColorScheme() ?? "light"
  const colors = getSemanticColors(colorScheme)

  return (
    <Text
      style={[
        styles.title,
        { color: colors.container.fg },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  )
}

export interface CardDescriptionProps extends TextProps {
  children: React.ReactNode
}

export function CardDescription({ children, style, ...props }: CardDescriptionProps) {
  const colorScheme = useColorScheme() ?? "light"
  const colors = getSemanticColors(colorScheme)

  return (
    <Text
      style={[
        styles.description,
        { color: colors.container.fgAlt },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  )
}

export interface CardContentProps extends ViewProps {
  children: React.ReactNode
}

export function CardContent({ children, style, ...props }: CardContentProps) {
  return (
    <View style={[styles.content, style]} {...props}>
      {children}
    </View>
  )
}

export interface CardFooterProps extends ViewProps {
  children: React.ReactNode
}

export function CardFooter({ children, style, ...props }: CardFooterProps) {
  return (
    <View style={[styles.footer, style]} {...props}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: curves.xs,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  header: {
    flexDirection: "column",
    gap: 6,
    padding: sp.sm,
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
    padding: sp.sm,
    paddingTop: 0,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    padding: sp.sm,
    paddingTop: 0,
  },
})
