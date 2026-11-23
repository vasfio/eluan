"use client";

import * as React from "react";
import { Toggle, useEluanTheme } from "@eluan/core";
import { Moon } from "lucide-react";

type Mode = ReturnType<typeof useEluanTheme>["mode"];

/**
 * Dark mode on/off toggle, driven by EluanProvider's `mode` axis.
 *
 * Pressed means `data-mode="dark"`. Eluan has three modes (light | dim | dark),
 * so switching dark mode off returns to whichever non-dark mode was last
 * active: a reader on `dim` who tries dark and turns it off again lands back on
 * `dim`, not `light`.
 *
 * Persistence, OS-preference following and the pre-paint script that avoids a
 * flash on SSR all belong to EluanProvider's configuration at the app root;
 * this control only reads and writes the mode.
 */
export default function DarkModeToggle() {
  const { mode, setMode } = useEluanTheme();

  const lastNonDarkMode = React.useRef<Mode>(mode === "dark" ? "light" : mode);

  React.useEffect(() => {
    if (mode !== "dark") lastNonDarkMode.current = mode;
  }, [mode]);

  return (
    <Toggle
      aria-label="Dark mode"
      pressed={mode === "dark"}
      onPressedChange={(pressed) =>
        setMode(pressed ? "dark" : lastNonDarkMode.current)
      }
    >
      <Moon size={16} aria-hidden />
    </Toggle>
  );
}
