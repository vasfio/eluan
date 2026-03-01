import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TreeView, type TreeNode } from "@/components/tree-view";

const meta: Meta<typeof TreeView> = {
  title: "Components/TreeView",
  component: TreeView,
  tags: ["autodocs"],
  argTypes: {
    showIcons: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof TreeView>;

const fileTreeData: TreeNode[] = [
  {
    id: "src",
    name: "src",
    children: [
      {
        id: "components",
        name: "components",
        children: [
          {
            id: "ui",
            name: "ui",
            children: [
              { id: "button.tsx", name: "button.tsx" },
              { id: "card.tsx", name: "card.tsx" },
              { id: "dialog.tsx", name: "dialog.tsx" },
            ],
          },
          { id: "header.tsx", name: "header.tsx" },
          { id: "footer.tsx", name: "footer.tsx" },
        ],
      },
      {
        id: "lib",
        name: "lib",
        children: [
          { id: "utils.ts", name: "utils.ts" },
          { id: "api.ts", name: "api.ts" },
        ],
      },
      { id: "app.tsx", name: "app.tsx" },
      { id: "main.tsx", name: "main.tsx" },
    ],
  },
  {
    id: "public",
    name: "public",
    children: [
      { id: "favicon.ico", name: "favicon.ico" },
      { id: "index.html", name: "index.html" },
    ],
  },
  { id: "package.json", name: "package.json" },
  { id: "tsconfig.json", name: "tsconfig.json" },
  { id: "README.md", name: "README.md" },
];

export const Default: Story = {
  render: function Render() {
    const [selectedId, setSelectedId] = React.useState<string>();

    return (
      <div className="w-[300px] rounded-lg border p-2">
        <TreeView
          data={fileTreeData}
          selectedId={selectedId}
          onSelect={(node) => setSelectedId(node.id)}
        />
      </div>
    );
  },
};

export const WithExpandedNodes: Story = {
  render: function Render() {
    const [selectedId, setSelectedId] = React.useState<string>("button.tsx");
    const [expandedIds, setExpandedIds] = React.useState<string[]>([
      "src",
      "components",
      "ui",
    ]);

    return (
      <div className="w-[300px] rounded-lg border p-2">
        <TreeView
          data={fileTreeData}
          selectedId={selectedId}
          onSelect={(node) => setSelectedId(node.id)}
          expandedIds={expandedIds}
          onExpandChange={setExpandedIds}
        />
      </div>
    );
  },
};

export const NoIcons: Story = {
  render: function Render() {
    const [selectedId, setSelectedId] = React.useState<string>();

    return (
      <div className="w-[300px] rounded-lg border p-2">
        <TreeView
          data={fileTreeData}
          selectedId={selectedId}
          onSelect={(node) => setSelectedId(node.id)}
          showIcons={false}
        />
      </div>
    );
  },
};

export const CustomIcons: Story = {
  render: function Render() {
    const [selectedId, setSelectedId] = React.useState<string>();

    const customIconData: TreeNode[] = [
      {
        id: "documents",
        name: "Documents",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
          </svg>
        ),
        children: [
          {
            id: "report.pdf",
            name: "report.pdf",
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-red-500"
              >
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                <path d="M14 2v4a2 2 0 0 0 2 2h4" />
              </svg>
            ),
          },
          {
            id: "notes.txt",
            name: "notes.txt",
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-500"
              >
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                <path d="M10 9H8" />
                <path d="M16 13H8" />
                <path d="M16 17H8" />
              </svg>
            ),
          },
        ],
      },
      {
        id: "images",
        name: "Images",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
          </svg>
        ),
        children: [
          { id: "photo.jpg", name: "photo.jpg" },
          { id: "screenshot.png", name: "screenshot.png" },
        ],
      },
    ];

    return (
      <div className="w-[300px] rounded-lg border p-2">
        <TreeView
          data={customIconData}
          selectedId={selectedId}
          onSelect={(node) => setSelectedId(node.id)}
        />
      </div>
    );
  },
};

export const FileExplorer: Story = {
  render: function Render() {
    const [selectedId, setSelectedId] = React.useState<string>();
    const [expandedIds, setExpandedIds] = React.useState<string[]>(["src"]);

    return (
      <div className="flex gap-4 w-[600px]">
        <div className="w-[250px] rounded-lg border">
          <div className="border-b px-3 py-2 text-sm font-medium">
            File Explorer
          </div>
          <div className="p-2">
            <TreeView
              data={fileTreeData}
              selectedId={selectedId}
              onSelect={(node) => setSelectedId(node.id)}
              expandedIds={expandedIds}
              onExpandChange={setExpandedIds}
            />
          </div>
        </div>
        <div className="flex-1 rounded-lg border">
          <div className="border-b px-3 py-2 text-sm font-medium">
            {selectedId || "No file selected"}
          </div>
          <div className="p-4">
            {selectedId ? (
              <p className="text-sm text-muted-foreground">
                Content of {selectedId} would be displayed here.
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                Select a file to view its contents.
              </p>
            )}
          </div>
        </div>
      </div>
    );
  },
};
