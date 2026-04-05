import React, { useEffect } from "react"
import type { Preview } from "@storybook/react"
import type { Theme } from "../../tokens/src/index"
import "../src/styles/globals.css"

const preview: Preview = {
  globalTypes: {
    mode: {
      name: "Mode",
      description: "Color mode (Light / Dim / Dark)",
      toolbar: {
        icon: "sun",
        items: [
          { value: "light", title: "☀️ Light", icon: "sun" },
          { value: "dim", title: "🌤️ Dim", icon: "sunrisealt" },
          { value: "dark", title: "🌙 Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
    theme: {
      name: "Theme",
      description: "Visual theme identity",
      toolbar: {
        icon: "paintbrush",
        items: [
          { value: "classic-retro", title: "🔥 Classic Retro" },
          { value: "classic-black", title: "⬛ Classic Black" },
          { value: "lime", title: "🟢 Lime" },
          { value: "bold", title: "🔴 Bold" },
          { value: "beige", title: "🟤 Beige" },
          { value: "funky", title: "🟣 Funky" },
        ],
        dynamicTitle: true,
      },
    },
    spacing: {
      name: "Spacing",
      description: "Spacing scale (Compact / Standard / Wide)",
      toolbar: {
        icon: "ruler",
        items: [
          { value: "compact", title: "Compact" },
          { value: "standard", title: "Standard" },
          { value: "wide", title: "Wide" },
        ],
        dynamicTitle: true,
      },
    },
    curves: {
      name: "Curves",
      description: "Border radius scale (Sharp / Slight / Sweeping / Rounded)",
      toolbar: {
        icon: "circle",
        items: [
          { value: "sharp", title: "Sharp" },
          { value: "slight", title: "Slight" },
          { value: "sweeping", title: "Sweeping" },
          { value: "rounded", title: "Rounded" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    mode: "light",
    theme: "classic-retro",
    spacing: "standard",
    curves: "slight",
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // Disable docs source blocks for heavy components to reduce memory usage
    docs: {
      source: {
        type: "code",
      },
    },
  },
  decorators: [
    (Story, context) => {
      const mode = context.globals.mode || "light"
      const theme = context.globals.theme || "classic-retro"
      const spacing = context.globals.spacing || "standard"
      const curves = context.globals.curves || "slight"

      // Set attributes on the document root for CSS variable resolution
      useEffect(() => {
        document.documentElement.setAttribute("data-mode", mode)
        document.documentElement.setAttribute("data-theme", theme)
        document.documentElement.setAttribute("data-spacing", spacing)
        document.documentElement.setAttribute("data-curves", curves)

        return () => {
          document.documentElement.removeAttribute("data-mode")
          document.documentElement.removeAttribute("data-theme")
          document.documentElement.removeAttribute("data-spacing")
          document.documentElement.removeAttribute("data-curves")
        }
      }, [mode, theme, spacing, curves])

      // Determine Storybook canvas background color based on mode
      const bgColor =
        mode === "dark"
          ? "#262626"
          : mode === "dim"
            ? "#f9f7e0"
            : "#ffffff"

      return (
        <div
          data-mode={mode}
          data-theme={theme}
          data-spacing={spacing}
          data-curves={curves}
          style={{ backgroundColor: bgColor, minHeight: "100vh" }}
        >
          <div style={{ color: "var(--foregrounds-primary)" }}>
            <Story />
          </div>
        </div>
      )
    },
  ],
}

export default preview
