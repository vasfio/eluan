import * as React from "react"
import {
  Paperclip,
  Image,
  FileText,
  FileCode,
  Music,
  Video,
  Plus,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "./badge"
import { Button } from "./button"

type FileType = "image" | "document" | "code" | "audio" | "video" | "generic"

function getFileIcon(type: FileType) {
  switch (type) {
    case "image":
      return Image
    case "document":
      return FileText
    case "code":
      return FileCode
    case "audio":
      return Music
    case "video":
      return Video
    case "generic":
    default:
      return Paperclip
  }
}

export interface AIAttachmentsProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const AIAttachments = React.forwardRef<HTMLDivElement, AIAttachmentsProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-wrap gap-[var(--spacing-xs)]", className)}
      {...props}
    />
  )
)
AIAttachments.displayName = "AIAttachments"

export interface AIAttachmentItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** File name to display (truncated automatically) */
  filename: string
  /** File type for icon selection */
  type?: FileType
  /** Optional file size string, e.g. "2.4 MB" */
  size?: string
  /** Callback when the remove button is clicked */
  onRemove?: () => void
}

const AIAttachmentItem = React.forwardRef<HTMLDivElement, AIAttachmentItemProps>(
  ({ className, filename, type = "generic", size, onRemove, ...props }, ref) => {
    const Icon = getFileIcon(type)

    return (
      <span ref={ref as React.Ref<HTMLSpanElement>} {...props}>
        <Badge
          variant="secondary"
          removable={!!onRemove}
          onRemove={onRemove}
          className={cn("max-w-[200px] gap-[var(--spacing-xs)]", className)}
          aria-label={filename}
        >
          <Icon className="h-[var(--size-xxs)] w-[var(--size-xxs)] shrink-0 text-[var(--container-fg-alt)]" />
          <span className="truncate">{filename}</span>
          {size && (
            <span className="shrink-0 text-[var(--container-fg-alt)]">
              {size}
            </span>
          )}
        </Badge>
      </span>
    )
  }
)
AIAttachmentItem.displayName = "AIAttachmentItem"

export interface AIAttachmentAddProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const AIAttachmentAdd = React.forwardRef<
  HTMLButtonElement,
  AIAttachmentAddProps
>(({ className, children, ...props }, ref) => (
  <Button
    ref={ref}
    variant="outline"
    size="sm"
    className={cn(
      "border-dashed text-[var(--container-fg-alt)] hover:text-[var(--container-fg)]",
      className
    )}
    {...props}
  >
    <Plus className="h-[var(--size-xxs)] w-[var(--size-xxs)]" />
    {children ?? "Add file"}
  </Button>
))
AIAttachmentAdd.displayName = "AIAttachmentAdd"

export {
  AIAttachments,
  AIAttachmentItem,
  AIAttachmentAdd,
  getFileIcon,
  type FileType as AIAttachmentFileType,
}
