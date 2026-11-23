---
name: PasswordInput
use_when: The user types a password, with an optional strength meter and requirement checklist when they create one.
instead_of: Input for any other single-line text; InputOTP for one-time codes; EmailInput for the username field.
source: packages/core/src/components/password-input.tsx
---

# PasswordInput

## 1. Overview

PasswordInput is an [Input](./input.md) with `type="password"`, which gives it a lock icon and a show/hide toggle. With `showStrengthIndicator` it adds a strength bar, a Weak/Medium/Strong label, a checklist of requirements and a polite live region that announces the strength.

## 2. When to use

- Creating or changing a password, with `showStrengthIndicator` and requirements that match your password policy.
- Signing in, without the indicator.
- Any passphrase the user should be able to reveal while typing.

### When not to use

- Any other single-line text → use [Input](./input.md).
- A one-time or verification code → use [InputOTP](./input-otp.md).
- The account identifier next to the password → use [EmailInput](./email-input.md).

PasswordInput earns its place through the strength indicator. `<Input type="password">` already draws the same lock icon and show/hide toggle, so on a sign-in form either renders the same field.

## 3. Anatomy

1. **Field**: Input's surface around a native `<input type="password">`.
2. **Leading icon**: Input's lock icon, added automatically.
3. **Visibility toggle**: an eye button at the trailing edge, from Input. It switches the field between password and text.
4. **Strength bar** (with `showStrengthIndicator`): a small [Progress](./progress.md) whose tone follows the strength.
5. **Strength label**: "Weak", "Medium" or "Strong" beside the bar.
6. **Requirements checklist**: a two-column list. Each row shows a check in `--positive-fg` when met or a cross in `--interactive-fg-alt` when not.
7. **Live region**: visually hidden; announces "Password strength: …".

The strength block (4 to 6) appears below the field once it has a value.

## 4. Variants

No variant prop. `showStrengthIndicator` adds the strength block; `strengthRequirements` chooses which checklist rows appear and how the score is computed.

## 5. Sizes

No size prop. The field is `--size-lg` tall, from Input, and follows density.

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Default | `--interactive-bg` surface, `--interactive-border-alt` border, icon and placeholder in `--interactive-fg-alt` | |
| Focus | Border and 1px outline in `--focus-ring`, 1px offset | Never remove or restyle the focus ring. The visibility toggle is a separate Tab stop. |
| Revealed | Text visible, eye-off icon, toggle `aria-pressed="true"` | Stays revealed until toggled back; blur and submit don't reset it. |
| Disabled | `--interactive-bg-disabled` surface, `--interactive-fg-disabled` text | The visibility toggle stays enabled and clickable. <!-- REVIEW: source oddity, not in the fix plan; input.tsx renders the toggle without `disabled`. --> |
| Weak / Medium / Strong | Label text, bar in `--destructive-fg`, `--cautionary-fg` or `--positive-fg` | The bar renders full-width at every strength, so its length means nothing. Rely on the label and checklist; don't restyle or replace the bar. <!-- REVIEW: known source bug, W2 #1 in the fix plan; progress.tsx spreads the tone onto the track as well as the indicator. Fixing Progress fixes this. --> |
| Error (`aria-invalid`) | `--destructive-border` border and focus outline | Set it yourself when validation fails, with a FormMessage. |

## 7. Content guidelines

- Label the field "Password", or "New password" and "Current password" on change-password forms.
- Write requirements in your own validation message in the same words the checklist uses ("8+ characters", "Number").
- Don't put the policy in the placeholder; the checklist shows it.

| Do | Don't |
| --- | --- |
| New password | Enter a secure password |
| Use at least 12 characters | Password does not meet requirements |
| Current password | Old pw |

<!-- REVIEW: copy guidance is drafted; source fixes the checklist and label wording but gives no other content rules. -->

## 8. Rules

1. Give the field a visible [Label](./form-label.md) tied with `htmlFor` and `id`.
2. Set `autoComplete="current-password"` on sign-in and `autoComplete="new-password"` when creating or changing a password.
3. Show the strength indicator only where the user creates a password. <!-- REVIEW: drafted convention. -->
4. Set `strengthRequirements` to match the policy you enforce on submit. The checklist shows only what you configure.
5. Don't treat `onStrengthChange("strong")` as "valid". Strong means four of five checks pass, and requirements you switch off count as met. Check your own rules on submit.
6. Don't add an eye button or lock icon; Input already renders both.
7. Never pass `className` or `style`; they're dropped. Put width on a wrapper.

## 9. Dos and don'ts

**Do:** show the indicator on a new-password field with your real policy.

```tsx
<PasswordInput
  id="new-password"
  name="newPassword"
  autoComplete="new-password"
  showStrengthIndicator
  strengthRequirements={{ minLength: 12, requireSpecialChars: false }}
/>
```

**Don't:** show a strength meter on sign-in, or build your own toggle.

```tsx
<div style={{ position: "relative" }}>
  <PasswordInput autoComplete="current-password" showStrengthIndicator />
  <button onClick={reveal}><Eye /></button>
</div>
```

**Do:** validate against your own rules.

```tsx
const meetsPolicy = password.length >= 12 && /[0-9]/.test(password);
```

**Don't:** gate submit on the strength bucket.

```tsx
<Button disabled={strength !== "strong"}>Create account</Button>
```

## 10. Accessibility

- Role: password fields have no ARIA role; screen readers announce a protected text field. The visibility toggle is a `button`.
- Label: a Label tied by `htmlFor`/`id`. The toggle is named "Show password" or "Hide password" and carries `aria-pressed`.
- Keyboard: standard text input. Tab moves from the field to the toggle; Enter or Space toggles visibility.
- Focus: focus stays on the toggle after toggling. The field and toggle both show the system outline on `:focus-visible`.
- Strength: a `role="status"` polite live region announces "Password strength: Weak", "Medium" or "Strong" as it changes. Each checklist row carries hidden "(met)" or "(not met)" text. The strength block isn't linked to the field with `aria-describedby`.
- Contrast: handled by the theme. Don't override colours.

## 11. Behaviour

- Layout: a column with the field on top and the strength block below, filling the container's width. The checklist is a two-column grid.
- The strength block appears when the field has a value and disappears when it's cleared.
- Scoring: five checks, each passing or failing: at least `minLength` characters (default 8), an uppercase letter, a lowercase letter, a digit, and one of `!@#$%^&*(),.?":{}|<>`. The score is the share that pass: below 40% is Weak, below 80% Medium, otherwise Strong.
- A requirement you turn off is skipped in the checklist but still counts as passed, so fewer requirements read Strong sooner. With only a length rule, any non-empty value reads Strong. <!-- REVIEW: source oddity, not in the fix plan; calculateStrength scores disabled checks as true. -->
- `onStrengthChange` fires on every change while the field has a value, not only when the bucket changes.
- Motion: the bar animates its fill over 300ms; the field's colours transition over 150ms. Don't add your own.

## 12. API

<!-- api:start -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `showStrengthIndicator` | `boolean` | `false` | Shows the strength bar, label, checklist and live region below the field. |
| `strengthRequirements` | `{ minLength?: number; requireUppercase?: boolean; requireLowercase?: boolean; requireNumbers?: boolean; requireSpecialChars?: boolean }` | `{ minLength: 8 }`, every `require*` `true` | Which checks appear in the checklist and count toward the score. Doesn't set the native `minLength` attribute. |
| `onStrengthChange` | `(strength: "weak" \| "medium" \| "strong") => void` | | Fires on every change while the field has a value. |
| `onChange` | `ChangeEventHandler<HTMLInputElement>` | | Native change event; read the value here. |
| `...props` | `InputHTMLAttributes` without `className`, `style`, `size`, `type` | | Native input attributes: `id`, `name`, `value`, `autoComplete`, `required`, `disabled`, `aria-*`. `ref` reaches the `<input>`. |
<!-- api:end -->

Input's own props (`icon`, `trailing`, `validationTone`, `size`) aren't part of PasswordInput's props.

## 13. Examples

```tsx
import { useState, type FormEvent } from "react";
import { Button, Label, FormMessage, PasswordInput } from "@eluan/core";

export function ChangePasswordForm({ onSave }: { onSave: (current: string, next: string) => void }) {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const meetsPolicy = next.length >= 12 && /[0-9]/.test(next) && /[A-Z]/.test(next) && /[a-z]/.test(next);
  const showError = submitted && !meetsPolicy;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    if (meetsPolicy) onSave(current, next);
  }

  const field = { display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" } as const;

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-lg)" }}>
      <div style={field}>
        <Label htmlFor="current-password" required>Current password</Label>
        <PasswordInput
          id="current-password"
          name="currentPassword"
          autoComplete="current-password"
          value={current}
          onChange={(event) => setCurrent(event.target.value)}
        />
      </div>
      <div style={field}>
        <Label htmlFor="new-password" required>New password</Label>
        <PasswordInput
          id="new-password"
          name="newPassword"
          autoComplete="new-password"
          value={next}
          onChange={(event) => setNext(event.target.value)}
          showStrengthIndicator
          strengthRequirements={{ minLength: 12, requireSpecialChars: false }}
          aria-invalid={showError}
          aria-describedby={showError ? "new-password-error" : undefined}
        />
        {showError && (
          <FormMessage id="new-password-error">
            Use at least 12 characters with an uppercase letter, a lowercase letter and a number.
          </FormMessage>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button type="submit">Update password</Button>
      </div>
    </form>
  );
}
```

## 14. Related components

- [Input](./input.md): the base field; `type="password"` provides the icon and toggle.
- [Progress](./progress.md): the strength bar.
- [EmailInput](./email-input.md): the usual partner on sign-in and sign-up forms.
- [InputOTP](./input-otp.md): one-time codes, not passwords.
- [Forms pattern](../patterns/forms.md): field structure, validation timing and error placement.

## 15. Common agent mistakes

_Filled from evals._
