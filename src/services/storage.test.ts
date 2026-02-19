import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Todo } from '../types';

// Mock AsyncStorage
const mockStorage = new Map<string, string>();

vi.mock('@react-native-async-storage/async-storage', () => ({
  default: {
    setItem: vi.fn((key: string, value: string) => {
      mockStorage.set(key, value);
      return Promise.resolve();
    }),
    getItem: vi.fn((key: string) => {
      return Promise.resolve(mockStorage.get(key) ?? null);
    }),
    removeItem: vi.fn((key: string) => {
      mockStorage.delete(key);
      return Promise.resolve();
    }),
  },
}));

// Import after mocking
import { storage } from './storage';

describe('storage', () => {
  beforeEach(() => {
    mockStorage.clear();
    vi.clearAllMocks();
  });

  it('should save and load todos', async () => {
    const todos: Todo[] = [
      { id: '1', title: 'Test', completed: false, createdAt: 1000 },
    ];

    await storage.saveTodos(todos);
    const loaded = await storage.loadTodos();

    expect(loaded).toEqual(todos);
  });

  it('should return empty array when no todos exist', async () => {
    const loaded = await storage.loadTodos();
    expect(loaded).toEqual([]);
  });

  it('should clear todos', async () => {
    const todos: Todo[] = [
      { id: '1', title: 'Test', completed: false, createdAt: 1000 },
    ];

    await storage.saveTodos(todos);
    await storage.clearTodos();
    const loaded = await storage.loadTodos();

    expect(loaded).toEqual([]);
  });

  it('should handle multiple todos', async () => {
    const todos: Todo[] = [
      { id: '1', title: 'First', completed: false, createdAt: 1000 },
      { id: '2', title: 'Second', completed: true, createdAt: 2000 },
      { id: '3', title: 'Third', completed: false, createdAt: 3000 },
    ];

    await storage.saveTodos(todos);
    const loaded = await storage.loadTodos();

    expect(loaded).toHaveLength(3);
    expect(loaded[1]?.completed).toBe(true);
  });
});
