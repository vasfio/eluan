---
name: RichText
use_when: The user writes formatted long-form content (headings, lists, emphasis) that you store as HTML.
instead_of: Textarea for plain multi-line text; Input for a single line; CodeBlock for showing code.
source: packages/core/src/components/rich-text.tsx
---

# RichText

## 1. Overview

RichText is a WYSIWYG editor built on TipTap, with a fixed toolbar: bold, italic, strikethrough, inline code, headings 1 to 3, bulleted and numbered lists, quote, horizontal rule, undo and redo. It emits the document as an HTML string. RichTextToolbar is the same toolbar on its own, for a TipTap editor you create yourself.

## 2. When to use

- Formatted content the user writes and you store as HTML: project descriptions, release notes, announcements, knowledge-base articles.
- Comments or notes where headings, lists or emphasis matter.

### When not to use

- Plain multi-line text → use [Textarea](./textarea.md).
- A single line of text → use [Input](./input.md).
- Showing code → use [CodeBlock](./code-block.md).
- Showing stored rich content read-only → render the sanitised HTML in your own element, with [Typography](./typography.md) around it. A disabled RichText still renders the toolbar. <!-- REVIEW: drafted; source has no read-only display guidance. -->

RichText earns its place only when users need formatting and you want HTML out. It isn't built on Input and doesn't submit with a native form.

## 3. Anatomy

1. **Container**: `--interactive-bg` surface with an `--interactive-border-alt` border and `--curves-md` corners.
2. **Toolbar**: on `--container-bg-alt` with a bottom border; [Toggle](./toggle.md) buttons (`size="iconSm"`) in four groups split by toolbar [Separators](./separator.md): text marks, headings, blocks, history.
3. **Editing area**: the TipTap content region; its minimum height comes from `minHeight`.
4. **Placeholder**: `placeholder` text in `--interactive-fg-alt` while the document is empty.

## 4. Variants

No variant prop. The toolbar's buttons are fixed.

## 5. Sizes

No size prop. `minHeight` sets the editing area's minimum height (default `"150px"`); the area grows with content. Pass a `--size-*` token for a shorter area (`"var(--size-4xl)"`) or keep the default; don't pass raw px. <!-- REVIEW: drafted; no token covers editor heights above --size-4xl, and the default is a raw 150px in source. -->

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Default | Bordered container, toolbar above the editing area | |
| Focus (toolbar) | Toggle's focus outline on the focused button | Never remove or restyle the focus ring. |
| Focus (editing area) | No visible change | The content area removes its outline and the container has no focus style, so keyboard users can't see when the editor has focus. Don't patch it with your own CSS. <!-- REVIEW: source accessibility issue, not in the fix plan; rich-text.tsx sets `outline: none` on the content and ProseMirror with no replacement. --> |
| Pressed (toolbar) | Toggle's pressed style | When the selection already has that mark or block. |
| Empty | Placeholder text | |
| Disabled | `--interactive-bg-disabled` surface, `--interactive-fg-disabled` text; editor read-only, every toolbar button disabled | |

There's no error state. Show a FormMessage below the editor.

## 7. Content guidelines

- Use the placeholder for a prompt about what to write: "Describe what changed and why".
- Put the field's name in visible text above the editor, not in the placeholder.
- Toolbar labels are fixed by the component.

| Do | Don't |
| --- | --- |
| Describe what changed and why | Start typing... |
| Release notes (label above) | Release notes (placeholder only) |

<!-- REVIEW: copy guidance is drafted; source default placeholder is "Start typing...". -->

## 8. Rules

1. Sanitise the HTML before you store it or render it (for example with DOMPurify), and only pass trusted HTML to `value`. `onValueChange` emits raw, unsanitised HTML.
2. Store the HTML exactly as emitted. Don't transform it inside `onValueChange`: a `value` that differs from the editor's HTML resets the content and moves the caret. Sanitise on save or on render. <!-- REVIEW: drafted; follows from the setContent sync effect in source. -->
3. Put a visible label above the editor. RichText takes no `id` or `aria-*` props, so a Label `htmlFor` can't target it. <!-- REVIEW: source accessibility gap, not in the fix plan; the editing area has role="textbox" but no accessible name. -->
4. Don't restyle the content through internal class names such as `.eluan-rich-text-content` or `.ProseMirror`. Its typography comes from a raw CSS string the component injects. <!-- REVIEW: RichText is one of five raw-CSS escape hatches listed under W7 in the fix plan; whether that stays is an open decision. -->
5. Use RichText. Reach for RichTextToolbar only when you already create your own TipTap editor; RichText doesn't expose its editor, so you can't move its toolbar elsewhere. <!-- REVIEW: drafted; the docs site suggests RichTextToolbar can reposition RichText's toolbar, which source doesn't support. -->
6. Check emptiness on the text, not the string: an empty editor emits `<p></p>`, not `""`. <!-- REVIEW: TipTap behaviour, not Eluan source. -->
7. Never pass `className` or `style`; RichText doesn't accept them. Put width on a wrapper.

## 9. Dos and don'ts

**Do:** keep the emitted HTML and sanitise when saving.

```tsx
<RichText value={html} onValueChange={setHtml} placeholder="Describe what changed and why" />
<Button type="button" onClick={() => onSave(sanitize(html))}>Save notes</Button>
```

**Don't:** sanitise on every keystroke, or render the raw output.

```tsx
<RichText value={html} onValueChange={(next) => setHtml(sanitize(next))} />
<div dangerouslySetInnerHTML={{ __html: html }} />
```

**Do:** label the editor with visible text above it.

```tsx
<Typography variant="label" as="p">Release notes</Typography>
<RichText value={html} onValueChange={setHtml} />
```

**Don't:** restyle the content from app CSS.

```tsx
<style>{`.eluan-rich-text-content h1 { font-size: 40px; }`}</style>
```

## 10. Accessibility

- Roles: the editing area is a contenteditable `textbox` (role added by TipTap). Toolbar buttons are Toggles: `button` with `aria-pressed`.
- Labels: toolbar buttons are named "Bold", "Italic", "Strikethrough", "Code", "Heading 1" to "Heading 3", "Bullet List", "Ordered List", "Quote", "Horizontal Rule", "Undo" and "Redo". The editing area has no accessible name and RichText can't give it one (see Rules).
- Keyboard: Tab moves through each toolbar button, then into the editor; the toolbar has no `toolbar` role or arrow-key navigation. Enter or Space runs a button, and focus moves into the editor. In the editor: ⌘/Ctrl+B bold, ⌘/Ctrl+I italic, ⌘/Ctrl+Shift+S strikethrough, ⌘/Ctrl+E inline code, ⌘/Ctrl+Shift+B quote, ⌘/Ctrl+Z undo, ⌘/Ctrl+Shift+Z or ⌘/Ctrl+Y redo. Inside a list, Tab and Shift+Tab indent and outdent instead of leaving the editor. <!-- REVIEW: editor shortcuts and list Tab handling are TipTap StarterKit defaults, not Eluan source. -->
- Focus: every toolbar command returns focus to the editor. The editing area shows no focus indicator (see States).
- Contrast: handled by the theme. Don't override colours. The toolbar's focus outline token currently measures below 3:1; don't patch it per button. <!-- REVIEW: system-wide focus-ring issue, W1 in the fix plan; see foundations/colour.md. -->

## 11. Behaviour

- Responsive: fills its container's width; the toolbar wraps onto more lines when narrow.
- Overflow: the editing area grows with its content and has no maximum height.
- The toolbar renders nothing until TipTap has created the editor, which can shift layout on first render.
- `value` is synced in: when it differs from the editor's HTML, the content is replaced. `disabled` switches editing on and off live.
- Content styles: headings use `--font-size-3xl`, `--font-size-2xl` and `--font-size-xl`; lists, quotes, inline code and rules have their own spacing and borders. These come from a CSS string injected once per page.
- StarterKit also enables underline (⌘/Ctrl+U), links, code blocks and markdown-style shortcuts (for example `# ` for a heading), none of which have toolbar buttons. Expect `<u>`, `<a>` and `<pre>` in the output and allow for them when sanitising and rendering. <!-- REVIEW: from TipTap StarterKit 3.x, not Eluan source. -->
- Motion: Toggle's own transitions only. Don't add your own.

## 12. API

<!-- api:start -->
### RichText

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | | Controlled HTML. Pass only trusted or sanitised HTML. |
| `onValueChange` | `(value: string) => void` | | Fires on every edit with the editor's raw, unsanitised HTML. |
| `placeholder` | `string` | `"Start typing..."` | Shown while the document is empty. |
| `disabled` | `boolean` | `false` | Makes the editor read-only and disables the toolbar. |
| `minHeight` | `string` | `"150px"` | CSS length for the editing area's minimum height. |

Takes no other props: no `id`, `name`, `aria-*`, `className` or `style`. `ref` reaches the container `<div>`.

### RichTextToolbar

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `editor` | `Editor \| null` | | A TipTap editor instance; renders nothing while `null`. |
| `disabled` | `boolean` | `false` | Disables every button. Buttons also disable when the editor isn't editable. |
<!-- api:end -->

## 13. Examples

```tsx
import { useState } from "react";
import { Button, FormMessage, RichText, Typography } from "@eluan/core";

export function ReleaseNotesEditor({
  initialHtml,
  sanitize,
  onSave,
}: {
  initialHtml: string;
  sanitize: (html: string) => string;
  onSave: (html: string) => void;
}) {
  const [html, setHtml] = useState(initialHtml);
  const [showError, setShowError] = useState(false);
  const isEmpty = html.replace(/<[^>]*>/g, "").trim() === "";

  function handleSave() {
    if (isEmpty) return setShowError(true);
    setShowError(false);
    onSave(sanitize(html));
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
      <Typography variant="label" as="p">Release notes</Typography>
      <RichText value={html} onValueChange={setHtml} placeholder="Describe what changed and why" />
      {showError && <FormMessage>Add release notes before publishing.</FormMessage>}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button type="button" onClick={handleSave}>Save notes</Button>
      </div>
    </div>
  );
}
```

## 14. Related components

- [Textarea](./textarea.md): plain multi-line text without formatting.
- [Toggle](./toggle.md): the toolbar buttons.
- [Typography](./typography.md): visible label text, and around rendered output.
- [CodeBlock](./code-block.md): showing code rather than editing prose.
- [Forms pattern](../patterns/forms.md): errors and submit.

## 15. Common agent mistakes

_Filled from evals._
