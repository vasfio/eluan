import type { Meta, StoryObj } from "@storybook/react";
import { CodeBlock } from "@/components/code-block";

const meta: Meta<typeof CodeBlock> = {
  title: "Components/CodeBlock",
  component: CodeBlock,
  tags: ["autodocs"],
  argTypes: {
    language: {
      control: "select",
      options: [
        "javascript",
        "typescript",
        "jsx",
        "tsx",
        "css",
        "json",
        "bash",
        "python",
        "java",
        "go",
        "rust",
        "sql",
        "markdown",
        "yaml",
        "text",
      ],
    },
    showLineNumbers: {
      control: "boolean",
    },
    showCopyButton: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof CodeBlock>;

const jsCode = `function greet(name) {
  console.log(\`Hello, \${name}!\`);
  return name.toUpperCase();
}

greet("World");`;

const tsCode = `interface User {
  id: number;
  name: string;
  email: string;
}

function getUser(id: number): User {
  return {
    id,
    name: "John Doe",
    email: "john@example.com",
  };
}`;

const reactCode = `import React from "react";

export function Button({ children, onClick }) {
  return (
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded"
      onClick={onClick}
    >
      {children}
    </button>
  );
}`;

const bashCode = `# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build`;

export const Default: Story = {
  args: {
    code: jsCode,
    language: "javascript",
  },
};

export const TypeScript: Story = {
  args: {
    code: tsCode,
    language: "typescript",
    filename: "user.ts",
  },
};

export const React: Story = {
  args: {
    code: reactCode,
    language: "jsx",
    filename: "Button.jsx",
  },
};

export const WithLineNumbers: Story = {
  args: {
    code: jsCode,
    language: "javascript",
    showLineNumbers: true,
  },
};

export const WithFilename: Story = {
  args: {
    code: tsCode,
    language: "typescript",
    filename: "src/types/user.ts",
    showLineNumbers: true,
  },
};

export const BashCommands: Story = {
  args: {
    code: bashCode,
    language: "bash",
    filename: "terminal",
  },
};

export const WithHighlightedLines: Story = {
  args: {
    code: tsCode,
    language: "typescript",
    showLineNumbers: true,
    highlightLines: [1, 2, 3, 4, 5],
    filename: "user.ts",
  },
};

export const JSON: Story = {
  args: {
    code: `{
  "name": "@acme/design-system",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.0.0",
    "tailwindcss": "^3.0.0"
  }
}`,
    language: "json",
    filename: "package.json",
  },
};

export const NoCopyButton: Story = {
  args: {
    code: jsCode,
    language: "javascript",
    showCopyButton: false,
  },
};

export const PlainText: Story = {
  args: {
    code: `This is plain text without any syntax highlighting.
It can be used for generic content or logs.`,
    language: "text",
  },
};
