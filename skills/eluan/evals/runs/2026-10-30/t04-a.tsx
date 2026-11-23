"use client";

import * as React from "react";
import { toast } from "sonner";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Switch,
  Toast,
  Typography,
} from "@eluan/core";

export interface Settings {
  displayName: string;
  emailNotifications: boolean;
}

export interface SettingsFormProps {
  /** The currently saved settings. The form starts from these values. */
  initialSettings: Settings;
  /**
   * Persists the settings. Resolve on success; throw or reject on failure.
   * The form tells the user either way. Logging and error reporting are up
   * to the caller.
   */
  onSave: (settings: Settings) => Promise<void> | void;
}

// Eluan components take no className/style (styling is closed), so layout
// goes on plain wrapper elements and reads spacing from the token scale.
const fieldStack: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "var(--spacing-lg)",
};

const field: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "var(--spacing-sm)",
};

const switchRow: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "var(--spacing-lg)",
};

const switchText: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "var(--spacing-xxs)",
};

export default function SettingsForm({
  initialSettings,
  onSave,
}: SettingsFormProps) {
  const [settings, setSettings] = React.useState<Settings>(initialSettings);
  const [isSaving, setIsSaving] = React.useState(false);

  const displayNameId = React.useId();
  const notificationsId = React.useId();
  const notificationsHintId = React.useId();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSaving) return;

    setIsSaving(true);
    try {
      await onSave({ ...settings, displayName: settings.displayName.trim() });
      toast.success("Settings saved.");
    } catch {
      toast.error("Couldn't save your settings.", {
        description: "Check your connection and try again.",
      });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>
              Manage your profile and notifications.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div style={fieldStack}>
              <div style={field}>
                <Label htmlFor={displayNameId} required>
                  Display name
                </Label>
                <Input
                  id={displayNameId}
                  name="displayName"
                  autoComplete="name"
                  required
                  value={settings.displayName}
                  onChange={(event) =>
                    setSettings((prev) => ({
                      ...prev,
                      displayName: event.target.value,
                    }))
                  }
                />
              </div>

              <div style={switchRow}>
                <div style={switchText}>
                  <Label htmlFor={notificationsId}>Email notifications</Label>
                  <Typography
                    id={notificationsHintId}
                    variant="caption"
                    tone="muted"
                  >
                    Product updates and account activity.
                  </Typography>
                </div>
                <Switch
                  id={notificationsId}
                  aria-describedby={notificationsHintId}
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) =>
                    setSettings((prev) => ({
                      ...prev,
                      emailNotifications: checked,
                    }))
                  }
                />
              </div>
            </div>
          </CardContent>

          <CardFooter>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Saving…" : "Save"}
            </Button>
          </CardFooter>
        </Card>
      </form>

      {/*
        toast() only renders where a toaster is mounted, and the app root
        currently has only EluanProvider. Eluan's docs say to mount <Toast />
        once near the root: move this there (next to EluanProvider) and delete
        it here as soon as any other screen needs toasts, or every toast will
        show twice.
      */}
      <Toast position="top-right" />
    </>
  );
}
