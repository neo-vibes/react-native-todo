import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

interface TodoInputProps {
  onAdd: (title: string) => void;
}

export function TodoInput({ onAdd }: TodoInputProps): React.ReactNode {
  const [text, setText] = useState('');

  const handleSubmit = (): void => {
    const trimmed = text.trim();
    if (trimmed) {
      onAdd(trimmed);
      setText('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="What needs to be done?"
        placeholderTextColor="#9CA3AF"
        onSubmitEditing={handleSubmit}
        returnKeyType="done"
        accessibilityLabel="Add new todo"
      />
      <TouchableOpacity
        style={[styles.button, !text.trim() && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={!text.trim()}
        accessibilityRole="button"
        accessibilityLabel="Add todo"
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  input: {
    flex: 1,
    height: 48,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    color: '#1A1A1A',
  },
  button: {
    width: 48,
    height: 48,
    marginLeft: 12,
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  buttonText: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: '300',
  },
});
