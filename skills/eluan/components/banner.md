---
name: Banner
use_when: A message must stay visible until it's resolved: a form-level error, an account or page notice, or a blocking problem.
instead_of: Toast for transient confirmation; FormMessage for a single field; Badge for an item's status; Dialog when the user must decide.
source: packages/core/src/components/banner.tsx
---

# Banner

## 1. Overview

Banner is a full-width message strip. It renders a `<div>` holding an optional leading icon, the message, an optional trailing action and an optional dismiss button. It comes in six variants and sits inline (the default) or fixed to the top or bottom of the viewport. Eluan has no Alert component; an inline Banner fills that role.

## 2. When to use

- A form submit failed or the server rejected it: `variant="destructive"`, `position="inline"`, `role="alert"`, at the top of the form.
- An account or page notice that stays relevant: "Your trial ends in 3 days." Use `position="top"` with `role="status"`.
- A blocking problem with a fix: "Payment failed" with an Update payment method action.
- A note about one section of a page, inline at the top of that section.

### When not to use

- Confirming that an action succeeded → use [Toast](./toast.md) via `toast()`.
- One field is invalid → use FormMessage from [Label](./form-label.md), under the field.
- The status of an item (Active, Draft, Failed) → use [Badge](./badge.md).
- The user must decide before an irreversible action → use [Dialog](./dialog.md).
- There's nothing to show yet → see [patterns/empty-states.md](../patterns/empty-states.md).

## 3. Anatomy

1. **Container**: the `<div>`; carries the variant colours. Inline banners get `--curves-sm` corners; every variant except `default` has a 1px border.
2. **Icon** (optional): the `icon` prop, before the message. It inherits the variant's text colour.
3. **Message**: the children. Takes the remaining width and wraps.
4. **Action** (optional): the `action` prop, after the message. Usually a small Button.
5. **Dismiss button** (optional): shown with `dismissible`. An X icon button named "Dismiss" that calls `onDismiss`.

Content sits in a row with a `--spacing-sm` gap.

## 4. Variants

| Variant | Use for |
| --- | --- |
| `informative` | Neutral information: a new version, a feature note. The default. |
| `caution` | A problem ahead: trial ending, storage nearly full, scheduled maintenance. |
| `destructive` | Errors and blocking problems: a failed form submit, a failed payment. |
| `positive` | A success that stays relevant on the page: "Domain verified." |
| `neutral` | A low-emphasis note in grey. |
| `default` | An inverse (dark) strip for an announcement without a tone. |

<!-- REVIEW: "Use for" text is drafted from each variant's styles and the docs examples (billing alerts, downtime notices, feature announcements); source gives no per-variant usage guidance. -->

## 5. Sizes

Banner has no size prop. Text is `--font-size-sm` at weight 500, with `--spacing-xs` vertical and `--spacing-sm` horizontal padding. `position` sets placement instead:

| Position | Use for |
| --- | --- |
| `inline` | Default. In the document flow, with rounded corners. Form-level and section-level messages. |
| `top` | Fixed to the top of the viewport, edge to edge, square corners. Account and page notices. |
| `bottom` | Fixed to the bottom of the viewport, edge to edge. <!-- REVIEW: no source guidance on when to use bottom over top. --> |

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Default | Variant colours | |
| Hover | Only the dismiss button changes: 60% to full opacity | |
| Focus | Dismiss button: 1px outline in the banner's text colour (`currentColor`), 1px offset, at full opacity | Never remove or restyle the focus ring. |
| Dismissed | Nothing changes on its own | The dismiss button only calls `onDismiss`. Stop rendering the Banner in that handler. |

## 7. Content guidelines

- Say what happened and what to do next, in one or two sentences: "We couldn't save your changes. Check your connection and try again."
- Lead with the consequence or the date: "Your trial ends in 3 days."
- Put the fix in `action` as a Button with a verb label: "Upgrade", "Update payment method".
- Use sentence case and end sentences with a period.

| Do | Don't |
| --- | --- |
| Your trial ends in 3 days. | Heads up!!! |
| We couldn't save your changes. Check your connection and try again. | Error 500 |
| Payment failed. Update your card to keep your workspace active. | Something went wrong. |

<!-- REVIEW: copy guidance drafted; docs and stories give examples only. -->

## 8. Rules

1. Set `role` yourself: `role="alert"` for errors and blocking messages, `role="status"` for everything else. Never leave the default `role="banner"`, which is the page-header landmark, not a message. <!-- REVIEW: source issue, not in the fix plan. banner.tsx hardcodes role="banner" before spreading props; the default should probably be "status", or "alert" for destructive. -->
2. Use `position="inline"` for form-level and section-level messages, placed at the top of the form or section they describe.
3. Use `position="top"` for account and page notices. Show one fixed Banner at a time. <!-- REVIEW: one-at-a-time drafted; two fixed banners at top: 0 would overlap. -->
4. Match `variant` to the meaning: `destructive` for errors, `caution` for warnings, `positive` for success, `informative` or `neutral` for information.
5. Pass `onDismiss` whenever you pass `dismissible`, and stop rendering the Banner in it. `dismissible` alone renders a button that does nothing.
6. Don't use a Banner for a transient confirmation (use [Toast](./toast.md)), and never show one event in both.
7. Size icons with `--size-xxs` and mark them `aria-hidden="true"`; don't use Lucide's numeric `size` prop.
8. Never pass `className` or `style`; they're dropped. Put width and margins on a wrapper.

## 9. Dos and don'ts

**Do:** show a form-level server error inline, as an alert.

```tsx
{submitError && (
  <Banner variant="destructive" position="inline" role="alert">
    We couldn't create the project. Try again in a few minutes.
  </Banner>
)}
```

**Don't:** report it with a toast, or leave the landmark role on an inline message.

```tsx
toast.error("We couldn't create the project.");

<Banner variant="destructive">We couldn't create the project.</Banner>
```

**Do:** put a page notice at the top with its fix as the action.

```tsx
<Banner
  variant="caution"
  position="top"
  role="status"
  action={<Button size="sm" variant="outline" asChild><a href="/billing">Upgrade</a></Button>}
>
  Your trial ends in 3 days.
</Banner>
```

**Don't:** make it dismissible without handling the dismissal.

```tsx
<Banner variant="caution" position="top" dismissible>
  Your trial ends in 3 days.
</Banner>
```

## 10. Accessibility

- Role: hardcoded `role="banner"` (a page landmark). Override it: `role="alert"` for errors and blocking messages (announced immediately), `role="status"` for other notices (announced politely). See Rules.
- Label: the message text. The dismiss button is named "Dismiss"; the name is fixed, so several dismissible banners share it.
- Keyboard: Tab reaches the action and the dismiss button; Enter and Space activate them. Banner has no Escape handling.
- Focus: Banner never moves focus. Render it when the event happens so the live region announces it. When the user dismisses it, the focused button unmounts; move focus to a sensible place, such as the form's first field or the page heading. <!-- REVIEW: focus-on-dismiss guidance drafted; source doesn't manage focus. -->
- The dismiss button has no padding around its `--size-xxs` icon, so its hit target is small. <!-- REVIEW: source issue, not in the fix plan; same pattern as the Dialog close button in W3. -->
- Contrast: handled by the theme. Don't override colours.

## 11. Behaviour

- Responsive: Banner is always 100% wide. Inline banners fill their container; `top` and `bottom` stretch edge to edge of the viewport.
- Overflow and truncation: the message wraps; the icon, action and dismiss button keep their size.
- Fixed banners (`top`, `bottom`) sit above page content at z-index 50 and don't reserve space, so they cover whatever is under them. Leave room in your layout. <!-- REVIEW: no source guidance on offsetting page content under a fixed banner. -->
- Motion: no enter or exit animation; the dismiss button fades its opacity over 150ms.

## 12. API

<!-- api:start -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"default" \| "informative" \| "positive" \| "caution" \| "destructive" \| "neutral"` | `"informative"` | Visual style. |
| `position` | `"inline" \| "top" \| "bottom"` | `"inline"` | In the flow, or fixed to the top or bottom of the viewport. |
| `icon` | `ReactNode` | | Leading icon. |
| `action` | `ReactNode` | | Trailing action, usually a small Button. |
| `dismissible` | `boolean` | `false` | Shows a dismiss button named "Dismiss". |
| `onDismiss` | `() => void` | | Called when the dismiss button is clicked. Unmount the Banner here. |
| `role` | `string` | `"banner"` | Always set it: `"alert"` or `"status"`. |
| `...props` | `HTMLAttributes<HTMLDivElement>` without `className`, `style` | | `id`, `aria-*`, event handlers. The ref goes to the root `<div>`. |
<!-- api:end -->

## 13. Examples

Form-level error after a failed submit:

```tsx
import { useState } from "react";
import { Banner, Button } from "@eluan/core";
import { CircleAlert } from "lucide-react";

export function CreateProjectForm({ create }: { create: () => Promise<void> }) {
  const [failed, setFailed] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setFailed(false);
    try {
      await create();
    } catch {
      setFailed(true);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-lg)" }}>
      {failed && (
        <Banner
          variant="destructive"
          position="inline"
          role="alert"
          icon={<CircleAlert aria-hidden="true" style={{ width: "var(--size-xxs)", height: "var(--size-xxs)" }} />}
        >
          We couldn't create the project. Check your connection and try again.
        </Banner>
      )}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button type="submit">Create project</Button>
      </div>
    </form>
  );
}
```

Dismissible page notice:

```tsx
import { useState } from "react";
import { Banner, Button } from "@eluan/core";

export function TrialNotice({ daysLeft }: { daysLeft: number }) {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  return (
    <Banner
      variant="caution"
      position="top"
      role="status"
      dismissible
      onDismiss={() => setOpen(false)}
      action={
        <Button asChild size="sm" variant="outline">
          <a href="/billing">Upgrade</a>
        </Button>
      }
    >
      Your trial ends in {daysLeft} days.
    </Banner>
  );
}
```

## 14. Related components

- [Toast](./toast.md): transient confirmation that closes on its own.
- [Label](./form-label.md): FormMessage for an error on one field.
- [Badge](./badge.md): status on an item, not a message.
- [Dialog](./dialog.md): when the user has to decide.
- [Button](./button.md): the `action` slot.
- See [patterns/feedback.md](../patterns/feedback.md) for choosing between them.

## 15. Common agent mistakes

_Filled from evals._
