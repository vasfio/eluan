import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Pill } from "@/components/pill";

const meta: Meta<typeof Pill> = {
  title: "Components/Pill",
  component: Pill,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline", "success", "warning", "info"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Pill>;

export const Default: Story = {
  args: {
    children: "Pill",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Pill>Default</Pill>
      <Pill variant="secondary">Secondary</Pill>
      <Pill variant="destructive">Destructive</Pill>
      <Pill variant="outline">Outline</Pill>
      <Pill variant="success">Success</Pill>
      <Pill variant="warning">Warning</Pill>
      <Pill variant="info">Info</Pill>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Pill size="sm">Small</Pill>
      <Pill size="default">Default</Pill>
      <Pill size="lg">Large</Pill>
    </div>
  ),
};

export const Dismissible: Story = {
  render: function Render() {
    const [pills, setPills] = React.useState([
      { id: 1, label: "React" },
      { id: 2, label: "TypeScript" },
      { id: 3, label: "Tailwind CSS" },
      { id: 4, label: "Next.js" },
    ]);

    const handleDismiss = (id: number) => {
      setPills(pills.filter((pill) => pill.id !== id));
    };

    return (
      <div className="flex flex-wrap gap-2">
        {pills.map((pill) => (
          <Pill key={pill.id} onDismiss={() => handleDismiss(pill.id)}>
            {pill.label}
          </Pill>
        ))}
        {pills.length === 0 && (
          <p className="text-sm text-muted-foreground">All pills removed!</p>
        )}
      </div>
    );
  },
};

export const DismissibleVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Pill onDismiss={() => {}}>Default</Pill>
      <Pill variant="secondary" onDismiss={() => {}}>Secondary</Pill>
      <Pill variant="success" onDismiss={() => {}}>Success</Pill>
      <Pill variant="warning" onDismiss={() => {}}>Warning</Pill>
      <Pill variant="info" onDismiss={() => {}}>Info</Pill>
    </div>
  ),
};

export const TagInput: Story = {
  render: function Render() {
    const [tags, setTags] = React.useState(["javascript", "css", "html"]);
    const [input, setInput] = React.useState("");

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && input.trim()) {
        e.preventDefault();
        if (!tags.includes(input.trim().toLowerCase())) {
          setTags([...tags, input.trim().toLowerCase()]);
        }
        setInput("");
      }
    };

    const handleRemove = (tag: string) => {
      setTags(tags.filter((t) => t !== tag));
    };

    return (
      <div className="w-[400px] space-y-2">
        <label className="text-sm font-medium">Tags</label>
        <div className="flex flex-wrap gap-2 rounded-md border p-2 min-h-[80px]">
          {tags.map((tag) => (
            <Pill
              key={tag}
              variant="secondary"
              size="sm"
              onDismiss={() => handleRemove(tag)}
            >
              {tag}
            </Pill>
          ))}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add tag..."
            className="flex-1 min-w-[100px] bg-transparent text-sm outline-none"
          />
        </div>
        <p className="text-sm text-muted-foreground">
          Press Enter to add a tag
        </p>
      </div>
    );
  },
};

export const StatusPills: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-sm w-20">Active:</span>
        <Pill variant="success">Active</Pill>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm w-20">Pending:</span>
        <Pill variant="warning">Pending</Pill>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm w-20">Inactive:</span>
        <Pill variant="secondary">Inactive</Pill>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm w-20">Error:</span>
        <Pill variant="destructive">Error</Pill>
      </div>
    </div>
  ),
};
