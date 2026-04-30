---
name: app-scaffold
description: Scaffold a new Next.js web app using Vas's standard stack. Use when creating a new web application from scratch, setting up a new repo, or bootstrapping a project with the standard Ragnar + Neon + NextAuth setup.
---

# App Scaffold — Vas's Standard Stack

## Stack
- **Framework**: Next.js 15 (App Router, TypeScript)
- **UI**: `@vasf/ragnar-core` (always `--legacy-peer-deps` due to React 19 peer dep)
- **Styling**: Tailwind CSS v4 with `@tailwindcss/postcss`
- **Database**: Neon (serverless PostgreSQL) via Prisma
- **Auth**: NextAuth v5 beta (`next-auth@beta`)
- **Deploy**: Vercel

## Bootstrap steps
```bash
# 1. Create app
cd ~/Documents/github
mkdir <app-name> && cd <app-name>
git init

# 2. package.json — copy from finance-tracker as base
# Key deps: next@^15, react@^19, @vasf/ragnar-core, prisma, @prisma/client,
#           next-auth@beta, bcryptjs, date-fns, lucide-react, tailwind

# 3. Install
npm install --legacy-peer-deps

# 4. Config files needed:
# - next.config.ts
# - tsconfig.json (paths: @/* → ./src/*)
# - postcss.config.mjs
# - .env.example
```

## Required files
- `src/app/layout.tsx` — html tag with `data-theme` and `data-mode` attributes
- `src/app/globals.css` — `@import "@vasf/ragnar-core/styles.css"; @import "tailwindcss";`
- `src/lib/prisma.ts` — singleton Prisma client
- `src/lib/auth.ts` — NextAuth v5 config
- `src/middleware.ts` — route protection

## Theme setup (layout.tsx)
```tsx
<html lang="en" data-theme="industrial-retro" data-mode="dark">
```
Valid themes: `industrial-retro`, `minimal`, `lime`, `bold`, `beige`, `funky`, `sakura`, `violet`
Valid modes: `light`, `dark`, `dim`

## Auth pattern (NextAuth v5)
```ts
// src/lib/auth.ts
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
export const { handlers, auth, signIn, signOut } = NextAuth({ ... })

// src/app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/lib/auth"
export const { GET, POST } = handlers
```

## Prisma + Neon
```ts
// src/lib/prisma.ts — use standard PrismaClient (not Neon adapter) for simplicity
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
export const prisma = globalForPrisma.prisma || new PrismaClient()
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
```

## .env.example
```
DATABASE_URL=postgresql://user:password@host/db?sslmode=require
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32
NEXTAUTH_URL=http://localhost:3000
```

## Post-scaffold checklist
1. `npx prisma generate` after creating schema
2. `npm run build` to verify clean compile
3. `git add -A && git commit -m "feat: initial scaffold"`
4. Create GitHub repo at github.com/frolda/<name>
5. `git remote add origin https://github.com/frolda/<name>.git && git push -u origin main`
