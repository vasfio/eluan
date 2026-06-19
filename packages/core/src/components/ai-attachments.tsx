import * as React from "react"
import * as stylex from "@stylexjs/stylex"
import {
  Paperclip,
  Image,
  FileText,
  FileCode,
  Music,
  Video,
  Plus,
} from "lucide-react"

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
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style"> {}

const styles = stylex.create({
  root: {
    display: "flex",
    flexWrap: "wrap",
    gap: "var(--spacing-xs)",
  },
  item: {
    alignItems: "center",
    display: "inline-flex",
    maxWidth: 200,
  },
  icon: {
    color: "var(--container-fg-alt)",
    flexShrink: 0,
    height: "var(--size-xxs)",
    width: "var(--size-xxs)",
  },
  filename: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  size: {
    color: "var(--container-fg-alt)",
    flexShrink: 0,
  },
  plusIcon: {
    height: "var(--size-xxs)",
    width: "var(--size-xxs)",
  },
})

const AIAttachments = React.forwardRef<HTMLDivElement, AIAttachmentsProps>(
  (props, ref) => <div ref={ref} {...props} {...stylex.props(styles.root)} />
)
AIAttachments.displayName = "AIAttachments"

export interface AIAttachmentItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style"> {
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
  ({ filename, type = "generic", size, onRemove, ...props }, ref) => {
    const Icon = getFileIcon(type)

    return (
      <span ref={ref as React.Ref<HTMLSpanElement>} {...props} {...stylex.props(styles.item)}>
        <Badge
          variant="secondary"
          removable={!!onRemove}
          onRemove={onRemove}
          aria-label={filename}
        >
          <Icon {...stylex.props(styles.icon)} />
          <span {...stylex.props(styles.filename)}>{filename}</span>
          {size && <span {...stylex.props(styles.size)}>{size}</span>}
        </Badge>
      </span>
    )
  }
)
AIAttachmentItem.displayName = "AIAttachmentItem"

export interface AIAttachmentAddProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "style"> {}

const AIAttachmentAdd = React.forwardRef<
  HTMLButtonElement,
  AIAttachmentAddProps
>(({ children, ...props }, ref) => (
  <Button
    ref={ref}
    variant="dashed"
    size="sm"
    {...props}
  >
    <Plus {...stylex.props(styles.plusIcon)} />
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
