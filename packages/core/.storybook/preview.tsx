import React, { useEffect } from "react"
import type { Preview } from "@storybook/react"
import { themeTypekitIds } from "../../tokens/src/index"
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
          { value: "Classic Retro", title: "🔥 Classic Retro" },
          { value: "Classic Black", title: "⬛ Classic Black" },
          { value: "Lime", title: "🟢 Lime" },
          { value: "Bold", title: "🔴 Bold" },
          { value: "Beige", title: "🟤 Beige" },
          { value: "Funky", title: "🟣 Funky" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    mode: "light",
    theme: "Classic Retro",
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const mode = context.globals.mode || "light"
      const theme = context.globals.theme || "Classic Retro"

      // Set attributes on the document root for CSS variable resolution
      useEffect(() => {
        document.documentElement.setAttribute("data-mode", mode)
        document.documentElement.setAttribute("data-theme", theme)

        return () => {
          document.documentElement.removeAttribute("data-mode")
          document.documentElement.removeAttribute("data-theme")
        }
      }, [mode, theme])

      // Swap Typekit stylesheet href when theme changes
      // The <link id="ragnar-typekit"> is pre-loaded in preview-head.html
      useEffect(() => {
        const typekitId = themeTypekitIds[theme as Theme]
        if (!typekitId) return

        const href = `https://use.typekit.net/${typekitId}.css`
        const link = document.getElementById("ragnar-typekit") as HTMLLinkElement | null
        if (link && link.href !== href) {
          link.href = href
        }
      }, [theme])

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
          style={{ backgroundColor: bgColor, minHeight: "100vh" }}
        >
          <div className="p-4" style={{ color: "var(--foregrounds-primary)" }}>
            <Story />
          </div>
        </div>
      )
    },
  ],
}

export default preview
