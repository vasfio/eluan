import type { Meta, StoryObj } from "@storybook/react"
import { CodeBlock } from "./code-block"

const meta: Meta<typeof CodeBlock> = {
  title: "Components/CodeBlock",
  component: CodeBlock,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

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
  render: () => <CodeBlock language="javascript" code={jsCode} />,
}

export const TypeScript: Story = {
  render: () => <CodeBlock language="typescript" code={tsCode} />,
}

export const CSS: Story = {
  render: () => <CodeBlock language="css" code={cssCode} />,
}

export const WithTitle: Story = {
  render: () => <CodeBlock language="javascript" code={jsCode} title="example.js" />,
}

export const WithLineNumbers: Story = {
  render: () => <CodeBlock language="typescript" code={tsCode} showLineNumbers />,
}

export const Copyable: Story = {
  render: () => <CodeBlock language="javascript" code={jsCode} copyable />,
}
