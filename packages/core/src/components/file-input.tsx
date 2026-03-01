import * as React from "react"
import { Upload, X, File, Image, FileText, Film, Music, Archive } from "lucide-react"
import { cn } from "@/lib/utils"

type FileType = "image" | "document" | "video" | "audio" | "archive" | "other"

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
  )
    return "document"
  if (
    mimeType.includes("zip") ||
    mimeType.includes("rar") ||
    mimeType.includes("tar") ||
    mimeType.includes("gzip") ||
    mimeType.includes("7z")
  )
    return "archive"
  return "other"
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B"
  const k = 1024
  const sizes = ["B", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

const FileIcon = ({ type }: { type: FileType }) => {
  const iconClass = "h-8 w-8"
  switch (type) {
    case "image":
      return <Image className={cn(iconClass, "text-green-500")} />
    case "document":
      return <FileText className={cn(iconClass, "text-blue-500")} />
    case "video":
      return <Film className={cn(iconClass, "text-purple-500")} />
    case "audio":
      return <Music className={cn(iconClass, "text-pink-500")} />
    case "archive":
      return <Archive className={cn(iconClass, "text-yellow-500")} />
    default:
      return <File className={cn(iconClass, "text-gray-500")} />
  }
}

export interface FileInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "onChange"> {
  value?: File[]
  onChange?: (files: File[]) => void
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
      className,
      value = [],
      onChange,
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
    const inputRef = React.useRef<HTMLInputElement>(null)

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

      const combined = maxFiles === 1 ? validFiles.slice(0, 1) : [...value, ...validFiles].slice(0, maxFiles)
      onChange?.(combined)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFiles(e.target.files)
      if (inputRef.current) inputRef.current.value = ""
    }

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault()
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
      onChange?.(newFiles)
    }

    const combinedRef = (node: HTMLInputElement) => {
      inputRef.current = node
      if (typeof ref === "function") {
        ref(node)
      } else if (ref) {
        ref.current = node
      }
    }

    if (variant === "dropzone") {
      return (
        <div className={cn("space-y-3", className)}>
          <div
            className={cn(
              "relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors",
              isDragging && "border-primary bg-primary/5",
              !isDragging && "border-muted-foreground/25 hover:border-primary/50",
              disabled && "cursor-not-allowed opacity-50"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => !disabled && inputRef.current?.click()}
          >
            <input
              type="file"
              ref={combinedRef}
              className="sr-only"
              accept={accept}
              multiple={maxFiles > 1}
              onChange={handleChange}
              disabled={disabled}
              {...props}
            />
            <Upload className={cn("h-10 w-10 mb-3", isDragging ? "text-primary" : "text-muted-foreground")} />
            <p className="text-sm text-center">
              {isDragging ? dragActiveText : dragInactiveText}
            </p>
            {maxSize && (
              <p className="text-xs text-muted-foreground mt-1">
                Max file size: {formatFileSize(maxSize)}
              </p>
            )}
            {maxFiles > 1 && (
              <p className="text-xs text-muted-foreground">
                Max {maxFiles} files
              </p>
            )}
          </div>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          {showPreview && files.length > 0 && (
            <div className="space-y-2">
              {files.map((fileInfo, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg border bg-muted/50"
                >
                  {fileInfo.preview ? (
                    <img
                      src={fileInfo.preview}
                      alt={fileInfo.file.name}
                      className="h-12 w-12 rounded object-cover"
                    />
                  ) : (
                    <FileIcon type={fileInfo.type} />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{fileInfo.file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(fileInfo.file.size)}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="p-1 hover:bg-background rounded"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeFile(index)
                    }}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )
    }

    // Default variant
    return (
      <div className={cn("space-y-2", className)}>
        <div className="flex gap-2">
          <input
            type="file"
            ref={combinedRef}
            className="sr-only"
            accept={accept}
            multiple={maxFiles > 1}
            onChange={handleChange}
            disabled={disabled}
            {...props}
          />
          <button
            type="button"
            className={cn(
              "flex h-10 items-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm ring-offset-background hover:bg-accent",
              disabled && "cursor-not-allowed opacity-50"
            )}
            onClick={() => !disabled && inputRef.current?.click()}
            disabled={disabled}
          >
            <Upload className="h-4 w-4" />
            Choose {maxFiles > 1 ? "files" : "file"}
          </button>
          {files.length > 0 && !showPreview && (
            <span className="flex items-center text-sm text-muted-foreground">
              {files.length} file{files.length > 1 ? "s" : ""} selected
            </span>
          )}
        </div>

        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}

        {showPreview && files.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {files.map((fileInfo, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border bg-muted/50 text-sm"
              >
                {fileInfo.preview ? (
                  <img
                    src={fileInfo.preview}
                    alt={fileInfo.file.name}
                    className="h-5 w-5 rounded object-cover"
                  />
                ) : (
                  <File className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="max-w-[150px] truncate">{fileInfo.file.name}</span>
                <button
                  type="button"
                  className="p-0.5 hover:bg-background rounded-full"
                  onClick={() => removeFile(index)}
                >
                  <X className="h-3 w-3" />
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

// Simplified image-only input
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

// Document upload input
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

export { FileInput, ImageInput, DocumentInput, formatFileSize, getFileType }
export type { FileType, FileInfo }
