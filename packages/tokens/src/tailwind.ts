// Tailwind CSS configuration preset for Ragnar Design System
// Usage: Add to your tailwind.config.js presets array
//
// Three-layer token architecture:
//   Layer 1: Primitives  → color-{palette}-{shade} (e.g., color-blazeorange-500)
//   Layer 2: Modes       → backgrounds-*, foregrounds-*, {palette}-* (adapt to light/dim/dark)
//   Layer 3: Themes      → action-*, container-*, interactive-*, etc. (visual identity)

import type { Config } from "tailwindcss"

// Helper to create CSS variable color references
const v = (name: string) => `var(--${name})`

// Generate primitive color palette for Tailwind
const createPrimitivePalette = (name: string) => {
  const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
  const result: Record<string, string> = {}
  for (const shade of shades) {
    result[shade] = v(`color-${name}-${shade}`)
  }
  return result
}

// Mono palette includes extra "0" shade
const createMonoPalette = () => {
  const result: Record<string, string> = {
    0: v("color-mono-0"),
  }
  const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
  for (const shade of shades) {
    result[shade] = v(`color-mono-${shade}`)
  }
  return result
}

// Semantic palette helper (background, tint, main, foreground, shade)
const createSemanticPalette = (name: string) => ({
  background: v(`${name}-background`),
  tint: v(`${name}-tint`),
  main: v(`${name}-main`),
  foreground: v(`${name}-foreground`),
  shade: v(`${name}-shade`),
})

export const ragnarPreset: Partial<Config> = {
  darkMode: ["selector", '[data-mode="dark"]'],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // ================================
        // Layer 1: Primitive Colors
        // Direct access to raw palette values
        // ================================
        blazeorange: createPrimitivePalette("blazeorange"),
        bluechill: createPrimitivePalette("bluechill"),
        blueribbon: createPrimitivePalette("blueribbon"),
        bostonblue: createPrimitivePalette("bostonblue"),
        cerise: createPrimitivePalette("cerise"),
        crimson: createPrimitivePalette("crimson"),
        electriclime: createPrimitivePalette("electriclime"),
        electricviolet: createPrimitivePalette("electricviolet"),
        forestgreen: createPrimitivePalette("forestgreen"),
        gossamer: createPrimitivePalette("gossamer"),
        lochmara: createPrimitivePalette("lochmara"),
        maitai: createPrimitivePalette("maitai"),
        mono: createMonoPalette(),
        purpleheart: createPrimitivePalette("purpleheart"),
        redviolet: createPrimitivePalette("redviolet"),
        rockspray: createPrimitivePalette("rockspray"),
        seagreen: createPrimitivePalette("seagreen"),
        teak: createPrimitivePalette("teak"),
        torchred: createPrimitivePalette("torchred"),
        violeteggplant: createPrimitivePalette("violeteggplant"),

        // ================================
        // Layer 2: Mode-Aware Semantic Colors
        // Automatically adapt to Light / Dim / Dark
        // ================================

        // Backgrounds & Foregrounds
        bg: {
          primary: v("backgrounds-primary"),
          secondary: v("backgrounds-secondary"),
          tertiary: v("backgrounds-tertiary"),
          quaternary: v("backgrounds-quaternary"),
          quinary: v("backgrounds-quinary"),
        },
        fg: {
          primary: v("foregrounds-primary"),
          secondary: v("foregrounds-secondary"),
          tertiary: v("foregrounds-tertiary"),
          quaternary: v("foregrounds-quaternary"),
          quinary: v("foregrounds-quinary"),
        },

        // Semantic color palettes (mode-aware)
        "s-blazeorange": createSemanticPalette("blazeorange"),
        "s-bluechill": createSemanticPalette("bluechill"),
        "s-blueribbon": createSemanticPalette("blueribbon"),
        "s-bostonblue": createSemanticPalette("bostonblue"),
        "s-cerise": createSemanticPalette("cerise"),
        "s-crimson": createSemanticPalette("crimson"),
        "s-electriclime": createSemanticPalette("electriclime"),
        "s-electricviolet": createSemanticPalette("electricviolet"),
        "s-forestgreen": createSemanticPalette("forestgreen"),
        "s-gossamer": createSemanticPalette("gossamer"),
        "s-lochmara": createSemanticPalette("lochmara"),
        "s-maitai": createSemanticPalette("maitai"),
        "s-purpleheart": createSemanticPalette("purpleheart"),
        "s-redviolet": createSemanticPalette("redviolet"),
        "s-rockspray": createSemanticPalette("rockspray"),
        "s-seagreen": createSemanticPalette("seagreen"),
        "s-torchred": createSemanticPalette("torchred"),
        "s-violeteggplant": createSemanticPalette("violeteggplant"),
        "s-mono": {
          background: v("mono-background"),
          tint: v("mono-tint"),
          foreground: v("mono-foreground"),
          shade: v("mono-shade"),
        },

        // ================================
        // Layer 3: Theme Component Colors
        // Adapt to selected theme (classic-retro, lime, etc.)
        // ================================

        // Action Primary
        "action-primary": {
          bg: v("action-primary-bg"),
          "bg-hover": v("action-primary-bg-hover"),
          "bg-active": v("action-primary-bg-active"),
          "bg-selected": v("action-primary-bg-selected"),
          "bg-disabled": v("action-primary-bg-disabled"),
          "bg-inverse": v("action-primary-bg-inverse"),
          fg: v("action-primary-fg"),
          "fg-active": v("action-primary-fg-active"),
          "fg-selected": v("action-primary-fg-selected"),
          "fg-disabled": v("action-primary-fg-disabled"),
          "fg-inverse": v("action-primary-fg-inverse"),
        },

        // Action Secondary
        "action-secondary": {
          "bg-hover": v("action-secondary-bg-hover"),
          "bg-active": v("action-secondary-bg-active"),
          "bg-selected": v("action-secondary-bg-selected"),
          "bg-disabled": v("action-secondary-bg-disabled"),
          border: v("action-secondary-border"),
          "border-alt": v("action-secondary-border-alt"),
          "border-disabled": v("action-secondary-border-disabled"),
          "border-inverse": v("action-secondary-border-inverse"),
          fg: v("action-secondary-fg"),
          "fg-alt": v("action-secondary-fg-alt"),
          "fg-active": v("action-secondary-fg-active"),
          "fg-selected": v("action-secondary-fg-selected"),
          "fg-disabled": v("action-secondary-fg-disabled"),
          "fg-inverse": v("action-secondary-fg-inverse"),
        },

        // Action Tertiary
        "action-tertiary": {
          bg: v("action-tertiary-bg"),
          "bg-hover": v("action-tertiary-bg-hover"),
          "bg-active": v("action-tertiary-bg-active"),
          "bg-selected": v("action-tertiary-bg-selected"),
          "bg-alt": v("action-tertiary-bg-alt"),
          "bg-disabled": v("action-tertiary-bg-disabled"),
          "bg-inverse": v("action-tertiary-bg-inverse"),
          border: v("action-tertiary-border"),
          "border-alt": v("action-tertiary-border-alt"),
          "border-disabled": v("action-tertiary-border-disabled"),
          "border-inverse": v("action-tertiary-border-inverse"),
          fg: v("action-tertiary-fg"),
          "fg-alt": v("action-tertiary-fg-alt"),
          "fg-active": v("action-tertiary-fg-active"),
          "fg-selected": v("action-tertiary-fg-selected"),
          "fg-disabled": v("action-tertiary-fg-disabled"),
          "fg-inverse": v("action-tertiary-fg-inverse"),
        },

        // Container
        container: {
          bg: v("container-bg"),
          "bg-alt": v("container-bg-alt"),
          "bg-inverse": v("container-bg-inverse"),
          border: v("container-border"),
          "border-alt": v("container-border-alt"),
          "border-inverse": v("container-border-inverse"),
          fg: v("container-fg"),
          "fg-alt": v("container-fg-alt"),
          "fg-inverse": v("container-fg-inverse"),
        },

        // Interactive
        interactive: {
          bg: v("interactive-bg"),
          "bg-hover": v("interactive-bg-hover"),
          "bg-active": v("interactive-bg-active"),
          "bg-selected": v("interactive-bg-selected"),
          "bg-alt": v("interactive-bg-alt"),
          "bg-alt2": v("interactive-bg-alt2"),
          "bg-disabled": v("interactive-bg-disabled"),
          "bg-inverse": v("interactive-bg-inverse"),
          border: v("interactive-border"),
          "border-alt": v("interactive-border-alt"),
          "border-disabled": v("interactive-border-disabled"),
          fg: v("interactive-fg"),
          "fg-alt": v("interactive-fg-alt"),
          "fg-active": v("interactive-fg-active"),
          "fg-selected": v("interactive-fg-selected"),
          "fg-disabled": v("interactive-fg-disabled"),
          "fg-readonly": v("interactive-fg-readonly"),
          "fg-inverse": v("interactive-fg-inverse"),
        },

        // Destructive
        destructive: {
          bg: v("destructive-bg"),
          "bg-hover": v("destructive-bg-hover"),
          "bg-active": v("destructive-bg-active"),
          "bg-selected": v("destructive-bg-selected"),
          "bg-alt": v("destructive-bg-alt"),
          "bg-disabled": v("destructive-bg-disabled"),
          "bg-inverse": v("destructive-bg-inverse"),
          border: v("destructive-border"),
          "border-alt": v("destructive-border-alt"),
          "border-disabled": v("destructive-border-disabled"),
          "border-inverse": v("destructive-border-inverse"),
          fg: v("destructive-fg"),
          "fg-alt": v("destructive-fg-alt"),
          "fg-active": v("destructive-fg-active"),
          "fg-selected": v("destructive-fg-selected"),
          "fg-disabled": v("destructive-fg-disabled"),
          "fg-inverse": v("destructive-fg-inverse"),
        },

        // Cautionary
        cautionary: {
          bg: v("cautionary-bg"),
          "bg-alt": v("cautionary-bg-alt"),
          "bg-inverse": v("cautionary-bg-inverse"),
          border: v("cautionary-border"),
          "border-alt": v("cautionary-border-alt"),
          "border-inverse": v("cautionary-border-inverse"),
          fg: v("cautionary-fg"),
          "fg-alt": v("cautionary-fg-alt"),
          "fg-inverse": v("cautionary-fg-inverse"),
        },

        // Important
        important: {
          bg: v("important-bg"),
          "bg-alt": v("important-bg-alt"),
          "bg-inverse": v("important-bg-inverse"),
          border: v("important-border"),
          "border-alt": v("important-border-alt"),
          "border-inverse": v("important-border-inverse"),
          fg: v("important-fg"),
          "fg-alt": v("important-fg-alt"),
          "fg-inverse": v("important-fg-inverse"),
        },

        // Informative
        informative: {
          bg: v("informative-bg"),
          "bg-alt": v("informative-bg-alt"),
          "bg-inverse": v("informative-bg-inverse"),
          border: v("informative-border"),
          "border-alt": v("informative-border-alt"),
          "border-inverse": v("informative-border-inverse"),
          fg: v("informative-fg"),
          "fg-alt": v("informative-fg-alt"),
          "fg-inverse": v("informative-fg-inverse"),
        },

        // Positive
        positive: {
          bg: v("positive-bg"),
          "bg-alt": v("positive-bg-alt"),
          "bg-inverse": v("positive-bg-inverse"),
          border: v("positive-border"),
          "border-alt": v("positive-border-alt"),
          "border-inverse": v("positive-border-inverse"),
          fg: v("positive-fg"),
          "fg-alt": v("positive-fg-alt"),
          "fg-inverse": v("positive-fg-inverse"),
        },

        // Data Visualization
        dataviz: {
          "1-main": v("dataviz-1-main"),
          "1-shade": v("dataviz-1-shade"),
          "1-tint": v("dataviz-1-tint"),
          "2-main": v("dataviz-2-main"),
          "2-shade": v("dataviz-2-shade"),
          "2-tint": v("dataviz-2-tint"),
          "3-main": v("dataviz-3-main"),
          "3-shade": v("dataviz-3-shade"),
          "3-tint": v("dataviz-3-tint"),
          "4-main": v("dataviz-4-main"),
          "4-shade": v("dataviz-4-shade"),
          "4-tint": v("dataviz-4-tint"),
          "5-main": v("dataviz-5-main"),
          "5-shade": v("dataviz-5-shade"),
          "5-tint": v("dataviz-5-tint"),
          "6-main": v("dataviz-6-main"),
          "6-shade": v("dataviz-6-shade"),
          "6-tint": v("dataviz-6-tint"),
          "7-main": v("dataviz-7-main"),
          "7-shade": v("dataviz-7-shade"),
          "7-tint": v("dataviz-7-tint"),
          "8-main": v("dataviz-8-main"),
          "8-shade": v("dataviz-8-shade"),
          "8-tint": v("dataviz-8-tint"),
        },
      },

      // ================================
      // Border Radius
      // Semantic: rounded-sm, rounded-md, rounded-lg etc. → curves scale
      // Primitives: rounded-[1], rounded-[2] etc. → raw values
      // ================================
      borderRadius: {
        // Semantic (adapts to data-curves attribute)
        none: v("radius-radius-none"),
        xxs: v("curves-xxs"),
        xs: v("curves-xs"),
        sm: v("curves-sm"),
        DEFAULT: v("curves-md"),
        md: v("curves-md"),
        lg: v("curves-lg"),
        xl: v("curves-xl"),
        full: v("radius-radius-full"),
        // Primitives (direct access)
        "r-1": v("radius-radius-1"),
        "r-2": v("radius-radius-2"),
        "r-4": v("radius-radius-4"),
        "r-8": v("radius-radius-8"),
        "r-12": v("radius-radius-12"),
        "r-16": v("radius-radius-16"),
        "r-20": v("radius-radius-20"),
        "r-24": v("radius-radius-24"),
        "r-32": v("radius-radius-32"),
        "r-40": v("radius-radius-40"),
        "r-80": v("radius-radius-80"),
      },

      // ================================
      // Spacing (from primitives)
      // ================================
      spacing: {
        "space-0": v("spacing-space-0"),
        "space-2": v("spacing-space-2"),
        "space-4": v("spacing-space-4"),
        "space-8": v("spacing-space-8"),
        "space-12": v("spacing-space-12"),
        "space-16": v("spacing-space-16"),
        "space-20": v("spacing-space-20"),
        "space-24": v("spacing-space-24"),
        "space-32": v("spacing-space-32"),
        "space-40": v("spacing-space-40"),
        "space-48": v("spacing-space-48"),
        "space-56": v("spacing-space-56"),
        "space-64": v("spacing-space-64"),
        "space-72": v("spacing-space-72"),
        "space-80": v("spacing-space-80"),
        "space-88": v("spacing-space-88"),
        "space-96": v("spacing-space-96"),
        "space-104": v("spacing-space-104"),
        "space-112": v("spacing-space-112"),
        "space-120": v("spacing-space-120"),
        "space-144": v("spacing-space-144"),
        "space-160": v("spacing-space-160"),
        "space-240": v("spacing-space-240"),
        "space-320": v("spacing-space-320"),
      },

      // ================================
      // Sizing
      // ================================
      width: {
        "size-none": v("sizing-size-none"),
        "size-xxs": v("sizing-size-xxs"),
        "size-xs": v("sizing-size-xs"),
        "size-s": v("sizing-size-s"),
        "size-m": v("sizing-size-m"),
        "size-l": v("sizing-size-l"),
        "size-xl": v("sizing-size-xl"),
        "size-xxl": v("sizing-size-xxl"),
        "size-xxxl": v("sizing-size-xxxl"),
      },
      height: {
        "size-none": v("sizing-size-none"),
        "size-xxs": v("sizing-size-xxs"),
        "size-xs": v("sizing-size-xs"),
        "size-s": v("sizing-size-s"),
        "size-m": v("sizing-size-m"),
        "size-l": v("sizing-size-l"),
        "size-xl": v("sizing-size-xl"),
        "size-xxl": v("sizing-size-xxl"),
        "size-xxxl": v("sizing-size-xxxl"),
      },

      // ================================
      // Screens (from viewport primitives)
      // ================================
      screens: {
        xxs: v("viewports-screen-xxs"),
        xs: v("viewports-screen-xs"),
        s: v("viewports-screen-s"),
        m: v("viewports-screen-m"),
        l: v("viewports-screen-l"),
        xl: v("viewports-screen-xl"),
        "2xl": v("viewports-screen-2xl"),
        "3xl": v("viewports-screen-3xl"),
        "4xl": v("viewports-screen-4xl"),
      },

      fontFamily: {
        heading: ["var(--font-heading)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
        sans: ["var(--font-body)"],
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
}

export default ragnarPreset
