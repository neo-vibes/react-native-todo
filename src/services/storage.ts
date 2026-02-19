import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Todo } from '../types';
import { logger } from '../utils/logger';

const STORAGE_KEY = '@todos';

export const storage = {
  async saveTodos(todos: Todo[]): Promise<void> {
    try {
      const json = JSON.stringify(todos);
      await AsyncStorage.setItem(STORAGE_KEY, json);
      logger.debug('Todos saved', { count: todos.length });
    } catch (error) {
      logger.error('Failed to save todos', error instanceof Error ? error : new Error(String(error)));
      throw error;
    }
  },

  async loadTodos(): Promise<Todo[]> {
    try {
      const json = await AsyncStorage.getItem(STORAGE_KEY);
      if (json === null) {
        logger.debug('No todos found, returning empty array');
        return [];
      }
      const todos = JSON.parse(json) as Todo[];
      logger.debug('Todos loaded', { count: todos.length });
      return todos;
    } catch (error) {
      logger.error('Failed to load todos', error instanceof Error ? error : new Error(String(error)));
      return [];
    }
  },

  async clearTodos(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      logger.debug('Todos cleared');
    } catch (error) {
      logger.error('Failed to clear todos', error instanceof Error ? error : new Error(String(error)));
      throw error;
    }
  },
};
