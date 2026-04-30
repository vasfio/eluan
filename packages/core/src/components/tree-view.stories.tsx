import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { TreeView, type TreeNode } from "./tree-view"
import { FileText, Image, Music, Video, Code } from "lucide-react"

const meta: Meta<typeof TreeView> = {
  title: "Components/Tree View",
  component: TreeView,
  tags: ["autodocs"],
  argTypes: {
    data: {
      description: "An array of TreeNode objects representing the hierarchical data to display.",
    },
    selectedId: {
      description: "The id of the currently selected node.",
    },
    onSelect: {
      description: "Callback fired when a node is clicked, receiving the TreeNode.",
    },
    expandedIds: {
      description: "Controlled array of expanded node ids.",
    },
    onExpandChange: {
      description: "Callback fired when the set of expanded nodes changes.",
    },
    showIcons: {
      description: "Whether to show file/folder icons next to node names (default true).",
    },
    indentSize: {
      description: "The pixel indentation per nesting level (default 20).",
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
A hierarchical tree view for displaying nested data such as file systems, with support for selection, custom icons, and controlled expansion.

**Import**
\`\`\`tsx
import { TreeView, type TreeNode } from "@vasf/ragnar-core"
\`\`\`

**Usage**
\`\`\`tsx
const data: TreeNode[] = [
  { id: "1", name: "src", children: [
    { id: "1-1", name: "App.tsx" },
  ]},
]

<TreeView data={data} selectedId={selectedId} onSelect={(node) => setSelectedId(node.id)} />
\`\`\`
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const fileSystemData: TreeNode[] = [
  {
    id: "1",
    name: "src",
    children: [
      {
        id: "1-1",
        name: "components",
        children: [
          { id: "1-1-1", name: "Button.tsx" },
          { id: "1-1-2", name: "Input.tsx" },
          { id: "1-1-3", name: "Card.tsx" },
        ],
      },
      {
        id: "1-2",
        name: "hooks",
        children: [
          { id: "1-2-1", name: "useAuth.ts" },
          { id: "1-2-2", name: "useTheme.ts" },
        ],
      },
      { id: "1-3", name: "App.tsx" },
      { id: "1-4", name: "index.tsx" },
    ],
  },
  {
    id: "2",
    name: "public",
    children: [
      { id: "2-1", name: "favicon.ico" },
      { id: "2-2", name: "index.html" },
    ],
  },
  { id: "3", name: "package.json" },
  { id: "4", name: "tsconfig.json" },
]

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "A tree view displaying a file system structure with default folder/file icons and selection.",
      },
    },
  },
  render: () => {
    const [selectedId, setSelectedId] = React.useState<string>()
    return (
      <div className="w-[300px] border rounded-lg p-2">
        <TreeView
          data={fileSystemData}
          selectedId={selectedId}
          onSelect={(node) => setSelectedId(node.id)}
        />
      </div>
    )
  },
}

const mediaData: TreeNode[] = [
  {
    id: "images",
    name: "Images",
    icon: <Image className="h-4 w-4" />,
    children: [
      { id: "img-1", name: "photo-1.jpg", icon: <Image className="h-4 w-4" /> },
      { id: "img-2", name: "photo-2.jpg", icon: <Image className="h-4 w-4" /> },
      { id: "img-3", name: "banner.png", icon: <Image className="h-4 w-4" /> },
    ],
  },
  {
    id: "music",
    name: "Music",
    icon: <Music className="h-4 w-4" />,
    children: [
      { id: "music-1", name: "song.mp3", icon: <Music className="h-4 w-4" /> },
      { id: "music-2", name: "podcast.mp3", icon: <Music className="h-4 w-4" /> },
    ],
  },
  {
    id: "videos",
    name: "Videos",
    icon: <Video className="h-4 w-4" />,
    children: [
      { id: "video-1", name: "intro.mp4", icon: <Video className="h-4 w-4" /> },
    ],
  },
  {
    id: "documents",
    name: "Documents",
    icon: <FileText className="h-4 w-4" />,
    children: [
      { id: "doc-1", name: "report.pdf", icon: <FileText className="h-4 w-4" /> },
      { id: "doc-2", name: "notes.txt", icon: <FileText className="h-4 w-4" /> },
    ],
  },
]

export const WithCustomIcons: Story = {
  parameters: {
    docs: {
      description: {
        story: "A tree view with custom Lucide icons for different media file types.",
      },
    },
  },
  render: () => {
    const [selectedId, setSelectedId] = React.useState<string>()
    return (
      <div className="w-[300px] border rounded-lg p-2">
        <TreeView
          data={mediaData}
          selectedId={selectedId}
          onSelect={(node) => setSelectedId(node.id)}
        />
      </div>
    )
  },
}

export const WithoutIcons: Story = {
  parameters: {
    docs: {
      description: {
        story: "A tree view with icons hidden via the showIcons={false} prop.",
      },
    },
  },
  render: () => {
    const [selectedId, setSelectedId] = React.useState<string>()
    return (
      <div className="w-[300px] border rounded-lg p-2">
        <TreeView
          data={fileSystemData}
          selectedId={selectedId}
          onSelect={(node) => setSelectedId(node.id)}
          showIcons={false}
        />
      </div>
    )
  },
}

export const ControlledExpansion: Story = {
  parameters: {
    docs: {
      description: {
        story: "A tree view with externally controlled expansion state and Collapse All / Expand All buttons.",
      },
    },
  },
  render: () => {
    const [selectedId, setSelectedId] = React.useState<string>()
    const [expandedIds, setExpandedIds] = React.useState<string[]>(["1"])
    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            className="px-3 py-1 text-sm border rounded"
            onClick={() => setExpandedIds([])}
          >
            Collapse All
          </button>
          <button
            className="px-3 py-1 text-sm border rounded"
            onClick={() => setExpandedIds(["1", "1-1", "1-2", "2"])}
          >
            Expand All
          </button>
        </div>
        <div className="w-[300px] border rounded-lg p-2">
          <TreeView
            data={fileSystemData}
            selectedId={selectedId}
            onSelect={(node) => setSelectedId(node.id)}
            expandedIds={expandedIds}
            onExpandChange={setExpandedIds}
          />
        </div>
      </div>
    )
  },
}

export const LargerIndent: Story = {
  parameters: {
    docs: {
      description: {
        story: "A tree view with a larger indentation size (32px) for deeper visual nesting.",
      },
    },
  },
  render: () => {
    const [selectedId, setSelectedId] = React.useState<string>()
    return (
      <div className="w-[350px] border rounded-lg p-2">
        <TreeView
          data={fileSystemData}
          selectedId={selectedId}
          onSelect={(node) => setSelectedId(node.id)}
          indentSize={32}
        />
      </div>
    )
  },
}
