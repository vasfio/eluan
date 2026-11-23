---
name: CodeBlock
use_when: Showing a multi-line code sample, config file or command with syntax highlighting and a copy button.
instead_of: Kbd for keyboard keys; an inline code element with the mono font for code inside a sentence; Textarea for code the user edits.
source: packages/core/src/components/code-block.tsx
---

# CodeBlock

## 1. Overview

CodeBlock shows read-only code with Prism syntax highlighting. It adds an optional header with a filename, a language switcher and a copy button, and can number and highlight lines. Code is always escaped before rendering, so untrusted strings are safe to show.

## 2. When to use

- Code samples and setup instructions in docs, onboarding or settings (API keys usage, webhooks).
- A config file or command the user copies: `.env` values, a CLI command, a JSON payload.
- The same example in several languages or package managers (`languages`).
- Pointing at specific lines in a sample (`highlightLines`).

### When not to use

- A keyboard shortcut → use [Kbd](./kbd.md).
- A short code word inside a sentence → use an inline `<code>` styled with `--font-mono`; see [typography.md](../foundations/typography.md).
- Code or text the user edits → use [Textarea](./textarea.md) or [RichText](./rich-text.md).
- Long logs or streaming output → use a [ScrollArea](./scroll-area.md) with your own mono text. <!-- REVIEW: drafted; CodeBlock has no height limit or streaming support. -->

## 3. Anatomy

1. **Container**: `--container-bg-alt` surface with a `--container-border` border and `--curves-lg` corners.
2. **Header** (shown when there's a filename, a copy button or more than one language): a row with a bottom border.
3. **Filename** (optional): muted `--font-size-xs` text at the start of the header.
4. **Language switcher** (optional): a row of small buttons, one per entry in `languages`, with the active one filled.
5. **Copy button**: at the end of the header. Shows "Copy", then "Copied" with a check for two seconds.
6. **Code area**: a horizontally scrolling `<pre><code>` in `--font-mono` at `--font-size-sm`.
7. **Line numbers** (optional): a muted gutter that isn't selected when copying text by hand.
8. **Highlighted lines** (optional): full-width rows on `--cautionary-bg-alt`.

## 4. Variants

CodeBlock has no `variant` prop. `language` picks the Prism grammar: `javascript`, `typescript`, `jsx`, `tsx`, `css`, `json`, `bash`, `python`, `java`, `go`, `rust`, `sql`, `markdown`, `yaml` or `text` (the default, no highlighting). Other languages aren't accepted; use `text`.

Syntax colours come from the package stylesheet, not theme tokens: a One Dark palette in dim and dark modes and a darker One Light palette in light mode. A custom theme doesn't change them.

## 5. Sizes

CodeBlock has no size prop. Code uses `--font-size-sm`; it fills its parent's width and grows to fit every line.

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Default | Highlighted code on the alt surface | |
| Hover | Copy button gets `--interactive-bg-hover`; inactive language buttons darken | |
| Focus | The browser's default focus ring on the copy and language buttons | They declare no focus style. Never remove or restyle the focus ring. |
| Copied | Check icon and "Copied" for two seconds | Not announced to screen readers (see Accessibility). |
| Active language | Filled with `--interactive-bg-selected` | |

## 7. Content guidelines

- Show complete, runnable snippets. Don't leave placeholders like `foo` or `...` in code users will copy.
- Set `filename` when the code belongs in a file ("next.config.ts"); leave it off for commands.
- Keep one command per block when users copy them one at a time.
- Label language variants the way users name them: "pnpm", "npm", "TypeScript", "Python".
- Don't put a prompt character (`$`) in commands; it gets copied. <!-- REVIEW: content guidance drafted; source gives no copy rules. -->

| Do | Don't |
| --- | --- |
| `pnpm add @eluan/core` | `$ pnpm add @eluan/core` |
| `filename="next.config.ts"` | `filename="Code"` |
| Label: TypeScript | Label: ts |

## 8. Rules

1. Set `language` on every block that isn't plain text; the default is `text`, with no highlighting.
2. With `languages`, still pass `code` (it's required by the type but ignored); pass the first variant's code. <!-- REVIEW: API oddity; code is required even when languages is set, and the story passes code="". -->
3. Pass code as a string. Never pre-highlight it or pass HTML; CodeBlock escapes it.
4. Turn on `showLineNumbers` when the surrounding text refers to line numbers or you use `highlightLines`.
5. `highlightLines` counts from 1.
6. Keep `showCopyButton` on (the default) for anything users run or paste.
7. Never pass `className` or `style`; they're dropped. Constrain width with a wrapper.

## 9. Dos and don'ts

**Do:** set the language and filename.

```tsx
<CodeBlock language="json" filename="package.json" code={`{\n  "name": "acme-dashboard",\n  "private": true\n}`} />
```

**Don't:** rely on the default `text` language or pass HTML.

```tsx
<CodeBlock code={`<span class="token keyword">const</span> port = 3000;`} />
```

**Do:** offer package-manager variants in one block.

```tsx
<CodeBlock
  code="pnpm add @eluan/core @eluan/tokens"
  languages={[
    { language: "bash", code: "pnpm add @eluan/core @eluan/tokens", label: "pnpm" },
    { language: "bash", code: "npm install @eluan/core @eluan/tokens", label: "npm" },
  ]}
/>
```

**Don't:** stack near-identical blocks.

```tsx
<CodeBlock language="bash" code="pnpm add @eluan/core @eluan/tokens" />
<CodeBlock language="bash" code="npm install @eluan/core @eluan/tokens" />
```

## 10. Accessibility

- Role: a plain `<pre><code>` block; the copy and language controls are native buttons.
- Label: the copy button is named by its text ("Copy", then "Copied"). Language buttons are named by their `label`. Add a heading or sentence before the block that says what the code does.
- Keyboard: Tab reaches the language buttons and the copy button; Enter and Space activate them. The code area scrolls horizontally but isn't focusable, so keyboard users can't scroll long lines. <!-- REVIEW: not in the fix plan; the scroller has overflow-x auto with no tabIndex. -->
- State: the active language isn't exposed (no `aria-pressed` or tab roles), and the "Copied" change isn't announced (no live region). <!-- REVIEW: not in the fix plan; both are source gaps. -->
- Line numbers: they're real text, so screen readers read a number before each line. Leave `showLineNumbers` off unless sighted users need them.
- Focus: the buttons keep the browser's default ring; don't add your own.
- Contrast: surfaces come from the theme; syntax colours are tuned to at least 3.9:1 on the light-mode surface. Don't override them.

## 11. Behaviour

- Responsive: fills its parent's width. Long lines scroll horizontally inside the block; they never wrap.
- Overflow and truncation: the block grows to fit every line. For long files, show an excerpt or wrap the block in a height-limited [ScrollArea](./scroll-area.md). <!-- REVIEW: drafted; no height limit in source. -->
- Copy: copies the active variant's code with the Clipboard API, which needs a secure context (HTTPS or localhost).
- Motion: language buttons fade colour over 150ms. Don't add your own.

## 12. API

<!-- api:start -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `code` | `string` | | Required. The code to show. Ignored when `languages` is set. |
| `language` | `"javascript" \| "typescript" \| "jsx" \| "tsx" \| "css" \| "json" \| "bash" \| "python" \| "java" \| "go" \| "rust" \| "sql" \| "markdown" \| "yaml" \| "text"` | `"text"` | Prism grammar. `text` is not highlighted. |
| `languages` | `{ language: Language; code: string; label?: string }[]` | | Variants of the same snippet. Two or more show a switcher in the header; `label` defaults to the language id. |
| `filename` | `string` | | Shown at the start of the header. |
| `showCopyButton` | `boolean` | `true` | Shows the copy button. |
| `showLineNumbers` | `boolean` | `false` | Shows a line-number gutter. |
| `highlightLines` | `number[]` | `[]` | 1-based line numbers to highlight. |
| `...props` | `HTMLAttributes<HTMLDivElement>` without `className`, `style` | | Native div attributes on the container: `id`, `aria-*`. |
<!-- api:end -->

`Language` isn't exported as a type; write the union or use `CodeBlockProps["language"]`.

## 13. Examples

Setup instructions with package-manager variants, then a config file with the changed lines highlighted.

```tsx
import { CodeBlock, Typography } from "@eluan/core";

const install = [
  { language: "bash" as const, code: "pnpm add @eluan/core @eluan/tokens", label: "pnpm" },
  { language: "bash" as const, code: "npm install @eluan/core @eluan/tokens", label: "npm" },
  { language: "bash" as const, code: "yarn add @eluan/core @eluan/tokens", label: "yarn" },
];

const providerCode = `import "@eluan/core/styles.css";
import { EluanProvider } from "@eluan/core";

export function App({ children }: { children: React.ReactNode }) {
  return <EluanProvider defaultTheme="minimal">{children}</EluanProvider>;
}`;

export function InstallSteps() {
  return (
    <section style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-md)" }}>
      <Typography variant="heading" as="h2">Install</Typography>
      <Typography>Add the core package and its tokens.</Typography>
      <CodeBlock code={install[0].code} languages={install} />

      <Typography>Wrap your app in the provider and import the stylesheet once.</Typography>
      <CodeBlock language="tsx" filename="app.tsx" code={providerCode} showLineNumbers highlightLines={[1, 5]} />
    </section>
  );
}
```

## 14. Related components

- [Kbd](./kbd.md): keyboard keys and shortcuts.
- [ScrollArea](./scroll-area.md): limit the height of a long block.
- [Typography](./typography.md): the heading and sentence that introduce a block.
- [Tabs](./tabs.md): separate whole sections, rather than one snippet's language variants.

## 15. Common agent mistakes

_Filled from evals._
