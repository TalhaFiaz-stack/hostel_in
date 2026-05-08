import React from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import { colors, spacing, typography } from '../theme';

const CustomInput = ({ label, error, ...props }) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          error ? styles.inputError : null // Highlight border on error
        ]}
        placeholderTextColor={colors.text.placeholder}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: spacing.md,
  },
  label: {
    fontSize: typography.size.label,
    fontWeight: typography.weight.semiBold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: typography.letterSpacing.wide,
  },
  input: {
    width: '100%',
    backgroundColor: colors.surface,
    borderRadius: 10,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: typography.size.body,
    color: colors.text.primary,
    borderWidth: 1,
    borderColor: colors.border,
  },
  inputError: {
    borderColor: colors.status.error, // Red border on error
  },
  errorText: {
    fontSize: 12,
    color: colors.status.error,
    marginTop: 4,
    fontWeight: '500',
  },
});

export default CustomInput;
