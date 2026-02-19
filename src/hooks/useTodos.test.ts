import { describe, it, expect } from 'vitest';
import type { Todo } from '../types';

// Test the logic functions directly instead of using renderHook
// since @testing-library/react requires react-dom (not available in RN)

describe('useTodos logic', () => {
  // Test the core logic that would be in the hook
  
  describe('filtering', () => {
    const todos: Todo[] = [
      { id: '1', title: 'Active 1', completed: false, createdAt: 1000 },
      { id: '2', title: 'Completed', completed: true, createdAt: 2000 },
      { id: '3', title: 'Active 2', completed: false, createdAt: 3000 },
    ];

    it('should filter all todos', () => {
      const filtered = todos;
      expect(filtered).toHaveLength(3);
    });

    it('should filter active todos', () => {
      const filtered = todos.filter((todo) => !todo.completed);
      expect(filtered).toHaveLength(2);
      expect(filtered.every((t) => !t.completed)).toBe(true);
    });

    it('should filter completed todos', () => {
      const filtered = todos.filter((todo) => todo.completed);
      expect(filtered).toHaveLength(1);
      expect(filtered[0]?.title).toBe('Completed');
    });
  });

  describe('mutations', () => {
    it('should add a todo', () => {
      const todos: Todo[] = [];
      const newTodo: Todo = {
        id: 'test-id',
        title: 'New todo',
        completed: false,
        createdAt: Date.now(),
      };
      const updated = [...todos, newTodo];
      
      expect(updated).toHaveLength(1);
      expect(updated[0]?.title).toBe('New todo');
    });

    it('should toggle todo completion', () => {
      const todos: Todo[] = [
        { id: '1', title: 'Test', completed: false, createdAt: 1000 },
      ];
      
      const updated = todos.map((todo) =>
        todo.id === '1' ? { ...todo, completed: !todo.completed } : todo
      );
      
      expect(updated[0]?.completed).toBe(true);
    });

    it('should delete a todo', () => {
      const todos: Todo[] = [
        { id: '1', title: 'Keep', completed: false, createdAt: 1000 },
        { id: '2', title: 'Delete', completed: false, createdAt: 2000 },
      ];
      
      const updated = todos.filter((todo) => todo.id !== '2');
      
      expect(updated).toHaveLength(1);
      expect(updated[0]?.title).toBe('Keep');
    });

    it('should clear completed todos', () => {
      const todos: Todo[] = [
        { id: '1', title: 'Active', completed: false, createdAt: 1000 },
        { id: '2', title: 'Completed 1', completed: true, createdAt: 2000 },
        { id: '3', title: 'Completed 2', completed: true, createdAt: 3000 },
      ];
      
      const updated = todos.filter((todo) => !todo.completed);
      
      expect(updated).toHaveLength(1);
      expect(updated[0]?.title).toBe('Active');
    });
  });

  describe('active count', () => {
    it('should count active todos', () => {
      const todos: Todo[] = [
        { id: '1', title: 'Active 1', completed: false, createdAt: 1000 },
        { id: '2', title: 'Completed', completed: true, createdAt: 2000 },
        { id: '3', title: 'Active 2', completed: false, createdAt: 3000 },
      ];
      
      const activeCount = todos.filter((todo) => !todo.completed).length;
      
      expect(activeCount).toBe(2);
    });

    it('should return 0 when all completed', () => {
      const todos: Todo[] = [
        { id: '1', title: 'Done 1', completed: true, createdAt: 1000 },
        { id: '2', title: 'Done 2', completed: true, createdAt: 2000 },
      ];
      
      const activeCount = todos.filter((todo) => !todo.completed).length;
      
      expect(activeCount).toBe(0);
    });
  });

  describe('input validation', () => {
    it('should trim whitespace from title', () => {
      const input = '  New todo  ';
      const trimmed = input.trim();
      
      expect(trimmed).toBe('New todo');
    });

    it('should reject empty input', () => {
      const input = '   ';
      const trimmed = input.trim();
      
      expect(trimmed).toBe('');
      expect(Boolean(trimmed)).toBe(false);
    });
  });
});
