---
name: FileInput
use_when: The user attaches one or more files from their device, such as a receipt, an avatar or a CSV to import.
instead_of: a bare native file input; ImageInput or DocumentInput (same module) when only images or only documents are allowed.
source: packages/core/src/components/file-input.tsx
---

# FileInput

## 1. Overview

FileInput lets the user pick files with a button or by drag and drop, then lists what they picked with a remove control per file. It is controlled: it shows whatever is in `value` and reports every change through `onValueChange`. It has two variants, a compact button and a dropzone. The module also exports `ImageInput`, `DocumentInput`, `formatFileSize` and `getFileType`.

## 2. When to use

- Attaching a file to a form: a receipt, a contract, a profile photo.
- Importing data from a file, such as a CSV or spreadsheet.
- Uploading several files at once, with drag and drop (`variant="dropzone"`).
- Only images or only office documents: use `ImageInput` or `DocumentInput` from this module, which preset `accept`.

### When not to use

- Showing upload progress → FileInput has none; compose [Progress](./progress.md) under it, as the WithProgress story does.
- A link to a file hosted elsewhere → use [Input](./input.md) with `type="url"`.
- Pasting the text of a file → use [Textarea](./textarea.md).

## 3. Anatomy

`variant="default"`:

1. **Native input**: a visually hidden `<input type="file">`. It receives `id`, `name`, `accept`, `aria-*` and the ref.
2. **Choose button**: a field-style button (`--interactive-bg`, `--interactive-border-alt` border, `--size-lg` tall) with an upload icon and the fixed label "Choose file", or "Choose files" when `maxFiles` is more than 1.
3. **Preview chips**: one pill per file (`--container-bg-alt`, `--container-border`) with a file icon, the truncated name and a remove button. With `showPreview={false}`, a "N files selected" count replaces them.
4. **Error**: a `role="alert"` line in `--destructive-fg` under the control.

`variant="dropzone"`:

1. **Dropzone**: a `<div role="button">` with a dashed 2px `--interactive-border-alt` border and `--curves-lg` corners, holding an upload icon, `dragInactiveText` (or `dragActiveText` while dragging), and hints for `maxSize` ("Max file size: 5 MB") and `maxFiles` ("Max 5 files").
2. **Preview rows**: one bordered row per file with a type icon (image, document, video, audio, archive or other), the name, the size and a remove button.
3. **Error**: as above.

## 4. Variants

| Variant | Use for |
| --- | --- |
| `default` | A file field inside a form, usually one file or a few. |
| `dropzone` | Upload and import screens, several files, and anywhere drag and drop is expected. |

<!-- REVIEW: "Use for" text drafted from what each variant renders; source and docs give no usage guidance. -->

`ImageInput` (JPEG, PNG, GIF, WebP) and `DocumentInput` (PDF, Word, Excel, plain text) take the same props and variants, with `acceptedFormats` in place of `accept`.

## 5. Sizes

FileInput has no size prop. The Choose button is `--size-lg` tall; the dropzone and preview rows fill the container's width. Set width on a wrapper.

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Default | Choose button, or dashed dropzone | |
| Hover | Choose button, dropzone and remove buttons fill with `--interactive-bg-hover`; the dropzone border doesn't change | |
| Drag over | Dropzone fills with `--interactive-bg-hover`, the upload icon turns `--action-primary-bg`, and the text switches to `dragActiveText` | Hover and drag-over share one surface on purpose. |
| Focus | The browser's own focus ring on the Choose button, the dropzone and the remove buttons | Never remove or restyle the focus ring. These controls deliberately keep the browser default, which currently meets contrast where the system outline doesn't; don't add a focus style. |
| Selected | Chips (default) or rows (dropzone) for each file in `value` | |
| Error | A `role="alert"` line: `File "name" exceeds maximum size of 5 MB` | The only built-in check is `maxSize`. The message is fixed English text. |
| Disabled | Default: the Choose button at 50% opacity. Dropzone: `--interactive-bg-disabled` fill, `--interactive-fg-disabled` text, not-allowed cursor, ignores drops, out of the Tab order | Preview remove buttons stay active while disabled. <!-- REVIEW: removeButton and removeChipButton don't receive `disabled`; not in the fix plan. --> |

## 7. Content guidelines

- `dragInactiveText` is both the dropzone's visible prompt and its accessible name. Write it as an instruction that names the kind of file: "Drop receipts here, or click to choose".
- Keep `dragActiveText` short: "Release to upload".
- Say which types and sizes are allowed in a [FormDescription](./form-label.md) under the field: "PDF, PNG or JPG, up to 10 MB each." The dropzone shows the size and count limits but never the types; the default variant shows neither.
- The Choose button's label is fixed ("Choose file" or "Choose files"), so name the field with your own label above it.

| Do | Don't |
| --- | --- |
| Drop receipts here, or click to choose | Drag & drop files here, or click to select |
| Release to upload | DROP NOW! |
| PDF, PNG or JPG, up to 10 MB each. | Supported: application/pdf, image/png |

<!-- REVIEW: content guidance drafted; defaults come from file-input.tsx and the docs demo uses "Drop files or click to upload" / "Release to add". -->

## 8. Rules

1. Control FileInput with `value` and `onValueChange`. It keeps no selection of its own; without `value`, picked files never appear.
2. Set `maxFiles` to accept more than one file (default 1). Don't pass `multiple`: at `maxFiles={1}` extra files are dropped. Above 1, new picks append to `value` and anything past `maxFiles` is dropped without a message.
3. Set `maxSize` in bytes: `10 * 1024 * 1024` for 10 MB.
4. Check file types in `onValueChange` too. `accept` only filters the browser's picker; dropped files skip it.
5. Upload from `value` yourself, for example with `FormData`. FileInput clears its native input after every pick, so a native form post sends no files and `required` never passes.
6. Put a visible [Label](./form-label.md) (`Label`) above the field. Its `htmlFor` reaches the hidden native input through `id`, not the Choose button.
7. Use `ImageInput` or `DocumentInput` for those file families, and pass MIME types in `acceptedFormats` to narrow them.
8. Never pass `className` or `style`; they're dropped. Put width on a wrapper.

## 9. Dos and don'ts

**Do:** control the value, limit count and size, and describe the allowed files.

```tsx
<div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
  <Label htmlFor="receipts">Receipts</Label>
  <FileInput
    id="receipts"
    variant="dropzone"
    value={receipts}
    onValueChange={setReceipts}
    maxFiles={5}
    maxSize={10 * 1024 * 1024}
    accept="application/pdf,image/png,image/jpeg"
    dragInactiveText="Drop receipts here, or click to choose"
  />
  <FormDescription>PDF, PNG or JPG, up to 10 MB each.</FormDescription>
</div>
```

**Don't:** leave it uncontrolled, use `multiple`, or rely on a native form post.

```tsx
<form action="/api/receipts" method="post" encType="multipart/form-data">
  <FileInput name="receipts" multiple required />
  <button type="submit">Upload</button>
</form>
```

**Do:** use the preset for images.

```tsx
<ImageInput value={photos} onValueChange={setPhotos} maxFiles={1} maxSize={2 * 1024 * 1024} />
```

**Don't:** hand-write the image MIME list on a plain FileInput.

```tsx
<FileInput value={photos} onValueChange={setPhotos} accept="image/jpeg,image/png,image/gif,image/webp" />
```

## 10. Accessibility

- Role: the default variant renders a native `button` ("Choose file") beside a visually hidden native file input. The dropzone is a `<div role="button">` named by `dragInactiveText`, with `aria-disabled` when disabled. Remove buttons are named "Remove {file name}". Errors use `role="alert"` and are announced when they appear.
- Label: a visible label above the field, tied by `htmlFor` to the hidden input's `id`. The Choose button keeps its own name.
- Keyboard: Enter or Space on the Choose button or the dropzone opens the file picker. Tab then reaches each remove button. The visually hidden native input also takes a Tab stop, with no visible focus. <!-- REVIEW: the srOnly input isn't removed from the tab order; not in the fix plan. -->
- Focus: the Choose button, the dropzone and the remove buttons show the browser's default focus ring. Don't add or change focus styles on them.
- Contrast: handled by the theme. Don't override colours.

## 11. Behaviour

- Responsive: FileInput stacks its parts in a column with a `--spacing-sm` gap. The dropzone and rows fill the container; default-variant chips wrap.
- Overflow and truncation: file names truncate with an ellipsis, at a fixed width in chips and at the row's width in dropzone rows.
- Previews: every file shows an icon, including images; there are no thumbnails. <!-- REVIEW: file-input.tsx creates object URLs for images but never renders them, and the docs describe thumbnails. Not in the fix plan. -->
- Errors: one message at a time. Picking again clears it.
- Motion: the dropzone's background and border transition over 150ms. Don't add your own.

## 12. API

<!-- api:start -->
### FileInput

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `File[]` | `[]` | The files shown in the preview. Required in practice; see Rules. |
| `onValueChange` | `(files: File[]) => void` | | Called with the full new list after a pick, drop or remove. |
| `variant` | `"default" \| "dropzone"` | `"default"` | Compact button or drag-and-drop area. |
| `maxFiles` | `number` | `1` | Maximum files kept. Above 1, picks append and the native input allows multiple. |
| `maxSize` | `number` | | Maximum size per file, in bytes. Larger files are rejected with an error. |
| `accept` | `string` | | Filters the browser's picker (`"application/pdf,image/*"`). Doesn't filter drops. |
| `showPreview` | `boolean` | `true` | Shows chips or rows for selected files; `false` shows a count (default variant) or nothing (dropzone). |
| `dragInactiveText` | `string` | `"Drag & drop files here, or click to select"` | Dropzone prompt and accessible name. |
| `dragActiveText` | `string` | `"Drop files here"` | Dropzone text while a file is dragged over it. |
| `disabled` | `boolean` | | Disables picking and dropping. |
| `...props` | `InputHTMLAttributes` without `className`, `style`, `type`, `value`, `onChange` | | Spread onto the hidden native input: `id`, `name`, `aria-*`. The ref points at it too. |

### ImageInput, DocumentInput

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `acceptedFormats` | `string[]` | ImageInput: JPEG, PNG, GIF, WebP. DocumentInput: PDF, DOC, DOCX, XLS, XLSX, TXT (as MIME types) | Joined into `accept`. |
| `...props` | `FileInputProps` without `accept` | | Every FileInput prop. |

### Helpers

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `formatFileSize` | `(bytes: number) => string` | | 1024-based size with at most one decimal, in B, KB, MB or GB: `formatFileSize(5242880)` is `"5 MB"`. |
| `getFileType` | `(file: File) => "image" \| "document" \| "video" \| "audio" \| "archive" \| "other"` | | The file family from its MIME type, as used for the dropzone icons. Exported with the `FileType` and `FileInfo` types. |
<!-- api:end -->

`className` and `style` are omitted; Eluan components are styling-closed.

## 13. Examples

```tsx
import { useState, type FormEvent } from "react";
import { Button, FileInput, FormDescription, FormMessage, Label } from "@eluan/core";

const allowedTypes = ["application/pdf", "image/png", "image/jpeg"];

export function ReceiptUpload({ upload }: { upload: (data: FormData) => Promise<void> }) {
  const [receipts, setReceipts] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  function handleFiles(files: File[]) {
    const allowed = files.filter((file) => allowedTypes.includes(file.type));
    setError(allowed.length < files.length ? "Only PDF, PNG and JPG files can be attached." : null);
    setReceipts(allowed);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (receipts.length === 0) return setError("Attach at least one receipt.");
    const data = new FormData();
    receipts.forEach((file) => data.append("receipts", file));
    await upload(data);
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-lg)" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
        <Label htmlFor="expense-receipts">Receipts</Label>
        <FileInput
          id="expense-receipts"
          variant="dropzone"
          value={receipts}
          onValueChange={handleFiles}
          maxFiles={5}
          maxSize={10 * 1024 * 1024}
          accept={allowedTypes.join(",")}
          dragInactiveText="Drop receipts here, or click to choose"
          dragActiveText="Release to upload"
        />
        {error ? (
          <FormMessage>{error}</FormMessage>
        ) : (
          <FormDescription>PDF, PNG or JPG, up to 10 MB each.</FormDescription>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button type="submit">Submit expense</Button>
      </div>
    </form>
  );
}
```

## 14. Related components

- [Progress](./progress.md): upload progress, composed under FileInput.
- [Label](./form-label.md): `Label`, `FormDescription` and `FormMessage` around the field.
- [Button](./button.md): the form's submit action.
- See [forms](../patterns/forms.md) for field structure and errors.

## 15. Common agent mistakes

_Filled from evals._
