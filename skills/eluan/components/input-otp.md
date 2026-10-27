---
name: InputOTP
use_when: The user enters a short numeric one-time code from an email, text message or authenticator app.
instead_of: Input for codes with letters; PasswordInput for a password or chosen PIN; NumberInput for quantities.
source: packages/core/src/components/input-otp.tsx
---

# InputOTP

## 1. Overview

InputOTP renders a row of single-digit inputs for a numeric one-time code. It moves focus forward as the user types and back on Backspace, fills every slot from a paste, and calls `onComplete` once all slots hold a digit. It draws its own slots: you pass `length`, not children.

## 2. When to use

- Two-factor and sign-in verification codes.
- Confirming an email address or phone number with a code.
- Any numeric code of a fixed length, most often 4 or 6 digits (the default is 6).

### When not to use

- Codes with letters (recovery codes, invite codes, coupons) → use [Input](./input.md). InputOTP accepts digits only.
- A password or a PIN the user chooses → use [PasswordInput](./password-input.md).
- Long structured numbers (card, phone) → use [CreditCardInput](./credit-card-input.md) or [PhoneInput](./phone-input.md).
- A number that's a quantity → use [NumberInput](./number-input.md).

## 3. Anatomy

1. **Root**: a `<div role="group">` named "One-time passcode" unless you name it. Slots sit in a row with a `--spacing-sm` gap.
2. **Slot**: one `<input>` per digit, `--size-lg` wide and `--size-xl` tall, with centred `--font-size-lg` text at weight 600. Each is named "Digit N of M".
3. **Divider**: a hyphen InputOTP adds in the middle when `length` is more than 3 (after slot 3 of 6, slot 2 of 4).
4. **InputOTPGroup**, **InputOTPSlot**, **InputOTPSeparator**: separate presentational parts. InputOTP drops any children, so these parts never connect to its state. Using them means writing every value change, focus move and paste yourself. <!-- REVIEW: stories and the docs page show these parts as InputOTP children, but input-otp.tsx renders its own inputs and ignores children, so those samples render the default six slots. Not in the fix plan. -->

## 4. Variants

InputOTP has no variants. `mask` renders every slot as a password field.

## 5. Sizes

InputOTP has no size prop. Slots are fixed at `--size-lg` by `--size-xl` and follow density; `length` sets how many there are.

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Default | Each slot: `--interactive-bg` fill, 1px `--interactive-border-alt` border | |
| Focus | 1px outline in `--interactive-border`, 1px offset; the border switches to `--interactive-border`; the slot's digit is selected | Never remove or restyle the focus ring. The border gets lighter on focus, not darker. <!-- REVIEW: W1 in the fix plan (rest→focus border swap goes fainter in input-otp.tsx). --> |
| Filled | The slot fills with `--interactive-bg-alt` | |
| Masked | Dots instead of digits | Set `mask`. |
| Disabled | `--interactive-bg-disabled` fill, `--interactive-fg-disabled` text, not-allowed cursor | `disabled` disables every slot. |
| Error | No built-in error style | Show a [FormMessage](./form-label.md) under the slots and point `aria-describedby` on InputOTP at it. <!-- REVIEW: composition drafted; InputOTP has no error prop. --> |

## 7. Content guidelines

- Label the field "Verification code" or "Sign-in code".
- Under it, say where the code went and how long it is: "Enter the 6-digit code we sent to your email."
- Offer a way to get a new code next to the field ("Resend code"), as a link-style Button.

| Do | Don't |
| --- | --- |
| Verification code | OTP |
| Enter the 6-digit code we sent to your email. | Enter code |
| Resend code | Didn't get it? Click here! |

<!-- REVIEW: content guidance drafted; the WithLabel story shows a label and "Enter the 6-digit code sent to your email." -->

## 8. Rules

1. Set the slot count with `length`. Never pass children or `maxLength`; InputOTP ignores both.
2. Name the group after your visible label: give the label an `id` and pass it as `aria-labelledby`. `htmlFor` can't target a group.
3. Read the code from `onComplete` (fires when every slot is filled) or `onValueChange` (fires on every change).
4. InputOTP is uncontrolled. `value` and `defaultValue` don't set the slots. To clear the slots after a wrong code, remount it with a new `key`. <!-- REVIEW: key-remount reset is drafted; source has no reset API. -->
5. Submit the code yourself. The slots have no `name`, and a `name` on InputOTP lands on the group `<div>`, so a native form receives nothing.
6. Use the InputOTPGroup, InputOTPSlot and InputOTPSeparator parts only for a layout InputOTP can't draw, and own all state when you do.
7. Never pass `className` or `style`. Put layout on a wrapper.

## 9. Dos and don'ts

**Do:** set `length`, name the group from a visible label, and verify on completion.

```tsx
<div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
  <Label id="code-label">Verification code</Label>
  <InputOTP length={6} aria-labelledby="code-label" onComplete={verify} />
</div>
```

**Don't:** compose slots as children or use `maxLength`; they're ignored and six default slots render.

```tsx
<InputOTP maxLength={4}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
  </InputOTPGroup>
</InputOTP>
```

**Do:** reset after a wrong code by remounting.

```tsx
<InputOTP key={attempt} length={6} aria-labelledby="code-label" onComplete={verify} />
```

**Don't:** try to clear it through `value`.

```tsx
<InputOTP value={code} length={6} onComplete={verify} />
```

## 10. Accessibility

- Role: the root is a `group`, named "One-time passcode" unless you pass `aria-label` or `aria-labelledby`. Each slot is a text input with `inputMode="numeric"` and `autoComplete="one-time-code"`, named "Digit N of M".
- Label: `aria-labelledby` on InputOTP pointing at your visible label, or `aria-label`.
- Keyboard: typing a digit fills the slot and moves to the next; other characters are ignored. Backspace clears the slot, or the previous one when the slot is empty, and moves back. Left and Right arrows move between slots. Tab and Shift+Tab also step through every slot.
- Paste: pasting fills from the first slot, whichever slot has focus, ignoring non-digits, then focuses the slot after the last pasted digit (or the last slot when the code fills them all).
- Focus: `autoFocus` focuses the first slot on mount. Focusing a slot selects its digit, so typing replaces it. Disabled slots use the native `disabled` attribute and are skipped.
- Contrast: handled by the theme. Don't override colours. The focus outline token currently measures below 3:1; don't patch it per slot. <!-- REVIEW: system-wide focus-ring contrast issue (W1), see foundations/colour.md. -->

## 11. Behaviour

- Responsive: slots sit in one row and don't wrap. Six slots and the divider fit a phone width.
- Value: `onValueChange` sends the digits joined with nothing between them. Empty slots are skipped, so check the length before using it.
- Length changes: growing `length` keeps the digits already entered; shrinking it drops the tail.
- Motion: slot colours transition over 150ms. InputOTPSlot's optional fake caret blinks and stops under reduced motion. Don't add your own.

## 12. API

<!-- api:start -->
### InputOTP

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `length` | `number` | `6` | Number of digit slots. |
| `onValueChange` | `(value: string) => void` | | Called on every change with the entered digits. |
| `onComplete` | `(value: string) => void` | | Called when every slot holds a digit. |
| `mask` | `boolean` | `false` | Renders slots as password fields. |
| `autoFocus` | `boolean` | `false` | Focuses the first slot on mount. |
| `disabled` | `boolean` | | Disables every slot. |
| `...props` | `InputHTMLAttributes` without `className`, `style`, `onChange` | | Spread onto the root group `<div>`: `aria-label`, `aria-labelledby`, `aria-describedby` and `id` work; `value`, `defaultValue`, `name`, `maxLength` and `placeholder` do nothing. |

### InputOTPSlot

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `index` | `number` | | Required by the type but unused. |
| `char` | `string` | | Character drawn in the slot. |
| `isActive` | `boolean` | | Draws the focused outline. |
| `hasFakeCaret` | `boolean` | | Draws a blinking caret. |
| `...props` | `InputHTMLAttributes` without `className`, `style` | | Spread onto the slot's transparent `<input>`. |

### InputOTPGroup

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `...props` | `HTMLAttributes<HTMLDivElement>` without `className`, `style` | | A row wrapper for slots. |

### InputOTPSeparator

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `...props` | `HTMLAttributes<HTMLDivElement>` | | Renders `role="separator"` with a dot icon. Its type doesn't omit `className` and `style`; don't pass them anyway. <!-- REVIEW: the only part whose props aren't styling-closed; not in the fix plan. --> |
<!-- api:end -->

`className` and `style` are omitted from InputOTP, InputOTPSlot and InputOTPGroup; Eluan components are styling-closed.

## 13. Examples

```tsx
import { useState } from "react";
import { Button, FormDescription, FormMessage, InputOTP, Label } from "@eluan/core";

export function VerifyEmailCode({
  email,
  verify,
  resend,
}: {
  email: string;
  verify: (code: string) => Promise<boolean>;
  resend: () => void;
}) {
  const [attempt, setAttempt] = useState(0);
  const [error, setError] = useState(false);

  async function handleComplete(code: string) {
    const ok = await verify(code);
    setError(!ok);
    if (!ok) setAttempt((n) => n + 1);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
      <Label id="verify-code-label">Verification code</Label>
      <InputOTP
        key={attempt}
        length={6}
        autoFocus
        aria-labelledby="verify-code-label"
        aria-describedby={error ? "verify-code-error" : "verify-code-hint"}
        onComplete={handleComplete}
      />
      {error ? (
        <FormMessage id="verify-code-error">That code didn't match. Try again.</FormMessage>
      ) : (
        <FormDescription id="verify-code-hint">Enter the 6-digit code we sent to {email}.</FormDescription>
      )}
      <div>
        <Button type="button" variant="link" onClick={resend}>
          Resend code
        </Button>
      </div>
    </div>
  );
}
```

## 14. Related components

- [Input](./input.md): codes with letters, and any free text.
- [PasswordInput](./password-input.md): passwords and chosen PINs.
- [Label](./form-label.md): `Label`, `FormDescription` and `FormMessage` around the slots.
- [Button](./button.md): the resend action, `variant="link"`.
- See [forms](../patterns/forms.md) for field structure and errors.

## 15. Common agent mistakes

_Filled from evals._
