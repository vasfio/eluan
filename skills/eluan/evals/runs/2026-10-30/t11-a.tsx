"use client";

import * as React from "react";
import { EluanProvider, createTheme } from "@eluan/core";

/* ─── Brand palette ─────────────────────────────────────────────────────────
 * #2F6F5E is the brand colour (hsl 164° 40% 31%). The other values are the
 * same hue at different lightness.
 *
 * `createTheme` emits a single mode-agnostic rule, so every value here has to
 * hold up in light, dim and dark at once:
 *  - The fills always carry white text: 5.9:1 on the brand colour, 7.6:1 on
 *    hover, 9.3:1 on active (WCAG AA in every mode).
 *  - The focus ring is lifted to a mid-tone. The brand colour itself drops
 *    below the 3:1 non-text minimum on dark surfaces. #3D8F79 is 3.9:1 on
 *    white and stays above 3:1 on any surface darker than about #383838.
 */
const BRAND = {
  fill: "#2F6F5E",
  fillHover: "#275D4F",
  fillActive: "#214F43",
  onFill: "#FFFFFF",
  focusRing: "#3D8F79",
} as const;

export const BRAND_THEME_NAME = "brand";

/**
 * Layered on `minimal` (the only built-in, and createTheme's default
 * `extends`). Only the tokens that carry the accent are overridden. Surfaces,
 * text, borders, status colours, disabled states and fonts all fall through
 * from `minimal`.
 */
export const brandTheme = createTheme({
  name: BRAND_THEME_NAME,
  tokens: {
    // Primary action: the filled CTA.
    "--action-primary-bg": BRAND.fill,
    "--action-primary-bg-hover": BRAND.fillHover,
    "--action-primary-bg-active": BRAND.fillActive,
    "--action-primary-bg-selected": BRAND.fillActive,
    "--action-primary-fg": BRAND.onFill,
    "--action-primary-fg-active": BRAND.onFill,
    "--action-primary-fg-selected": BRAND.onFill,

    // Selected state of interactive controls, overridden as a bg/fg pair so
    // the content on a selected fill keeps its contrast.
    "--interactive-bg-selected": BRAND.fill,
    "--interactive-fg-selected": BRAND.onFill,

    // The system-wide focus ring.
    "--interactive-border": BRAND.focusRing,
  },
});

const BRAND_THEMES = [brandTheme];

/* ─── Persisted preferences ─────────────────────────────────────────────────
 * With `persist`, EluanProvider stores the theme and curves under these keys,
 * and a stored value wins over the `default*` props. Returning users would
 * keep the old `minimal` / `slight` look indefinitely, so the old defaults are
 * rewritten once. `sharp` is a choice the user made, so it is left alone.
 */
const STORAGE_KEYS = { theme: "eluan:theme", curves: "eluan:curves" } as const;
/** Bump the version if the brand defaults change again. */
const MIGRATION_KEY = "app:brand-theme-migration:v1";

function migrateStoredPreferences(): void {
  if (typeof window === "undefined") return;
  try {
    const storage = window.localStorage;
    if (storage.getItem(MIGRATION_KEY)) return;
    if (storage.getItem(STORAGE_KEYS.theme) === "minimal") {
      storage.setItem(STORAGE_KEYS.theme, BRAND_THEME_NAME);
    }
    if (storage.getItem(STORAGE_KEYS.curves) === "slight") {
      storage.setItem(STORAGE_KEYS.curves, "sweeping");
    }
    storage.setItem(MIGRATION_KEY, "1");
  } catch {
    // Storage is unavailable (private mode, blocked site data), so nothing
    // was persisted and there is nothing to migrate.
  }
}

/* ─── Provider ──────────────────────────────────────────────────────────── */

type EluanProviderProps = React.ComponentProps<typeof EluanProvider>;

/** Everything EluanProvider accepts, minus the settings this component owns. */
export type BrandThemeProviderProps = Omit<
  EluanProviderProps,
  "customThemes" | "defaultTheme" | "defaultCurves"
>;

/**
 * Drop-in replacement for the app-root EluanProvider. It applies the brand
 * colour (the `brand` custom theme) and rounder corners (the `sweeping`
 * curves scale, so every `--curves-*` token grows together). Keep the props
 * the root provider already has (defaultMode, persist, followSystemMode, …);
 * they pass straight through.
 *
 *   <BrandThemeProvider defaultMode="light" persist>
 *     {children}
 *   </BrandThemeProvider>
 */
export default function BrandThemeProvider({
  children,
  ...providerProps
}: BrandThemeProviderProps) {
  const { persist } = providerProps;

  // A lazy initialiser runs once, during this component's first render, which
  // is before EluanProvider (a child) renders or runs its effects. An effect
  // here would be too late, because child effects fire before the parent's.
  // The migration is idempotent, so a StrictMode double render is harmless.
  React.useState(() => {
    if (persist) migrateStoredPreferences();
  });

  return (
    <EluanProvider
      {...providerProps}
      customThemes={BRAND_THEMES}
      defaultTheme={BRAND_THEME_NAME}
      defaultCurves="sweeping"
    >
      {children}
    </EluanProvider>
  );
}
