---
name: FormLabel
use_when: Naming a form control, adding helper text under it, or showing an error or status message for one field.
instead_of: FieldsetLegend to title a group of fields; Banner for form-level or server errors; Toast for a saved confirmation; Typography for text that isn't part of a form.
source: packages/core/src/components/form-label.tsx
---

# FormLabel

## 1. Overview

`form-label.tsx` exports four parts for the text around a form control: **Label** (a `<label>` with required, optional and hint markers), **FormLabel** (the same component, marked `@deprecated` in favour of Label), **FormDescription** (helper text) and **FormMessage** (a field message, destructive by default). Import `Label`; `FormLabel` still works.

## 2. When to use

- The visible label of every form control: Input, Textarea, Select, Checkbox, each RadioGroupItem, Switch.
- Marking a field as required (`required`) or optional (`optional`).
- A short note beside the label, such as a limit (`hint`).
- Helper text under a control (FormDescription).
- An error, or a neutral status, for one field (FormMessage).

### When not to use

- A title for a group of fields → use FieldsetLegend in [Fieldset](./fieldset.md).
- Labels inside a checkbox list → use [CheckboxGroup](./checkbox-group.md); each item renders its own Label from `label`.
- An error for the whole form or a failed save → use [Banner](./banner.md) inline.
- A confirmation after saving → use [Toast](./toast.md).
- Headings and body text → use [Typography](./typography.md).

## 3. Anatomy

1. **Label row**: a flex `<div>` (baseline-aligned, `--spacing-sm` gap) around the label parts. Props and `ref` go to the inner `<label>`, not this div.
2. **Label text**: the `<label>`. `--font-size-sm`, weight 500, line height 1; colour inherits.
3. **Required marker**: a CSS-generated `*` after the text in `--destructive-fg`, when `required`.
4. **Optional tag**: "(optional)" after the label in `--interactive-fg-alt`, `--font-size-xs`, when `optional`.
5. **Hint**: your `hint` string after the label, same style as the optional tag.
6. **FormDescription**: a `<p>` in `--interactive-fg-alt`, `--font-size-sm`. Goes under the control.
7. **FormMessage**: a `<p>` at `--font-size-sm`, in `--destructive-fg` by default or `--interactive-fg-alt` with `error={false}`. Goes under the control, after any description.

## 4. Variants

| Part and prop | Use for |
| --- | --- |
| `Label` | Every field. |
| `Label required` | A field the user must fill. |
| `Label optional` | A field the user can skip, in a form where most fields are required. |
| `FormMessage` (default, `error`) | A validation error for the field. |
| `FormMessage error={false}` | A neutral status for the field, such as "Checking availability". |

<!-- REVIEW: when to mark required versus optional, and the neutral FormMessage use, are drafted; source gives no usage guidance. -->

## 5. Sizes

There's no `size` prop. Label, FormDescription and FormMessage use `--font-size-sm`; the optional tag and hint use `--font-size-xs`. All follow density.

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Default | `--font-size-sm`, weight 500, inherited colour | |
| Disabled | Label text in `--interactive-fg-disabled`, not-allowed cursor | `disabled` only styles the label. It isn't forwarded to the DOM and doesn't disable the control; set `disabled` on the control too. |
| Error | FormMessage in `--destructive-fg` | Label has no error style of its own. |

## 7. Content guidelines

- Label: a short noun phrase in sentence case, no colon: "Email", "Workspace name", "Your message".
- Don't type your own asterisk or "(optional)"; use the props.
- Hint: a few words, such as "Max 2 MB". Put anything longer in a FormDescription.
- FormDescription: one sentence of guidance: "This will be your public display name."
- FormMessage: say what's wrong and how to fix it, in plain words.

| Do | Don't |
| --- | --- |
| `<Label required>Email</Label>` | `<Label>Email *</Label>` |
| Label "Workspace name" | Label "Please enter the name of your workspace:" |
| Message "Enter an email address like jane@acme.com" | Message "Error 422" |

<!-- REVIEW: content rules drafted from the stories' labels and helper text; source has no written content guidance. -->

## 8. Rules

1. Import `Label`. `FormLabel` is the same component, marked deprecated.
2. Connect every Label to its control: `htmlFor` must match the control's `id`.
3. Set `required` on the control as well as on the Label. The asterisk is CSS only and tells assistive tech nothing.
4. Set `disabled` on the control as well as on the Label. The Label's `disabled` only greys the text.
5. Give FormDescription and FormMessage an `id` and list them in the control's `aria-describedby`; they don't connect themselves. On errors, also set `aria-invalid={true}` on the control.
6. Render FormMessage only when there's a message. It has no empty or hidden state.
7. Don't put essential guidance in `hint`. It sits outside the `<label>` and isn't linked to the control; use FormDescription instead.
8. Don't set `required` and `optional` on the same Label.
9. Never pass `className` or `style`; they're dropped.

## 9. Dos and don'ts

**Do:** wire the label, helper text and error to the control.

```tsx
<div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
  <Label htmlFor="display-name" required>Display name</Label>
  <Input
    id="display-name"
    required
    aria-invalid={true}
    aria-describedby="display-name-hint display-name-error"
  />
  <FormDescription id="display-name-hint">This will be your public display name.</FormDescription>
  <FormMessage id="display-name-error">Enter a display name</FormMessage>
</div>
```

**Don't:** hand-roll the label, asterisk and error text.

```tsx
<label style={{ fontWeight: 600 }}>Display name <span style={{ color: "red" }}>*</span></label>
<input />
<p style={{ color: "red", fontSize: 12 }}>Required</p>
```

**Do:** disable the control and its label together.

```tsx
<Label htmlFor="billing-email" disabled>Billing email</Label>
<Input id="billing-email" type="email" disabled value="billing@acme.com" />
```

**Don't:** grey the label and leave the control live.

```tsx
<Label htmlFor="billing-email" disabled>Billing email</Label>
<Input id="billing-email" type="email" />
```

## 10. Accessibility

- Role: Label renders a native `<label>`. FormDescription and FormMessage are `<p>` elements with no role.
- Label: `htmlFor` names the control, and clicking the label focuses or toggles it.
- Required: the asterisk is generated content; screen readers may skip it or read it as "star". The control's own `required` attribute is what announces it.
- Optional and hint: both render outside the `<label>`, so they're not part of the control's name and aren't announced with it. <!-- REVIEW: source oddity, not in the fix plan; "(optional)" and hint have no id to reference with aria-describedby. -->
- Messages: FormMessage isn't a live region. It's read when focus reaches a control that lists it in `aria-describedby`. After a failed submit, move focus to the first invalid field. <!-- REVIEW: focus-on-submit guidance is drafted. -->
- Focus: Label isn't focusable; clicking it moves focus to the control.
- Contrast: handled by the theme. Don't override colours.

## 11. Behaviour

- Layout: the label row is a block-level `<div>`, so Label always takes its own line. Don't put it inside a `<p>` or inline text.
- Spacing: Label adds no space below itself. Stack the label, control, description and message in a wrapper with a `--spacing-sm` gap, as the Input and Textarea stories do. <!-- REVIEW: the Label stories and the docs Fieldset example use --spacing-xs for the same gap; pick one in patterns/forms.md. -->
- Overflow: line height is 1, so long labels wrap tightly. Keep labels to one line.
- Motion: none.

## 12. API

<!-- api:start -->
### Label (and FormLabel)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `htmlFor` | `string` | | The `id` of the control this label names. |
| `required` | `boolean` | `false` | Adds a `*` after the text in `--destructive-fg`. Visual only. |
| `optional` | `boolean` | | Adds "(optional)" after the label. |
| `hint` | `string` | | Short muted text after the label. Not linked to the control. |
| `disabled` | `boolean` | `false` | Greys the label. Not forwarded to the DOM. |
| `...props` | `LabelHTMLAttributes<HTMLLabelElement>` without `className`, `style` | | Native label attributes, `id`. `ref` goes to the `<label>`. |

### FormDescription

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `...props` | `HTMLAttributes<HTMLParagraphElement>` without `className`, `style` | | `id` (reference it from `aria-describedby`), `children`. |

### FormMessage

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `error` | `boolean` | `true` | `true` colours the message `--destructive-fg`; `false` uses `--interactive-fg-alt`. |
| `...props` | `HTMLAttributes<HTMLParagraphElement>` without `className`, `style` | | `id` (reference it from `aria-describedby`), `children`. |
<!-- api:end -->

## 13. Examples

```tsx
import { Button, FormDescription, FormMessage, Input, Label, Textarea } from "@eluan/core";
import * as React from "react";

const field = { display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" } as const;

export function ProfileForm({ onSave }: { onSave: (name: string, bio: string) => void }) {
  const [name, setName] = React.useState("");
  const [bio, setBio] = React.useState("");
  const [nameError, setNameError] = React.useState<string | null>(null);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!name.trim()) {
      setNameError("Enter a display name");
      document.getElementById("profile-name")?.focus();
      return;
    }
    onSave(name, bio);
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-lg)" }}
    >
      <div style={field}>
        <Label htmlFor="profile-name" required>Display name</Label>
        <Input
          id="profile-name"
          name="displayName"
          required
          autoComplete="nickname"
          placeholder="Jane Cooper"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            setNameError(null);
          }}
          aria-invalid={nameError ? true : undefined}
          aria-describedby={nameError ? "profile-name-hint profile-name-error" : "profile-name-hint"}
        />
        <FormDescription id="profile-name-hint">This will be your public display name.</FormDescription>
        {nameError && <FormMessage id="profile-name-error">{nameError}</FormMessage>}
      </div>

      <div style={field}>
        <Label htmlFor="profile-bio" optional>Bio</Label>
        <Textarea
          id="profile-bio"
          name="bio"
          rows={3}
          maxLength={160}
          value={bio}
          onChange={(event) => setBio(event.target.value)}
          aria-describedby="profile-bio-hint"
        />
        <FormDescription id="profile-bio-hint">Up to 160 characters, shown on your profile.</FormDescription>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button type="submit">Save profile</Button>
      </div>
    </form>
  );
}
```

## 14. Related components

- [Input](./input.md) and [Textarea](./textarea.md): the text fields Label most often names.
- [Fieldset](./fieldset.md): FieldsetLegend titles a group of labelled fields.
- [CheckboxGroup](./checkbox-group.md): renders a Label for each item.
- [Banner](./banner.md): messages that apply to the whole form.
- See [../patterns/forms.md](../patterns/forms.md) for validation and error handling across a form.

## 15. Common agent mistakes

_Filled from evals._
