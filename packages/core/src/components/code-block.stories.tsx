import type { Meta, StoryObj } from "@storybook/react"
import { CodeBlock } from "./code-block"

const meta: Meta<typeof CodeBlock> = {
  title: "Components/Code Block",
  component: CodeBlock,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj

const jsCode = `function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

greet("World");`

const tsCode = `interface User {
  id: number;
  name: string;
  email: string;
}

function getUser(id: number): User {
  return { id, name: "John", email: "john@example.com" };
}`

const cssCode = `.button {
  background-color: #3498db;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
}`

export const JavaScript: Story = {
  args: {},
  render: () => <CodeBlock language="javascript" code={jsCode} />,
}

export const TypeScript: Story = {
  args: {},
  render: () => <CodeBlock language="typescript" code={tsCode} />,
}

export const CSS: Story = {
  args: {},
  render: () => <CodeBlock language="css" code={cssCode} />,
}

export const WithTitle: Story = {
  args: {},
  render: () => <CodeBlock language="javascript" code={jsCode} filename="example.js" />,
}

export const WithLineNumbers: Story = {
  args: {},
  render: () => <CodeBlock language="typescript" code={tsCode} showLineNumbers />,
}

export const Copyable: Story = {
  args: {},
  render: () => <CodeBlock language="javascript" code={jsCode} showCopyButton />,
}
