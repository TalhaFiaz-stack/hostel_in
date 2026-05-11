import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors, spacing, typography } from '../theme';

const CustomInput = ({ label, error, secureTextEntry, iconName, ...props }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const showPasswordToggle = secureTextEntry !== undefined;

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        {iconName && (
          <View style={styles.leftIconContainer}>
            <Icon name={iconName} size={18} color={isFocused ? colors.primary : colors.text.placeholder} />
          </View>
        )}
        <TextInput
          style={[
            styles.input,
            isFocused ? styles.inputFocused : null,
            error ? styles.inputError : null,
            iconName ? styles.inputWithLeftIcon : null,
            showPasswordToggle ? styles.inputWithRightIcon : null
          ]}
          placeholderTextColor={colors.text.placeholder}
          secureTextEntry={showPasswordToggle && !isPasswordVisible}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {showPasswordToggle && (
          <TouchableOpacity 
            activeOpacity={0.6}
            style={styles.rightIconContainer}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <Icon 
              name={isPasswordVisible ? 'eye' : 'eye-slash'} 
              size={18} 
              color={isFocused ? colors.primary : colors.text.secondary} 
            />
          </TouchableOpacity>
        )}
      </View>
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
    fontSize: 12,
    fontWeight: typography.weight.bold,
    color: colors.text.secondary,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    paddingLeft: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  leftIconContainer: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    fontWeight: typography.weight.medium,
    color: colors.text.primary,
    borderWidth: 1.5,
    borderColor: '#F1F5F9',
    // Soft shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  inputWithLeftIcon: {
    paddingLeft: 46,
  },
  inputWithRightIcon: {
    paddingRight: 46,
  },
  inputFocused: {
    borderColor: colors.primary,
    backgroundColor: '#FFFFFF',
    elevation: 4,
    shadowOpacity: 0.1,
  },
  inputError: {
    borderColor: colors.status.error,
  },
  rightIconContainer: {
    position: 'absolute',
    right: 16,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 11,
    color: colors.status.error,
    marginTop: 6,
    fontWeight: typography.weight.semiBold,
    paddingLeft: 4,
  },
});

export default CustomInput;
