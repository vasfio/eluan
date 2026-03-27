---
name: paper-to-code
description: Convert a Paper.design frame into production-ready React + Tailwind code using the Paper MCP. Use when asked to build a design from Paper, translate a Paper frame to code, or implement UI from a Paper.design file.
---

# Paper to Code

## Prerequisites
1. Paper Desktop app must be open with the relevant file
2. Paper MCP must be connected: `claude mcp add paper --transport http http://127.0.0.1:29979/mcp --scope user`
3. Verify with `/mcp` — should show Paper in the list

## Workflow
1. **Select the frame** in Paper.design before prompting
2. Read the design via Paper MCP tools (grant read permissions — safe to always allow)
3. Analyse layout: identify flex containers, spacing relationships, component hierarchy
4. Start with the **smallest component first**, build up
5. Use React + Tailwind as default (unless user specifies otherwise)
6. Use `@vasf/ragnar-core` for UI primitives (Button, Input, Card, Badge etc.)
7. Run `npm run build` to verify before presenting to user
8. Commit with: `feat: implement <component name> from Paper design`

## Code standards
- Import Ragnar components: `import { Button, Card } from "@vasf/ragnar-core"`
- Use Ragnar tokens via CSS vars: `style={{ color: "var(--foregrounds-primary)" }}`
- Or use theme-aware Tailwind: `text-[var(--foregrounds-primary)]`
- No hardcoded hex/rgb colours
- Use `data-theme` and `data-mode` on html tag to apply correct Ragnar theme

## Responsive approach
- Mobile-first
- If Paper has multiple frames at different widths, ask Claude to build breakpoints per frame
- Prompt: "Add responsive breakpoints based on the frames I have selected — each frame is a breakpoint"

## Gotchas from Paper MCP docs
- Use flex containers in Paper for best translation accuracy (not absolute positioning)
- SVG fills may come through as images, not editable shapes
- Start small: one section at a time, not the whole page
- If design is large/nested, break into smaller parts: "Build just the nav first"
- After each section: commit, then continue

## Prompts that work well
- "Build the selected frame in Paper as a React + Tailwind component using Ragnar"
- "Add responsive breakpoints based on the mobile frame I have selected in Paper"
- "Recreate the card component I have selected in Paper using Ragnar Card"
