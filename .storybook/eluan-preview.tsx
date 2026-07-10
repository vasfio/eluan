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
import { EluanProvider } from "../packages/core/src/providers/eluan-provider"

if (import.meta.env.DEV) {
  void import("virtual:stylex:runtime")
}

type EluanGlobals = {
  curves: CurveScale
  mode: Mode
  spacing: SpacingScale
  theme: Theme
}

type EluanPreviewOptions = {
  padded?: boolean
  parameters?: Preview["parameters"]
}

type EluanStorybookFrameProps = {
  Story: React.ComponentType
  context: {
    globals: Record<string, unknown>
  }
  padded: boolean
}

const initialGlobals = {
  eluanCurves: "slight",
  eluanMode: "light",
  eluanSpacing: "standard",
  eluanTheme: "industrial-retro",
} satisfies Preview["initialGlobals"]

const globalTypes = {
  eluanMode: {
    name: "Mode",
    description: "Eluan color mode",
    toolbar: {
      icon: "sun",
      items: modes.map((value) => ({
        value,
        title: value[0].toUpperCase() + value.slice(1),
      })),
      dynamicTitle: true,
    },
  },
  eluanTheme: {
    name: "Theme",
    description: "Eluan visual theme",
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
  eluanSpacing: {
    name: "Spacing",
    description: "Eluan spacing scale",
    toolbar: {
      icon: "ruler",
      items: spacingScales.map((value) => ({
        value,
        title: value[0].toUpperCase() + value.slice(1),
      })),
      dynamicTitle: true,
    },
  },
  eluanCurves: {
    name: "Curves",
    description: "Eluan border radius scale",
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

function readGlobals(globals: Record<string, unknown>): EluanGlobals {
  return {
    curves: oneOf(globals.eluanCurves ?? globals.curves, curveScales, "slight"),
    mode: oneOf(globals.eluanMode ?? globals.mode, modes, "light"),
    spacing: oneOf(globals.eluanSpacing ?? globals.spacing, spacingScales, "standard"),
    theme: oneOf(globals.eluanTheme ?? globals.theme, themes, "industrial-retro"),
  }
}

function applyThemeAttributes(element: HTMLElement, globals: EluanGlobals) {
  element.setAttribute("data-curves", globals.curves)
  element.setAttribute("data-mode", globals.mode)
  element.setAttribute("data-spacing", globals.spacing)
  element.setAttribute("data-theme", globals.theme)
}

function EluanStorybookFrame({ Story, context, padded }: EluanStorybookFrameProps) {
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
    <EluanProvider
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
        data-eluan-storybook-root=""
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
    </EluanProvider>
  )
}

export function createEluanPreview(options: EluanPreviewOptions = {}): Preview {
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
        <EluanStorybookFrame Story={Story} context={context} padded={padded} />
      ),
    ],
  }
}

export const eluanGlobalTypes = globalTypes
export const eluanInitialGlobals = initialGlobals
export const eluanParameters = parameters

export function createEluanDecorator(options: EluanPreviewOptions = {}): Decorator {
  const { padded = true } = options

  return (Story, context) => (
    <EluanStorybookFrame Story={Story} context={context} padded={padded} />
  )
}
