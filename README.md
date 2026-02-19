# React Native Todo App

Minimal, elegant todo list for iOS/Android.

## Features

- ✅ Add, toggle, delete todos
- ✅ Filter: all / active / completed
- ✅ Persist locally (AsyncStorage)
- ✅ Clean, minimal UI

## Tech Stack

- React Native (Expo)
- TypeScript (strict)
- Vitest for testing

## Getting Started

```bash
npm install
npm start
```

## Development

```bash
npm test        # Run tests
npm run lint    # Check linting
```

## Architecture

```
src/
├── types/        # Todo, Filter types
├── components/   # TodoItem, TodoInput, FilterBar
├── hooks/        # useTodos (state management)
├── services/     # AsyncStorage wrapper
├── screens/      # MainScreen
└── utils/        # Logger
```

See `docs/spec.md` for full requirements.
