import { ragnarPreset } from "../tokens/src/tailwind"

/** @type {import('tailwindcss').Config} */
export default {
  presets: [ragnarPreset],
  darkMode: ["selector", '[data-mode="dark"]'],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./stories/**/*.{js,ts,jsx,tsx}",
    "../core/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Legacy shadcn/ui color compatibility
      // These map old class names to new token variables for gradual migration
      colors: {
        border: "var(--backgrounds-quaternary)",
        input: "var(--backgrounds-quaternary)",
        ring: "var(--foregrounds-primary)",
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
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(-50%)" },
        },
        "gradient-shimmer": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        marquee: "marquee linear infinite",
        "marquee-vertical": "marquee-vertical linear infinite",
        "gradient-shimmer": "gradient-shimmer 3s ease infinite",
        "gradient-shift": "gradient-shift 6s ease infinite",
        "fade-in": "fade-in 0.3s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
