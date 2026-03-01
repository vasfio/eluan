import type { Preview } from "@storybook/react"
import React from "react"
import { View, StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ffffff",
  },
  darkContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "#0a0a0a",
  },
})

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#0a0a0a" },
        { name: "gray", value: "#f5f5f5" },
      ],
    },
    viewport: {
      viewports: {
        iPhoneSE: {
          name: "iPhone SE",
          styles: { width: "375px", height: "667px" },
        },
        iPhone14: {
          name: "iPhone 14",
          styles: { width: "390px", height: "844px" },
        },
        iPhone14ProMax: {
          name: "iPhone 14 Pro Max",
          styles: { width: "430px", height: "932px" },
        },
        pixel5: {
          name: "Pixel 5",
          styles: { width: "393px", height: "851px" },
        },
        galaxyS21: {
          name: "Galaxy S21",
          styles: { width: "360px", height: "800px" },
        },
        iPad: {
          name: "iPad",
          styles: { width: "768px", height: "1024px" },
        },
        iPadPro: {
          name: "iPad Pro 12.9",
          styles: { width: "1024px", height: "1366px" },
        },
      },
    },
  },
  decorators: [
    (Story, context) => {
      const isDark = context.globals.backgrounds?.value === "#0a0a0a"
      return (
        <View style={isDark ? styles.darkContainer : styles.container}>
          <Story />
        </View>
      )
    },
  ],
}

export default preview
