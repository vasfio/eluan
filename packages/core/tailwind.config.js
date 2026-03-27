import { ragnarPreset } from "../tokens/src/tailwind"

/** @type {import('tailwindcss').Config} */
export default {
  presets: [ragnarPreset],
  darkMode: ["selector", '[data-mode="dark"]'],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./stories/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Legacy shadcn/ui color compatibility
      // These map old class names to new token variables for gradual migration
      colors: {
        border: "var(--backgrounds-quaternary)",
        input: "var(--backgrounds-quaternary)",
        ring: "var(--interactive-fg)",
        background: "var(--backgrounds-primary)",
        foreground: "var(--foregrounds-primary)",
        primary: {
          DEFAULT: "var(--action-primary-bg)",
          foreground: "var(--action-primary-fg)",
        },
        secondary: {
          DEFAULT: "var(--backgrounds-tertiary)",
          foreground: "var(--foregrounds-secondary)",
        },
        destructive: {
          DEFAULT: "var(--destructive-bg)",
          foreground: "var(--destructive-fg)",
        },
        muted: {
          DEFAULT: "var(--backgrounds-tertiary)",
          foreground: "var(--foregrounds-quaternary)",
        },
        accent: {
          DEFAULT: "var(--backgrounds-tertiary)",
          foreground: "var(--foregrounds-secondary)",
        },
        popover: {
          DEFAULT: "var(--container-bg)",
          foreground: "var(--container-fg)",
        },
        card: {
          DEFAULT: "var(--container-bg)",
          foreground: "var(--container-fg)",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
