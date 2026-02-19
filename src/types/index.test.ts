import { describe, it, expect } from 'vitest';
import type { Todo, Filter, TodoState } from './index';

describe('Types', () => {
  it('should create valid Todo object', () => {
    const todo: Todo = {
      id: '123',
      title: 'Test todo',
      completed: false,
      createdAt: Date.now(),
    };

    expect(todo.id).toBe('123');
    expect(todo.title).toBe('Test todo');
    expect(todo.completed).toBe(false);
    expect(typeof todo.createdAt).toBe('number');
  });

  it('should accept valid Filter values', () => {
    const filters: Filter[] = ['all', 'active', 'completed'];
    
    filters.forEach((filter) => {
      expect(['all', 'active', 'completed']).toContain(filter);
    });
  });

  it('should create valid TodoState', () => {
    const state: TodoState = {
      todos: [],
      filter: 'all',
    };

    expect(state.todos).toEqual([]);
    expect(state.filter).toBe('all');
  });
});
