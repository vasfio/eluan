---
name: Textarea
use_when: The user writes free text that can run past one line: a message, description, note or comment.
instead_of: Input for single-line values; RichText when the text needs formatting such as bold, lists or links.
source: packages/core/src/components/textarea.tsx
---

# Textarea

## 1. Overview

Textarea is a multi-line text field. It renders a native `<textarea>` at full width with a minimum height, keeps the browser's resize handle, and takes only native textarea attributes.

## 2. When to use

- Messages, descriptions, notes, comments and feedback.
- Any free-text answer that may need more than one line.

### When not to use

- A single-line value (name, title, URL) → use [Input](./input.md).
- Text that needs formatting, headings, lists or links → use [RichText](./rich-text.md).
- One value from a known set → use [Select](./select.md) or [RadioGroup](./radio-group.md).

## 3. Anatomy

1. **Field**: the native `<textarea>`. `--container-bg` fill, 1px `--interactive-border-alt` border, `--curves-md` radius, `--spacing-sm` block and `--spacing-md` inline padding.
2. **Placeholder** (optional): text in `--interactive-fg-alt`.
3. **Resize handle**: the browser's own. Source sets no `resize` rule, so users can drag the field larger.

## 4. Variants

Textarea has no `variant` prop and no validation tone. It always draws the same field.

## 5. Sizes

Textarea has no `size` prop. Width fills the container; the starting height comes from the native `rows` attribute, with a minimum of 80px. Text is `--font-size-base` on narrow screens and `--font-size-sm` from a 768px viewport up. <!-- REVIEW: open design question ("Decide before coding" in the fix plan): Textarea is the only field whose text shrinks as the screen grows, and the values never reach the iOS 16px no-zoom threshold. Don't override the font size meanwhile. -->

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Default | `--container-bg` fill, `--interactive-border-alt` border | Text colour isn't set, so it inherits from the parent. <!-- REVIEW: W5 latent drift; textarea.tsx restates Input's surface with --container-bg and no text colour. No visible difference in the default theme. Don't set color on a wrapper to compensate. --> |
| Focus | 1px outline in `--focus-ring`, 1px offset; the border doesn't change | Never remove or restyle the focus ring. |
| Disabled | `--interactive-bg-disabled` fill, `--interactive-fg-disabled` text, not-allowed cursor | Set `disabled` on the Label too. |
| Error | No error style: `aria-invalid` changes nothing visually | Set `aria-invalid={true}` for assistive tech and show a FormMessage under the field. <!-- REVIEW: unlike Input, textarea.tsx has no [aria-invalid] border; not in the fix plan. --> |

There's no hover style.

## 7. Content guidelines

- Label the field with what to write: "Your message", "Describe the issue".
- Use the placeholder for a prompt or example, not for instructions the user needs while typing.
- Say where the text goes in a FormDescription: "Your message will be copied to the support team."
- State any length limit in the FormDescription before the user hits it.

| Do | Don't |
| --- | --- |
| Label "Describe the issue", description "Include the steps that led to it." | Placeholder "Describe the issue, include steps, max 500 characters" with no label |
| Description "Up to 500 characters." | Silently cutting text off at the limit |

<!-- REVIEW: content rules drafted from the stories' label and helper-text pattern; source has no written content guidance. -->

## 8. Rules

1. Give every Textarea a visible Label whose `htmlFor` matches its `id`, or `aria-label` when there's no visible label.
2. Read the value with the native `onChange` event. Textarea has no `onValueChange`.
3. Set the starting height with `rows`; it passes straight to the native element.
4. Show errors with a FormMessage linked by `aria-describedby`, plus `aria-invalid={true}`. Don't fake a red border; Textarea has none.
5. Don't override the font size or colours.
6. Never pass `className` or `style`; they're dropped. Set width on a wrapper.

## 9. Dos and don'ts

**Do:** label the field and link its helper text.

```tsx
<div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
  <Label htmlFor="support-message">Your message</Label>
  <Textarea id="support-message" rows={5} aria-describedby="support-message-hint" />
  <FormDescription id="support-message-hint">
    Your message will be copied to the support team.
  </FormDescription>
</div>
```

**Don't:** rely on the placeholder alone.

```tsx
<Textarea placeholder="Your message (it will be copied to support)" />
```

**Do:** show an error with FormMessage.

```tsx
<Textarea id="cancel-reason" aria-invalid={true} aria-describedby="cancel-reason-error" />
<FormMessage id="cancel-reason-error">Tell us why you're cancelling</FormMessage>
```

**Don't:** draw your own error border around it.

```tsx
<div style={{ border: "1px solid red", borderRadius: 8 }}>
  <Textarea />
</div>
```

## 10. Accessibility

- Role: `textbox` (native `<textarea>`, multi-line).
- Label: a Label with `htmlFor` matching the Textarea `id`, or `aria-label`. Link helper text and errors with `aria-describedby`. <!-- REVIEW: wiring is drafted; no Eluan component connects them automatically. -->
- Keyboard: native text editing. Enter inserts a new line; it doesn't submit the form. Tab leaves the field.
- Focus: visible outline on `:focus-visible`. Disabled fields use the native `disabled` attribute and are skipped by Tab.
- Contrast: handled by the theme. Don't override colours.

## 11. Behaviour

- Responsive: `width: 100%`; constrain it with a wrapper. The font size steps down at 768px (see Sizes).
- Overflow and truncation: text wraps and scrolls vertically once it passes the field's height. The field doesn't grow with its content.
- Resize: users can drag the browser's handle to enlarge the field.
- Motion: none.

## 12. API

<!-- api:start -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `rows` | `number` | browser default | Visible lines. The 80px minimum height still applies. |
| `value` | `string` | | Controlled value. |
| `defaultValue` | `string` | | Uncontrolled starting value. |
| `onChange` | `ChangeEventHandler<HTMLTextAreaElement>` | | Native change event. |
| `placeholder` | `string` | | Prompt or example text. |
| `maxLength` | `number` | | Native character limit. |
| `disabled` | `boolean` | `false` | Disables the field. |
| `...props` | `ComponentProps<"textarea">` without `className`, `style` | | Native attributes: `id`, `name`, `required`, `readOnly`, `aria-*`. `ref` goes to the `<textarea>`. |
<!-- api:end -->

## 13. Examples

```tsx
import { Button, FormDescription, FormMessage, Label, Textarea } from "@eluan/core";
import * as React from "react";

const MAX_LENGTH = 500;

export function FeedbackForm({ onSend }: { onSend: (message: string) => void }) {
  const [message, setMessage] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!message.trim()) {
      setError("Write a message before sending");
      return;
    }
    onSend(message);
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-lg)" }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
        <Label htmlFor="feedback" required>Your feedback</Label>
        <Textarea
          id="feedback"
          name="feedback"
          rows={6}
          required
          maxLength={MAX_LENGTH}
          placeholder="What worked, and what got in your way?"
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
            setError(null);
          }}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "feedback-hint feedback-error" : "feedback-hint"}
        />
        <FormDescription id="feedback-hint">
          {message.length} of {MAX_LENGTH} characters. Our product team reads every message.
        </FormDescription>
        {error && <FormMessage id="feedback-error">{error}</FormMessage>}
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button type="submit">Send feedback</Button>
      </div>
    </form>
  );
}
```

## 14. Related components

- [Input](./input.md): the single-line field.
- [Label](./form-label.md): Label, FormDescription and FormMessage around the field.
- [RichText](./rich-text.md): an editor for formatted text.
- [Fieldset](./fieldset.md): groups the field with related ones.
- See [../patterns/forms.md](../patterns/forms.md) for form layout and validation.

## 15. Common agent mistakes

_Filled from evals._
