import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import type { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps): React.ReactElement {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => onToggle(todo.id)}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: todo.completed }}
        accessibilityLabel={`${todo.title}, ${todo.completed ? 'completed' : 'not completed'}`}
      >
        <View style={[styles.circle, todo.completed && styles.circleCompleted]}>
          {todo.completed && <Text style={styles.checkmark}>✓</Text>}
        </View>
      </TouchableOpacity>

      <Text
        style={[styles.title, todo.completed && styles.titleCompleted]}
        numberOfLines={1}
      >
        {todo.title}
      </Text>

      <Pressable
        style={styles.deleteButton}
        onPress={() => onDelete(todo.id)}
        accessibilityRole="button"
        accessibilityLabel={`Delete ${todo.title}`}
      >
        <Text style={styles.deleteText}>×</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  checkbox: {
    marginRight: 16,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleCompleted: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  title: {
    flex: 1,
    fontSize: 16,
    color: '#1A1A1A',
  },
  titleCompleted: {
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  deleteButton: {
    padding: 8,
  },
  deleteText: {
    fontSize: 24,
    color: '#EF4444',
    fontWeight: '300',
  },
});
