import * as React from "react"
import * as stylex from "@stylexjs/stylex"
import { useEditor, useEditorState, EditorContent, type Editor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Heading1,
  Heading2,
  Heading3,
  Minus,
} from "lucide-react"

import { Toggle } from "./toggle"
import { Separator } from "./separator"

interface ToolbarButtonProps {
  pressed: boolean
  onPressedChange: () => void
  disabled?: boolean
  children: React.ReactNode
  tooltip?: string
}

const ToolbarButton = ({
  pressed,
  onPressedChange,
  disabled,
  children,
  tooltip,
}: ToolbarButtonProps) => (
  <Toggle
    pressed={pressed}
    onPressedChange={onPressedChange}
    disabled={disabled}
    aria-label={tooltip}
    size="iconMd"
  >
    {children}
  </Toggle>
)

interface RichTextToolbarProps {
  editor: Editor | null
}

const RichTextToolbar = ({ editor }: RichTextToolbarProps) => {
  // Subscribe to editor state so the toolbar re-renders on every transaction.
  // In TipTap v3, `useEditor` no longer auto-re-renders on transactions for
  // performance — we have to opt-in via `useEditorState`.
  const state = useEditorState({
    editor,
    selector: (ctx) => {
      const ed = ctx.editor
      if (!ed) return null
      return {
        isBold: ed.isActive("bold"),
        canBold: ed.can().chain().focus().toggleBold().run(),
        isItalic: ed.isActive("italic"),
        canItalic: ed.can().chain().focus().toggleItalic().run(),
        isStrike: ed.isActive("strike"),
        canStrike: ed.can().chain().focus().toggleStrike().run(),
        isCode: ed.isActive("code"),
        canCode: ed.can().chain().focus().toggleCode().run(),
        isH1: ed.isActive("heading", { level: 1 }),
        isH2: ed.isActive("heading", { level: 2 }),
        isH3: ed.isActive("heading", { level: 3 }),
        isBulletList: ed.isActive("bulletList"),
        isOrderedList: ed.isActive("orderedList"),
        isBlockquote: ed.isActive("blockquote"),
        canUndo: ed.can().chain().focus().undo().run(),
        canRedo: ed.can().chain().focus().redo().run(),
      }
    },
  })

  if (!editor || !state) return null

  return (
    <div {...stylex.props(styles.toolbar)}>
      <ToolbarButton
        pressed={state.isBold}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
        disabled={!state.canBold}
        tooltip="Bold"
      >
        <Bold {...stylex.props(styles.icon)} />
      </ToolbarButton>
      <ToolbarButton
        pressed={state.isItalic}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        disabled={!state.canItalic}
        tooltip="Italic"
      >
        <Italic {...stylex.props(styles.icon)} />
      </ToolbarButton>
      <ToolbarButton
        pressed={state.isStrike}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        disabled={!state.canStrike}
        tooltip="Strikethrough"
      >
        <Strikethrough {...stylex.props(styles.icon)} />
      </ToolbarButton>
      <ToolbarButton
        pressed={state.isCode}
        onPressedChange={() => editor.chain().focus().toggleCode().run()}
        disabled={!state.canCode}
        tooltip="Code"
      >
        <Code {...stylex.props(styles.icon)} />
      </ToolbarButton>

      <Separator orientation="vertical" variant="toolbar" />

      <ToolbarButton
        pressed={state.isH1}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        }
        tooltip="Heading 1"
      >
        <Heading1 {...stylex.props(styles.icon)} />
      </ToolbarButton>
      <ToolbarButton
        pressed={state.isH2}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
        tooltip="Heading 2"
      >
        <Heading2 {...stylex.props(styles.icon)} />
      </ToolbarButton>
      <ToolbarButton
        pressed={state.isH3}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 3 }).run()
        }
        tooltip="Heading 3"
      >
        <Heading3 {...stylex.props(styles.icon)} />
      </ToolbarButton>

      <Separator orientation="vertical" variant="toolbar" />

      <ToolbarButton
        pressed={state.isBulletList}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
        tooltip="Bullet List"
      >
        <List {...stylex.props(styles.icon)} />
      </ToolbarButton>
      <ToolbarButton
        pressed={state.isOrderedList}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
        tooltip="Ordered List"
      >
        <ListOrdered {...stylex.props(styles.icon)} />
      </ToolbarButton>
      <ToolbarButton
        pressed={state.isBlockquote}
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
        tooltip="Quote"
      >
        <Quote {...stylex.props(styles.icon)} />
      </ToolbarButton>
      <ToolbarButton
        pressed={false}
        onPressedChange={() => editor.chain().focus().setHorizontalRule().run()}
        tooltip="Horizontal Rule"
      >
        <Minus {...stylex.props(styles.icon)} />
      </ToolbarButton>

      <Separator orientation="vertical" variant="toolbar" />

      <ToolbarButton
        pressed={false}
        onPressedChange={() => editor.chain().focus().undo().run()}
        disabled={!state.canUndo}
        tooltip="Undo"
      >
        <Undo {...stylex.props(styles.icon)} />
      </ToolbarButton>
      <ToolbarButton
        pressed={false}
        onPressedChange={() => editor.chain().focus().redo().run()}
        disabled={!state.canRedo}
        tooltip="Redo"
      >
        <Redo {...stylex.props(styles.icon)} />
      </ToolbarButton>
    </div>
  )
}

export interface RichTextProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  minHeight?: string
}

const RichText = React.forwardRef<HTMLDivElement, RichTextProps>(
  (
    {
      value,
      onChange,
      placeholder = "Start typing...",
      disabled = false,
      minHeight = "150px",
    },
    ref
  ) => {
    const editor = useEditor({
      extensions: [
        StarterKit.configure({
          heading: {
            levels: [1, 2, 3],
          },
        }),
        Placeholder.configure({
          placeholder,
        }),
      ],
      content: value,
      editable: !disabled,
      onUpdate: ({ editor }) => {
        onChange?.(editor.getHTML())
      },
    })

    React.useEffect(() => {
      if (editor && value !== editor.getHTML()) {
        editor.commands.setContent(value ?? "")
      }
    }, [value, editor])

    React.useEffect(() => {
      if (editor) {
        editor.setEditable(!disabled)
      }
    }, [disabled, editor])

    return (
      <div
        ref={ref}
        {...stylex.props(styles.root, disabled && styles.rootDisabled)}
      >
        <style>{proseMirrorStyles}</style>
        <RichTextToolbar editor={editor} />
        <EditorContent
          editor={editor}
          className="eluan-rich-text-content"
          style={{ "--min-height": minHeight } as React.CSSProperties}
        />
      </div>
    )
  }
)
RichText.displayName = "RichText"

const styles = stylex.create({
  root: {
    backgroundColor: "var(--interactive-bg)",
    borderColor: "var(--interactive-border-alt)",
    borderRadius: "var(--curves-md)",
    borderStyle: "solid",
    borderWidth: 1,
    overflow: "hidden",
  },
  rootDisabled: {
    backgroundColor: "var(--interactive-bg-disabled)",
    color: "var(--interactive-fg-disabled)",
  },
  toolbar: {
    alignItems: "center",
    backgroundColor: "var(--container-bg-alt)",
    borderBottomColor: "var(--container-border-alt)",
    borderBottomStyle: "solid",
    borderBottomWidth: 1,
    display: "flex",
    flexWrap: "wrap",
    gap: "var(--spacing-xs)",
    padding: 4,
  },
  icon: {
    height: "var(--size-xxs)",
    width: "var(--size-xxs)",
  },
})

const proseMirrorStyles = `
.eluan-rich-text-content {
  max-width: none;
  padding: var(--spacing-sm);
}
.eluan-rich-text-content:focus-within {
  outline: none;
}
.eluan-rich-text-content .ProseMirror {
  min-height: var(--min-height);
  outline: none;
}
.eluan-rich-text-content .ProseMirror h1 {
  font-size: var(--font-size-3xl);
  font-weight: 700;
  line-height: 1.25;
  margin-block: var(--spacing-lg) var(--spacing-md);
}
.eluan-rich-text-content .ProseMirror h2 {
  font-size: var(--font-size-2xl);
  font-weight: 600;
  line-height: 1.375;
  margin-block: var(--spacing-md) var(--spacing-sm);
}
.eluan-rich-text-content .ProseMirror h3 {
  font-size: var(--font-size-xl);
  font-weight: 600;
  line-height: 1.375;
  margin-block: var(--spacing-md) var(--spacing-sm);
}
.eluan-rich-text-content .ProseMirror ul {
  list-style: disc;
  margin-block: var(--spacing-sm);
  padding-inline-start: var(--spacing-lg);
}
.eluan-rich-text-content .ProseMirror ol {
  list-style: decimal;
  margin-block: var(--spacing-sm);
  padding-inline-start: var(--spacing-lg);
}
.eluan-rich-text-content .ProseMirror li {
  margin-block: var(--spacing-xxs);
}
.eluan-rich-text-content .ProseMirror li p {
  margin-block: 0;
}
.eluan-rich-text-content .ProseMirror blockquote {
  border-left: 4px solid var(--container-border-alt);
  color: var(--interactive-fg-alt);
  font-style: italic;
  margin-block: var(--spacing-sm);
  padding-left: var(--spacing-md);
}
.eluan-rich-text-content .ProseMirror code {
  background-color: var(--interactive-bg-alt);
  border-radius: var(--curves-xs);
  font-family: var(--font-mono);
  font-size: var(--font-size-xs);
  padding: 0.125rem var(--spacing-xxs);
}
.eluan-rich-text-content .ProseMirror hr {
  border: 0;
  border-top: 1px solid var(--container-border-alt);
  margin-block: var(--spacing-md);
}
.eluan-rich-text-content .ProseMirror p.is-editor-empty:first-child::before {
  color: var(--interactive-fg-alt);
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}
`

export { RichText, RichTextToolbar }
