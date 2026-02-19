import { useState, useEffect, useCallback, useMemo } from 'react';
import type { Todo, Filter, UseTodosReturn } from '../types';
import { storage } from '../services/storage';
import { logger } from '../utils/logger';

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export function useTodos(): UseTodosReturn {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load todos on mount
  useEffect(() => {
    const load = async (): Promise<void> => {
      const loaded = await storage.loadTodos();
      setTodos(loaded);
      setIsLoaded(true);
      logger.debug('Todos loaded into state', { count: loaded.length });
    };
    void load();
  }, []);

  // Save todos when they change (after initial load)
  useEffect(() => {
    if (isLoaded) {
      void storage.saveTodos(todos);
    }
  }, [todos, isLoaded]);

  const addTodo = useCallback((title: string): void => {
    const trimmed = title.trim();
    if (!trimmed) return;

    const newTodo: Todo = {
      id: generateId(),
      title: trimmed,
      completed: false,
      createdAt: Date.now(),
    };

    setTodos((prev) => [...prev, newTodo]);
    logger.debug('Todo added', { id: newTodo.id, title: trimmed });
  }, []);

  const toggleTodo = useCallback((id: string): void => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    logger.debug('Todo toggled', { id });
  }, []);

  const deleteTodo = useCallback((id: string): void => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    logger.debug('Todo deleted', { id });
  }, []);

  const clearCompleted = useCallback((): void => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
    logger.debug('Completed todos cleared');
  }, []);

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const activeCount = useMemo(
    () => todos.filter((todo) => !todo.completed).length,
    [todos]
  );

  return {
    todos,
    filter,
    filteredTodos,
    activeCount,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    setFilter,
  };
}
