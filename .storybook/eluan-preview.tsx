import React, { useLayoutEffect } from "react"
import type { Decorator, Preview } from "@storybook/react"
import {
  curveScales,
  modes,
  spacingScales,
  type CurveScale,
  type Mode,
  type SpacingScale,
  type Theme,
} from "../packages/tokens/src/index"
import { EluanProvider } from "../packages/core/src/providers/eluan-provider"

if (import.meta.env.DEV) {
  void import("virtual:stylex:runtime")
}

// `minimal` is the only built-in theme, so there is no theme toolbar —
// stories always render on it. Consumer themes come from createTheme().
const ELUAN_THEME: Theme = "minimal"

type EluanGlobals = {
  curves: CurveScale
  mode: Mode
  spacing: SpacingScale
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
  }
}

function applyThemeAttributes(element: HTMLElement, globals: EluanGlobals) {
  element.setAttribute("data-curves", globals.curves)
  element.setAttribute("data-mode", globals.mode)
  element.setAttribute("data-spacing", globals.spacing)
  element.setAttribute("data-theme", ELUAN_THEME)
}

function EluanStorybookFrame({ Story, context, padded }: EluanStorybookFrameProps) {
  const globals = readGlobals(context.globals)
  const providerKey = `${globals.mode}:${globals.spacing}:${globals.curves}`

  useLayoutEffect(() => {
    applyThemeAttributes(document.documentElement, globals)
    applyThemeAttributes(document.body, globals)
    document.documentElement.style.colorScheme = globals.mode === "dark" ? "dark" : "light"
    document.body.style.backgroundColor = "var(--container-bg)"
    document.body.style.color = "var(--container-fg)"
  }, [globals.curves, globals.mode, globals.spacing])

  return (
    <EluanProvider
      key={providerKey}
      defaultCurves={globals.curves}
      defaultMode={globals.mode}
      defaultSpacing={globals.spacing}
      defaultTheme={ELUAN_THEME}
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
