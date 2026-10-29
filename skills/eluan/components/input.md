---
name: Input
use_when: The user types a single line of free text: a name, title, URL, code or short answer.
instead_of: Textarea for more than one line; EmailInput, PasswordInput, SearchInput, PhoneInput or NumberInput when the value has that shape; Select or RadioGroup to pick from known options.
source: packages/core/src/components/input.tsx
---

# Input

## 1. Overview

Input is a single-line text field. It renders a native `<input>` inside a full-width wrapper, picks a leading icon from `type` (search, email, password, tel, url), takes an optional trailing element, and adds a show/hide toggle for `type="password"`.

## 2. When to use

- Free single-line text: names, titles, URLs, IDs, short answers.
- Codes, keys and tokens, with `textStyle="mono"`.
- A field that needs a custom leading icon or one trailing action that no specialised input covers.

### When not to use

- More than one line of text → use [Textarea](./textarea.md).
- An email address with validation feedback → use [EmailInput](./email-input.md).
- A new password with a strength meter → use [PasswordInput](./password-input.md).
- Search with a clear button, loading state or suggestions → use [SearchInput](./search-input.md).
- A phone number with a country code → use [PhoneInput](./phone-input.md).
- Whole numbers with steppers → use [NumberInput](./number-input.md); decimals and amounts → use [DecimalInput](./decimal-input.md).
- One value from a known list → use [Select](./select.md), or [RadioGroup](./radio-group.md) when the options should stay visible.
- Dates and times → use [DatePicker](./date-picker.md) or [TimeInput](./time-input.md).
- One-time codes → use [InputOTP](./input-otp.md). Files → use [FileInput](./file-input.md).

## 3. Anatomy

1. **Wrapper**: a full-width flex row (`position: relative`) around the parts below. It always fills its container.
2. **Leading icon** (optional): picked from `type`, or your `icon`. Sits `--spacing-md` from the left in `--interactive-fg-alt` and ignores pointer events.
3. **Field**: the native `<input>`. Carries the border, `--curves-md` radius, `--font-size-sm` text and the placeholder in `--interactive-fg-alt`.
4. **Trailing element** (optional): your `trailing` node, pinned to the right. The field reserves room for one `--size-sm` element.
5. **Password toggle**: for `type="password"` only. An eye button that swaps the field between hidden and visible text. It takes the trailing slot.

## 4. Variants

Input has no `variant` prop. These props change its look:

| Prop value | Use for |
| --- | --- |
| `validationTone="none"` | The default. |
| `validationTone="positive"` | A value that was checked and accepted (`--positive-fg` border). EmailInput sets it once a valid address is typed. |
| `validationTone="destructive"` | A value that was checked and rejected (`--destructive-fg` border). Visual only: pair it with `aria-invalid` and a FormMessage. |
| `textStyle="mono"` | Codes, keys, IDs (`--font-mono`). |
| `attachment="start"` | Drops the left border and corners so the field sits flush after a control on its left. PhoneInput uses it after its country Select. |
| `attachment="middle"` | Drops both side borders and all corners. NumberInput uses it between its stepper buttons. |

## 5. Sizes

| Size | Use in |
| --- | --- |
| `default` | Most forms (`--size-lg` tall, the same height as a default Button). |
| `lg` | Next to a `size="lg"` Button, or a single prominent field (`--size-xl` tall). Text stays `--font-size-sm`. |

<!-- REVIEW: "Use in" is drafted; source only sets the height. The docs site says size also changes text size, but input.tsx changes height only. -->

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Default | `--interactive-bg` fill, `--interactive-border-alt` border | |
| Focus | Border switches to `--focus-ring`, plus a 1px outline in `--focus-ring`, 1px offset | Never remove or restyle the focus ring. |
| Disabled | `--interactive-bg-disabled` fill, `--interactive-fg-disabled` text, not-allowed cursor | Set `disabled` on the Label too so it greys out. |
| Read-only | No distinct style | `readOnly` passes through, but nothing marks it visually. <!-- REVIEW: no read-only styling in source. --> |
| Error | `aria-invalid` gives a `--destructive-border` border. With the boolean `aria-invalid={true}`, the focus border and outline stay destructive too | Pass the boolean, not the string `"true"`: the focus style checks `=== true`. Show the message in a FormMessage. |
| Valid | `validationTone="positive"`: `--positive-fg` border, `--positive-bg-alt` focus outline | |

There's no hover style.

## 7. Content guidelines

- Always show a visible Label. Use the placeholder for an example of the expected value ("Jane Cooper"), never as the label.
- Put format help in a FormDescription under the field ("Enter your full name."), not in the placeholder.
- Write labels as short nouns in sentence case, with no colon.
- Write errors that say what to fix: "Enter a project name", not "Invalid input".

| Do | Don't |
| --- | --- |
| Label "Full name", placeholder "Jane Cooper" | Placeholder "Enter your name" with no label |
| Label "Website", placeholder "https://example.com" | Label "URL:" |
| Message "Use lowercase letters, numbers and hyphens" | Message "Invalid input" |

<!-- REVIEW: content rules drafted from the stories' label, placeholder and helper-text pattern; source has no written content guidance. -->

## 8. Rules

1. Give every Input an accessible name: a Label whose `htmlFor` matches the Input's `id`, or `aria-label` when there's no visible label.
2. Don't add an icon for `type` search, email, password, tel or url; it's automatic. Pass `icon` to replace it and `icon={false}` to remove it. `icon={null}` does not remove it. <!-- REVIEW: input.tsx resolves `icon ?? autoIcon`, so null falls back to the automatic icon. foundations/iconography.md rule 7 and phone-input.tsx (`icon={null}`) assume null removes it; one of them needs fixing. -->
3. Read the value with the native `onChange` event. Input has no `onValueChange`.
4. Mark errors with `aria-invalid={true}` and a FormMessage the Input points to with `aria-describedby`. `validationTone` alone changes only the colour.
5. Size a custom `icon` yourself: Input renders your node as is. Set its width and height to `--size-xxs` and `aria-hidden="true"`.
6. Keep `trailing` to one small element: an icon, or a Button with `size="iconXs"` and an `aria-label`. It's ignored when `type="password"`.
7. Never pass `className` or `style`; they're dropped. Input fills its container, so set width on a wrapper.

## 9. Dos and don'ts

**Do:** label the field and use the placeholder as an example.

```tsx
<div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
  <Label htmlFor="full-name">Full name</Label>
  <Input id="full-name" name="fullName" autoComplete="name" placeholder="Jane Cooper" />
</div>
```

**Don't:** use the placeholder as the only label.

```tsx
<Input placeholder="Enter your full name" />
```

**Do:** let `type` pick the icon, and remove it with `false` when you don't want it.

```tsx
<Input id="work-email" type="email" placeholder="jane@acme.com" />
<Input id="callback-number" type="tel" icon={false} placeholder="+1 415 555 0132" />
```

**Don't:** add a duplicate icon, or expect `null` to remove the automatic one.

```tsx
<Input type="email" icon={<Mail size={16} />} />
<Input type="tel" icon={null} />
```

**Do:** mark an error with the boolean and link the message.

```tsx
<Input id="project-name" aria-invalid={true} aria-describedby="project-name-error" />
<FormMessage id="project-name-error">Enter a project name</FormMessage>
```

**Don't:** rely on colour alone.

```tsx
<Input validationTone="destructive" />
<p style={{ color: "red" }}>Invalid input</p>
```

## 10. Accessibility

- Role: `textbox` for text, email, tel and url (native `<input>`); `searchbox` for `type="search"`. Password fields have no role.
- Label: a Label with `htmlFor` matching the Input `id`, or `aria-label`. The placeholder is not a label. Leading icons are `aria-hidden`.
- Description and errors: FormDescription and FormMessage are plain `<p>` elements with no wiring. Give them ids and list them in the Input's `aria-describedby`. <!-- REVIEW: wiring is drafted; no Eluan component connects them automatically. -->
- Keyboard: native text editing. The password toggle is its own Tab stop: a button labelled "Show password" or "Hide password" with `aria-pressed`.
- Focus: visible outline on `:focus-visible`. Disabled fields use the native `disabled` attribute and are skipped by Tab.
- Contrast: handled by the theme. Don't override colours.

## 11. Behaviour

- Responsive: the wrapper is `width: 100%`. Constrain the field with a wrapper you own. Height comes from `--size-*` and follows density.
- Overflow and truncation: single line; long values scroll inside the field. Leading and trailing elements reserve padding, so text never runs under them.
- Motion: colour and border transitions over 150ms. Don't add your own.
- `type="search"` hides the browser's own clear button and decoration.
- The password toggle keeps its state inside Input; you can't control it.

## 12. API

<!-- api:start -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `string` | browser default (`text`) | Native input type. `search`, `email`, `password`, `tel` and `url` add a leading icon; `password` adds the show/hide toggle. |
| `icon` | `ReactNode` | automatic from `type` | Leading icon. Replaces the automatic icon; `false` removes it. `null` and `undefined` fall back to the automatic icon. |
| `trailing` | `ReactNode` | | One small element at the right end. Ignored when `type="password"`. |
| `validationTone` | `"none" \| "positive" \| "destructive"` | `"none"` | Border and focus colour for validation feedback. Doesn't set `aria-invalid`. |
| `size` | `"default" \| "lg"` | `"default"` | Height: `--size-lg` or `--size-xl`. Replaces the native `size` attribute. |
| `attachment` | `"none" \| "start" \| "middle"` | `"none"` | Flattens the left edge (`start`) or both side edges (`middle`) to join adjacent controls. |
| `textAlign` | `"left" \| "center"` | `"left"` | Alignment of the value. |
| `textStyle` | `"default" \| "mono"` | `"default"` | `mono` sets the value in `--font-mono`. |
| `...props` | `InputHTMLAttributes` without `className`, `size`, `style` | | Native attributes: `id`, `name`, `value`, `defaultValue`, `onChange`, `onBlur`, `placeholder`, `disabled`, `readOnly`, `required`, `autoComplete`, `aria-*`. `ref` goes to the `<input>`. |
<!-- api:end -->

## 13. Examples

```tsx
import { Button, FormDescription, FormMessage, Input, Label } from "@eluan/core";
import { Copy, Globe } from "lucide-react";
import * as React from "react";

const iconSize = { width: "var(--size-xxs)", height: "var(--size-xxs)" };

export function WorkspaceFields({ apiKey }: { apiKey: string }) {
  const [slug, setSlug] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  function validate(value: string) {
    setError(/^[a-z0-9-]+$/.test(value) ? null : "Use lowercase letters, numbers and hyphens");
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-lg)" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
        <Label htmlFor="workspace-slug" required>Workspace URL</Label>
        <Input
          id="workspace-slug"
          name="slug"
          required
          textStyle="mono"
          icon={<Globe aria-hidden="true" style={iconSize} />}
          placeholder="acme-design"
          value={slug}
          onChange={(event) => setSlug(event.target.value)}
          onBlur={(event) => validate(event.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "workspace-slug-hint workspace-slug-error" : "workspace-slug-hint"}
        />
        <FormDescription id="workspace-slug-hint">
          Your workspace will live at app.acme.com/{slug || "your-team"}.
        </FormDescription>
        {error && <FormMessage id="workspace-slug-error">{error}</FormMessage>}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
        <Label htmlFor="api-key">API key</Label>
        <Input
          id="api-key"
          readOnly
          textStyle="mono"
          value={apiKey}
          trailing={
            <Button
              type="button"
              variant="ghost"
              size="iconXs"
              aria-label="Copy API key"
              onClick={() => navigator.clipboard.writeText(apiKey)}
            >
              <Copy aria-hidden="true" style={iconSize} />
            </Button>
          }
        />
      </div>
    </div>
  );
}
```

## 14. Related components

- [Label](./form-label.md): Label, FormDescription and FormMessage for every field.
- [Textarea](./textarea.md): the multi-line field.
- [EmailInput](./email-input.md), [PasswordInput](./password-input.md), [SearchInput](./search-input.md), [PhoneInput](./phone-input.md), [NumberInput](./number-input.md): Input with behaviour for one kind of value.
- [Fieldset](./fieldset.md): groups related fields under a legend.
- See [../patterns/forms.md](../patterns/forms.md) for laying out and validating whole forms.

## 15. Common agent mistakes

_Filled from evals._
