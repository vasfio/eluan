import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { RichText } from "@/components/rich-text";

const meta: Meta<typeof RichText> = {
  title: "Components/RichText",
  component: RichText,
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof RichText>;

export const Default: Story = {
  render: function Render() {
    const [content, setContent] = React.useState("");

    return (
      <div className="w-[600px]">
        <RichText value={content} onChange={setContent} />
      </div>
    );
  },
};

export const WithInitialContent: Story = {
  render: function Render() {
    const [content, setContent] = React.useState(
      "<h2>Welcome to the Rich Text Editor</h2><p>This is a <strong>rich text editor</strong> built with <em>Tiptap</em>.</p><ul><li>Supports bold, italic, and strikethrough</li><li>Headings and lists</li><li>Blockquotes and code</li></ul><blockquote><p>This is a blockquote example.</p></blockquote>"
    );

    return (
      <div className="w-[600px]">
        <RichText value={content} onChange={setContent} />
      </div>
    );
  },
};

export const CustomPlaceholder: Story = {
  render: function Render() {
    const [content, setContent] = React.useState("");

    return (
      <div className="w-[600px]">
        <RichText
          value={content}
          onChange={setContent}
          placeholder="Write your story here..."
        />
      </div>
    );
  },
};

export const CustomHeight: Story = {
  render: function Render() {
    const [content, setContent] = React.useState("");

    return (
      <div className="w-[600px]">
        <RichText
          value={content}
          onChange={setContent}
          minHeight="300px"
          placeholder="Write a longer article..."
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="w-[600px]">
      <RichText
        value="<p>This editor is <strong>disabled</strong>. You cannot edit the content.</p>"
        disabled
      />
    </div>
  ),
};

export const FormExample: Story = {
  render: function Render() {
    const [content, setContent] = React.useState("");

    return (
      <div className="w-[600px] space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Title</label>
          <input
            type="text"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            placeholder="Enter article title..."
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Content</label>
          <RichText
            value={content}
            onChange={setContent}
            placeholder="Write your article content..."
            minHeight="200px"
          />
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Publish
          </button>
          <button className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent">
            Save Draft
          </button>
        </div>
      </div>
    );
  },
};

export const OutputPreview: Story = {
  render: function Render() {
    const [content, setContent] = React.useState(
      "<h2>Article Title</h2><p>This is the article content.</p>"
    );

    return (
      <div className="w-[800px] grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-medium mb-2">Editor</h3>
          <RichText value={content} onChange={setContent} minHeight="200px" />
        </div>
        <div>
          <h3 className="text-sm font-medium mb-2">Preview (HTML Output)</h3>
          <div className="rounded-md border p-4 min-h-[200px]">
            <div
              className="prose prose-sm dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>
      </div>
    );
  },
};
