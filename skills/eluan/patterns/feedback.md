---
name: feedback
---

# Feedback

## When this applies

Telling the user that something happened, is happening, or needs their attention: a save succeeded, a request failed, a trial is ending, a page is loading. The router sends "Tell the user something happened" here.

## Choosing components

| Situation | Use | Not |
| --- | --- | --- |
| An action succeeded and the result may not be visible (settings saved, invite sent) | [Toast](../components/toast.md) via `toast()` from `sonner` | Banner: stays on screen after it stops being news |
| A field is invalid | FormMessage from [form-label.md](../components/form-label.md), under the field | Toast or Banner: not tied to the field |
| The whole form failed (server rejected it) | [Banner](../components/banner.md) `variant="destructive"` `position="inline"` `role="alert"`, at the top of the form | Toast: disappears before the user can act |
| Something persistent about the account or page (trial ends in 3 days, maintenance tonight) | Banner `position="top"` with `variant="caution"` or `"informative"` and `role="status"` | Toast: transient; Dialog: blocks for no reason |
| A blocking problem the user must resolve before continuing | Banner `variant="destructive"` with an `action` Button | Toast |
| The user must decide before an irreversible action | [Dialog](../components/dialog.md) | a Banner or Toast asking for confirmation |
| Status of an item (Active, Draft, Failed) | [Badge](../components/badge.md) | Banner: it isn't a message |
| Work in progress, short and in place | [Spinner](../components/spinner.md) | a custom animation |
| Content loading into a known layout | [Skeleton](../components/skeleton.md) | Spinner in the middle of an empty page |
| Progress with a known amount | [Progress](../components/progress.md) | Spinner |
| Progress through a multi-step flow | [Stepper](../components/stepper.md) | Progress |

Eluan has no Alert component: inline Banner fills that role.

## Structure

- Toasts appear wherever the single `<Toast />` toaster is mounted; mount it once near the app root, inside `EluanProvider`.
- Inline Banners go at the top of the region they describe: the top of a form, or the top of a section.
- Page Banners (`position="top"`) go above the page header, full width.
- Field messages go directly under their control, inside the field stack.

## Rules

1. Use a Toast only for transient, non-blocking confirmation. Never for errors the user must act on.
2. Keep toast copy to a short past-tense headline ("Settings saved"), with an optional one-line `description`.
3. Use an inline Banner for a form-level error and a top Banner for an account- or page-level notice.
4. Set the Banner role yourself: `role="alert"` for errors and blocking messages, `role="status"` for everything else. Banner defaults to `role="banner"`, a page landmark, which is wrong for a message. <!-- REVIEW: source issue, not in the fix plan; banner.tsx hardcodes role="banner" before spreading props. -->
5. Match the Banner `variant` to the meaning: `destructive` errors, `caution` warnings, `positive` success, `informative` and `neutral` information.
6. If a Banner is `dismissible`, handle `onDismiss` and stop rendering it; the built-in button only calls your handler.
7. Never show the same message in two places (a Toast and a Banner for one event).
8. Install `sonner` as a direct dependency to call `toast()`. `@eluan/core` styles the toaster but doesn't re-export `toast()`.
9. Mount `<Toast />` once, with no `className`, `style` or `toastOptions`; those replace Eluan's toast styling.

## Example

```tsx
import { Banner, Button, Toast } from "@eluan/core";
import { toast } from "sonner";

// Once, near the root:
export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Banner variant="caution" position="top" role="status" action={<Button size="sm" variant="outline">Upgrade</Button>}>
        Your trial ends in 3 days.
      </Banner>
      {children}
      <Toast />
    </>
  );
}

// Anywhere:
export function SaveSettingsButton({ save }: { save: () => Promise<void> }) {
  return (
    <Button
      type="button"
      onClick={async () => {
        await save();
        toast("Settings saved");
      }}
    >
      Save changes
    </Button>
  );
}
```

## Dos and don'ts

**Do:** confirm a successful save with a short Toast.

**Don't:** use a Toast for a failed save the user has to fix; use an inline destructive Banner with `role="alert"`.

**Do:** put persistent account notices in a top Banner.

**Don't:** open a Dialog to deliver information that needs no decision.

## Common agent mistakes

_Filled from evals._
