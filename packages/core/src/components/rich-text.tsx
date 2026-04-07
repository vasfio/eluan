import * as React from "react"
import { useEditor, EditorContent, type Editor } from "@tiptap/react"
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
    size="sm"
    pressed={pressed}
    onPressedChange={onPressedChange}
    disabled={disabled}
    aria-label={tooltip}
    className="h-8 w-8 p-0"
  >
    {children}
  </Toggle>
)

interface RichTextToolbarProps {
  editor: Editor | null
}

const RichTextToolbar = ({ editor }: RichTextToolbarProps) => {
  if (!editor) return null

  return (
    <div className="flex flex-wrap items-center gap-[var(--spacing-xs)] border-b p-1">
      <ToolbarButton
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        tooltip="Bold"
      >
        <Bold className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        tooltip="Italic"
      >
        <Italic className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        pressed={editor.isActive("strike")}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        tooltip="Strikethrough"
      >
        <Strikethrough className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        pressed={editor.isActive("code")}
        onPressedChange={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        tooltip="Code"
      >
        <Code className="h-4 w-4" />
      </ToolbarButton>

      <Separator orientation="vertical" className="mx-[var(--spacing-xxs)] h-6" />

      <ToolbarButton
        pressed={editor.isActive("heading", { level: 1 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        }
        tooltip="Heading 1"
      >
        <Heading1 className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        pressed={editor.isActive("heading", { level: 2 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
        tooltip="Heading 2"
      >
        <Heading2 className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        pressed={editor.isActive("heading", { level: 3 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 3 }).run()
        }
        tooltip="Heading 3"
      >
        <Heading3 className="h-4 w-4" />
      </ToolbarButton>

      <Separator orientation="vertical" className="mx-[var(--spacing-xxs)] h-6" />

      <ToolbarButton
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
        tooltip="Bullet List"
      >
        <List className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        pressed={editor.isActive("orderedList")}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
        tooltip="Ordered List"
      >
        <ListOrdered className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        pressed={editor.isActive("blockquote")}
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
        tooltip="Quote"
      >
        <Quote className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        pressed={false}
        onPressedChange={() => editor.chain().focus().setHorizontalRule().run()}
        tooltip="Horizontal Rule"
      >
        <Minus className="h-4 w-4" />
      </ToolbarButton>

      <Separator orientation="vertical" className="mx-[var(--spacing-xxs)] h-6" />

      <ToolbarButton
        pressed={false}
        onPressedChange={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        tooltip="Undo"
      >
        <Undo className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        pressed={false}
        onPressedChange={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        tooltip="Redo"
      >
        <Redo className="h-4 w-4" />
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
          "rounded-[var(--curves-md)] border bg-[var(--interactive-bg)]",
          disabled && "bg-[var(--interactive-bg-disabled) text-[var(--interactive-fg-disabled)]",
          className
        )}
      >
        <RichTextToolbar editor={editor} />
        <EditorContent
          editor={editor}
          className={cn(
            "prose prose-sm dark:prose-invert max-w-none p-[var(--spacing-sm)] focus-within:outline-none",
            "[&_.ProseMirror]:min-h-[var(--min-height)] [&_.ProseMirror]:outline-none",
            "[&_.ProseMirror_h1]:text-3xl [&_.ProseMirror_h1]:font-bold [&_.ProseMirror_h1]:leading-tight [&_.ProseMirror_h1]:mt-[var(--spacing-lg)] [&_.ProseMirror_h1]:mb-[var(--spacing-md)]",
            "[&_.ProseMirror_h2]:text-2xl [&_.ProseMirror_h2]:font-semibold [&_.ProseMirror_h2]:leading-snug [&_.ProseMirror_h2]:mt-[var(--spacing-md)] [&_.ProseMirror_h2]:mb-[var(--spacing-sm)]",
            "[&_.ProseMirror_h3]:text-xl [&_.ProseMirror_h3]:font-semibold [&_.ProseMirror_h3]:leading-snug [&_.ProseMirror_h3]:mt-[var(--spacing-md)] [&_.ProseMirror_h3]:mb-[var(--spacing-sm)]",
            "[&_.ProseMirror_p.is-editor-empty:first-child::before]:text-[var(--interactive-fg-alt)] [&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left [&_.ProseMirror_p.is-editor-empty:first-child::before]:h-0 [&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none"
          )}
          style={{ "--min-height": minHeight } as React.CSSProperties}
        />
      </div>
    )
  }
)
RichText.displayName = "RichText"

export { RichText, RichTextToolbar }
