import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { colors, typography } from '../theme';

const VerifyInput = ({ 
  placeholder, 
  value, 
  onChangeText, 
  onVerify, 
  isVerified, 
  isLoading,
  error 
}) => {
  return (
    <View style={styles.container}>
      <View style={[
        styles.inputWrapper,
        isVerified && styles.verifiedBorder,
        error && styles.errorBorder
      ]}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          autoCapitalize="characters"
          editable={!isVerified}
        />
        <TouchableOpacity 
          style={[
            styles.verifyBtn,
            isVerified && styles.verifiedBtn,
            (!value || isVerified) && styles.disabledBtn
          ]}
          onPress={onVerify}
          disabled={!value || isVerified || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.verifyText}>
              {isVerified ? 'Verified' : 'Verify'}
            </Text>
          )}
        </TouchableOpacity>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: colors.text.primary,
  },
  verifyBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifiedBtn: {
    backgroundColor: '#10B981',
  },
  disabledBtn: {
    opacity: 0.6,
  },
  verifyText: {
    color: '#FFFFFF',
    fontWeight: typography.weight.bold,
    fontSize: 14,
  },
  verifiedBorder: {
    borderColor: '#10B981',
  },
  errorBorder: {
    borderColor: '#EF4444',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});

export default VerifyInput;
