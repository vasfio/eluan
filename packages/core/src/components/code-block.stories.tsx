import type { Meta, StoryObj } from "@storybook/react"
import { CodeBlock } from "./code-block"

const meta: Meta<typeof CodeBlock> = {
  title: "Components/Code Block",
  component: CodeBlock,
  tags: ["autodocs"],
  argTypes: {
    code: {
      description: "The source code string to display in the block.",
    },
    language: {
      description: "The programming language for syntax highlighting. Supports javascript, typescript, jsx, tsx, css, json, bash, python, java, go, rust, sql, markdown, yaml, and text.",
    },
    showLineNumbers: {
      description: "Whether to display line numbers alongside the code.",
    },
    showCopyButton: {
      description: "Whether to show a copy-to-clipboard button in the header.",
    },
    filename: {
      description: "An optional filename displayed in the header bar.",
    },
    highlightLines: {
      description: "An array of 1-based line numbers to highlight.",
    },
    languages: {
      description: "Supply multiple language variants of the same snippet to render a language switcher in the header.",
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
A syntax-highlighted code block with optional line numbers, copy button, filename header, and line highlighting.

**Import**
\`\`\`tsx
import { CodeBlock } from "@vasf/ragnar-core"
\`\`\`

**Usage**
\`\`\`tsx
<CodeBlock language="typescript" code="const x: number = 1;" />
\`\`\`
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj

// ---------------------------------------------------------------------------
// Sample snippets
// ---------------------------------------------------------------------------

const jsCode = `// Fetch users and transform the response
async function fetchUsers(limit = 10) {
  const response = await fetch(\`/api/users?limit=\${limit}\`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data.map((user) => ({
    ...user,
    fullName: \`\${user.first} \${user.last}\`,
    isActive: user.status === "active",
  }));
}

// Usage
fetchUsers(25).then(console.log).catch(console.error);`

const tsCode = `interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
}

type UserMap = Map<number, User>;

/** Retrieve a user by ID, returning null when not found. */
function getUser(users: UserMap, id: number): User | null {
  return users.get(id) ?? null;
}

const users: UserMap = new Map([
  [1, { id: 1, name: "Alice", email: "alice@example.com", role: "admin" }],
  [2, { id: 2, name: "Bob", email: "bob@example.com", role: "viewer" }],
]);

const admin = getUser(users, 1);
console.log(admin?.name); // "Alice"`

const jsxCode = `import React, { useState } from "react";

/** A simple counter with increment / decrement buttons. */
export function Counter({ initial = 0 }) {
  const [count, setCount] = useState(initial);

  return (
    <div className="flex items-center gap-4">
      <button onClick={() => setCount((c) => c - 1)}>-</button>
      <span className="text-lg font-bold">{count}</span>
      <button onClick={() => setCount((c) => c + 1)}>+</button>
    </div>
  );
}`

const cssCode = `/* Card component styles */
.card {
  --card-radius: 8px;
  display: flex;
  flex-direction: column;
  border-radius: var(--card-radius);
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.2s ease-in-out;
}

.card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

.card__header {
  padding: 16px 20px;
  border-bottom: 1px solid #eaeaea;
  font-size: 1.125rem;
  font-weight: 500;
}

.card__body {
  padding: 20px;
  flex: 1;
}`

const jsonCode = `{
  "name": "@vasf/ragnar-core",
  "version": "0.1.5",
  "description": "60+ accessible UI components for React",
  "keywords": ["react", "design-system", "components"],
  "scripts": {
    "dev": "vite build --watch",
    "build": "rm -rf dist && vite build && tsc -p tsconfig.build.json",
    "test": "vitest run"
  },
  "dependencies": {
    "react": "^18.0.0",
    "lucide-react": "^0.395.0"
  },
  "peerDependencies": {
    "react": "^18.0.0"
  }
}`

const bashCode = `#!/usr/bin/env bash
# Deploy script for production

set -euo pipefail

BRANCH=$(git rev-parse --abbrev-ref HEAD)
VERSION=$(node -p "require('./package.json').version")

echo "Deploying v$VERSION from $BRANCH..."

if [ "$BRANCH" != "main" ]; then
  echo "Error: deployments must run from main" >&2
  exit 1
fi

npm run build
npm run test -- --ci
npm publish --access public

echo "Successfully published v$VERSION"`

const pythonCode = `from dataclasses import dataclass
from typing import Optional

@dataclass
class User:
    """Represents an application user."""
    id: int
    name: str
    email: str
    is_active: bool = True

    def greet(self) -> str:
        return f"Hello, {self.name}!"

def find_user(users: list[User], user_id: int) -> Optional[User]:
    """Find a user by ID, returning None if not found."""
    for user in users:
        if user.id == user_id:
            return user
    return None

# Usage
users = [
    User(1, "Alice", "alice@example.com"),
    User(2, "Bob", "bob@example.com", is_active=False),
]

alice = find_user(users, 1)
print(alice.greet() if alice else "Not found")  # Hello, Alice!`

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const JavaScript: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "JavaScript with async/await, template literals, arrow functions, and object spread syntax.",
      },
    },
  },
  render: () => <CodeBlock language="javascript" code={jsCode} filename="fetch-users.js" />,
}

export const TypeScript: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "TypeScript with interfaces, union types, generics, and nullish coalescing.",
      },
    },
  },
  render: () => <CodeBlock language="typescript" code={tsCode} filename="users.ts" showLineNumbers />,
}

export const JSX: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "JSX / React component highlighting with embedded expressions and HTML-like tags.",
      },
    },
  },
  render: () => <CodeBlock language="jsx" code={jsxCode} filename="Counter.jsx" />,
}

export const CSS: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "CSS with custom properties, selectors, pseudo-classes, and transitions.",
      },
    },
  },
  render: () => <CodeBlock language="css" code={cssCode} filename="card.css" />,
}

export const JSON: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "JSON with nested objects, arrays, and various value types.",
      },
    },
  },
  render: () => <CodeBlock language="json" code={jsonCode} filename="package.json" />,
}

export const Bash: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Bash shell script with variables, conditionals, and command substitution.",
      },
    },
  },
  render: () => <CodeBlock language="bash" code={bashCode} filename="deploy.sh" />,
}

export const Python: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Python with dataclasses, type hints, decorators, and f-strings.",
      },
    },
  },
  render: () => <CodeBlock language="python" code={pythonCode} filename="users.py" showLineNumbers />,
}

export const WithLineNumbers: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "A code block with line numbers displayed alongside the code.",
      },
    },
  },
  render: () => <CodeBlock language="typescript" code={tsCode} showLineNumbers />,
}

export const WithHighlightedLines: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Specific lines highlighted to draw attention, combined with line numbers.",
      },
    },
  },
  render: () => (
    <CodeBlock
      language="typescript"
      code={tsCode}
      showLineNumbers
      highlightLines={[1, 2, 3, 4, 5, 6]}
      filename="users.ts"
    />
  ),
}

export const WithTitle: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "A code block with a filename displayed in the header bar.",
      },
    },
  },
  render: () => <CodeBlock language="javascript" code={jsCode} filename="example.js" />,
}

export const Copyable: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "A code block with a copy-to-clipboard button in the header.",
      },
    },
  },
  render: () => <CodeBlock language="javascript" code={jsCode} showCopyButton />,
}

export const LanguageSwitcher: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Multiple language variants of the same concept with a tab switcher in the header.",
      },
    },
  },
  render: () => (
    <CodeBlock
      code=""
      languages={[
        { language: "javascript", code: jsCode, label: "JavaScript" },
        { language: "typescript", code: tsCode, label: "TypeScript" },
        { language: "python", code: pythonCode, label: "Python" },
      ]}
      showLineNumbers
      filename="example"
    />
  ),
}
