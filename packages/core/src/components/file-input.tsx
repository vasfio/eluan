import * as React from "react"
import * as stylex from "@stylexjs/stylex"
import {
  Archive,
  File,
  FileText,
  Film,
  Image as ImageIcon,
  Music,
  Upload,
  X,
} from "lucide-react"

import { composeRefs } from "../utils"

type FileType = "image" | "document" | "video" | "audio" | "archive" | "other"

/**
 * A stable key derived from file identity. Files can legitimately share a name,
 * so name alone is not enough — size and lastModified disambiguate them.
 */
function fileKey(file: File): string {
  return `${file.name}-${file.size}-${file.lastModified}`
}

interface FileInfo {
  file: File
  preview?: string
  type: FileType
}

function getFileType(file: File): FileType {
  const mimeType = file.type.toLowerCase()
  if (mimeType.startsWith("image/")) return "image"
  if (mimeType.startsWith("video/")) return "video"
  if (mimeType.startsWith("audio/")) return "audio"
  if (
    mimeType.includes("pdf") ||
    mimeType.includes("document") ||
    mimeType.includes("text") ||
    mimeType.includes("spreadsheet") ||
    mimeType.includes("presentation")
  ) {
    return "document"
  }
  if (
    mimeType.includes("zip") ||
    mimeType.includes("rar") ||
    mimeType.includes("tar") ||
    mimeType.includes("gzip") ||
    mimeType.includes("7z")
  ) {
    return "archive"
  }
  return "other"
}

const EMPTY_FILES: File[] = []

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B"
  const k = 1024
  const sizes = ["B", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

const FileIcon = ({ type }: { type: FileType }) => {
  switch (type) {
    case "image":
      return <ImageIcon aria-hidden="true" {...stylex.props(styles.fileTypeIcon)} />
    case "document":
      return <FileText aria-hidden="true" {...stylex.props(styles.fileTypeIcon)} />
    case "video":
      return <Film aria-hidden="true" {...stylex.props(styles.fileTypeIcon)} />
    case "audio":
      return <Music aria-hidden="true" {...stylex.props(styles.fileTypeIcon)} />
    case "archive":
      return <Archive aria-hidden="true" {...stylex.props(styles.fileTypeIcon)} />
    default:
      return <File aria-hidden="true" {...stylex.props(styles.fileTypeIcon)} />
  }
}

export interface FileInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "className" | "style" | "type" | "value" | "onChange"
  > {
  value?: File[]
  onValueChange?: (files: File[]) => void
  maxFiles?: number
  maxSize?: number
  showPreview?: boolean
  variant?: "default" | "dropzone"
  dragActiveText?: string
  dragInactiveText?: string
}

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  (
    {
      value = EMPTY_FILES,
      onValueChange,
      maxFiles = 1,
      maxSize,
      accept,
      showPreview = true,
      variant = "default",
      dragActiveText = "Drop files here",
      dragInactiveText = "Drag & drop files here, or click to select",
      disabled,
      ...props
    },
    ref
  ) => {
    const [files, setFiles] = React.useState<FileInfo[]>([])
    const [isDragging, setIsDragging] = React.useState(false)
    const [error, setError] = React.useState<string | null>(null)
    const inputRef = React.useRef<HTMLInputElement | null>(null)

    React.useEffect(() => {
      const fileInfos: FileInfo[] = value.map((file) => ({
        file,
        type: getFileType(file),
        preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
      }))
      setFiles(fileInfos)

      return () => {
        fileInfos.forEach((info) => {
          if (info.preview) URL.revokeObjectURL(info.preview)
        })
      }
    }, [value])

    const handleFiles = (newFiles: FileList | null) => {
      if (!newFiles) return
      setError(null)

      const fileArray = Array.from(newFiles)
      const validFiles: File[] = []

      for (const file of fileArray) {
        if (maxSize && file.size > maxSize) {
          setError(`File "${file.name}" exceeds maximum size of ${formatFileSize(maxSize)}`)
          continue
        }
        validFiles.push(file)
      }

      const combined = maxFiles === 1
        ? validFiles.slice(0, 1)
        : [...value, ...validFiles].slice(0, maxFiles)
      onValueChange?.(combined)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFiles(e.target.files)
      if (inputRef.current) inputRef.current.value = ""
    }

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault()
      if (disabled) return
      setIsDragging(true)
    }

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      if (!disabled) {
        handleFiles(e.dataTransfer.files)
      }
    }

    const removeFile = (index: number) => {
      const newFiles = [...value]
      newFiles.splice(index, 1)
      onValueChange?.(newFiles)
    }

    const combinedRef = composeRefs(inputRef, ref)

    const input = (
      <input
        type="file"
        ref={combinedRef}
        accept={accept}
        multiple={maxFiles > 1}
        onChange={handleChange}
        disabled={disabled}
        {...props}
        {...stylex.props(styles.srOnly)}
      />
    )

    if (variant === "dropzone") {
      return (
        <div {...stylex.props(styles.root)}>
          <div
            role="button"
            tabIndex={disabled ? -1 : 0}
            aria-label={dragInactiveText}
            aria-disabled={disabled || undefined}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => !disabled && inputRef.current?.click()}
            onKeyDown={(e) => {
              if (disabled) return
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                inputRef.current?.click()
              }
            }}
            {...stylex.props(
              styles.dropzone,
              isDragging ? styles.dropzoneDragging : styles.dropzoneIdle,
              disabled && styles.dropzoneDisabled
            )}
          >
            {input}
            <Upload aria-hidden="true" {...stylex.props(styles.dropzoneIcon, isDragging && styles.dropzoneIconActive)} />
            <p {...stylex.props(styles.dropzoneText)}>
              {isDragging ? dragActiveText : dragInactiveText}
            </p>
            {maxSize && (
              <p {...stylex.props(styles.hint)}>
                Max file size: {formatFileSize(maxSize)}
              </p>
            )}
            {maxFiles > 1 && (
              <p {...stylex.props(styles.hint)}>
                Max {maxFiles} files
              </p>
            )}
          </div>

          {error && <p role="alert" {...stylex.props(styles.error)}>{error}</p>}

          {showPreview && files.length > 0 && (
            <div {...stylex.props(styles.previewListVertical)}>
              {files.map((fileInfo, index) => (
                <div key={fileKey(fileInfo.file)} {...stylex.props(styles.previewRow)}>
                  <FileIcon type={fileInfo.type} />
                  <div {...stylex.props(styles.fileMeta)}>
                    <p {...stylex.props(styles.fileName)}>{fileInfo.file.name}</p>
                    <p {...stylex.props(styles.fileSize)}>
                      {formatFileSize(fileInfo.file.size)}
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-label={`Remove ${fileInfo.file.name}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      removeFile(index)
                    }}
                    {...stylex.props(styles.removeButton)}
                  >
                    <X aria-hidden="true" {...stylex.props(styles.removeIcon)} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )
    }

    return (
      <div {...stylex.props(styles.root)}>
        <div {...stylex.props(styles.defaultControls)}>
          {input}
          <button
            type="button"
            onClick={() => !disabled && inputRef.current?.click()}
            disabled={disabled}
            {...stylex.props(styles.chooseButton, disabled && styles.disabled)}
          >
            <Upload aria-hidden="true" {...stylex.props(styles.chooseIcon)} />
            Choose {maxFiles > 1 ? "files" : "file"}
          </button>
          {files.length > 0 && !showPreview && (
            <span {...stylex.props(styles.selectedCount)}>
              {files.length} file{files.length > 1 ? "s" : ""} selected
            </span>
          )}
        </div>

        {error && <p role="alert" {...stylex.props(styles.error)}>{error}</p>}

        {showPreview && files.length > 0 && (
          <div {...stylex.props(styles.previewListInline)}>
            {files.map((fileInfo, index) => (
              <div key={fileKey(fileInfo.file)} {...stylex.props(styles.previewChip)}>
                <File aria-hidden="true" {...stylex.props(styles.chipIcon)} />
                <span {...stylex.props(styles.chipName)}>{fileInfo.file.name}</span>
                <button
                  type="button"
                  aria-label={`Remove ${fileInfo.file.name}`}
                  onClick={() => removeFile(index)}
                  {...stylex.props(styles.removeChipButton)}
                >
                  <X aria-hidden="true" {...stylex.props(styles.removeChipIcon)} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
)
FileInput.displayName = "FileInput"

export interface ImageInputProps extends Omit<FileInputProps, "accept"> {
  acceptedFormats?: string[]
}

const ImageInput = React.forwardRef<HTMLInputElement, ImageInputProps>(
  ({ acceptedFormats = ["image/jpeg", "image/png", "image/gif", "image/webp"], ...props }, ref) => {
    return (
      <FileInput
        ref={ref}
        accept={acceptedFormats.join(",")}
        {...props}
      />
    )
  }
)
ImageInput.displayName = "ImageInput"

export interface DocumentInputProps extends Omit<FileInputProps, "accept"> {
  acceptedFormats?: string[]
}

const DocumentInput = React.forwardRef<HTMLInputElement, DocumentInputProps>(
  (
    {
      acceptedFormats = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "text/plain",
      ],
      ...props
    },
    ref
  ) => {
    return (
      <FileInput
        ref={ref}
        accept={acceptedFormats.join(",")}
        {...props}
      />
    )
  }
)
DocumentInput.displayName = "DocumentInput"

const styles = stylex.create({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-sm)",
  },
  srOnly: {
    borderWidth: 0,
    clip: "rect(0, 0, 0, 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    whiteSpace: "nowrap",
    width: 1,
  },
  fileTypeIcon: {
    color: "var(--interactive-fg-alt)",
    height: "var(--size-xxs)",
    width: "var(--size-xxs)",
  },
  dropzone: {
    alignItems: "center",
    borderRadius: "var(--curves-lg)",
    borderStyle: "dashed",
    borderWidth: 2,
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "var(--spacing-xl)",
    position: "relative",
    transitionDuration: "150ms",
    transitionProperty: "background-color, border-color, opacity",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
  dropzoneIdle: {
    borderColor: "var(--interactive-border-alt)",
    // Hover only fills the background — border stays put.
    ":hover": {
      backgroundColor: "var(--interactive-bg-hover)",
    },
  },
  // Drag-over / active mirrors the hover fill, no border change.
  dropzoneDragging: {
    backgroundColor: "var(--interactive-bg-hover)",
    borderColor: "var(--interactive-border-alt)",
  },
  disabled: {
    cursor: "not-allowed",
    opacity: 0.5,
  },
  // Disabled dropzone: filled disabled surface, no hover, cursor blocked.
  dropzoneDisabled: {
    backgroundColor: "var(--interactive-bg-disabled)",
    color: "var(--interactive-fg-disabled)",
    cursor: "not-allowed",
    ":hover": {
      backgroundColor: "var(--interactive-bg-disabled)",
    },
  },
  dropzoneIcon: {
    color: "var(--interactive-fg-alt)",
    height: "var(--size-sm)",
    marginBottom: "var(--spacing-sm)",
    width: "var(--size-sm)",
  },
  dropzoneIconActive: {
    color: "var(--action-primary-bg)",
  },
  dropzoneText: {
    fontSize: "var(--font-size-sm)",
    margin: 0,
    textAlign: "center",
  },
  hint: {
    color: "var(--container-fg-alt)",
    fontSize: "var(--font-size-xs)",
    margin: 0,
    marginTop: "var(--spacing-xxs)",
  },
  error: {
    color: "var(--destructive-fg)",
    fontSize: "var(--font-size-sm)",
    margin: 0,
  },
  previewListVertical: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-sm)",
  },
  previewRow: {
    alignItems: "center",
    backgroundColor: "var(--container-bg)",
    borderColor: "var(--container-border)",
    borderRadius: "var(--curves-md)",
    borderStyle: "solid",
    borderWidth: 1,
    display: "flex",
    gap: "var(--spacing-sm)",
    padding: "var(--spacing-sm)",
  },
  fileMeta: {
    flex: 1,
    minWidth: 0,
  },
  fileName: {
    fontSize: "var(--font-size-sm)",
    fontWeight: 500,
    margin: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  fileSize: {
    color: "var(--container-fg-alt)",
    fontSize: "var(--font-size-xs)",
    margin: 0,
  },
  removeButton: {
    backgroundColor: "transparent",
    borderWidth: 0,
    borderRadius: "var(--curves-sm)",
    cursor: "pointer",
    padding: "var(--spacing-xs)",
    ":hover": {
      backgroundColor: "var(--interactive-bg-hover)",
    },
  },
  removeIcon: {
    height: "var(--size-xxs)",
    width: "var(--size-xxs)",
  },
  defaultControls: {
    display: "flex",
    gap: "var(--spacing-sm)",
  },
  chooseButton: {
    alignItems: "center",
    backgroundColor: "var(--interactive-bg)",
    borderColor: "var(--interactive-border-alt)",
    borderRadius: "var(--curves-md)",
    borderStyle: "solid",
    borderWidth: 1,
    cursor: "pointer",
    display: "flex",
    fontSize: "var(--font-size-sm)",
    gap: "var(--spacing-xs)",
    height: "var(--size-lg)",
    paddingBlock: "var(--spacing-sm)",
    paddingInline: "var(--spacing-md)",
    ":hover": {
      backgroundColor: "var(--interactive-bg-hover)",
    },
  },
  chooseIcon: {
    height: "var(--size-xxs)",
    width: "var(--size-xxs)",
  },
  selectedCount: {
    alignItems: "center",
    color: "var(--container-fg-alt)",
    display: "flex",
    fontSize: "var(--font-size-sm)",
  },
  previewListInline: {
    display: "flex",
    flexWrap: "wrap",
    gap: "var(--spacing-sm)",
  },
  previewChip: {
    alignItems: "center",
    backgroundColor: "var(--container-bg-alt)",
    borderColor: "var(--container-border)",
    borderRadius: "var(--radius-radius-full)",
    borderStyle: "solid",
    borderWidth: 1,
    display: "flex",
    fontSize: "var(--font-size-sm)",
    gap: "var(--spacing-xs)",
    paddingBlock: "var(--spacing-xs)",
    paddingInline: "var(--spacing-sm)",
  },
  chipIcon: {
    color: "var(--interactive-fg-alt)",
    height: "var(--size-xxs)",
    width: "var(--size-xxs)",
  },
  chipName: {
    maxWidth: 150,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  removeChipButton: {
    backgroundColor: "transparent",
    borderWidth: 0,
    borderRadius: "var(--radius-radius-full)",
    cursor: "pointer",
    padding: "var(--spacing-xxs)",
    ":hover": {
      backgroundColor: "var(--interactive-bg-hover)",
    },
  },
  removeChipIcon: {
    height: "calc(var(--spacing-sm) + var(--spacing-xxs))",
    width: "calc(var(--spacing-sm) + var(--spacing-xxs))",
  },
})

export { FileInput, ImageInput, DocumentInput, formatFileSize, getFileType }
export type { FileType, FileInfo }
