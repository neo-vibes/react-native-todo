import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { Filter } from '../types';

interface FilterBarProps {
  current: Filter;
  onChange: (filter: Filter) => void;
  activeCount: number;
  hasCompleted: boolean;
  onClearCompleted: () => void;
}

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Done' },
];

export function FilterBar({
  current,
  onChange,
  activeCount,
  hasCompleted,
  onClearCompleted,
}: FilterBarProps): React.ReactNode {
  return (
    <View style={styles.container}>
      <Text style={styles.count}>
        {activeCount} {activeCount === 1 ? 'item' : 'items'} left
      </Text>

      <View style={styles.filters}>
        {FILTERS.map(({ key, label }) => (
          <TouchableOpacity
            key={key}
            style={[styles.filterButton, current === key && styles.filterButtonActive]}
            onPress={() => onChange(key)}
            accessibilityRole="tab"
            accessibilityState={{ selected: current === key }}
          >
            <Text
              style={[styles.filterText, current === key && styles.filterTextActive]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {hasCompleted && (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={onClearCompleted}
          accessibilityRole="button"
          accessibilityLabel="Clear completed todos"
        >
          <Text style={styles.clearText}>Clear ✓</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    backgroundColor: '#F9FAFB',
  },
  count: {
    fontSize: 14,
    color: '#6B7280',
  },
  filters: {
    flexDirection: 'row',
    gap: 4,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  filterButtonActive: {
    backgroundColor: '#3B82F6',
  },
  filterText: {
    fontSize: 14,
    color: '#6B7280',
  },
  filterTextActive: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  clearButton: {
    paddingVertical: 6,
  },
  clearText: {
    fontSize: 14,
    color: '#EF4444',
  },
});
