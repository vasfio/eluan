import { useState, type FormEvent, type ReactNode } from "react";
import { Banner, Button, Spinner } from "@eluan/core";
// @eluan/core styles the toaster but doesn't re-export toast(). `sonner` must be a
// direct dependency of this app, in the same range as @eluan/core's (^2.0.7), so
// only one copy is installed.
import { toast } from "sonner";

/*
 * Prerequisite: the app root must render Eluan's <Toast /> exactly once, inside
 * EluanProvider, or toast() has nowhere to appear:
 *
 *   <EluanProvider defaultTheme="minimal">
 *     {children}
 *     <Toast />
 *   </EluanProvider>
 *
 * Don't mount <Toast /> here or on any page: every mounted toaster shows every
 * toast, so a second mount shows each one twice.
 */

export interface SettingsFormProps {
  /**
   * The settings fields. Give each control a `name` if you want its value in the
   * FormData passed to `onSave`; controlled fields can ignore it.
   *
   * Use this for settings submitted together. On/off settings that apply
   * immediately should be Switches with no Save button.
   */
  children: ReactNode;
  /** Persists the settings. Resolve on success, reject on failure. */
  onSave: (data: FormData) => Promise<void>;
}

const formLayout = {
  display: "flex",
  flexDirection: "column",
  gap: "var(--spacing-lg)",
} as const;

const actionsLayout = {
  display: "flex",
  justifyContent: "flex-end",
  gap: "var(--spacing-sm)",
} as const;

export default function SettingsForm({ children, onSave }: SettingsFormProps) {
  const [saving, setSaving] = useState(false);
  const [saveFailed, setSaveFailed] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving) return;

    // Read the form before awaiting; React clears currentTarget after dispatch.
    const data = new FormData(event.currentTarget);

    setSaving(true);
    setSaveFailed(false);
    try {
      await onSave(data);
      // Transient, non-blocking confirmation. The fixed id makes repeated saves
      // refresh one toast instead of stacking identical copies.
      toast("Settings saved", { id: "settings-saved" });
    } catch {
      // The user has to act on a failed save, so it stays on screen as an inline
      // alert at the top of the form rather than a toast that disappears.
      setSaveFailed(true);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={formLayout}>
      {saveFailed && (
        <Banner variant="destructive" position="inline" role="alert">
          We couldn't save your settings. Check your connection and try again.
        </Banner>
      )}

      {children}

      <div style={actionsLayout}>
        <Button type="submit" disabled={saving} aria-busy={saving}>
          {saving && <Spinner size="sm" aria-hidden="true" />}
          {saving ? "Saving…" : "Save changes"}
        </Button>
      </div>
    </form>
  );
}
