import type { ReactNode } from "react";
import "@eluan/core/styles.css";
import { EluanProvider } from "@eluan/core";
// Requires the generator as a dependency: `pnpm add @eluan/theme-generator`.
import { generateTheme } from "@eluan/theme-generator";

/**
 * Brand theme, generated from the brand accent.
 *
 * The accent hex is generator input, not a token value: the generator derives
 * every semantic colour (light, dim and dark) from it and auto-corrects any
 * foreground/background pair that falls below `minContrast`. Never hand-edit
 * the resulting tokens; change the input here and regenerate instead.
 *
 * Generated once at module load so the Provider gets a stable theme object
 * and injects its CSS a single time.
 */
const BRAND_ACCENT = "#2F6F5E";

const { customTheme: brandTheme } = generateTheme({
  accents: [BRAND_ACCENT],
  themeName: "brand",
  minContrast: 4.5,
  neutralTintRatio: 0.04,
});

type AppThemeProviderProps = {
  children: ReactNode;
};

/**
 * App-root theme setup. Replaces the existing root `EluanProvider` (don't nest
 * it inside another one): it registers the brand theme and switches every
 * corner in the product to the rounder `sweeping` curves.
 */
export default function AppThemeProvider({ children }: AppThemeProviderProps) {
  return (
    <EluanProvider customThemes={[brandTheme]} defaultTheme="brand" defaultCurves="sweeping">
      {children}
    </EluanProvider>
  );
}
