import * as React from "react";
import { Label, Switch, useEluanTheme } from "@eluan/core";

type ThemeMode = ReturnType<typeof useEluanTheme>["mode"];
type NonDarkMode = Exclude<ThemeMode, "dark">;

const row = {
  display: "inline-flex",
  alignItems: "center",
  gap: "var(--spacing-sm)",
} as const;

/**
 * Dark mode on/off switch.
 *
 * The mode lives in EluanProvider, which sets `data-mode`, persists the choice
 * and follows the OS colour scheme until the user picks one. This component
 * only reads and changes it through `useEluanTheme()`.
 */
export default function DarkModeToggle() {
  const id = React.useId();
  const { mode, setMode } = useEluanTheme();

  // Eluan also has a "dim" mode. Remember the last non-dark mode so turning
  // dark off returns the user to it instead of always forcing "light".
  const lastNonDarkMode = React.useRef<NonDarkMode>(mode === "dark" ? "light" : mode);
  React.useEffect(() => {
    if (mode !== "dark") lastNonDarkMode.current = mode;
  }, [mode]);

  return (
    <div style={row}>
      <Label htmlFor={id}>Dark mode</Label>
      <Switch
        id={id}
        checked={mode === "dark"}
        onCheckedChange={(on) => setMode(on ? "dark" : lastNonDarkMode.current)}
      />
    </div>
  );
}
