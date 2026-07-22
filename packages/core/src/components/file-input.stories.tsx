import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { FileInput, ImageInput, DocumentInput } from "./file-input"
import { Progress } from "./progress"
import { Button } from "./button"

const meta: Meta<typeof FileInput> = {
  title: "Components/File Input",
  component: FileInput,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A file upload input available in button or dropzone variants, with drag-and-drop support, file previews, size validation, and specialized ImageInput and DocumentInput sub-components.

**Import**
\`\`\`tsx
import { FileInput, ImageInput, DocumentInput } from "@eluan/core"
\`\`\`

**Usage**
\`\`\`tsx
<FileInput
  variant="dropzone"
  maxFiles={5}
  maxSize={5 * 1024 * 1024}
  onChange={(files) => console.log(files)}
/>
\`\`\`
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "Default button-style file input for selecting a single file.",
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <FileInput onChange={(files) => console.log("Files:", files)} />
    </div>
  ),
}

export const Dropzone: Story = {
  parameters: {
    docs: {
      description: {
        story: "Dropzone variant with a dashed border area for drag-and-drop file uploads.",
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <FileInput variant="dropzone" onChange={(files) => console.log("Files:", files)} />
    </div>
  ),
}

export const WithUploadedFiles: Story = {
  parameters: {
    docs: {
      description: {
        story: "Dropzone pre-populated with mock uploaded files, demonstrating how the component displays file previews and removal controls.",
      },
    },
  },
  render: () => {
    const [files, setFiles] = React.useState<File[]>(() => [
      new File(["content"], "report-q4.pdf", { type: "application/pdf" }),
      new File(["content"], "photo.jpg", { type: "image/jpeg" }),
    ])
    return (
      <div style={{ maxWidth: 420 }}>
        <FileInput variant="dropzone" value={files} onChange={setFiles} maxFiles={5} />
      </div>
    )
  },
}

export const WithProgress: Story = {
  parameters: {
    docs: {
      description: {
        story: "Simulated upload progress using a wrapper component with a progress bar, demonstrating how to compose the FileInput with upload state.",
      },
    },
  },
  render: () => {
    const [files, setFiles] = React.useState<File[]>([])
    const [progress, setProgress] = React.useState(0)
    const [uploading, setUploading] = React.useState(false)
    const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null)

    const startUpload = () => {
      if (files.length === 0 || uploading) return
      setUploading(true)
      setProgress(0)
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            if (intervalRef.current) clearInterval(intervalRef.current)
            setUploading(false)
            return 100
          }
          return prev + 5
        })
      }, 150)
    }

    React.useEffect(() => {
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current)
      }
    }, [])

    return (
      <div
        style={{
          maxWidth: 420,
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-md)",
        }}
      >
        <FileInput
          variant="dropzone"
          value={files}
          onChange={(newFiles) => {
            setFiles(newFiles)
            setProgress(0)
            setUploading(false)
          }}
          maxFiles={3}
        />
        {files.length > 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--spacing-sm)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--spacing-xs)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "var(--font-size-xs)",
                  color: "var(--container-fg-alt)",
                }}
              >
                <span>
                  {uploading ? "Uploading..." : progress === 100 ? "Upload complete" : "Ready to upload"}
                </span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} />
            </div>
            <Button
              onClick={startUpload}
              disabled={uploading || progress === 100}
            >
              {uploading ? "Uploading..." : progress === 100 ? "Uploaded" : "Start Upload"}
            </Button>
          </div>
        )}
      </div>
    )
  },
}

export const MultipleFiles: Story = {
  parameters: {
    docs: {
      description: {
        story: "Dropzone configured to accept up to 5 files.",
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <FileInput variant="dropzone" maxFiles={5} onChange={(files) => console.log("Files:", files)} />
    </div>
  ),
}

export const WithMaxSize: Story = {
  parameters: {
    docs: {
      description: {
        story: "Dropzone with a 5MB maximum file size limit.",
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <FileInput
        variant="dropzone"
        maxSize={5 * 1024 * 1024}
        onChange={(files) => console.log("Files:", files)}
      />
    </div>
  ),
}

export const ImageOnly: Story = {
  parameters: {
    docs: {
      description: {
        story: "ImageInput sub-component that restricts uploads to image file types only.",
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <ImageInput variant="dropzone" maxFiles={3} onChange={(files) => console.log("Images:", files)} />
    </div>
  ),
}

export const DocumentOnly: Story = {
  parameters: {
    docs: {
      description: {
        story: "DocumentInput sub-component that restricts uploads to document file types (PDF, Word, Excel, text).",
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <DocumentInput variant="dropzone" onChange={(files) => console.log("Documents:", files)} />
    </div>
  ),
}

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: "Dropzone file input in a disabled state.",
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <FileInput variant="dropzone" disabled />
    </div>
  ),
}
