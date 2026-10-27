---
name: EmailInput
use_when: The user types an email address, with optional inline format feedback once they leave the field.
instead_of: Input for any other single-line text; PasswordInput, PhoneInput or SearchInput for those field types.
source: packages/core/src/components/email-input.tsx
---

# EmailInput

## 1. Overview

EmailInput is an [Input](./input.md) with `type="email"`, so it shows Input's mail icon and the email keyboard on mobile. With `showValidation` it checks the value against a basic `name@domain.tld` pattern and, after the user first leaves the field, shows a check or alert icon and tints the border.

## 2. When to use

- Any field that collects an email address: sign-up, sign-in, invites, contact and checkout forms.
- When you want format feedback before submit (`showValidation`), or a validity flag for your own logic (`onValidationChange`).

### When not to use

- Any other single-line text → use [Input](./input.md).
- A password → use [PasswordInput](./password-input.md). A phone number → use [PhoneInput](./phone-input.md). A search query → use [SearchInput](./search-input.md).
- Several addresses in one field → use [Textarea](./textarea.md) and split them yourself, or [MultiSelect](./multi-select.md) to pick existing people. <!-- REVIEW: drafted; source has no guidance for multiple addresses. -->

EmailInput earns its place through `showValidation`. Without it, it renders the same field as `<Input type="email">`. The check is a format pattern only: it doesn't look up domains or catch typos like `gmial.com`.

## 3. Anatomy

1. **Field**: Input's surface around a native `<input type="email">`.
2. **Leading icon**: Input's mail icon, added automatically for `type="email"`.
3. **Status icon** (with `showValidation`): a check in `--positive-fg` or an alert in `--destructive-fg` at the trailing edge. It appears after the first blur, and only while the field has a value.

## 4. Variants

No variant prop. `showValidation` turns on the status icon and the positive or destructive border; without it the field looks like a plain Input.

## 5. Sizes

No size prop. The field is `--size-lg` tall, from Input, and follows density.

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Default | `--interactive-bg` surface, `--interactive-border-alt` border, icon and placeholder in `--interactive-fg-alt` | |
| Focus | Border and 1px outline in `--interactive-border`, 1px offset | Never remove or restyle the focus ring. |
| Disabled | `--interactive-bg-disabled` surface, `--interactive-fg-disabled` text, not-allowed cursor | |
| Valid (`showValidation`) | `--positive-fg` border, check icon | After the first blur; updates live as the user keeps typing. |
| Invalid (`showValidation`) | `--destructive-fg` border, alert icon | Same timing. Visual only: the icon is `aria-hidden` and EmailInput doesn't set `aria-invalid`. |
| Error (`aria-invalid`) | `--destructive-border` border and focus outline | Set it yourself when validation fails, with a FormMessage. |

## 7. Content guidelines

- Label the field "Email" or "Work email". Don't use the placeholder as the label.
- If you use a placeholder, make it an example address: "you@company.com".
- Write errors that say how to fix the value: "Enter an email like name@company.com".

| Do | Don't |
| --- | --- |
| Email | Enter your email address here |
| you@company.com (placeholder) | Email (placeholder instead of a label) |
| Enter an email like name@company.com | Invalid input |

<!-- REVIEW: copy guidance is drafted; source has no content rules for this component. -->

## 8. Rules

1. Give the field a visible [Label](./form-label.md) tied with `htmlFor` and `id`.
2. Set `name` and `autoComplete="email"`.
3. Treat `showValidation` as a hint. Validate on submit as well; the pattern accepts many addresses that can't receive mail.
4. When the address is invalid, set `aria-invalid` and show a FormMessage linked with `aria-describedby`. The status icon isn't announced.
5. Read the value from `onChange`. Use `onValidationChange` only for validity; it fires on every change and reports `false` for an empty field.
6. Don't pass `icon`, `trailing` or `validationTone`. They aren't EmailInput props; `showValidation` owns the trailing slot and the border tone.
7. Never pass `className` or `style`; they're dropped. Put width on a wrapper.

## 9. Dos and don'ts

**Do:** label the field, keep the hint, and announce the error.

```tsx
<div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
  <Label htmlFor="invite-email" required>Email</Label>
  <EmailInput
    id="invite-email"
    name="email"
    autoComplete="email"
    showValidation
    onValidationChange={setIsValid}
    aria-invalid={showError}
    aria-describedby={showError ? "invite-email-error" : undefined}
  />
  {showError && <FormMessage id="invite-email-error">Enter an email like name@company.com</FormMessage>}
</div>
```

**Don't:** use the placeholder as the label or add a second icon.

```tsx
<EmailInput placeholder="Email" icon={<Mail />} />
```

**Do:** let EmailInput draw its own status.

```tsx
<EmailInput id="billing-email" name="billingEmail" showValidation />
```

**Don't:** recolour the border or add your own check icon.

```tsx
<div style={{ border: "1px solid green" }}>
  <EmailInput id="billing-email" />
  <CheckCircle2 />
</div>
```

## 10. Accessibility

- Role: `textbox` (native `<input type="email">`).
- Label: a Label tied by `htmlFor`/`id`; `aria-label` only where a visible label would be redundant.
- Keyboard: standard text input. Tab moves focus in and out.
- Focus: native focus; visible outline on `:focus-visible`.
- Validation: the status icons are `aria-hidden`, and EmailInput sets no `aria-invalid` and has no live region, so assistive tech isn't told about format errors. Set `aria-invalid` and link a FormMessage yourself.
- Contrast: handled by the theme. Don't override colours. The focus outline token currently measures below 3:1, and focus swaps the border to a lighter token than at rest; don't patch either per field. <!-- REVIEW: system-wide focus-ring issue, W1 in the fix plan; see foundations/colour.md. -->

## 11. Behaviour

- Responsive: fills its container's width. Constrain it with a wrapper.
- Validation timing: the pattern runs on every change. The icon and border appear only after the field has been blurred once and has a value; from then on they update as the user types.
- A `value` or `defaultValue` set in code isn't checked until the user edits the field.
- Motion: border and colour transitions over 150ms, from Input. Don't add your own.

## 12. API

<!-- api:start -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `showValidation` | `boolean` | `false` | Shows the check or alert icon and tints the border after the first blur. |
| `onValidationChange` | `(isValid: boolean) => void` | | Fires on every change with the pattern result; `false` when the field is empty. |
| `onChange` | `ChangeEventHandler<HTMLInputElement>` | | Native change event; read the value here. |
| `onBlur` | `FocusEventHandler<HTMLInputElement>` | | Native blur event; EmailInput also marks the field as touched. |
| `...props` | `InputHTMLAttributes` without `className`, `style`, `size`, `type` | | Native input attributes: `id`, `name`, `value`, `placeholder`, `autoComplete`, `required`, `disabled`, `aria-*`. `ref` reaches the `<input>`. |
<!-- api:end -->

Input's own props (`icon`, `trailing`, `validationTone`, `size`, `attachment`, `textStyle`) aren't part of EmailInput's props.

## 13. Examples

```tsx
import { useState, type FormEvent } from "react";
import { Button, EmailInput, Label, FormMessage } from "@eluan/core";

export function InviteTeammateForm({ onInvite }: { onInvite: (email: string) => void }) {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const showError = submitted && !isValid;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    if (isValid) onInvite(email);
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-lg)" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
        <Label htmlFor="invite-email" required>Work email</Label>
        <EmailInput
          id="invite-email"
          name="email"
          autoComplete="email"
          placeholder="name@company.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          showValidation
          onValidationChange={setIsValid}
          aria-invalid={showError}
          aria-describedby={showError ? "invite-email-error" : undefined}
        />
        {showError && (
          <FormMessage id="invite-email-error">Enter an email like name@company.com</FormMessage>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button type="submit">Send invite</Button>
      </div>
    </form>
  );
}
```

## 14. Related components

- [Input](./input.md): the base field EmailInput wraps.
- [Label](./form-label.md): the label, and FormMessage for the error.
- [PasswordInput](./password-input.md): the usual partner on sign-in and sign-up forms.
- [Forms pattern](../patterns/forms.md): field structure, validation timing and error placement.

## 15. Common agent mistakes

_Filled from evals._
