---
name: CheckboxGroup
use_when: The user picks any number of options from a short, visible list, such as notification channels or permissions.
instead_of: RadioGroup when only one option can be chosen; MultiSelect for long or searchable lists; Switch rows for settings that apply immediately.
source: packages/core/src/components/checkbox-group.tsx
---

# CheckboxGroup

## 1. Overview

CheckboxGroup manages a list of checkboxes as one `string[]` value. Each CheckboxGroupItem renders a Checkbox with its own Label and an optional description. The group renders a `<div role="group">` and stacks items vertically or wraps them in a row.

## 2. When to use

- Choosing several options from a visible list: Email, SMS and Push notifications.
- Granting permissions: Read, Write, Admin.
- Short filters on one line, such as sizes S, M, L, with `orientation="horizontal"`.

### When not to use

- Only one option can be chosen → use [RadioGroup](./radio-group.md).
- A long or searchable list → use [MultiSelect](./multi-select.md).
- A single yes/no choice → use [Checkbox](./checkbox.md).
- Settings that apply the moment they change → use a list of [Switch](./switch.md) rows.
- A row of pressable toolbar options → use [ToggleGroup](./toggle-group.md).

## 3. Anatomy

1. **Group**: the `<div role="group">`. A grid with a `--spacing-md` gap when vertical; a wrapping row with a `--spacing-lg` gap when horizontal.
2. **Item row**: one CheckboxGroupItem. A flex row with a `--spacing-sm` gap; centred when it has no description, top-aligned when it has one.
3. **Checkbox**: a [Checkbox](./checkbox.md) with `id` defaulting to `checkbox-{value}`.
4. **Label**: a Label wired to the checkbox, from `label`. It sits in a box with a `--size-xxs` minimum height, so the label stays centred on the checkbox even when a description flows below it. This is deliberate; keep it.
5. **Description** (optional): a `<p>` from `description`, in `--interactive-fg-alt` at `--font-size-sm`. <!-- REVIEW: open design question ("Decide before coding"): the description is the same size as the label, where other descriptions drop to --font-size-xs. -->

## 4. Variants

CheckboxGroup has no variants. `orientation` sets the layout:

| Orientation | Use for |
| --- | --- |
| `vertical` (default) | Most lists, and any list with descriptions. |
| `horizontal` | A few short labels that fit on one line: S, M, L. |

<!-- REVIEW: "Use for" is drafted from the stories; source gives no usage guidance. -->

## 5. Sizes

CheckboxGroup has no `size` prop. Checkboxes are `--size-xxs` and spacing follows density.

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Default, hover, checked | As [Checkbox](./checkbox.md) | |
| Focus | Checkbox outline in `--focus-ring` | Never remove or restyle the focus ring. |
| Disabled | Checkbox disabled; label and description in `--interactive-fg-disabled`, not-allowed cursor | `disabled` on the group disables every item; on an item, only that one. |
| Checked and disabled | Reads as unchecked: the box turns pale and the check disappears into it | A locked-on item looks off. Say it in the label or description ("Required for all admins"). <!-- REVIEW: known source bug W2 #4, at its worst here; checkbox.tsx :disabled overrides the checked fill. --> |
| Error | No error style | Show a FormMessage under the group and point the group's `aria-describedby` at it. <!-- REVIEW: drafted; no error handling in source. --> |

## 7. Content guidelines

- Name the group with a visible heading: "Notify me by", "Permissions".
- Label each option with a short noun phrase: "Email notifications", "SMS notifications".
- Use the description for one sentence on what the option does: "Receive updates about your account via email."
- Keep option labels parallel in form and order them logically.

| Do | Don't |
| --- | --- |
| Email notifications | Would you like to receive email? |
| Receive updates about your account via email. | Email. |
| Read · Write · Admin | Read · Can write things · ADMIN |

<!-- REVIEW: content rules drafted from the story labels and descriptions. -->

## 8. Rules

1. Name the group: `aria-labelledby` pointing at a visible heading, or `aria-label`. `role="group"` has no name of its own.
2. Read and set the selection with `value` or `defaultValue` and `onValueChange` (a `string[]`). There's no `onChange`.
3. Give every item a unique `value`. If the same value appears in two groups on one page, pass a unique `id` to each item; the default `checkbox-{value}` ids would collide and wire labels to the wrong box.
4. Submit the array from your state. Native form data won't hold the item values: each checked item submits `"on"` under its `name`.
5. Put only CheckboxGroupItem, or a custom item built with `useCheckboxGroup`, inside the group.
6. Don't put essential information only in `description`; it isn't linked to the checkbox and isn't announced with it.
7. Never pass `className` or `style`; they're dropped.

## 9. Dos and don'ts

**Do:** name the group and control it with `onValueChange`.

```tsx
<div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
  <Typography id="notify-heading" variant="label" weight="medium">Notify me by</Typography>
  <CheckboxGroup aria-labelledby="notify-heading" value={channels} onValueChange={setChannels}>
    <CheckboxGroupItem value="email" label="Email" />
    <CheckboxGroupItem value="sms" label="SMS" />
  </CheckboxGroup>
</div>
```

**Don't:** hand-roll the list with separate Checkboxes and array logic.

```tsx
<div>
  <Checkbox onCheckedChange={(c) => setChannels(c ? [...channels, "email"] : channels.filter((v) => v !== "email"))} /> Email
  <Checkbox onCheckedChange={(c) => setChannels(c ? [...channels, "sms"] : channels.filter((v) => v !== "sms"))} /> SMS
</div>
```

**Do:** give items unique ids when two groups share values.

```tsx
<CheckboxGroup aria-label="Comment notifications">
  <CheckboxGroupItem id="comments-email" value="email" label="Email" />
</CheckboxGroup>
<CheckboxGroup aria-label="Mention notifications">
  <CheckboxGroupItem id="mentions-email" value="email" label="Email" />
</CheckboxGroup>
```

**Don't:** let two items default to the same id.

```tsx
<CheckboxGroup aria-label="Comment notifications">
  <CheckboxGroupItem value="email" label="Email" />
</CheckboxGroup>
<CheckboxGroup aria-label="Mention notifications">
  <CheckboxGroupItem value="email" label="Email" />
</CheckboxGroup>
```

## 10. Accessibility

- Role: `group` on the container; each item is a `checkbox`.
- Label: the group needs `aria-labelledby` or `aria-label`. Each checkbox is named by its `label`. The `description` has no id and isn't linked, so screen readers don't read it with the checkbox. <!-- REVIEW: source oddity, not in the fix plan. -->
- Keyboard: every checkbox is its own Tab stop. Space toggles; Enter does nothing. There's no arrow-key navigation.
- Focus: the Checkbox focus outline.
- Contrast: handled by the theme. Don't override colours.

## 11. Behaviour

- Responsive: vertical stacks items; horizontal wraps them onto new lines when they don't fit.
- Overflow and truncation: labels and descriptions wrap.
- Order: a newly checked value is appended, so the array follows click order. Sort it yourself if order matters.
- Motion: from Checkbox (150ms). Don't add your own.

## 12. API

<!-- api:start -->
### CheckboxGroup

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string[]` | | Controlled selection. Pair with `onValueChange`. |
| `defaultValue` | `string[]` | `[]` | Uncontrolled starting selection. |
| `onValueChange` | `(value: string[]) => void` | | Called with the next selection, in both modes. |
| `disabled` | `boolean` | | Disables every item. |
| `orientation` | `"vertical" \| "horizontal"` | `"vertical"` | Stack or wrap the items. |
| `...props` | `HTMLAttributes<HTMLDivElement>` without `className`, `style`, `onChange`, `defaultValue` | | `aria-labelledby`, `aria-label`, `aria-describedby`, `id`. `ref` goes to the group `<div>`. |

### CheckboxGroupItem

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | required | The value added to the group's array when checked. |
| `label` | `string` | required | Visible label, wired to the checkbox. |
| `description` | `string` | | One line of supporting text under the label. Not linked to the checkbox. |
| `disabled` | `boolean` | | Disables this item. The group's `disabled` also applies. |
| `id` | `string` | `checkbox-{value}` | The checkbox id. Set it when values repeat on a page. |
| `...props` | Checkbox props without `checked`, `onCheckedChange`, `value`, `className`, `style` | | `name`, `required`, `aria-*`, passed to the Checkbox. `ref` goes to the checkbox `<button>`. |

### useCheckboxGroup

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| returns | `{ value: string[]; onItemChange: (itemValue: string, checked: boolean) => void; disabled?: boolean }` | | Reads the nearest CheckboxGroup. Throws outside one. Use it to build a custom item. <!-- REVIEW: use case drafted; nothing in the repo calls it outside checkbox-group.tsx. --> |
<!-- api:end -->

## 13. Examples

```tsx
import { CheckboxGroup, CheckboxGroupItem, Typography } from "@eluan/core";
import * as React from "react";

export function NotificationChannels({ onChange }: { onChange: (channels: string[]) => void }) {
  const [channels, setChannels] = React.useState<string[]>(["email", "security"]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-md)" }}>
      <Typography id="channels-heading" variant="label" weight="medium">
        Notify me by
      </Typography>
      <CheckboxGroup
        aria-labelledby="channels-heading"
        value={channels}
        onValueChange={(next) => {
          setChannels(next);
          onChange(next);
        }}
      >
        <CheckboxGroupItem
          value="email"
          label="Email notifications"
          description="Receive updates about your account via email."
        />
        <CheckboxGroupItem
          value="sms"
          label="SMS notifications"
          description="Get text messages for important alerts."
        />
        <CheckboxGroupItem
          value="security"
          label="Security alerts (always on)"
          description="Required for every account. Contact your admin to change it."
          disabled
        />
      </CheckboxGroup>
    </div>
  );
}
```

## 14. Related components

- [Checkbox](./checkbox.md): the single control each item renders.
- [RadioGroup](./radio-group.md): the single-choice equivalent.
- [MultiSelect](./multi-select.md): multiple choice from a long list.
- [Fieldset](./fieldset.md): titles the group alongside related fields.
- See [../patterns/forms.md](../patterns/forms.md) for grouping and labelling options.

## 15. Common agent mistakes

_Filled from evals._
