// Root ESLint config (flat config, ESLint v9+).
// Applies sensible defaults for the entire monorepo. Each package's
// `pnpm lint` invokes ESLint against its own `src/`.

import js from "@eslint/js"
import tsPlugin from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import globals from "globals"

export default [
  // Ignore generated artifacts
  {
    ignores: [
      "**/dist/**",
      "**/build/**",
      "**/coverage/**",
      "**/.storybook/**",
      "**/storybook-static/**",
      "**/node_modules/**",
      "**/*.config.{js,ts,mjs,cjs}",
      "**/vite.config.ts",
      "**/vitest.config.ts",
    ],
  },

  // Base recommended rules
  js.configs.recommended,

  // TypeScript + React Hooks for source files
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: { ...globals.browser, ...globals.node, ...globals.es2021 },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      // Hooks correctness — these are real correctness issues, keep as errors.
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // Prefer the TS-aware versions of these rules.
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_", ignoreRestSiblings: true },
      ],

      // TypeScript handles undeclared identifiers; ESLint's no-undef can't
      // see types and will false-positive on JSX intrinsics, etc.
      "no-undef": "off",

      // Soft warnings — don't block on stylistic stuff for a public launch.
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-empty-object-type": "off",

      // Allow empty catch blocks (used for localStorage / privacy-mode swallows).
      "no-empty": ["warn", { allowEmptyCatch: true }],
    },
  },
]
