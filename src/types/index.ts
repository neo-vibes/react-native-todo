/**
 * Core types for the Todo app
 */

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
}

export type Filter = 'all' | 'active' | 'completed';

export interface TodoState {
  todos: Todo[];
  filter: Filter;
}

export interface TodoActions {
  addTodo: (title: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  clearCompleted: () => void;
  setFilter: (filter: Filter) => void;
}

export type UseTodosReturn = TodoState & TodoActions & {
  filteredTodos: Todo[];
  activeCount: number;
};
