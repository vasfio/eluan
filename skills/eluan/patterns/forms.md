---
name: forms
---

# Forms

## When this applies

Any task that collects input: sign-up and sign-in, settings, filters, checkout, create and edit flows. The router sends "Collect input from the user" here.

## Choosing components

| Situation | Use | Not |
| --- | --- | --- |
| Short free text | [Input](../components/input.md) | Textarea: one line is expected |
| Long free text | [Textarea](../components/textarea.md) | Input: it won't wrap |
| Email, password, phone, number, money, card | [EmailInput](../components/email-input.md), [PasswordInput](../components/password-input.md), [PhoneInput](../components/phone-input.md), [NumberInput](../components/number-input.md), [DecimalInput](../components/decimal-input.md), [CreditCardInput](../components/credit-card-input.md) | Input with your own validation or masking |
| One choice from a short visible list | [RadioGroup](../components/radio-group.md) | Select: hides options that fit on screen |
| One choice from a long list | [Select](../components/select.md) | RadioGroup: too tall |
| Several choices | [CheckboxGroup](../components/checkbox-group.md), or [MultiSelect](../components/multi-select.md) for long lists | several Switches |
| One yes/no submitted with the form (accept terms) | [Checkbox](../components/checkbox.md) | Switch: implies an immediate effect |
| An on/off setting that applies immediately | [Switch](../components/switch.md) | Checkbox plus a Save button |
| A date, range or time | [DatePicker](../components/date-picker.md) and its siblings | Input with `type="date"` |
| A value on a continuous range | [Slider](../components/slider.md) | NumberInput, unless exact values matter |
| A one-time code | [InputOTP](../components/input-otp.md) | six Inputs |
| A file | [FileInput](../components/file-input.md) | a bare `<input type="file">` |
| A label, hint or error for a field | [Label](../components/form-label.md), FormDescription, FormMessage | Typography or a plain `<p>` |
| A group of related fields | [Fieldset](../components/fieldset.md) with FieldsetLegend | a Card with a heading |
| Submit and cancel | [Button](../components/button.md) | links or styled divs |
| An error for the whole form (server rejected it) | [Banner](../components/banner.md) `variant="destructive"` `position="inline"` at the top of the form | a Toast: it disappears and isn't tied to the form |

<!-- REVIEW: Switch vs Checkbox (immediate vs submitted) and RadioGroup vs Select by list length are drafted conventions; the source states neither. -->

## Structure

1. Optional form-level Banner at the top, shown only after a failed submit.
2. Fields in one column, in the order the user thinks about them. Each field is a stack: Label, the control, then FormDescription or FormMessage. (`FormLabel` is a deprecated alias of `Label`.)
3. Related fields grouped in a Fieldset with a FieldsetLegend.
4. Actions last, in a row aligned to the end: secondary (`outline`) first, the one primary (`default`) last.

Spacing: stack fields with `gap: var(--spacing-lg)` (the gap Fieldset uses between its children). Inside a field, keep the label, control and message in a stack with `gap: var(--spacing-sm)`. Separate fieldsets with `--spacing-2xl`. <!-- REVIEW: no component sets the label-to-control gap; --spacing-sm and the fieldset-to-fieldset gap are drafted. -->

## Rules

1. Give every control a visible Label tied by `htmlFor` and `id`. Use `aria-label` only where a visible label would be redundant (a search field in a toolbar). DatePicker, DateTimePicker, TimeInput, MultiSelect, InputOTP and Slider can't all be tied to a Label this way; follow the labelling workaround in each component's file. <!-- REVIEW: source gap; these controls don't accept id or aria-* on their focusable element. -->
2. Mark required fields with Label `required`, or mark the few optional ones with `optional`. Pick one convention per form.
3. Show a field error with FormMessage under the field. Set `aria-invalid` on the control (plus `validationTone="destructive"` on a plain Input, the only one that accepts it), and point `aria-describedby` at the FormMessage `id`.
4. Validate on submit and on blur, not on every keystroke. Keep the error until the value is fixed.
5. Show a form-level error in an inline destructive Banner with `role="alert"`, above the fields. Never use a Toast for an error that blocks the user.
6. Use one primary Button per form. Give it `type="submit"`; give every other button `type="button"`.
7. Use `autoComplete` attributes on identity fields (`email`, `new-password`, `current-password`, `name`).
8. Don't disable the submit button to signal invalid input. Let the user submit and show the errors. <!-- REVIEW: drafted convention; no source. -->
9. Settings with Switches save immediately; don't add a Save button for them. Confirm with a Toast if the change isn't visible.
10. Never build your own input chrome, error colours or required asterisks. The components already draw them.

## Example

```tsx
import { useState, type FormEvent } from "react";
import {
  Banner,
  Button,
  Checkbox,
  EmailInput,
  FormMessage,
  Label,
  Input,
  PasswordInput,
} from "@eluan/core";

export function SignupForm({ onSubmit }: { onSubmit: (data: FormData) => Promise<string | null> }) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [termsError, setTermsError] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (!data.get("terms")) return setTermsError(true);
    setTermsError(false);
    setServerError(await onSubmit(data));
  }

  const field = { display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" } as const;

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-lg)" }}>
      {serverError && (
        <Banner variant="destructive" position="inline" role="alert">
          {serverError}
        </Banner>
      )}

      <div style={field}>
        <Label htmlFor="name" required>Name</Label>
        <Input id="name" name="name" autoComplete="name" required />
      </div>

      <div style={field}>
        <Label htmlFor="email" required>Email</Label>
        <EmailInput id="email" name="email" autoComplete="email" required />
      </div>

      <div style={field}>
        <Label htmlFor="password" required>Password</Label>
        <PasswordInput id="password" name="password" autoComplete="new-password" required />
      </div>

      <div style={field}>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-sm)" }}>
          <Checkbox id="terms" name="terms" aria-invalid={termsError} aria-describedby={termsError ? "terms-error" : undefined} />
          <Label htmlFor="terms">I agree to the terms of service</Label>
        </div>
        {termsError && <FormMessage id="terms-error">Accept the terms to create an account.</FormMessage>}
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button type="submit">Create account</Button>
      </div>
    </form>
  );
}
```

## Dos and don'ts

**Do:** tie each label, control and error together with `htmlFor`, `id` and `aria-describedby`.

**Don't:** use placeholder text as the only label.

**Do:** put a server error in an inline destructive Banner at the top of the form.

**Don't:** report it with a Toast that disappears.

**Do:** use a Switch for a setting that takes effect at once.

**Don't:** use a Switch for a choice that only applies after Submit; use a Checkbox.

## Common agent mistakes

_Filled from evals._
