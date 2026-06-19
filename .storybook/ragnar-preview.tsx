import React, { useLayoutEffect } from "react"
import type { Decorator, Preview } from "@storybook/react"
import {
  curveScales,
  modes,
  spacingScales,
  themes,
  type CurveScale,
  type Mode,
  type SpacingScale,
  type Theme,
} from "../packages/tokens/src/index"
import { RagnarProvider } from "../packages/core/src/providers/ragnar-provider"

if (import.meta.env.DEV) {
  void import("virtual:stylex:runtime")
}

type RagnarGlobals = {
  curves: CurveScale
  mode: Mode
  spacing: SpacingScale
  theme: Theme
}

type RagnarPreviewOptions = {
  padded?: boolean
  parameters?: Preview["parameters"]
}

type RagnarStorybookFrameProps = {
  Story: React.ComponentType
  context: {
    globals: Record<string, unknown>
  }
  padded: boolean
}

const initialGlobals = {
  ragnarCurves: "slight",
  ragnarMode: "light",
  ragnarSpacing: "standard",
  ragnarTheme: "industrial-retro",
} satisfies Preview["initialGlobals"]

const globalTypes = {
  ragnarMode: {
    name: "Mode",
    description: "Ragnar color mode",
    toolbar: {
      icon: "sun",
      items: modes.map((value) => ({
        value,
        title: value[0].toUpperCase() + value.slice(1),
      })),
      dynamicTitle: true,
    },
  },
  ragnarTheme: {
    name: "Theme",
    description: "Ragnar visual theme",
    toolbar: {
      icon: "paintbrush",
      items: themes.map((value) => ({
        value,
        title: value
          .split("-")
          .map((part) => part[0].toUpperCase() + part.slice(1))
          .join(" "),
      })),
      dynamicTitle: true,
    },
  },
  ragnarSpacing: {
    name: "Spacing",
    description: "Ragnar spacing scale",
    toolbar: {
      icon: "ruler",
      items: spacingScales.map((value) => ({
        value,
        title: value[0].toUpperCase() + value.slice(1),
      })),
      dynamicTitle: true,
    },
  },
  ragnarCurves: {
    name: "Curves",
    description: "Ragnar border radius scale",
    toolbar: {
      icon: "circle",
      items: curveScales.map((value) => ({
        value,
        title: value[0].toUpperCase() + value.slice(1),
      })),
      dynamicTitle: true,
    },
  },
} satisfies Preview["globalTypes"]

const parameters = {
  backgrounds: {
    disable: true,
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i,
    },
  },
  layout: "fullscreen",
} satisfies Preview["parameters"]

function oneOf<T extends readonly string[]>(value: unknown, allowed: T, fallback: T[number]) {
  return typeof value === "string" && allowed.includes(value) ? (value as T[number]) : fallback
}

function readGlobals(globals: Record<string, unknown>): RagnarGlobals {
  return {
    curves: oneOf(globals.ragnarCurves ?? globals.curves, curveScales, "slight"),
    mode: oneOf(globals.ragnarMode ?? globals.mode, modes, "light"),
    spacing: oneOf(globals.ragnarSpacing ?? globals.spacing, spacingScales, "standard"),
    theme: oneOf(globals.ragnarTheme ?? globals.theme, themes, "industrial-retro"),
  }
}

function applyThemeAttributes(element: HTMLElement, globals: RagnarGlobals) {
  element.setAttribute("data-curves", globals.curves)
  element.setAttribute("data-mode", globals.mode)
  element.setAttribute("data-spacing", globals.spacing)
  element.setAttribute("data-theme", globals.theme)
}

function RagnarStorybookFrame({ Story, context, padded }: RagnarStorybookFrameProps) {
  const globals = readGlobals(context.globals)
  const providerKey = `${globals.theme}:${globals.mode}:${globals.spacing}:${globals.curves}`

  useLayoutEffect(() => {
    applyThemeAttributes(document.documentElement, globals)
    applyThemeAttributes(document.body, globals)
    document.documentElement.style.colorScheme = globals.mode === "dark" ? "dark" : "light"
    document.body.style.backgroundColor = "var(--container-bg)"
    document.body.style.color = "var(--container-fg)"
  }, [globals.curves, globals.mode, globals.spacing, globals.theme])

  return (
    <RagnarProvider
      key={providerKey}
      defaultCurves={globals.curves}
      defaultMode={globals.mode}
      defaultSpacing={globals.spacing}
      defaultTheme={globals.theme}
      followSystemMode={false}
      persist={false}
      target="html"
    >
      <div
        data-ragnar-storybook-root=""
        style={{
          backgroundColor: "var(--container-bg)",
          color: "var(--container-fg)",
          fontFamily: "var(--font-body)",
          minHeight: "100vh",
        }}
      >
        <div style={padded ? { padding: "var(--spacing-md)" } : undefined}>
          <Story />
        </div>
      </div>
    </RagnarProvider>
  )
}

export function createRagnarPreview(options: RagnarPreviewOptions = {}): Preview {
  const { padded = true, parameters: parameterOverrides } = options

  return {
    globalTypes,
    initialGlobals,
    parameters: {
      ...parameters,
      ...parameterOverrides,
    },
    decorators: [
      (Story, context) => (
        <RagnarStorybookFrame Story={Story} context={context} padded={padded} />
      ),
    ],
  }
}

export const ragnarGlobalTypes = globalTypes
export const ragnarInitialGlobals = initialGlobals
export const ragnarParameters = parameters

export function createRagnarDecorator(options: RagnarPreviewOptions = {}): Decorator {
  const { padded = true } = options

  return (Story, context) => (
    <RagnarStorybookFrame Story={Story} context={context} padded={padded} />
  )
}
