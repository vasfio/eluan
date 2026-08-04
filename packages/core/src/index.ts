"use client"

import "./styles.css"

// @eluan/core - Core UI Components
// Re-export all components

export * from "./components/accordion"
export * from "./components/action-popover"
export * from "./components/aspect-ratio"
export * from "./components/avatar"
export * from "./components/badge"
export * from "./components/banner"
export * from "./components/breadcrumb"
export * from "./components/button"
export * from "./components/calendar"
export * from "./components/card"
export * from "./components/carousel"
export * from "./components/checkbox"
export * from "./components/checkbox-group"
export * from "./components/code-block"
export * from "./components/collapsible"
export * from "./components/command"
export * from "./components/context-menu"
export * from "./components/credit-card-input"
export * from "./components/date-picker"
export * from "./components/datetime-picker"
export * from "./components/decimal-input"
export * from "./components/dialog"
export * from "./components/drawer"
export * from "./components/dropdown-menu"
export * from "./components/email-input"
export * from "./components/fieldset"
export * from "./components/file-input"
export * from "./components/footer"
export * from "./components/form-label"
export * from "./components/header"
export * from "./components/hover-card"
export * from "./components/input"
export * from "./components/input-otp"
export * from "./components/kbd"
export * from "./components/media"
export * from "./components/menubar"
export * from "./components/multi-select"
export * from "./components/navigation-drawer"
export * from "./components/navigation-menu"
export * from "./components/number-input"
export * from "./components/pagination"
export * from "./components/password-input"
export * from "./components/phone-input"
export * from "./components/popover"
export * from "./components/progress"
export * from "./components/radio-group"
export * from "./components/rich-text"
export * from "./components/scroll-area"
export * from "./components/search-input"
export * from "./components/segmented-control"
export * from "./components/select"
export * from "./components/separator"
export * from "./components/sheet"
export * from "./components/skeleton"
export * from "./components/slider"
export * from "./components/spinner"
export * from "./components/stepper"
export * from "./components/switch"
export * from "./components/table"
export * from "./components/tabs"
export * from "./components/textarea"
export * from "./components/time-input"
export * from "./components/toast"
export * from "./components/toggle"
export * from "./components/toggle-group"
export * from "./components/tooltip"
export * from "./components/tree-view"
export * from "./components/typography"

// Provider for client-app theme setup
export * from "./providers/eluan-provider"
export * from "./providers/create-theme"

// Re-export token types/helpers so consumers don't need a separate import
export {
  themes,
  modes,
  spacingScales,
  curveScales,
  themeFonts,
  loadThemeFonts,
  typeset,
  typesetAnchors,
  typesetSteps,
  lineHeightSteps,
  letterSpacingSteps,
  resolveTypesetSize,
  type Theme,
  type Mode,
  type SpacingScale,
  type CurveScale,
  type TypesetStep,
  type TypesetViewport,
} from "@eluan/tokens"
