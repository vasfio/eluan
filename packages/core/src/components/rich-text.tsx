import * as React from "react"
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

import { cn } from "@/lib/utils"
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
    className="h-[var(--size-md)] w-[var(--size-md)] p-0"
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
    <div className="flex flex-wrap items-center gap-[var(--spacing-xs)] border-b bg-[var(--container-bg-alt)] p-1">
      <ToolbarButton
        pressed={state.isBold}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
        disabled={!state.canBold}
        tooltip="Bold"
      >
        <Bold className="h-[var(--size-xxs)] w-[var(--size-xxs)]" />
      </ToolbarButton>
      <ToolbarButton
        pressed={state.isItalic}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        disabled={!state.canItalic}
        tooltip="Italic"
      >
        <Italic className="h-[var(--size-xxs)] w-[var(--size-xxs)]" />
      </ToolbarButton>
      <ToolbarButton
        pressed={state.isStrike}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        disabled={!state.canStrike}
        tooltip="Strikethrough"
      >
        <Strikethrough className="h-[var(--size-xxs)] w-[var(--size-xxs)]" />
      </ToolbarButton>
      <ToolbarButton
        pressed={state.isCode}
        onPressedChange={() => editor.chain().focus().toggleCode().run()}
        disabled={!state.canCode}
        tooltip="Code"
      >
        <Code className="h-[var(--size-xxs)] w-[var(--size-xxs)]" />
      </ToolbarButton>

      <Separator orientation="vertical" className="mx-[var(--spacing-xxs)] h-[var(--size-sm)]" />

      <ToolbarButton
        pressed={state.isH1}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        }
        tooltip="Heading 1"
      >
        <Heading1 className="h-[var(--size-xxs)] w-[var(--size-xxs)]" />
      </ToolbarButton>
      <ToolbarButton
        pressed={state.isH2}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
        tooltip="Heading 2"
      >
        <Heading2 className="h-[var(--size-xxs)] w-[var(--size-xxs)]" />
      </ToolbarButton>
      <ToolbarButton
        pressed={state.isH3}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 3 }).run()
        }
        tooltip="Heading 3"
      >
        <Heading3 className="h-[var(--size-xxs)] w-[var(--size-xxs)]" />
      </ToolbarButton>

      <Separator orientation="vertical" className="mx-[var(--spacing-xxs)] h-[var(--size-sm)]" />

      <ToolbarButton
        pressed={state.isBulletList}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
        tooltip="Bullet List"
      >
        <List className="h-[var(--size-xxs)] w-[var(--size-xxs)]" />
      </ToolbarButton>
      <ToolbarButton
        pressed={state.isOrderedList}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
        tooltip="Ordered List"
      >
        <ListOrdered className="h-[var(--size-xxs)] w-[var(--size-xxs)]" />
      </ToolbarButton>
      <ToolbarButton
        pressed={state.isBlockquote}
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
        tooltip="Quote"
      >
        <Quote className="h-[var(--size-xxs)] w-[var(--size-xxs)]" />
      </ToolbarButton>
      <ToolbarButton
        pressed={false}
        onPressedChange={() => editor.chain().focus().setHorizontalRule().run()}
        tooltip="Horizontal Rule"
      >
        <Minus className="h-[var(--size-xxs)] w-[var(--size-xxs)]" />
      </ToolbarButton>

      <Separator orientation="vertical" className="mx-[var(--spacing-xxs)] h-[var(--size-sm)]" />

      <ToolbarButton
        pressed={false}
        onPressedChange={() => editor.chain().focus().undo().run()}
        disabled={!state.canUndo}
        tooltip="Undo"
      >
        <Undo className="h-[var(--size-xxs)] w-[var(--size-xxs)]" />
      </ToolbarButton>
      <ToolbarButton
        pressed={false}
        onPressedChange={() => editor.chain().focus().redo().run()}
        disabled={!state.canRedo}
        tooltip="Redo"
      >
        <Redo className="h-[var(--size-xxs)] w-[var(--size-xxs)]" />
      </ToolbarButton>
    </div>
  )
}

export interface RichTextProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  minHeight?: string
}

const RichText = React.forwardRef<HTMLDivElement, RichTextProps>(
  (
    {
      value,
      onChange,
      placeholder = "Start typing...",
      disabled = false,
      className,
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
        className={cn(
          // overflow-hidden clips the toolbar's background to the rounded
          // corners — without it the bg bleeds past the curve.
          "overflow-hidden rounded-[var(--curves-md)] border bg-[var(--interactive-bg)]",
          disabled && "bg-[var(--interactive-bg-disabled)] text-[color:var(--interactive-fg-disabled)]",
          className
        )}
      >
        <RichTextToolbar editor={editor} />
        <EditorContent
          editor={editor}
          className={cn(
            "prose prose-sm dark:prose-invert max-w-none p-[var(--spacing-sm)] focus-within:outline-none",
            "[&_.ProseMirror]:min-h-[var(--min-height)] [&_.ProseMirror]:outline-none",
            "[&_.ProseMirror_h1]:text-[length:var(--font-size-3xl)] [&_.ProseMirror_h1]:font-bold [&_.ProseMirror_h1]:leading-tight [&_.ProseMirror_h1]:mt-[var(--spacing-lg)] [&_.ProseMirror_h1]:mb-[var(--spacing-md)]",
            "[&_.ProseMirror_h2]:text-[length:var(--font-size-2xl)] [&_.ProseMirror_h2]:font-semibold [&_.ProseMirror_h2]:leading-snug [&_.ProseMirror_h2]:mt-[var(--spacing-md)] [&_.ProseMirror_h2]:mb-[var(--spacing-sm)]",
            "[&_.ProseMirror_h3]:text-[length:var(--font-size-xl)] [&_.ProseMirror_h3]:font-semibold [&_.ProseMirror_h3]:leading-snug [&_.ProseMirror_h3]:mt-[var(--spacing-md)] [&_.ProseMirror_h3]:mb-[var(--spacing-sm)]",
            // Tailwind's preflight strips ul/ol/blockquote styles — restore them explicitly
            // so bullet/ordered lists and blockquotes render visibly in the editor content.
            "[&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:pl-[var(--spacing-lg)] [&_.ProseMirror_ul]:my-[var(--spacing-sm)]",
            "[&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:pl-[var(--spacing-lg)] [&_.ProseMirror_ol]:my-[var(--spacing-sm)]",
            "[&_.ProseMirror_li]:my-[var(--spacing-xxs)]",
            "[&_.ProseMirror_li_p]:my-0",
            "[&_.ProseMirror_blockquote]:border-l-4 [&_.ProseMirror_blockquote]:border-[color:var(--container-border-alt)] [&_.ProseMirror_blockquote]:pl-[var(--spacing-md)] [&_.ProseMirror_blockquote]:italic [&_.ProseMirror_blockquote]:text-[color:var(--interactive-fg-alt)] [&_.ProseMirror_blockquote]:my-[var(--spacing-sm)]",
            "[&_.ProseMirror_code]:bg-[var(--interactive-bg-alt)] [&_.ProseMirror_code]:px-[var(--spacing-xxs)] [&_.ProseMirror_code]:py-0.5 [&_.ProseMirror_code]:rounded [&_.ProseMirror_code]:font-mono [&_.ProseMirror_code]:text-[length:var(--font-size-xs)]",
            "[&_.ProseMirror_hr]:border-t [&_.ProseMirror_hr]:border-[color:var(--container-border-alt)] [&_.ProseMirror_hr]:my-[var(--spacing-md)]",
            "[&_.ProseMirror_p.is-editor-empty:first-child::before]:text-[color:var(--interactive-fg-alt)] [&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left [&_.ProseMirror_p.is-editor-empty:first-child::before]:h-0 [&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none"
          )}
          style={{ "--min-height": minHeight } as React.CSSProperties}
        />
      </div>
    )
  }
)
RichText.displayName = "RichText"

export { RichText, RichTextToolbar }
