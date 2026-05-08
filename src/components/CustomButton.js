import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors, spacing, typography } from '../theme';

const CustomButton = ({ title, ...props }) => {
  return (
    <TouchableOpacity 
      activeOpacity={0.8}
      style={styles.button}
      {...props}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    backgroundColor: colors.primary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md + 2,
  },
  buttonText: {
    color: colors.text.white,
    fontSize: typography.size.button,
    fontWeight: typography.weight.semiBold,
    letterSpacing: 0.3,
  },
});

export default CustomButton;
