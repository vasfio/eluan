"use client"

import * as React from "react"
import {
  loadThemeFonts,
  themes as builtInThemes,
  type CurveScale,
  type Mode,
  type SpacingScale,
  type Theme,
  type TypesetViewport,
} from "@eluan/tokens"

import type { CustomTheme } from "./create-theme"

// ============================================
// Eluan theme provider
// ============================================
// A drop-in React context for setting Eluan's theme axes (theme, mode,
// spacing, curves, typeset) in a client app. It writes the corresponding
// `data-*` attributes to a target element (defaults to `<html>`) so the CSS
// variables in @eluan/tokens activate, and dynamically loads the fonts for the
// active theme.
//
// `typeset` is the odd one out: its default "auto" *removes* data-typeset so
// the fluid type scale follows the viewport. Only an explicit pin is written
// to the DOM, and only an explicit pin is persisted.
//
// Usage:
//   import { EluanProvider } from "@eluan/core"
//
//   export default function App() {
//     return (
//       <EluanProvider defaultTheme="minimal" defaultMode="light">
//         <YourApp />
//       </EluanProvider>
//     )
//   }
//
// Custom themes (via `createTheme`):
//   const acme = createTheme({ name: "acme", tokens: {...} })
//   <EluanProvider customThemes={[acme]} defaultTheme="acme">…
//
// To read or change values from anywhere inside the tree:
//   const { theme, setTheme, mode, setMode } = useEluanTheme()

/** Either a built-in theme name or a custom theme name (when registered). */
export type ThemeName = Theme | string

/**
 * Typeset axis. `"auto"` (the default) removes the `data-typeset` attribute so
 * the fluid clamp()s in typeset.css follow the viewport; the three explicit
 * values pin every type step to that column's static size.
 */
export type TypesetPin = "auto" | TypesetViewport

const TYPESET_PINS: readonly TypesetPin[] = ["auto", "small", "medium", "large"]

function isTypesetPin(value: string): value is TypesetPin {
  return (TYPESET_PINS as readonly string[]).includes(value)
}

export interface EluanThemeState {
  theme: ThemeName
  mode: Mode
  spacing: SpacingScale
  curves: CurveScale
  typeset: TypesetPin
  setTheme: (t: ThemeName) => void
  setMode: (m: Mode) => void
  setSpacing: (s: SpacingScale) => void
  setCurves: (c: CurveScale) => void
  setTypeset: (t: TypesetPin) => void
}

const EluanThemeContext = React.createContext<EluanThemeState | null>(null)

const STORAGE_KEYS = {
  theme: "eluan:theme",
  mode: "eluan:mode",
  spacing: "eluan:spacing",
  curves: "eluan:curves",
  typeset: "eluan:typeset",
} as const

const STYLE_ELEMENT_ID = "eluan-custom-themes"

export interface EluanProviderProps {
  /**
   * Initial theme — the built-in name `"minimal"`, or a custom theme name
   * registered via `customThemes`. Default: `"minimal"`.
   */
  defaultTheme?: ThemeName
  /** Initial mode ("light" | "dark"). Default: "light". */
  defaultMode?: Mode
  /** Initial spacing scale ("compact" | "standard" | "wide"). Default: "standard". */
  defaultSpacing?: SpacingScale
  /** Initial curve scale ("sharp" | "slight" | "sweeping"). Default: "slight". */
  defaultCurves?: CurveScale
  /**
   * Initial typeset pin. `"auto"` (default) leaves `data-typeset` off so type
   * sizes stay viewport-fluid; `"small" | "medium" | "large"` freeze the scale
   * to one column.
   */
  defaultTypeset?: TypesetPin
  /**
   * Custom themes created via `createTheme()`. Each is registered by name and
   * its CSS is injected into a single `<style>` element so `setTheme(name)`
   * activates it like any built-in theme.
   */
  customThemes?: CustomTheme[]
  /**
   * Persist user selections to localStorage so they survive page reloads.
   * Default: true.
   */
  persist?: boolean
  /**
   * When `defaultMode` is not explicitly set, follow the OS `prefers-color-scheme`.
   * Default: true.
   */
  followSystemMode?: boolean
  /**
   * Element to write the `data-*` attributes to. Default: `document.documentElement`.
   * Pass `"body"` to target `<body>`, or any element ref.
   */
  target?: "html" | "body" | HTMLElement | null
  children: React.ReactNode
}

function readStored(key: string): string | null {
  if (typeof window === "undefined") return null
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

function writeStored(key: string, value: string) {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(key, value)
  } catch {
    /* swallow quota / privacy-mode errors */
  }
}

function clearStored(key: string) {
  if (typeof window === "undefined") return
  try {
    window.localStorage.removeItem(key)
  } catch {
    /* swallow privacy-mode errors */
  }
}

function getSystemMode(): Mode {
  if (typeof window === "undefined" || !window.matchMedia) return "light"
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function resolveTarget(target: EluanProviderProps["target"]): HTMLElement | null {
  if (typeof document === "undefined") return null
  if (target instanceof HTMLElement) return target
  if (target === "body") return document.body
  return document.documentElement
}

function isBuiltInTheme(name: string): name is Theme {
  return (builtInThemes as readonly string[]).includes(name)
}

export function EluanProvider({
  defaultTheme = "minimal",
  defaultMode,
  defaultSpacing = "standard",
  defaultCurves = "slight",
  defaultTypeset = "auto",
  customThemes,
  persist = true,
  followSystemMode = true,
  target = "html",
  children,
}: EluanProviderProps) {
  // Build a name → custom theme lookup. Validates that all names are unique
  // and don't collide with built-in theme names.
  const customThemeMap = React.useMemo(() => {
    const map = new Map<string, CustomTheme>()
    if (!customThemes) return map
    for (const t of customThemes) {
      if (isBuiltInTheme(t.name)) {
        throw new Error(
          `EluanProvider: custom theme name "${t.name}" collides with a built-in theme.`
        )
      }
      if (map.has(t.name)) {
        throw new Error(`EluanProvider: duplicate custom theme name "${t.name}".`)
      }
      map.set(t.name, t)
    }
    return map
  }, [customThemes])

  // Helper: validate a theme name is either built-in or registered as custom.
  const isValidThemeName = React.useCallback(
    (n: string): n is ThemeName => isBuiltInTheme(n) || customThemeMap.has(n),
    [customThemeMap]
  )

  // Inject all custom themes' CSS into a single <style> element. We update
  // it on mount and whenever the customThemes array changes.
  React.useEffect(() => {
    if (typeof document === "undefined" || customThemeMap.size === 0) return
    let styleEl = document.getElementById(STYLE_ELEMENT_ID) as HTMLStyleElement | null
    if (!styleEl) {
      styleEl = document.createElement("style")
      styleEl.id = STYLE_ELEMENT_ID
      document.head.appendChild(styleEl)
    }
    styleEl.textContent = Array.from(customThemeMap.values())
      .map((t) => t.css)
      .join("\n\n")
  }, [customThemeMap])

  // Resolve initial values: stored > prop > system (mode only) > fallback
  const [theme, setThemeState] = React.useState<ThemeName>(() => {
    if (persist) {
      const stored = readStored(STORAGE_KEYS.theme)
      if (stored && (isBuiltInTheme(stored) || customThemeMap.has(stored))) return stored
    }
    return defaultTheme
  })

  const [mode, setModeState] = React.useState<Mode>(() => {
    if (persist) {
      const stored = readStored(STORAGE_KEYS.mode)
      if (stored === "light" || stored === "dark") return stored
    }
    if (defaultMode) return defaultMode
    if (followSystemMode) return getSystemMode()
    return "light"
  })

  const [spacing, setSpacingState] = React.useState<SpacingScale>(() => {
    if (persist) {
      const stored = readStored(STORAGE_KEYS.spacing)
      if (stored === "compact" || stored === "standard" || stored === "wide") return stored
    }
    return defaultSpacing
  })

  const [curves, setCurvesState] = React.useState<CurveScale>(() => {
    if (persist) {
      const stored = readStored(STORAGE_KEYS.curves)
      if (stored === "sharp" || stored === "slight" || stored === "sweeping") return stored
    }
    return defaultCurves
  })

  // Only explicit pins are ever written to storage — "auto" clears the key —
  // so a stored value always means "the user picked a column".
  const [typeset, setTypesetState] = React.useState<TypesetPin>(() => {
    if (persist) {
      const stored = readStored(STORAGE_KEYS.typeset)
      if (stored && isTypesetPin(stored)) return stored
    }
    return defaultTypeset
  })

  // Apply the data-* attributes to the target element on every change.
  // For custom themes we set `data-theme=<base>` so all the base theme's
  // tokens activate, then `data-theme-custom=<name>` so the createTheme()
  // overrides layer on top.
  React.useEffect(() => {
    const el = resolveTarget(target)
    if (!el) return

    const custom = customThemeMap.get(theme)
    if (custom) {
      el.setAttribute("data-theme", custom.extends)
      el.setAttribute("data-theme-custom", custom.name)
    } else {
      el.setAttribute("data-theme", theme)
      el.removeAttribute("data-theme-custom")
    }
    el.setAttribute("data-mode", mode)
    el.setAttribute("data-spacing", spacing)
    el.setAttribute("data-curves", curves)

    // "auto" is the absence of the attribute, not a value: with no
    // data-typeset the fluid :root/media-query declarations win and type
    // tracks the viewport.
    if (typeset === "auto") {
      el.removeAttribute("data-typeset")
    } else {
      el.setAttribute("data-typeset", typeset)
    }
  }, [theme, mode, spacing, curves, typeset, target, customThemeMap])

  // Lazily load fonts for the active theme. Custom themes inherit fonts
  // from their base theme — they only need to load their `extends` fonts.
  React.useEffect(() => {
    const baseTheme = customThemeMap.get(theme)?.extends ?? (theme as Theme)
    if (isBuiltInTheme(baseTheme)) {
      void loadThemeFonts(baseTheme)
    }
  }, [theme, customThemeMap])

  // React to OS mode changes when not explicitly overridden by the user.
  React.useEffect(() => {
    if (!followSystemMode || typeof window === "undefined" || !window.matchMedia) return
    if (persist && (readStored(STORAGE_KEYS.mode) === "light" || readStored(STORAGE_KEYS.mode) === "dark")) return

    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const handler = (e: MediaQueryListEvent) => setModeState(e.matches ? "dark" : "light")
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [followSystemMode, persist])

  // Stable setters that also persist when enabled.
  const setTheme = React.useCallback(
    (t: ThemeName) => {
      if (!isValidThemeName(t)) {
        if (process.env.NODE_ENV !== "production") {
          console.warn(
            `EluanProvider: setTheme("${t}") — unknown theme name. Did you forget to pass it via customThemes?`
          )
        }
        return
      }
      setThemeState(t)
      if (persist) writeStored(STORAGE_KEYS.theme, t)
    },
    [persist, isValidThemeName]
  )
  const setMode = React.useCallback(
    (m: Mode) => {
      setModeState(m)
      if (persist) writeStored(STORAGE_KEYS.mode, m)
    },
    [persist]
  )
  const setSpacing = React.useCallback(
    (s: SpacingScale) => {
      setSpacingState(s)
      if (persist) writeStored(STORAGE_KEYS.spacing, s)
    },
    [persist]
  )
  const setCurves = React.useCallback(
    (c: CurveScale) => {
      setCurvesState(c)
      if (persist) writeStored(STORAGE_KEYS.curves, c)
    },
    [persist]
  )
  const setTypeset = React.useCallback(
    (t: TypesetPin) => {
      setTypesetState(t)
      if (!persist) return
      if (t === "auto") clearStored(STORAGE_KEYS.typeset)
      else writeStored(STORAGE_KEYS.typeset, t)
    },
    [persist]
  )

  const value = React.useMemo<EluanThemeState>(
    () => ({
      theme,
      mode,
      spacing,
      curves,
      typeset,
      setTheme,
      setMode,
      setSpacing,
      setCurves,
      setTypeset,
    }),
    [
      theme,
      mode,
      spacing,
      curves,
      typeset,
      setTheme,
      setMode,
      setSpacing,
      setCurves,
      setTypeset,
    ]
  )

  return (
    <EluanThemeContext.Provider value={value}>{children}</EluanThemeContext.Provider>
  )
}

/**
 * Read and update the active Eluan theme axes from anywhere in the tree.
 * Must be used inside a `<EluanProvider>`.
 */
export function useEluanTheme(): EluanThemeState {
  const ctx = React.useContext(EluanThemeContext)
  if (!ctx) {
    throw new Error("useEluanTheme must be used within a <EluanProvider>")
  }
  return ctx
}
