---
name: Toast
use_when: Briefly confirming an action that just finished, such as "Settings saved"; mount Toast once, then call toast() from sonner.
instead_of: Banner for persistent, blocking or form-level messages; FormMessage for a single field; Dialog when the user must decide.
source: packages/core/src/components/toast.tsx
---

# Toast

## 1. Overview

Toast is the Sonner toaster with Eluan's styling applied. Render `<Toast />` once near the app root, then show a toast from anywhere by calling `toast()` from the `sonner` package. `@eluan/core` doesn't re-export `toast()`. Toasts are transient: they stack in a corner of the screen and close on their own after a few seconds.

```bash
pnpm add sonner
```

## 2. When to use

- Confirming an action that succeeded, especially when the result isn't visible where the user is: "Settings saved", "Invite sent".
- Offering a short undo after a reversible action, with an `action` button.
- Reporting the outcome of background work with `toast.promise()`.

### When not to use

- A form submit failed or the server rejected it → use [Banner](./banner.md) `variant="destructive"` `position="inline"` with `role="alert"`, at the top of the form.
- An account or page notice that must stay visible (trial ending, maintenance tonight) → use [Banner](./banner.md) `position="top"`.
- One field is invalid → use FormMessage from [Label](./form-label.md), under the field.
- The user must decide before continuing → use [Dialog](./dialog.md).
- The status of an item (Active, Failed) → use [Badge](./badge.md).
- Something is loading in place → use [Spinner](./spinner.md) or [Skeleton](./skeleton.md).

## 3. Anatomy

1. **Toaster**: the `<Toast />` mount. A fixed region at one corner of the viewport that stacks toasts.
2. **Toast**: one notification card. Neutral surface for `toast()`, tone surface for typed toasts.
3. **Icon**: Sonner's built-in icon for `success`, `info`, `warning`, `error` and `loading` toasts.
4. **Title**: the first argument to `toast()`.
5. **Description** (optional): the `description` option, under the title.
6. **Action** (optional): `action: { label, onClick }`, a trailing button in primary colours.
7. **Cancel** (optional): `cancel: { label, onClick }`, a trailing button in ghost colours.

## 4. Variants

`<Toast />` has no variant prop. Pick the look per call:

| Call | Looks like | Use for |
| --- | --- | --- |
| `toast()` | `--container-bg-alt` surface | Routine confirmation: "Settings saved". |
| `toast.success()` | `--positive-*` surface | A success worth emphasising: "Payment received". |
| `toast.info()` | `--informative-*` surface | A neutral heads-up about something that just happened. |
| `toast.warning()` | `--cautionary-*` surface | A completed action with a caveat: "Saved, but 2 rows were skipped". |
| `toast.error()` | `--destructive-*` surface | A background failure the user doesn't have to fix here: "Couldn't sync, retrying". |
| `toast.promise()` | Loading, then success or error | Async work the user started and keeps working through. |

<!-- REVIEW: "Use for" text is drafted; source and docs list the calls but give no guidance on choosing between them. Errors the user must act on belong in a Banner, per patterns/feedback.md. -->

## 5. Sizes

Toast has no size prop. The global stylesheet sets the text to `--font-size-sm`, padding to `--spacing-md` and corners to `--curves-md`. Width comes from Sonner.

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Default | Card in the corner set by `position` | Closes after 4 seconds (Sonner's default `duration`). The description is muted twice (a grey colour plus 80% opacity) and stays grey on tone surfaces; keep the essential words in the title and don't recolour it. <!-- REVIEW: W7 in the fix plan; globals.css sets both the description colour and opacity 0.8. --> |
| Hover | The stack expands and the timer pauses | Also pauses while the user interacts with a toast or the tab is hidden. |
| Focus | Sonner's own focus shadow on the toast and its buttons | Never remove or restyle the focus ring. |
| Loading | Sonner's spinner in the icon slot | `toast.loading()` or the loading step of `toast.promise()`. |
| Error | `--destructive-*` surface | `toast.error()`, or the error step of `toast.promise()`. |

## 7. Content guidelines

- Title: say what happened, in the past tense, in two to four words: "Settings saved", "Invite sent".
- Description: optional, one line that adds a useful detail: "We'll notify you when they accept."
- Action label: one verb for the one thing the user can do: "Undo", "View".
- Use sentence case. No exclamation marks.

| Do | Don't |
| --- | --- |
| Settings saved | Success! |
| Invite sent to Dana Lee | Your request has been processed successfully |
| Project archived, with an Undo action | Are you sure? (a toast can't ask a question) |

<!-- REVIEW: copy guidance drafted; source examples mix "Saved." and "Successfully saved!". -->

## 8. Rules

1. Mount exactly one `<Toast />`, near the app root. Sonner sends every `toast()` call to every mounted toaster, so a second mount shows each toast twice.
2. Import `toast` from `"sonner"` and add `sonner` to your own dependencies. Under pnpm, the copy inside `@eluan/core` isn't resolvable from your code. Keep it in the same range as `@eluan/core` (`^2.0.7`) so only one copy is installed. <!-- REVIEW: toast() and the toaster share Sonner's module-level store (per the docs demo comment); two installed copies would not see each other. Inferred, not tested. -->
3. Use a toast only for transient, non-blocking confirmation. Never put an error the user must act on in a toast; use an inline [Banner](./banner.md).
4. Don't pass `className`, `style` or `toastOptions` to `<Toast />`. They're spread last and replace Eluan's class hooks, so toasts lose their token styling. Set per-toast options in the `toast()` call, and the toaster-wide timeout with the top-level `duration` prop.
5. Don't make a toast the only place important information appears. It disappears; if a message must stay until dismissed, use a Banner instead of `duration: Infinity`.
6. Show one toast per event. Don't also show a Banner for the same thing.

## 9. Dos and don'ts

**Do:** mount once, then confirm a successful save.

```tsx
// Root layout
<EluanProvider defaultTheme="minimal">
  {children}
  <Toast />
</EluanProvider>

// Anywhere
toast("Settings saved");
```

**Don't:** mount a toaster per page or report a failed form submit with a toast.

```tsx
<SettingsPage>
  <Toast />
</SettingsPage>

toast.error("Couldn't save. Check the highlighted fields.");
```

**Do:** offer undo for a reversible action.

```tsx
toast("Project archived", {
  action: { label: "Undo", onClick: () => restoreProject(projectId) },
});
```

**Don't:** restyle the toaster through props.

```tsx
<Toast className="my-toasts" toastOptions={{ duration: 8000 }} />
```

## 10. Accessibility

- Role: Sonner renders the toaster as a `<section>` live region (`aria-live="polite"`) holding a list; each toast is a list item that can take focus.
- Label: the region is named "Notifications alt+T" (from `containerAriaLabel` and `hotkey`). New toasts are announced politely; they don't interrupt.
- Keyboard: Alt+T moves focus into the toasts and expands the stack; Tab reaches each toast and its action and cancel buttons; Escape collapses the stack.
- Focus: a new toast never takes focus. When focus leaves the toaster, Sonner returns it to the element that had it before.
- Timing: the timer pauses on hover, while the stack is expanded and while the tab is hidden. Keep toasts short enough to read in the default 4 seconds; anything longer belongs in a Banner.
- Contrast: handled by the theme. Don't override colours. Toast focus indicators come from Sonner's stylesheet, not Eluan tokens.

## 11. Behaviour

- Position: bottom right by default; set `position` once on `<Toast />` (`"top-right"`, `"bottom-center"` and so on).
- Stacking: up to three toasts show at once (`visibleToasts`); older ones collapse behind the front toast until hovered.
- Responsive: below 600px wide, toasts span the width of the screen.
- Overflow and truncation: long words break anywhere; text wraps. Keep titles short instead.
- Motion: toasts slide in and out and can be swiped away. Sonner turns its transitions off under `prefers-reduced-motion`. Don't add your own.
- Styling lives entirely in `@eluan/core/styles.css` (raw CSS keyed on Sonner's data attributes), so that stylesheet must be imported at the app entry.
- `closeButton` renders Sonner's own close button, which Eluan's stylesheet doesn't theme. <!-- REVIEW: source issue, not in the fix plan; globals.css has no rule for the close button and toast.tsx sets no closeButton class. -->

## 12. API

`Toast` takes Sonner's `ToasterProps`. Unlike other Eluan components its type doesn't omit `className` and `style`, but passing them (or `toastOptions`) removes Eluan's styling; see Rules.

<!-- api:start -->
### Toast

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `position` | `"top-left" \| "top-center" \| "top-right" \| "bottom-left" \| "bottom-center" \| "bottom-right"` | `"bottom-right"` | Corner the toasts stack in. |
| `duration` | `number` | `4000` | Milliseconds before each toast closes. |
| `visibleToasts` | `number` | `3` | How many toasts show before older ones collapse. |
| `expand` | `boolean` | `false` | Shows the stack expanded instead of collapsed. |
| `closeButton` | `boolean` | `false` | Adds Sonner's close button to every toast (not themed). |
| `hotkey` | `string[]` | `["altKey", "KeyT"]` | Keys that move focus to the toasts. |
| `containerAriaLabel` | `string` | `"Notifications"` | Accessible name of the toast region. |
| `offset` | `string \| number \| object` | Sonner default | Distance from the viewport edges. |
| `...props` | Sonner `ToasterProps` | | `dir`, `gap`, `icons`, `swipeDirections`, `mobileOffset`. Don't pass `className`, `style` or `toastOptions`. |

### toast() options

Second argument to `toast()`, `toast.success()` and the other calls, imported from `"sonner"`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `description` | `ReactNode` | | One line under the title. |
| `action` | `{ label: ReactNode; onClick: (event) => void }` | | Trailing primary button, such as Undo. |
| `cancel` | `{ label: ReactNode; onClick: (event) => void }` | | Trailing ghost button. |
| `duration` | `number` | Toaster's `duration` | Milliseconds for this toast. |
| `id` | `string \| number` | generated | Reuse an id to update a toast in place. |
| `onDismiss` | `(toast) => void` | | Called when the user dismisses the toast. |
| `onAutoClose` | `(toast) => void` | | Called when the timer closes the toast. |
<!-- api:end -->

## 13. Examples

```tsx
import { useState } from "react";
import { Banner, Button, EluanProvider, Label, Switch, Toast } from "@eluan/core";
import { toast } from "sonner";

export function App({ children }: { children: React.ReactNode }) {
  return (
    <EluanProvider defaultTheme="minimal">
      {children}
      <Toast />
    </EluanProvider>
  );
}

export function NotificationSettingsForm({ save }: { save: () => Promise<void> }) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError(false);
    try {
      await save();
      toast("Settings saved");
    } catch {
      setError(true);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-lg)" }}>
      {error && (
        <Banner variant="destructive" position="inline" role="alert">
          We couldn't save your settings. Check your connection and try again.
        </Banner>
      )}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--spacing-md)" }}>
        <Label htmlFor="weekly-digest">Weekly digest email</Label>
        <Switch id="weekly-digest" name="weeklyDigest" defaultChecked />
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "var(--spacing-sm)" }}>
        <Button type="submit" disabled={saving} aria-busy={saving}>
          {saving ? "Saving…" : "Save changes"}
        </Button>
      </div>
    </form>
  );
}
```

## 14. Related components

- [Banner](./banner.md): persistent, blocking or form-level messages.
- [Label](./form-label.md): FormMessage for an error on one field.
- [Dialog](./dialog.md): when the user has to decide.
- [Badge](./badge.md): status on an item, not a message.
- [Spinner](./spinner.md): in-place loading feedback.
- See [patterns/feedback.md](../patterns/feedback.md) for choosing between them.

## 15. Common agent mistakes

_Filled from evals._
