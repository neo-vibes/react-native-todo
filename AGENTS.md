# AGENTS.md

## Overview

Minimal, elegant todo list app for iOS/Android. React Native + Expo + TypeScript.

**Status:** Complete ✅ (20 tests passing, lint clean, TypeScript strict)

## Quick Start

```bash
# Install
npm install

# Run dev
npm start

# Test
npm test

# Lint
npm run lint
```

## Project Structure

```
src/
├── types/        # Type definitions
├── components/   # UI components (TodoItem, TodoInput, FilterBar)
├── hooks/        # State management (useTodos)
├── services/     # Storage service
├── screens/      # Screen components
└── utils/        # Helpers (logger)
```

## Key Principles

1. **Verify your work** — Run tests, check against spec, don't assume
2. **Parse at boundaries** — Validate inputs with Zod when needed
3. **Explicit > implicit** — No magic, no hidden behavior
4. **Test before done** — No PR without tests

## Quality Standards

- TypeScript strict mode
- ESLint + Prettier
- Tests required, coverage > 80%

**TypeScript patterns:** Follow [typescript-best-practices](https://playbooks.com/skills/vdustr/vp-claude-code-marketplace/typescript-best-practices) skill.

## Code Rules

- **Packages > utils** — Use established packages over custom helpers
- **3 params max** — More than 3? Use an options object
- **Small functions** — One function, one job. Max ~30 lines
- **Early returns** — Fail fast, reduce nesting
- **No magic values** — Constants or config, not hardcoded
- **Descriptive names** — `getUserById` not `get`, `isActive` not `flag`

## Common Tasks

### Adding a feature
1. Read the spec in `docs/spec.md`
2. Write types first
3. Implement with tests
4. Run full test suite
5. Open PR

### Fixing a bug
1. Write a failing test first
2. Fix the bug
3. Verify test passes

## Before Completing Any Task

- [ ] Tests exist and pass (coverage > 80%)
- [ ] `npm run lint` passes
- [ ] `npx tsc --noEmit` passes
- [ ] No `console.log` (use logger)
- [ ] No `any` types

## Don't

- Don't commit without tests passing
- Don't use `any` (use `unknown` + type guards)
- Don't leave `console.log` (use logger)
- Don't skip the verification checklist
- Don't edit the same file 5+ times without reconsidering approach
