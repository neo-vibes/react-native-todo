import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { TodoItem, TodoInput, FilterBar } from '../components';
import { useTodos } from '../hooks/useTodos';
import type { Todo } from '../types';

export function MainScreen(): React.ReactNode {
  const {
    filteredTodos,
    filter,
    activeCount,
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    setFilter,
  } = useTodos();

  const hasCompleted = todos.some((todo) => todo.completed);

  const renderItem = ({ item }: { item: Todo }): React.ReactElement => (
    <TodoItem todo={item} onToggle={toggleTodo} onDelete={deleteTodo} />
  );

  const keyExtractor = (item: Todo): string => item.id;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <Text style={styles.title}>📝 Todos</Text>
      </View>

      <TodoInput onAdd={addTodo} />

      {todos.length > 0 && (
        <View style={styles.filterContainer}>
          <FilterBar
            current={filter}
            onChange={setFilter}
            activeCount={activeCount}
            hasCompleted={hasCompleted}
            onClearCompleted={clearCompleted}
          />
        </View>
      )}

      <FlatList
        data={filteredTodos}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        style={styles.list}
        contentContainerStyle={filteredTodos.length === 0 ? styles.emptyList : undefined}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>
              {todos.length === 0
                ? 'No todos yet. Add one above!'
                : 'No todos match this filter.'}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  filterContainer: {
    marginTop: 8,
  },
  list: {
    flex: 1,
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
  },
  empty: {
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});
