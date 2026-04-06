import type { Meta, StoryObj } from "@storybook/react"
import { FileInput, ImageInput, DocumentInput } from "./file-input"

const meta: Meta<typeof FileInput> = {
  title: "Components/File Input",
  component: FileInput,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-[300px]">
      <FileInput onChange={(files) => console.log("Files:", files)} />
    </div>
  ),
}

export const Dropzone: Story = {
  render: () => (
    <div className="w-[400px]">
      <FileInput variant="dropzone" onChange={(files) => console.log("Files:", files)} />
    </div>
  ),
}

export const MultipleFiles: Story = {
  render: () => (
    <div className="w-[400px]">
      <FileInput variant="dropzone" maxFiles={5} onChange={(files) => console.log("Files:", files)} />
    </div>
  ),
}

export const WithMaxSize: Story = {
  render: () => (
    <div className="w-[400px]">
      <FileInput
        variant="dropzone"
        maxSize={5 * 1024 * 1024}
        onChange={(files) => console.log("Files:", files)}
      />
    </div>
  ),
}

export const ImageOnly: Story = {
  render: () => (
    <div className="w-[400px]">
      <ImageInput variant="dropzone" maxFiles={3} onChange={(files) => console.log("Images:", files)} />
    </div>
  ),
}

export const DocumentOnly: Story = {
  render: () => (
    <div className="w-[400px]">
      <DocumentInput variant="dropzone" onChange={(files) => console.log("Documents:", files)} />
    </div>
  ),
}

export const NoPreview: Story = {
  render: () => (
    <div className="w-[300px]">
      <FileInput showPreview={false} maxFiles={5} onChange={(files) => console.log("Files:", files)} />
    </div>
  ),
}

export const CustomDropzoneText: Story = {
  render: () => (
    <div className="w-[400px]">
      <FileInput
        variant="dropzone"
        dragActiveText="Release to upload your files"
        dragInactiveText="Drag your documents here or click to browse"
        onChange={(files) => console.log("Files:", files)}
      />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="w-[400px]">
      <FileInput variant="dropzone" disabled />
    </div>
  ),
}
